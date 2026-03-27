import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, SlidersHorizontal, Car, FileText, Circle, MapPin, CreditCard, Clock } from 'lucide-react-native';
import { Typography } from '../../components';
import { COLORS, SPACING, SHADOWS, RADII } from '../../theme';
import { bookingService } from '../../api/bookingService';

export const RideHistoryScreen = ({ navigation }: any) => {
  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({ count: 0, spent: 0 });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await bookingService.getHistory();
      if (response.data.success) {
        setRides(response.data.bookings);
        const spent = response.data.bookings.reduce((acc: number, ride: any) => 
          ride.status === 'COMPLETED' ? acc + (ride.fare?.total || 0) : acc, 0
        );
        setTotals({ count: response.data.bookings.length, spent });
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderRideItem = ({ item }: { item: any }) => (
    <View style={styles.rideCard}>
      <View style={styles.cardHeader}>
        <View style={styles.dateTimeContainer}>
          <Typography variant="body" bold style={styles.dateText}>
            {new Date(item.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
          </Typography>
          <View style={styles.timeRow}>
            <Clock size={12} color={COLORS.textSecondary} />
            <Typography variant="caption" color={COLORS.textSecondary} bold style={{ marginLeft: 4 }}>
                {new Date(item.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </Typography>
          </View>
        </View>
        <View style={[
          styles.statusBadge, 
          item.status === 'COMPLETED' ? styles.statusCompleted : 
          item.status === 'CANCELLED' ? styles.statusCancelled : styles.statusProgress
        ]}>
          <Typography variant="caption" bold color={
            item.status === 'COMPLETED' ? COLORS.success : 
            item.status === 'CANCELLED' ? COLORS.danger : COLORS.primary
          }>
            {item.status}
          </Typography>
        </View>
      </View>

      <View style={styles.pathContainer}>
        <View style={styles.timeline}>
          <Circle color={COLORS.primary} fill={COLORS.primary} size={8} />
          <View style={styles.dottedLine} />
          <MapPin color={COLORS.accent} size={12} strokeWidth={3} />
        </View>
        <View style={styles.locations}>
          <Typography variant="body" bold numberOfLines={1} style={styles.addressText}>
            {item.pickupLocation?.address || 'Pickup'}
          </Typography>
          <Typography variant="body" bold numberOfLines={1} style={styles.addressText}>
            {item.dropLocation?.address || 'Destination'}
          </Typography>
        </View>
      </View>

      <View style={styles.tripMetaRow}>
        <View style={styles.metaItem}>
          <View style={styles.metaIcon}>
              <Car color={COLORS.primary} size={14} />
          </View>
          <Typography variant="caption" color={COLORS.textSecondary} bold>{item.vehicleType}</Typography>
        </View>
        <Typography variant="h3" bold color={COLORS.textPrimary}>₹{item.fare?.total || 0}</Typography>
      </View>

      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.invoiceButton} onPress={() => navigation.navigate('Invoice', { bookingId: item._id })}>
          <FileText color={COLORS.primary} size={18} />
          <Typography variant="caption" bold color={COLORS.primary}>RECEIPT</Typography>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rebookBtn}>
          <Typography variant="caption" bold color={COLORS.white}>REBOOK</Typography>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={COLORS.textPrimary} size={24} strokeWidth={2.5} />
        </TouchableOpacity>
        <Typography variant="h2" bold style={styles.headerTitle}>Ride History</Typography>
        <TouchableOpacity style={styles.backButton} onPress={fetchHistory}>
          <SlidersHorizontal color={COLORS.textPrimary} size={20} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.summaryCard}>
            <View style={styles.summaryIconBox}>
                <Car color={COLORS.white} size={20} />
            </View>
            <View>
                <Typography variant="caption" color={COLORS.textSecondary} bold style={styles.summaryLabel}>TOTAL RIDES</Typography>
                <Typography variant="h2" bold style={styles.summaryValue}>{totals.count}</Typography>
            </View>
        </View>
        <View style={styles.spentCard}>
            <View style={styles.spentIconBox}>
                <CreditCard color={COLORS.white} size={20} />
            </View>
            <View>
                <Typography variant="caption" color="rgba(255,255,255,0.6)" bold style={styles.summaryLabel}>SPENT</Typography>
                <Typography variant="h2" bold color={COLORS.white} style={styles.summaryValue}>₹{totals.spent}</Typography>
            </View>
        </View>
      </View>

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Typography variant="body" color={COLORS.textSecondary} style={{ marginTop: 16 }}>Loading history...</Typography>
        </View>
      ) : (
        <FlatList
          data={rides}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          renderItem={renderRideItem}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Car color={COLORS.border} size={64} style={{ marginBottom: 16 }} />
              <Typography variant="h3" color={COLORS.textSecondary}>No rides found yet</Typography>
              <Typography variant="body" color={COLORS.textSecondary} align="center" style={{ marginTop: 8 }}>
                Your completed rides will appear here
              </Typography>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  headerTitle: {
    fontSize: 22,
    color: COLORS.textPrimary,
  },
  summaryContainer: {
    flexDirection: 'row',
    padding: SPACING.xl,
    gap: 16,
  },
  summaryCard: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: RADII.large,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...SHADOWS.light,
  },
  summaryIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spentCard: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.primary,
    borderRadius: RADII.large,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...SHADOWS.light,
  },
  spentIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 10,
    letterSpacing: 0.5,
  },
  summaryValue: {
    color: COLORS.textPrimary,
  },
  content: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: 40,
  },
  rideCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADII.large,
    padding: 24,
    marginBottom: 20,
    ...SHADOWS.medium,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  dateTimeContainer: {
    gap: 4,
  },
  dateText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADII.small,
  },
  statusCompleted: {
    backgroundColor: 'rgba(0, 214, 125, 0.1)',
  },
  statusCancelled: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  statusProgress: {
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  pathContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 24,
  },
  timeline: {
    alignItems: 'center',
    width: 12,
    paddingVertical: 8,
  },
  dottedLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 6,
    borderStyle: 'dashed',
  },
  locations: {
    flex: 1,
    gap: 20,
  },
  addressText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  tripMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaIcon: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  invoiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
  },
  rebookBtn: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: RADII.medium,
    ...SHADOWS.light,
  },
});
