import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Bell } from 'lucide-react-native';

import { Typography } from '../Typography';
import { COLORS, SPACING, SHADOWS, RADII } from '../../theme';

export const HomeHeader = ({ onProfilePress, onNotificationPress }: { 
  onProfilePress?: () => void; 
  onNotificationPress?: () => void;
}) => {
  return (
    <View style={styles.container}>
      {/* Left: Profile Avatar */}
      <TouchableOpacity onPress={onProfilePress} style={styles.profileButton}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/100?u=rider' }} 
            style={styles.avatar} 
          />
        </View>
      </TouchableOpacity>

      {/* Center: Current Location Pill */}
      <View style={styles.locationPill}>
        <View style={styles.dot} />
        <Typography variant="caption" bold style={styles.locationText}>
          CURRENT LOCATION
        </Typography>
      </View>

      {/* Right: Notification Icon */}
      <TouchableOpacity onPress={onNotificationPress} style={styles.notificationButton}>
        <View style={styles.iconContainer}>
            <Bell color={COLORS.primary} size={22} strokeWidth={2} />
            <View style={styles.badge} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    backgroundColor: 'transparent',
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    ...SHADOWS.light,
  },
  avatarContainer: {
    width: '100%',
    height: '100%',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: RADII.round,
    ...SHADOWS.light,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary, // Changed to Navy for modern look
    marginRight: 10,
  },
  locationText: {
    color: COLORS.primary,
    fontSize: 10,
    letterSpacing: 1,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.danger,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
});
