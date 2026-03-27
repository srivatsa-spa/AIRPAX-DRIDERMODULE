import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, MapPin, Car, CarFront, Crown, CreditCard, Tag, ArrowRight } from 'lucide-react-native';
import { Typography } from '../../components';
import { COLORS, SPACING, SHADOWS, RADII } from '../../theme';
import { bookingService } from '../../api/bookingService';

export const CategorySelectionScreen = ({ route, navigation }: any) => {
  const { pickup, destination, distance: initialDistance = 8.5 } = route.params || {};
  const [selectedId, setSelectedId] = useState('1');
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const distance = initialDistance; 

  useEffect(() => {
    const fetchFares = async () => {
      try {
        const res = await bookingService.estimateFare(pickup, destination);
        if (res.data?.categories) {
           setCategories(res.data.categories);
           setSelectedId(res.data.categories[0].id);
        }
      } catch (err: any) {
        console.error('Error fetching fares', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFares();
  }, []);

  const getIconForType = (type: string) => {
    switch(type) {
      case 'Mini': return Car;
      case 'Sedan': return CarFront;
      case 'SUV': return CarFront;
      case 'Premium': return Crown;
      default: return Car;
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <ChevronLeft color={COLORS.textPrimary} size={24} strokeWidth={2.5} />
      </TouchableOpacity>
      <Typography variant="h2" bold style={styles.headerTitle}>Choose Ride</Typography>
      <View style={styles.headerSpacer} />
    </View>
  );

  const renderLocationCard = () => (
    <View style={styles.locationCard}>
      <View style={styles.locationContent}>
        <View style={styles.routeContainer}>
          <View style={styles.pickupDot} />
          <View style={styles.line} />
          <MapPin color={COLORS.danger} size={14} fill={COLORS.danger} />
        </View>
        
        <View style={styles.addressInfo}>
          <View style={styles.addressRow}>
            <View style={{ flex: 1 }}>
              <Typography variant="caption" color={COLORS.textSecondary} bold>PICKUP</Typography>
              <Typography variant="body" bold style={styles.addressTitle} numberOfLines={1}>
                {pickup?.address || 'Current Location'}
              </Typography>
            </View>
            <View style={styles.distanceInfo}>
               <Typography variant="h3" color={COLORS.accent} bold>{distance} km</Typography>
               <Typography variant="caption" color={COLORS.textSecondary}>15-20 min ETA</Typography>
            </View>
          </View>
          
          <View style={styles.addressSectionDestination}>
            <Typography variant="caption" color={COLORS.textSecondary} bold>DESTINATION</Typography>
            <Typography variant="body" bold style={styles.addressTitle} numberOfLines={1}>
              {destination?.address || 'Selected Point'}
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );

  const renderCategoryItem = ({ item }: { item: any }) => {
    const isSelected = selectedId === item.id;
    const Icon = getIconForType(item.type);
    const finalPrice = item.fare?.total || 0;

    return (
      <TouchableOpacity 
        key={item.id}
        onPress={() => setSelectedId(item.id)}
        activeOpacity={0.8}
        style={[
          styles.categoryCard,
          isSelected && styles.selectedCategory
        ]}
      >
        <View style={[styles.iconCircle, isSelected && styles.selectedIconCircle]}>
          <Icon color={COLORS.accent} size={28} />
        </View>
        
        <View style={styles.categoryDetails}>
          <Typography variant="h3" bold style={styles.categoryName}>{item.name}</Typography>
          <Typography variant="caption" color={COLORS.textSecondary}>
            4 min away • {item.description}
          </Typography>
        </View>

        <View style={styles.priceContainer}>
          <Typography variant="h2" bold style={styles.price}>₹{finalPrice}</Typography>
          {item.badge && (
            <View style={styles.badgeContainer}>
                <Typography variant="caption" color={COLORS.white} bold style={styles.badgeText}>
                {item.badge}
                </Typography>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {renderHeader()}
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {renderLocationCard()}
        
        <Typography variant="caption" color={COLORS.textSecondary} bold style={styles.sectionTitle}>
            RIDE OPTIONS
        </Typography>
        
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.accent} style={styles.loader} />
        ) : (
          categories.map((item) => renderCategoryItem({ item }))
        )}

        <View style={styles.footerActions}>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionPill}>
              <View style={styles.pillIconContainer}>
                <CreditCard color={COLORS.accent} size={18} />
              </View>
              <View>
                <Typography variant="caption" color={COLORS.textSecondary} bold>PAYMENT</Typography>
                <Typography variant="caption" bold>UPI / Razorpay</Typography>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionPill}>
               <View style={styles.pillIconContainer}>
                <Tag color={COLORS.accent} size={18} />
              </View>
              <View>
                <Typography variant="caption" color={COLORS.textSecondary} bold>PROMO</Typography>
                <Typography variant="caption" bold>Apply coupon</Typography>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={() => {
              const selectedItem = categories.find(c => c.id === selectedId);
              navigation.navigate('ConfirmBooking', { 
                selectedCategory: selectedItem,
                pickup,
                destination,
                distance: distance
              });
            }}
          >
            <Typography color={COLORS.textPrimary} variant="h2" bold style={styles.confirmText}>
              Confirm Ride
            </Typography>
            <ArrowRight color={COLORS.textPrimary} size={24} strokeWidth={2.5} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.fareDetails}>
            <Typography variant="caption" color={COLORS.textSecondary} style={styles.fareDetailsText}>
              Fare details ⓘ
            </Typography>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 22,
    color: COLORS.textPrimary,
  },
  headerSpacer: {
    width: 48,
  },
  loader: {
    marginTop: 40,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: 40,
  },
  locationCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADII.large,
    padding: 24,
    marginTop: 20,
    ...SHADOWS.medium,
  },
  locationContent: {
    flexDirection: 'row',
  },
  routeContainer: {
    alignItems: 'center',
    width: 20,
    marginRight: 20,
    paddingVertical: 5,
  },
  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.accent,
    backgroundColor: COLORS.white,
  },
  line: {
    width: 2,
    height: 40,
    backgroundColor: COLORS.border,
    marginVertical: 4,
  },
  addressInfo: {
    flex: 1,
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  addressSectionDestination: {
    marginTop: 20,
  },
  addressTitle: {
    fontSize: 15, // Reduced from 18
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  distanceInfo: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 12,
  },
  sectionTitle: {
    marginTop: 32,
    marginBottom: 16,
    letterSpacing: 1,
    fontSize: 12,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: RADII.large,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    ...SHADOWS.light,
  },
  selectedCategory: {
    borderColor: COLORS.accent,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  selectedIconCircle: {
    backgroundColor: COLORS.accentLight,
  },
  categoryDetails: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16, // Reduced from 18
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    color: COLORS.textPrimary,
    fontSize: 18, // Slightly reduced
  },
  badgeContainer: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADII.small,
    marginTop: 8,
  },
  badgeText: {
    fontSize: 11,
    letterSpacing: 0.5,
  },
  footerActions: {
    marginTop: 10,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  actionPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: RADII.large,
    ...SHADOWS.light,
    gap: 10,
  },
  pillIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F7F9FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: COLORS.accent,
    height: 64,
    borderRadius: RADII.large,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  confirmText: {
    marginRight: 12,
    fontSize: 18, // Reduced from 20
  },
  fareDetails: {
    alignItems: 'center',
    marginTop: 16,
  },
  fareDetailsText: {
    textDecorationLine: 'underline',
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
