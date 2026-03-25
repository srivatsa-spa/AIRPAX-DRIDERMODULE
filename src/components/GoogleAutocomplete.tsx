import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { MapPin } from 'lucide-react-native';
import axios from 'axios';
import { Typography } from './Typography';
import { COLORS, SPACING } from '../theme';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDKEBTCflJhmLKu_u5Yg35umBhwdqoa0Qg';

interface Props {
  placeholder?: string;
  onSelect: (data: any) => void;
  initialValue?: string;
  style?: any;
}

export const GoogleAutocomplete = ({ placeholder, onSelect, initialValue = '', style }: Props) => {
  const [input, setInput] = useState(initialValue);
  const [predictions, setPredictions] = useState<any[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInput(initialValue);
  }, [initialValue]);

  const fetchPredictions = async (text: string) => {
    setInput(text);
    if (text.length < 2) {
      setPredictions([]);
      setShowPredictions(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_MAPS_API_KEY}&components=country:in`
      );
      setPredictions(response.data.predictions);
      setShowPredictions(true);
    } catch (err) {
      console.error('Place autocomplete failed', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = async (prediction: any) => {
    setInput(prediction.description);
    setShowPredictions(false);
    
    // Get Place Details (coordinates)
    try {
      const detailsRes = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${prediction.place_id}&fields=geometry,formatted_address&key=${GOOGLE_MAPS_API_KEY}`
      );
      const { location } = detailsRes.data.result.geometry;
      onSelect({
        address: prediction.description,
        latitude: location.lat,
        longitude: location.lng
      });
    } catch (err) {
      console.error('Place details failed', err);
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={input}
          onChangeText={fetchPredictions}
          placeholderTextColor={COLORS.textSecondary}
          onFocus={() => input.length >= 2 && setShowPredictions(true)}
        />
        {isLoading && <ActivityIndicator size="small" color={COLORS.primary} style={styles.loader} />}
      </View>

      {showPredictions && predictions.length > 0 && (
        <View style={styles.listContainer}>
          <FlatList
            data={predictions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
                <MapPin size={16} color={COLORS.textSecondary} style={styles.itemIcon} />
                <View style={styles.itemContent}>
                  <Typography variant="body" bold numberOfLines={1}>
                    {item.structured_formatting.main_text}
                  </Typography>
                  <Typography variant="caption" color={COLORS.textSecondary} numberOfLines={1}>
                    {item.structured_formatting.secondary_text}
                  </Typography>
                </View>
              </TouchableOpacity>
            )}
            keyboardShouldPersistTaps="handled"
            style={styles.list}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 1000,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  loader: {
    marginLeft: 8,
  },
  listContainer: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    maxHeight: 250,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  list: {
    borderRadius: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemIcon: {
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
});
