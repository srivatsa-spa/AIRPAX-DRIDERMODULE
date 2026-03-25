import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components';
import { COLORS, SPACING, SHADOWS } from '../../theme';
import { CreditCard, Smartphone, Banknote, ChevronLeft, Check } from 'lucide-react-native';

const PAYMENT_METHODS = [
  { id: '1', name: 'Original Bank Card', icon: CreditCard, number: '**** 1234' },
  { id: '2', name: 'Google Pay / UPI', icon: Smartphone, number: 'user@upi' },
  { id: '3', name: 'Cash', icon: Banknote, number: 'Pay to driver' },
];

export const PaymentCheckoutScreen = ({ navigation }: any) => {
  const [selectedId, setSelectedId] = useState('1');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconButton}>
          <ChevronLeft color={COLORS.primary} size={22} strokeWidth={2.5} />
        </TouchableOpacity>
        <Typography variant="h2" bold style={styles.headerTitle}>Select Payment</Typography>
        <View style={styles.emptySpace} />
      </View>

      <View style={styles.content}>
        <Typography variant="caption" bold color={COLORS.textSecondary} style={styles.sectionTitle}>
            SAVED PAYMENT METHODS
        </Typography>
        
        {PAYMENT_METHODS.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedId === item.id;
            return (
                <TouchableOpacity 
                    key={item.id}
                    onPress={() => setSelectedId(item.id)}
                    activeOpacity={0.7}
                >
                    <View style={[
                        styles.methodCard,
                        isSelected && styles.selectedCard
                    ]}>
                        <View style={[
                            styles.iconWrapper,
                            isSelected && styles.selectedIconWrapper
                        ]}>
                            <Icon color={isSelected ? COLORS.white : COLORS.primary} size={20} />
                        </View>
                        
                        <View style={styles.methodInfo}>
                            <Typography variant="body" bold color={isSelected ? COLORS.textPrimary : COLORS.textPrimary}>
                                {item.name}
                            </Typography>
                            <Typography variant="caption" color={COLORS.textSecondary}>
                                {item.number}
                            </Typography>
                        </View>

                        <View style={[
                            styles.radio,
                            isSelected && styles.radioSelected
                        ]}>
                            {isSelected && <Check color={COLORS.white} size={12} strokeWidth={3} />}
                        </View>
                    </View>
                </TouchableOpacity>
            );
        })}
      </View>

      <View style={styles.footer}>
        <View style={styles.amountBox}>
            <Typography variant="caption" bold color={COLORS.textSecondary}>TOTAL PAYABLE</Typography>
            <Typography variant="h1" bold style={styles.totalAmount}>₹180.00</Typography>
        </View>
        <TouchableOpacity 
          style={styles.payBtn}
          onPress={() => navigation.navigate('PaymentSuccess')} 
        >
          <Typography bold color={COLORS.white} style={styles.payBtnText}>PAY NOW</Typography>
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
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  headerTitle: {
    color: COLORS.textPrimary,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
  },
  sectionTitle: {
    letterSpacing: 1,
    marginBottom: 20,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  selectedCard: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedIconWrapper: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  methodInfo: {
    flex: 1,
    marginLeft: 16,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: COLORS.accent,
    backgroundColor: COLORS.accent,
  },
  emptySpace: {
    width: 44,
  },
  footer: {
    padding: SPACING.xl,
    paddingBottom: SPACING.xl + 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  amountBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  totalAmount: {
    fontSize: 32,
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  payBtn: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  payBtnText: {
    fontSize: 16,
    letterSpacing: 1,
  },
});
