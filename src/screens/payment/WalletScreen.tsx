import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, ArrowUpRight, Car, CreditCard, Wallet, ChevronRight, TrendingUp, History } from 'lucide-react-native';
import { Typography } from '../../components';
import { COLORS, SPACING, SHADOWS, RADII } from '../../theme';

const WalletIcon = Wallet;

export const WalletScreen = () => {
  const renderBalanceCard = () => (
    <View style={styles.balanceCard}>
      <View style={styles.balanceHeader}>
        <View style={styles.walletIconCircle}>
          <WalletIcon color={COLORS.white} size={24} />
        </View>
        <Typography variant="body" color={COLORS.white} style={styles.balanceHeaderText} bold>
          AIRPAX Credits
        </Typography>
      </View>
      
      <View style={styles.balanceMain}>
        <Typography variant="h1" color={COLORS.white} style={styles.balanceAmount}>
          ₹1,250.00
        </Typography>
        <View style={styles.trendBadge}>
          <TrendingUp color={COLORS.accent} size={14} />
          <Typography variant="caption" color={COLORS.accent} bold style={styles.trendText}>
          +12% this month
        </Typography>
        </View>
      </View>

      <View style={styles.balanceActions}>
        <TouchableOpacity style={styles.addMoneyBtn} activeOpacity={0.8}>
          <Plus color={COLORS.primary} size={20} strokeWidth={2.5} />
          <Typography bold color={COLORS.primary} style={styles.addMoneyText}>
            Add Money
          </Typography>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.manageBtn}>
          <Typography variant="caption" color={COLORS.white} bold>Manage Options</Typography>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      <TouchableOpacity style={styles.actionItem}>
        <View style={styles.transferIconBox}>
          <ArrowUpRight color="#4F46E5" size={24} />
        </View>
        <Typography variant="caption" bold align="center">Transfer</Typography>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionItem}>
        <View style={styles.topUpIconBox}>
          <CreditCard color={COLORS.accent} size={24} />
        </View>
        <Typography variant="caption" bold align="center">Top Up</Typography>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionItem}>
        <View style={styles.historyIconBox}>
          <History color="#EA580C" size={24} />
        </View>
        <Typography variant="caption" bold align="center">History</Typography>
      </TouchableOpacity>
    </View>
  );

  const renderTransaction = (title: string, date: string, amount: string, isPositive: boolean, icon: any) => {
    const Icon = icon;
    return (
      <TouchableOpacity style={styles.transactionCard} activeOpacity={0.7}>
        <View style={styles.transactionLeft}>
          <View style={styles.transactionIconBox}>
            <Icon color={COLORS.textPrimary} size={20} />
          </View>
          <View>
            <Typography variant="body" bold style={styles.transactionTitle}>{title}</Typography>
            <Typography variant="caption" color={COLORS.textSecondary}>{date}</Typography>
          </View>
        </View>
        <View style={styles.transactionRight}>
          <Typography 
            variant="body" 
            bold 
            color={isPositive ? COLORS.accent : COLORS.danger}
          >
            {isPositive ? '+' : '-'}{amount}
          </Typography>
          <ChevronRight color={COLORS.border} size={16} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Typography variant="h2" bold>My Wallet</Typography>
        <TouchableOpacity style={styles.supportBtn}>
          <Typography variant="caption" color={COLORS.accent} bold>Support ⓘ</Typography>
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {renderBalanceCard()}
        {renderQuickActions()}

        <View style={styles.sectionHeader}>
          <Typography variant="h3" bold>Recent Transactions</Typography>
          <TouchableOpacity>
            <Typography variant="caption" color={COLORS.accent} bold>See All</Typography>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsList}>
          {renderTransaction('Ride to India Gate', 'Mar 10, 05:45 PM', '₹180', false, Car)}
          {renderTransaction('Added to Wallet', 'Mar 08, 12:30 PM', '₹1,000', true, Plus)}
          {renderTransaction('Ride to DLF Cyber City', 'Mar 08, 10:45 AM', '₹250', false, Car)}
          {renderTransaction('Cashback Earned', 'Mar 05, 02:15 PM', '₹15', true, TrendingUp)}
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
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.white,
  },
  supportBtn: {
    padding: 8,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: 100,
  },
  balanceCard: {
    backgroundColor: COLORS.primary,
    borderRadius: RADII.xlarge,
    padding: 24,
    ...SHADOWS.heavy,
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  walletIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceHeaderText: {
    opacity: 0.8,
  },
  balanceMain: {
    marginBottom: 32,
  },
  balanceAmount: {
    fontSize: 40,
    color: COLORS.white,
    fontWeight: '700',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 214, 125, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADII.small,
    alignSelf: 'flex-start',
    marginTop: 8,
    gap: 4,
  },
  trendText: {
    fontSize: 10,
  },
  balanceActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addMoneyBtn: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: RADII.large,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addMoneyText: {
    fontSize: 16,
  },
  manageBtn: {
    padding: 8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 32,
    backgroundColor: COLORS.white,
    paddingVertical: 20,
    borderRadius: RADII.large,
    ...SHADOWS.light,
  },
  actionItem: {
    alignItems: 'center',
    gap: 8,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transferIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topUpIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyIconBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF7ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  transactionsList: {
    gap: 12,
  },
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: RADII.large,
    ...SHADOWS.light,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  transactionIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  transactionTitle: {
    fontSize: 15,
    color: COLORS.black,
  },
  transactionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
