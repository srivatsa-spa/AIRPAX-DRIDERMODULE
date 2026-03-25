import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { ChevronLeft, HelpCircle, Clock, Star, Phone, MessageSquare, Share2, Shield, ChevronRight, Car } from 'lucide-react-native';
import { Typography } from '../../components';
import { COLORS, SPACING, SHADOWS, RADII } from '../../theme';
import { bookingService } from '../../api/bookingService';

export const TrackingScreen = ({ route, navigation }: any) => {
  const { bookingId } = route.params || {};
  const [eta] = useState(3);
  const [status, setStatus] = useState('REQUESTED');
  
  // Dummy driver data matching the image (Would be replaced by live data in production)
  const driver = {
    name: 'Michael S.',
    rating: '4.9',
    car: 'Toyota Innova',
    color: 'White',
    plate: 'TS09 AB 1234',
    distance: '1.2'
  };

  React.useEffect(() => {
    if (!bookingId) {
      // Fallback to mock behavior if no bookingId
      const timer = setTimeout(() => navigation.navigate('RideInProgress'), 5000);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(async () => {
      try {
        const res = await bookingService.getBookingDetails(bookingId);
        const liveStatus = res.data.booking.status;
        setStatus(liveStatus);
        
        if (liveStatus === 'ACCEPTED' || liveStatus === 'IN_PROGRESS') {
           clearInterval(interval);
           navigation.navigate('RideInProgress', { bookingId });
        }
      } catch (err) {
        console.log('Polling status error', err);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [bookingId, navigation]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I'm on my way with ${driver.name} in a ${driver.car}. Plate: ${driver.plate}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={grayscaleMapStyle}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Polyline
          coordinates={[
            { latitude: 37.78825, longitude: -122.4324 },
            { latitude: 37.75, longitude: -122.41 },
          ]}
          strokeColor={COLORS.primary}
          strokeWidth={4}
          lineDashPattern={[5, 10]}
        />
        <Marker coordinate={{ latitude: 37.78825, longitude: -122.4324 }}>
            <View style={styles.destinationMarker}>
                <View style={styles.destinationMarkerInner} />
            </View>
        </Marker>
        <Marker coordinate={{ latitude: 37.75, longitude: -122.41 }}>
            <View style={styles.driverMarker}>
                <Car color={COLORS.primary} size={18} fill={COLORS.primary} strokeWidth={0.5} />
            </View>
        </Marker>
      </MapView>

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconButton}>
                <ChevronLeft color={COLORS.textPrimary} size={24} strokeWidth={2.5} />
            </TouchableOpacity>
            
            <View style={styles.headerTitleContainer}>
                <Typography variant="caption" bold color={COLORS.accent} style={styles.rideTypeLabel}>AIRPAX RIDE</Typography>
                <Typography variant="body" bold style={styles.rideStatusLabel}>
                    {status === 'REQUESTED' ? 'Finding your Driver...' : 'Driver is arriving'}
                </Typography>
            </View>

            <TouchableOpacity style={styles.headerIconButton}>
                <HelpCircle color={COLORS.textPrimary} size={22} strokeWidth={2.5} />
            </TouchableOpacity>
        </View>

        <View style={styles.etaCardContainer}>
            <View style={styles.etaPill}>
                <View style={styles.clockBackground}>
                    <Clock color={COLORS.accent} size={24} strokeWidth={2.5} />
                </View>
                <View style={styles.etaInfo}>
                    <Typography variant="h3" bold style={styles.etaTitle}>Michael is on the way</Typography>
                    <Typography variant="caption" color={COLORS.textSecondary}>
                        Expected in <Typography variant="caption" bold color={COLORS.accent}>{eta} minutes</Typography>
                    </Typography>
                </View>
            </View>
        </View>

        <View style={styles.bottomSheet}>
          <View style={styles.dragHandle} />
          
          <View style={styles.driverSection}>
            <View style={styles.profileColumn}>
                <View style={styles.avatarContainer}>
                    <Image 
                        source={{ uri: 'https://i.pravatar.cc/150?u=driver1' }} 
                        style={styles.avatar}
                    />
                    <View style={styles.ratingBadge}>
                        <View style={styles.ratingRow}>
                          <Typography variant="caption" bold color={COLORS.white} style={styles.ratingText}>{driver.rating}</Typography>
                          <Star color="#00D67D" size={8} fill="#00D67D" />
                        </View>
                    </View>
                </View>
            </View>
            
            <View style={styles.infoColumn}>
                <Typography variant="h2" bold style={styles.driverName}>{driver.name}</Typography>
                <Typography variant="caption" color={COLORS.textSecondary} bold style={styles.carDetails}>
                    {driver.car} • {driver.color}
                </Typography>
                <View style={styles.plateBadge}>
                    <Typography variant="caption" bold color={COLORS.primary} style={styles.plateText}>{driver.plate}</Typography>
                </View>
            </View>

            <View style={styles.distanceColumn}>
                <Typography variant="caption" bold color={COLORS.textSecondary} style={styles.distanceLabel}>DISTANCE</Typography>
                <Typography variant="h2" bold style={styles.distanceValue}>
                    {driver.distance} <Typography variant="caption" bold color={COLORS.textSecondary}>km</Typography>
                </Typography>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionItem}>
                <View style={styles.actionCircle}>
                    <Phone color={COLORS.primary} size={22} strokeWidth={2.5} />
                </View>
                <Typography variant="caption" bold color={COLORS.textPrimary}>CALL</Typography>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem}>
                <View style={styles.actionCircle}>
                    <MessageSquare color={COLORS.primary} size={22} strokeWidth={2.5} />
                </View>
                <Typography variant="caption" bold color={COLORS.textPrimary}>MESSAGE</Typography>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionItem} onPress={handleShare}>
                <View style={styles.actionCircle}>
                    <Share2 color={COLORS.primary} size={22} strokeWidth={2.5} />
                </View>
                <Typography variant="caption" bold color={COLORS.textPrimary}>SHARE</Typography>
            </TouchableOpacity>
          </View>

          <View style={styles.safetyBanner}>
            <View style={styles.safetyContent}>
                <Shield color={COLORS.accent} size={20} strokeWidth={2.5} />
                <Typography variant="caption" bold style={styles.safetyText}>
                    Your ride is secure and tracked
                </Typography>
            </View>
            <ChevronRight color={COLORS.textSecondary} size={18} />
          </View>

          <TouchableOpacity style={styles.cancelRideBtn} onPress={() => navigation.navigate('MainTabs')}>
            <Typography variant="caption" bold color={COLORS.danger} style={styles.cancelRideText}>CANCEL RIDE</Typography>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

// Grayscale map style 
export const grayscaleMapStyle = [
  { "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }] },
  { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#a0a0a0" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
  { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#e0e0e0" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#d0d0d0" }] }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  headerIconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  headerTitleContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: RADII.round,
    ...SHADOWS.light,
  },
  rideTypeLabel: {
    fontSize: 10,
    letterSpacing: 1.5,
  },
  rideStatusLabel: {
    fontSize: 15,
    marginTop: 2,
    color: COLORS.textPrimary,
  },
  etaCardContainer: {
    paddingHorizontal: SPACING.xl,
    marginTop: 20,
  },
  etaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: RADII.large,
    ...SHADOWS.heavy,
  },
  clockBackground: {
    width: 56,
    height: 56,
    borderRadius: RADII.medium,
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  etaInfo: {
    flex: 1,
  },
  etaTitle: {
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  destinationMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  destinationMarkerInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.accent,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  driverMarker: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  bottomSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: RADII.xlarge,
    borderTopRightRadius: RADII.xlarge,
    paddingHorizontal: SPACING.xl,
    paddingTop: 12,
    paddingBottom: 40,
    ...SHADOWS.heavy,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 24,
  },
  driverSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileColumn: {
    width: 72,
  },
  avatarContainer: {
    width: 72,
    height: 72,
    borderRadius: RADII.medium,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F1F5F9',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(10, 46, 91, 0.9)',
    paddingVertical: 4,
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 10,
  },
  infoColumn: {
    flex: 1,
    marginLeft: 16,
  },
  driverName: {
    color: COLORS.textPrimary,
  },
  carDetails: {
    marginTop: 4,
    letterSpacing: 0.5,
  },
  plateBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADII.small,
    alignSelf: 'flex-start',
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  plateText: {
    fontSize: 13,
  },
  distanceColumn: {
    alignItems: 'flex-end',
  },
  distanceLabel: {
    fontSize: 10,
    letterSpacing: 1,
  },
  distanceValue: {
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionItem: {
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  actionCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  safetyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: RADII.large,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  safetyContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  safetyText: {
    color: COLORS.textPrimary,
    fontSize: 13,
  },
  cancelRideBtn: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelRideText: {
    letterSpacing: 2,
    fontSize: 11,
  },
});
