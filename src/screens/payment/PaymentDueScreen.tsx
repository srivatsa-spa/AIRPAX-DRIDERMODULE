import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components';
import { COLORS, SPACING, SHADOWS } from '../../theme';
import { CircleDollarSign, Receipt, ChevronRight, Info } from 'lucide-react-native';

export const PaymentDueScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <CircleDollarSign color={COLORS.danger} size={40} strokeWidth={1.5} />
        </View>
        <Typography variant="h1" bold style={styles.title}>Trip Completed</Typography>
        <Typography variant="body" color={COLORS.textSecondary} align="center" style={styles.subtitle}>
          Your ride was successful. Please review the fare details and settle the amount.
        </Typography>

        <View style={styles.amountCard}>
          <Typography variant="caption" bold color={COLORS.textSecondary} style={styles.amountLabel}>TOTAL AMOUNT DUE</Typography>
          <Typography variant="h1" bold style={styles.amount}>₹180.00</Typography>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Typography variant="caption" bold color={COLORS.danger}>PAYMENT PENDING</Typography>
          </View>
        </View>

        <View style={styles.detailsBox}>
          <View style={styles.sectionHeader}>
            <Receipt color={COLORS.textPrimary} size={18} />
            <Typography variant="body" bold style={styles.sectionTitle}>Fare Breakdown</Typography>
          </View>
          
          <View style={styles.detailRow}>
            <Typography variant="body" color={COLORS.textSecondary}>Base Fare</Typography>
            <Typography variant="body" bold>₹150.00</Typography>
          </View>
          <View style={styles.detailRow}>
            <Typography variant="body" color={COLORS.textSecondary}>Taxes & SGST (5%)</Typography>
            <Typography variant="body" bold>₹15.00</Typography>
          </View>
          <View style={styles.detailRow}>
            <Typography variant="body" color={COLORS.textSecondary}>Platform Fee</Typography>
            <Typography variant="body" bold>₹15.00</Typography>
          </View>
        </View>

        <View style={styles.infoBanner}>
            <Info color={COLORS.primary} size={16} />
            <Typography variant="caption" style={styles.infoText}>
                The amount includes all applicable tolls and surcharges.
            </Typography>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.payBtn}
          onPress={() => navigation.navigate('PaymentCheckout')}
        >
          <Typography bold color={COLORS.white} style={styles.payBtnText}>PROCEED TO CHECKOUT</Typography>
          <ChevronRight color={COLORS.white} size={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl * 2,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 32,
    backgroundColor: COLORS.danger + '10', // 10% opacity
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    paddingHorizontal: 20,
    lineHeight: 22,
    marginBottom: 40,
  },
  amountCard: {
    width: '100%',
    backgroundColor: COLORS.background,
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 32,
  },
  amountLabel: {
    fontSize: 10,
    letterSpacing: 1,
  },
  amount: {
    fontSize: 48,
    color: COLORS.textPrimary,
    marginVertical: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.danger,
    marginRight: 6,
  },
  detailsBox: {
    width: '100%',
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary + '05',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  footer: {
    padding: SPACING.xl,
  },
  payBtn: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    ...SHADOWS.medium,
  },
  payBtnText: {
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
