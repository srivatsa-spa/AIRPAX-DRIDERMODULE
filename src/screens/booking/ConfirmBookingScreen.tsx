import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Typography, Button, Card } from '../../components';
import { COLORS, SPACING } from '../../theme';
import { bookingService } from '../../api/bookingService';

export const ConfirmBookingScreen = ({ route, navigation }: any) => {
  const { selectedCategory, pickup, destination, distance = 8.5 } = route.params || {};
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      
      const finalPickup = {
        ...pickup,
        latitude: pickup?.latitude,
        longitude: pickup?.longitude
      };
      
      const finalDestination = {
        ...destination,
        latitude: destination?.latitude,
        longitude: destination?.longitude
      };

      const res = await bookingService.createBooking(
        finalPickup,
        finalDestination,
        distance,
        selectedCategory?.type || 'Mini'
      );
      
      // Successfully created ride, pass bookingId to searching screen
      navigation.navigate('RideSearching', { 
        bookingId: res.data.booking._id,
        pickup,
        destination,
        selectedCategory
      });
    } catch (err: any) {
      console.error('Booking failed', err);
      Alert.alert('Error', 'Failed to dispatch ride to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: pickup?.latitude || 28.6139,
          longitude: pickup?.longitude || 77.2090,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
      >
        {pickup && (
          <Marker 
            coordinate={{ latitude: pickup.latitude, longitude: pickup.longitude }} 
            title="Pickup"
          />
        )}
        {destination && (
          <Marker 
            coordinate={{ latitude: destination.latitude, longitude: destination.longitude }} 
            title="Destination"
            pinColor={COLORS.accent}
          />
        )}
      </MapView>

      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <View style={styles.header}>
          <Button 
            label="Back" 
            variant="secondary" 
            outline 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          />
        </View>

        <Card style={styles.confirmCard}>
          <Typography variant="h2" style={styles.title}>Confirm Pickup</Typography>
          <View style={styles.locationRow}>
            <View style={styles.dot} />
            <Typography variant="body" numberOfLines={1}>
              {pickup?.address || 'Pickup Location'}
            </Typography>
          </View>
          
          <View style={styles.priceRow}>
             <Typography variant="body" color={COLORS.textSecondary} bold>
               {selectedCategory?.name || 'AIRPAX Mini'}
             </Typography>
             <Typography variant="h3" color={COLORS.accent} bold>
               ₹{selectedCategory?.fare?.total || 145}
             </Typography>
          </View>
          
          <Button 
            label="CONFIRM PICKUP" 
            onPress={handleConfirm}
            loading={loading}
            style={styles.confirmButton}
          />
        </Card>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    padding: SPACING.lg,
  },
  backButton: {
    width: 80,
    backgroundColor: COLORS.white,
  },
  confirmCard: {
    margin: SPACING.lg,
    padding: SPACING.xl,
    backgroundColor: COLORS.white,
  },
  title: {
    marginBottom: SPACING.md,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
    marginRight: SPACING.sm,
  },
  eta: {
    marginBottom: SPACING.xl,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xl,
    marginTop: SPACING.sm
  },
  confirmButton: {
    width: '100%',
  },
});
