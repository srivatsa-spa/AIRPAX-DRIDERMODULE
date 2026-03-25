import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, SlidersHorizontal, Car, FileText, Circle, MapPin, CreditCard } from 'lucide-react-native';
import { Typography } from '../../components';
import { COLORS, SPACING, SHADOWS, RADII } from '../../theme';

const RIDES = [
  { id: '1', date: 'Mar 10, 2026', time: '05:30 PM', destination: 'India Gate', price: '₹180', status: 'Completed' },
  { id: '2', date: 'Mar 08, 2026', time: '10:15 AM', destination: 'DLF Cyber City', price: '₹250', status: 'Completed' },
  { id: '3', date: 'Mar 05, 2026', time: '02:45 PM', destination: 'IGI Airport T3', price: '₹680', status: 'Cancelled' },
];

export const RideHistoryScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeft color={COLORS.textPrimary} size={24} strokeWidth={2.5} />
        </TouchableOpacity>
        <Typography variant="h2" bold style={styles.headerTitle}>Ride History</Typography>
        <TouchableOpacity style={styles.backButton}>
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
                <Typography variant="h2" bold style={styles.summaryValue}>24</Typography>
            </View>
        </View>
        <View style={styles.spentCard}>
            <View style={styles.spentIconBox}>
                <CreditCard color={COLORS.white} size={20} />
            </View>
            <View>
                <Typography variant="caption" color="rgba(255,255,255,0.6)" bold style={styles.summaryLabel}>SPENT</Typography>
                <Typography variant="h2" bold color={COLORS.white} style={styles.summaryValue}>₹4.8k</Typography>
            </View>
        </View>
      </View>

      <FlatList
        data={RIDES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.rideCard}>
            <View style={styles.cardHeader}>
              <View style={styles.dateTimeContainer}>
                <Typography variant="body" bold style={styles.dateText}>{item.date}</Typography>
                <Typography variant="caption" color={COLORS.textSecondary} bold>{item.time}</Typography>
              </View>
              <View style={[styles.statusBadge, item.status === 'Completed' ? styles.statusCompleted : styles.statusCancelled]}>
                <Typography variant="caption" bold color={item.status === 'Completed' ? COLORS.success : COLORS.danger}>
                  {item.status.toUpperCase()}
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
                <Typography variant="body" bold style={styles.addressText}>Sector 44, Gurugram</Typography>
                <Typography variant="body" bold style={styles.addressText}>{item.destination}</Typography>
              </View>
            </View>

            <View style={styles.tripMetaRow}>
              <View style={styles.metaItem}>
                <View style={styles.metaIcon}>
                    <Car color={COLORS.primary} size={14} />
                </View>
                <Typography variant="caption" color={COLORS.textSecondary} bold>Premium</Typography>
              </View>
              <Typography variant="h3" bold color={COLORS.textPrimary}>{item.price}</Typography>
            </View>

            <View style={styles.cardFooter}>
              <TouchableOpacity style={styles.invoiceButton} onPress={() => navigation.navigate('Invoice')}>
                <FileText color={COLORS.primary} size={18} />
                <Typography variant="caption" bold color={COLORS.primary}>RECEIPT</Typography>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rebookBtn}>
                <Typography variant="caption" bold color={COLORS.white}>REBOOK RIDE</Typography>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
