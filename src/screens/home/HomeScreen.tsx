import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { HomeHeader, RideSelectionCard } from '../../components';
import { COLORS, SHADOWS, RADII } from '../../theme';

import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 28.6139,
          longitude: 77.2090,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Current Location Marker */}
        <Marker coordinate={{ latitude: 28.6139, longitude: 77.2090 }}>
          <View style={styles.locationMarkerContainer}>
            <View style={styles.locationMarkerPulse} />
            <View style={styles.locationMarkerCenter} />
          </View>
        </Marker>

        {/* Scattered Car Markers */}
        <CarMarker coordinate={{ latitude: 28.615, longitude: 77.212 }} />
        <CarMarker coordinate={{ latitude: 28.611, longitude: 77.206 }} />
        <CarMarker coordinate={{ latitude: 28.618, longitude: 77.215 }} />
      </MapView>
      
      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <HomeHeader 
          onProfilePress={() => navigation.navigate('Profile')} 
          onNotificationPress={() => {}}
        />
        
        <View style={styles.bottomContainer}>
          <RideSelectionCard />
        </View>
      </SafeAreaView>
    </View>
  );
};

import { Car } from 'lucide-react-native';

const CarMarker = ({ coordinate }: { coordinate: { latitude: number; longitude: number } }) => (
  <Marker coordinate={coordinate}>
    <View style={styles.carMarker}>
      <Car color={COLORS.primary} size={18} fill={COLORS.primary} strokeWidth={0.5} />
    </View>
  </Marker>
);

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
  bottomContainer: {
    width: '100%',
    paddingBottom: 90, // Spacing for TabNavigator (80 height + margin)
  },
  locationMarkerContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationMarkerPulse: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.accent,
    opacity: 0.15,
    position: 'absolute',
  },
  locationMarkerCenter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.accent,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    ...SHADOWS.medium,
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
});
