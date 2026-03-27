import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Easing, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import { ChevronLeft, Share2, X, MapPin, Car } from 'lucide-react-native';
import { Typography } from '../../components';
import { COLORS, SPACING, SHADOWS, RADII } from '../../theme';

import { initiateSocketConnection, disconnectSocket, joinBookingRoom, getSocket } from '../../utils/socket';

export const RideSearchingScreen = ({ navigation, route }: any) => {
  const { bookingId, pickup } = route.params || {};
  const pickupLat = pickup?.latitude || 28.6139;
  const pickupLng = pickup?.longitude || 77.2090;

  const pulseAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Socket Setup
    initiateSocketConnection();
    
    if (bookingId) {
      joinBookingRoom(bookingId);
      
      const socket = getSocket();
      if (socket) {
        socket.on('status-update', (data) => {
          console.log('Status update received:', data);
          if (data.status === 'ASSIGNED' || data.status === 'ACCEPTED') {
            navigation.navigate('Tracking', { bookingId, driverInfo: data.driverInfo });
          }
        });
      }
    }

    // Pulse animation for map marker
    Animated.loop(
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      })
    ).start();

    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 10000, // Longer search time for realism
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    return () => {
    };
  }, [navigation, bookingId, pulseAnim, progressAnim]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={mapStyle}
        initialRegion={{
          latitude: pickupLat,
          longitude: pickupLng,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Circle
          center={{ latitude: pickupLat, longitude: pickupLng }}
          radius={500}
          fillColor="rgba(10, 46, 91, 0.05)"
          strokeColor="rgba(10, 46, 91, 0.1)"
          strokeWidth={1}
        />
        <Marker coordinate={{ latitude: pickupLat, longitude: pickupLng }}>
          <View style={styles.markerContainer}>
            <Animated.View 
              style={[
                styles.pulseRing,
                {
                  transform: [{ scale: pulseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 3]
                  }) }],
                  opacity: pulseAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 0]
                  })
                }
              ]}
            />
            <View style={styles.centerMarker}>
               <View style={styles.centerDot} />
            </View>
          </View>
        </Marker>

        {/* Dummy nearby car markers with new styling */}
        <Marker coordinate={{ latitude: 37.778, longitude: -122.422 }}>
            <View style={styles.carMarker}>
                <Car color={COLORS.primary} size={16} fill={COLORS.primary} strokeWidth={0.5} />
            </View>
        </Marker>
        <Marker coordinate={{ latitude: 37.772, longitude: -122.415 }}>
            <View style={styles.carMarker}>
                <Car color={COLORS.primary} size={16} fill={COLORS.primary} strokeWidth={0.5} />
            </View>
        </Marker>
      </MapView>

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
             <ChevronLeft color={COLORS.textPrimary} size={24} strokeWidth={2.5} />
          </TouchableOpacity>
          <Typography variant="h2" bold style={styles.headerTitle}>Searching Driver</Typography>
        </View>

        <View style={styles.bottomContent}>
          <View style={styles.statusCard}>
            <View style={styles.dragHandle} />
            
            <View style={styles.cardHeader}>
              <View>
                <Typography variant="h2" bold style={styles.rideType}>AIRPAX Mini</Typography>
                <View style={styles.statusRow}>
                  <View style={styles.statusDot} />
                  <Typography color={COLORS.primary} bold style={styles.statusText}>Connecting to drivers...</Typography>
                </View>
              </View>
              <View style={styles.arrivalBadge}>
                <Typography variant="caption" bold color={COLORS.textSecondary} style={styles.arrivalLabel}>ARRIVAL</Typography>
                <Typography variant="h3" bold style={styles.arrivalTime}>2-4 min</Typography>
              </View>
            </View>

            <View style={styles.progressContainer}>
              <Animated.View 
                style={[
                  styles.progressBar, 
                  { 
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%']
                    }) 
                  }
                ]} 
              />
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
                <X color={COLORS.danger} size={20} strokeWidth={3} />
                <Typography variant="body" bold color={COLORS.danger} style={styles.btnLabel}>Cancel Search</Typography>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.shareButton}>
                <Share2 color={COLORS.primary} size={22} strokeWidth={2.5} />
              </TouchableOpacity>
            </View>

            <View style={styles.pickupCard}>
                <View style={styles.pickupIconContainer}>
                    <MapPin color={COLORS.primary} size={22} strokeWidth={2} />
                </View>
                <View style={styles.pickupInfo}>
                    <Typography variant="caption" color={COLORS.textSecondary} bold>PICKUP FROM</Typography>
                    <Typography numberOfLines={1} variant="body" bold style={styles.pickupAddress}>Current Location</Typography>
                </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const mapStyle = [
  { "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }] },
  { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }] }
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
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    ...SHADOWS.medium,
  },
  headerTitle: {
    color: COLORS.textPrimary,
  },
  markerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseRing: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
  },
  centerMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  centerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  carMarker: {
    width: 36,
    height: 36,
    borderRadius: RADII.medium,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bottomContent: {
    width: '100%',
  },
  statusCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rideType: {
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
    marginRight: 10,
  },
  statusText: {
    fontSize: 15,
  },
  arrivalBadge: {
    backgroundColor: '#F7F9FC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: RADII.large,
    alignItems: 'center',
  },
  arrivalLabel: {
    fontSize: 10,
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  arrivalTime: {
    color: COLORS.primary,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 24,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  cancelBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.danger,
    height: 64,
    borderRadius: RADII.large,
    gap: 10,
  },
  btnLabel: {
    fontSize: 18,
  },
  shareButton: {
    width: 64,
    height: 64,
    borderRadius: RADII.large,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderRadius: RADII.large,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pickupIconContainer: {
    width: 48,
    height: 48,
    borderRadius: RADII.medium,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    ...SHADOWS.light,
  },
  pickupInfo: {
    flex: 1,
  },
  pickupAddress: {
    color: COLORS.textPrimary,
    marginTop: 4,
  },
});
