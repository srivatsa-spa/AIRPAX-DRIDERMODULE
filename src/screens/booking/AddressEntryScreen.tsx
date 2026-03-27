import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MapPin, Clock } from 'lucide-react-native';
import { Typography, GoogleAutocomplete } from '../../components';
import { COLORS, SPACING, SHADOWS } from '../../theme';
import { useLocation } from '../../hooks/useLocation';

const RECENT_LOCATIONS = [
  { id: '1', name: 'India Gate', address: 'New Delhi, Delhi', latitude: 28.6129, longitude: 77.2295 },
  { id: '2', name: 'DLF Cyber City', address: 'Gurugram, Haryana', latitude: 28.4951, longitude: 77.0877 },
  { id: '3', name: 'Select Citywalk', address: 'Saket, New Delhi', latitude: 28.5288, longitude: 77.2183 },
];

const LocationItem = ({ item, onPress }: { item: any, onPress: (item: any) => void }) => (
  <TouchableOpacity 
    style={styles.locationItem}
    onPress={() => onPress(item)}
    activeOpacity={0.6}
  >
    <View style={styles.iconCircle}>
      <MapPin color={COLORS.textSecondary} size={16} />
    </View>
    <View style={styles.details}>
      <Typography variant="body" bold style={styles.placeName}>{item.name}</Typography>
      <Typography variant="caption" color={COLORS.textSecondary}>{item.address}</Typography>
    </View>
  </TouchableOpacity>
);

export const AddressEntryScreen = ({ navigation }: any) => {
  const { location, address, isLoading: isLocLoading } = useLocation();
  const [pickup, setPickup] = useState({ address: 'Current Location', latitude: 0, longitude: 0 });
  const [focusedField, setFocusedField] = useState<'pickup' | 'destination' | null>(null);

  useEffect(() => {
    if (address && address !== 'Fetching location...' && location) {
      setPickup({ 
        address, 
        latitude: location.latitude, 
        longitude: location.longitude 
      });
    }
  }, [address, location]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; 
    return parseFloat(d.toFixed(1));
  };

  const handleSelectLocation = (location: any) => {
    let dist = 8.5; // Fallback
    const hasPickup = pickup && typeof pickup.latitude === 'number';
    const hasDest = location && typeof location.latitude === 'number';

    if (hasPickup && hasDest) {
      dist = calculateDistance(pickup.latitude, pickup.longitude, location.latitude, location.longitude);
      // Haversine gives straight line distance. For road distance, we add a 1.25x buffer if not using Google Distance Matrix
      dist = parseFloat((dist * 1.25).toFixed(1));
    }

    navigation.navigate('CategorySelection', { 
      pickup, 
      destination: location,
      distance: dist
    });
  };

  const handlePickupSelect = (location: any) => {
    setPickup(location);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft color={COLORS.primary} size={24} strokeWidth={2.5} />
        </TouchableOpacity>
        <Typography variant="h2" style={styles.headerTitle}>Plan your ride</Typography>
      </View>

      <View style={styles.inputCard}>
        <View style={styles.inputWrapper}>
          <View style={styles.indicatorContainer}>
            <View style={styles.pickupDot} />
            <View style={styles.line} />
            <MapPin color={COLORS.primary} size={16} strokeWidth={2.5} />
          </View>
          <View style={styles.inputs}>
            <View style={[styles.fieldWrapper, { zIndex: focusedField === 'pickup' ? 100 : 1 }]}>
              <GoogleAutocomplete 
                placeholder="Enter pickup point"
                initialValue={pickup.address}
                onSelect={handlePickupSelect}
                onFocus={() => setFocusedField('pickup')}
                style={styles.field}
              />
              {isLocLoading && <ActivityIndicator size="small" color={COLORS.accent} style={styles.fieldLoader} />}
            </View>
            <View style={styles.fieldDivider} />
            <View style={[styles.fieldWrapper, { zIndex: focusedField === 'destination' ? 100 : 1 }]}>
              <GoogleAutocomplete 
                placeholder="Where to?"
                onSelect={handleSelectLocation}
                onFocus={() => setFocusedField('destination')}
                style={styles.field}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.sectionHeader}>
            <Clock color={COLORS.textSecondary} size={14} />
            <Typography variant="body" bold style={styles.sectionTitle}>Recent Places</Typography>
        </View>
        
        <FlatList
          data={RECENT_LOCATIONS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LocationItem item={item} onPress={handleSelectLocation} />
          )}
          ItemSeparatorComponent={ListDivider}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  inputCard: {
    marginHorizontal: SPACING.lg,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.light,
    zIndex: 5, // Ensure it's above the list but handles its own absolute children
  },
  inputWrapper: {
    flexDirection: 'row',
  },
  indicatorContainer: {
    width: 20,
    alignItems: 'center',
    paddingVertical: 10,
    marginRight: 12,
  },
  pickupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
  },
  line: {
    flex: 1,
    width: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  inputs: {
    flex: 1,
  },
  field: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
    height: 40,
  },
  fieldDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  fieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldLoader: {
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  placeName: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
});

const ListDivider = () => <View style={styles.divider} />;

export default AddressEntryScreen;
