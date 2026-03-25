import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { ChevronLeft, HelpCircle, Phone, MessageSquare, Share2, Shield, Clock, MapPin, Car, Star } from 'lucide-react-native';
import { Typography } from '../../components';
import { COLORS, SPACING, SHADOWS } from '../../theme';
import { grayscaleMapStyle } from './TrackingScreen';

export const RideInProgressScreen = ({ navigation }: any) => {
  // Dummy data matching the design
  const trip = {
    eta: 12,
    distance: 8.4,
    arrivalTime: '7:42 PM',
    destination: '72, Silicon Valley Towers, Financial District',
    driver: {
        name: 'Rahul S.',
        rating: '4.9',
        car: 'Toyota Innova',
        plate: 'TS09 AB 1234',
        color: 'White'
    }
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('PaymentDue');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={grayscaleMapStyle}
        initialRegion={{
          latitude: 37.78,
          longitude: -122.42,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Polyline
          coordinates={[
            { latitude: 37.8, longitude: -122.45 },
            { latitude: 37.76, longitude: -122.40 },
          ]}
          strokeColor={COLORS.accent}
          strokeWidth={4}
        />
        <Marker coordinate={{ latitude: 37.77, longitude: -122.41 }}>
            <View style={styles.driverMarker}>
                <Car color={COLORS.white} size={14} fill={COLORS.primary} />
            </View>
        </Marker>
      </MapView>

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconButton}>
                <ChevronLeft color={COLORS.primary} size={22} strokeWidth={2.5} />
            </TouchableOpacity>
            
            <View style={styles.statusPill}>
                <Typography variant="caption" bold style={styles.statusPillText}>ON YOUR TRIP</Typography>
            </View>

            <TouchableOpacity style={styles.headerIconButton}>
                <HelpCircle color={COLORS.primary} size={20} strokeWidth={2.5} />
            </TouchableOpacity>
        </View>

        <View style={styles.etaBannerContainer}>
            <View style={styles.etaBanner}>
                <View style={styles.etaValue}>
                    <Clock color={COLORS.accent} size={18} strokeWidth={2.5} style={styles.bannerIcon} />
                    <Typography variant="caption" bold style={styles.bannerText}>
                        {trip.eta} min <Typography variant="caption" color={COLORS.textSecondary}>to destination</Typography>
                    </Typography>
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.distanceValue}>
                    <MapPin color={COLORS.accent} size={18} strokeWidth={2.5} style={styles.bannerIcon} />
                    <Typography variant="caption" bold style={styles.bannerText}>
                        {trip.distance} km <Typography variant="caption" color={COLORS.textSecondary}>left</Typography>
                    </Typography>
                </View>
            </View>
        </View>

        <View style={styles.bottomContent}>
          <View style={styles.driverCard}>
            <View style={styles.driverSection}>
                <View style={styles.avatarBorder}>
                    <Image 
                        source={{ uri: 'https://i.pravatar.cc/150?u=rahul' }} 
                        style={styles.avatar}
                    />
                </View>
                <View style={styles.driverMainInfo}>
                    <Typography variant="h3" bold color={COLORS.white}>
                        {trip.driver.name}
                    </Typography>
                    <Typography variant="caption" color="#9CA3AF">
                        {trip.driver.car} • {trip.driver.plate}
                    </Typography>
                </View>
                <View style={styles.ratingBadge}>
                    <Typography variant="caption" bold color={COLORS.white} style={styles.ratingText}>
                        {trip.driver.rating} <Star color={COLORS.white} fill={COLORS.white} size={8} />
                    </Typography>
                </View>
            </View>

            <View style={styles.actionRow}>
                <TouchableOpacity style={[styles.actionBtn, styles.callBtn]}>
                    <Phone color={COLORS.white} size={18} strokeWidth={2.5} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                    <MessageSquare color={COLORS.primary} size={18} strokeWidth={2.5} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                    <Share2 color={COLORS.primary} size={18} strokeWidth={2.5} />
                </TouchableOpacity>
            </View>
          </View>

          <View style={styles.statusSheet}>
            <View style={styles.headerRow}>
                <View style={styles.destinationBox}>
                    <Typography variant="caption" bold color={COLORS.textSecondary}>DROPPING OFF AT</Typography>
                    <Typography variant="h3" bold numberOfLines={2} style={styles.destinationAddress}>
                        {trip.destination}
                    </Typography>
                </View>
                <View style={styles.arrivalBox}>
                    <Typography variant="h2" bold color={COLORS.accent} style={styles.arrivalTime}>{trip.arrivalTime}</Typography>
                    <Typography variant="caption" bold color={COLORS.textSecondary}>EST. ARRIVAL</Typography>
                </View>
            </View>

            <View style={styles.progressSection}>
                <View style={styles.trackContainer}>
                    <View style={styles.track} />
                    <View style={[styles.activeTrack, styles.progressWidth]} />
                </View>
                <View style={styles.labelRow}>
                    <Typography variant="caption" bold color={COLORS.textSecondary}>PICKUP</Typography>
                    <Typography variant="caption" bold color={COLORS.accent}>ON THE WAY</Typography>
                    <Typography variant="caption" bold color={COLORS.textSecondary}>DESTINATION</Typography>
                </View>
            </View>

            <View style={styles.safetyBox}>
                <View style={styles.safetyMain}>
                    <View style={styles.shieldBackground}>
                        <Shield color={COLORS.accent} size={20} strokeWidth={2.5} />
                    </View>
                    <View style={styles.safetyInfo}>
                        <Typography variant="body" bold style={styles.safetyTitle}>Trip monitored for safety</Typography>
                        <Typography variant="caption" color={COLORS.textSecondary}>AIRPAX Shield is active</Typography>
                    </View>
                </View>
                <TouchableOpacity style={styles.detailsBtn}>
                    <Typography variant="caption" bold color={COLORS.primary}>DETAILS</Typography>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};


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
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  statusPill: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    ...SHADOWS.light,
  },
  statusPillText: {
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
  },
  etaBannerContainer: {
    paddingHorizontal: SPACING.lg,
    marginTop: 20,
  },
  etaBanner: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  etaValue: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  distanceValue: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerIcon: {
    marginRight: 8,
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.border,
  },
  bannerText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  driverMarker: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  bottomContent: {
    width: '100%',
  },
  driverCard: {
    backgroundColor: '#1E293B',
    margin: SPACING.lg,
    padding: 16,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...SHADOWS.medium,
  },
  driverSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarBorder: {
    width: 52,
    height: 52,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: COLORS.accent,
    padding: 2,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
  driverMainInfo: {
    marginLeft: 12,
  },
  ratingBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  ratingText: {
    fontSize: 10,
    color: COLORS.white,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callBtn: {
    backgroundColor: COLORS.accent,
  },
  statusSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: SPACING.lg,
    paddingTop: 12,
    paddingBottom: SPACING.xl,
    ...SHADOWS.medium,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: SPACING.md,
  },
  destinationBox: {
    flex: 1,
    marginRight: 16,
  },
  destinationAddress: {
    marginTop: 8,
    color: COLORS.textPrimary,
  },
  arrivalBox: {
    alignItems: 'flex-end',
  },
  arrivalTime: {
    marginBottom: 4,
  },
  progressSection: {
    marginBottom: 32,
    paddingHorizontal: SPACING.md,
  },
  trackContainer: {
    height: 6,
    backgroundColor: COLORS.background,
    borderRadius: 3,
    marginBottom: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  track: {
    ...StyleSheet.absoluteFillObject,
  },
  activeTrack: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 3,
  },
  progressWidth: {
    width: '60%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  safetyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  safetyMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shieldBackground: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    ...SHADOWS.light,
  },
  safetyInfo: {},
  safetyTitle: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  detailsBtn: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    ...SHADOWS.light,
  },
});
