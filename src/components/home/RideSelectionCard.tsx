import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MapPin, Home, Briefcase, Star, ArrowRight } from 'lucide-react-native';

import { Typography } from '../Typography';
import { COLORS, SPACING, SHADOWS, RADII } from '../../theme';

export const RideSelectionCard = () => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    navigation.navigate('AddressEntry');
  };

  return (
    <View style={styles.card}>
       <View style={styles.dragHandle} />
       
      {/* Pickup Input */}
      <TouchableOpacity 
        style={styles.inputContainer} 
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.pickupDot} />
        <View style={styles.textContainer}>
          <Typography color={COLORS.textSecondary} style={styles.inputText}>
            Enter pickup location
          </Typography>
        </View>
      </TouchableOpacity>

      {/* Destination Input */}
      <TouchableOpacity 
        style={[styles.inputContainer, styles.destinationInput]} 
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.destinationIcon}>
          <MapPin color={COLORS.primary} size={22} strokeWidth={2} />
        </View>
        <View style={styles.textContainer}>
          <Typography bold style={styles.inputSubtext}>
            Where to?
          </Typography>
        </View>
      </TouchableOpacity>

      {/* Quick Links */}
      <View style={styles.quickLinks}>
        <TouchableOpacity style={styles.quickLink} onPress={handlePress}>
           <Home color={COLORS.textSecondary} size={16} />
           <Typography variant="body" bold style={styles.linkText}>Home</Typography>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickLink} onPress={handlePress}>
           <Briefcase color={COLORS.textSecondary} size={16} />
           <Typography variant="body" bold style={styles.linkText}>Work</Typography>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickLink} onPress={handlePress}>
           <Star color={COLORS.textSecondary} size={16} />
           <Typography variant="body" bold style={styles.linkText}>Saved</Typography>
        </TouchableOpacity>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity 
        style={styles.confirmButton} 
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Typography variant="h3" color={COLORS.white} bold style={styles.confirmText}>
          Confirm Pickup
        </Typography>
        <ArrowRight color={COLORS.white} size={22} strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.xl,
    paddingTop: 12,
    paddingBottom: 40,
    borderTopLeftRadius: RADII.xlarge,
    borderTopRightRadius: RADII.xlarge,
    ...SHADOWS.heavy,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: RADII.round,
    alignSelf: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    padding: 18,
    borderRadius: RADII.large,
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
  },
  pickupDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginRight: 16,
  },
  destinationInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  destinationIcon: {
    marginRight: 12,
  },
  inputText: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  inputSubtext: {
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  quickLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 24,
    gap: 12,
  },
  quickLink: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: RADII.large,
    borderWidth: 1,
    borderColor: COLORS.border,
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  linkText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    height: 64,
    borderRadius: RADII.large,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  confirmText: {
    marginRight: 10,
    letterSpacing: 0.5,
  },
});
