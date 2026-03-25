import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components';
import { COLORS, SPACING, SHADOWS } from '../../theme';
import { ChevronLeft, Share2, Download, Circle, MapPin, ChevronDown, CreditCard, Calendar, Clock } from 'lucide-react-native';

export const InvoiceScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIconButton}>
          <ChevronLeft color={COLORS.primary} size={22} strokeWidth={2.5} />
        </TouchableOpacity>
        <Typography variant="h2" bold style={styles.headerTitle}>Digital Receipt</Typography>
        <TouchableOpacity style={styles.headerIconButton}>
          <Share2 color={COLORS.primary} size={20} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.invoiceCard}>
          <View style={styles.billHeader}>
            <View style={styles.brandContainer}>
                <Typography variant="h2" bold color={COLORS.primary}>AIRPAX</Typography>
                <View style={styles.premiumBadge}>
                    <Typography variant="caption" bold color={COLORS.accent}>PREMIUM</Typography>
                </View>
            </View>
            <View style={styles.timeInfo}>
                <Calendar color={COLORS.textSecondary} size={12} />
                <Typography variant="caption" color={COLORS.textSecondary}>March 10, 2026</Typography>
                <View style={styles.dotSeparator} />
                <Clock color={COLORS.textSecondary} size={12} />
                <Typography variant="caption" color={COLORS.textSecondary}>05:30 PM</Typography>
            </View>
          </View>
          
          <View style={styles.divider} />

          <View style={styles.tripSection}>
            <Typography variant="caption" bold color={COLORS.textSecondary} style={styles.sectionTitle}>TRIP SUMMARY</Typography>
            
            <View style={styles.locationRow}>
                <Circle color={COLORS.primary} fill={COLORS.primary} size={12} />
                <Typography variant="body" bold style={styles.addressText}>Sector 44, Gurugram</Typography>
            </View>
            <View style={styles.pathLine}>
                <ChevronDown color={COLORS.border} size={14} />
            </View>
            <View style={styles.locationRow}>
                <MapPin color={COLORS.accent} fill={COLORS.accent} size={12} />
                <Typography variant="body" bold style={styles.addressText}>India Gate, New Delhi</Typography>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.billSection}>
            <Typography variant="caption" bold color={COLORS.textSecondary} style={styles.sectionTitle}>BILL DETAILS</Typography>
            
            <View style={styles.billRow}>
              <Typography variant="body" color={COLORS.textSecondary}>Base Fare</Typography>
              <Typography variant="body" bold>₹145.50</Typography>
            </View>
            <View style={styles.billRow}>
              <Typography variant="body" color={COLORS.textSecondary}>Distance Fee (4.2km)</Typography>
              <Typography variant="body" bold>₹20.00</Typography>
            </View>
            <View style={styles.billRow}>
              <Typography variant="body" color={COLORS.textSecondary}>Taxes & SGST</Typography>
              <Typography variant="body" bold>₹14.50</Typography>
            </View>
            
            <View style={styles.totalRow}>
              <Typography variant="h2" bold>Total Amount</Typography>
              <Typography variant="h2" bold color={COLORS.primary}>₹180.00</Typography>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.paymentSection}>
            <Typography variant="caption" bold color={COLORS.textSecondary} style={styles.sectionTitle}>PAID VIA</Typography>
            <View style={styles.paymentInfo}>
                <CreditCard color={COLORS.primary} size={20} />
                <Typography variant="body" bold style={styles.paymentMethod}>Bank Card (**** 1234)</Typography>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.downloadBtn}>
          <Download color={COLORS.primary} size={18} strokeWidth={2.5} />
          <Typography bold color={COLORS.primary} style={styles.downloadBtnText}>DOWNLOAD PDF RECEIPT</Typography>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.homeBtn}
          onPress={() => navigation.navigate('MainTabs')} 
        >
          <Typography bold color={COLORS.white} style={styles.homeBtnText}>DONE</Typography>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
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
    fontSize: 18,
    color: COLORS.textPrimary,
  },
  content: {
    padding: SPACING.xl,
  },
  invoiceCard: {
    backgroundColor: COLORS.white,
    borderRadius: 28,
    padding: 24,
    ...SHADOWS.medium,
  },
  billHeader: {
    alignItems: 'center',
    marginBottom: 8,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  premiumBadge: {
    backgroundColor: COLORS.accent + '15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dotSeparator: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 24,
    borderStyle: 'dashed',
  },
  sectionTitle: {
    letterSpacing: 1,
    marginBottom: 16,
    fontSize: 10,
  },
  tripSection: {
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addressText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  pathLine: {
    marginLeft: 5,
    marginVertical: 4,
  },
  billSection: {
    width: '100%',
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  paymentSection: {
    alignItems: 'center',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    width: '100%',
  },
  paymentMethod: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 32,
    height: 56,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
  },
  downloadBtnText: {
    fontSize: 12,
    letterSpacing: 0.5,
  },
  footer: {
    padding: SPACING.xl,
    paddingBottom: SPACING.xl + 10,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
  },
  homeBtn: {
    backgroundColor: COLORS.primary,
    height: 60,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  homeBtnText: {
    fontSize: 16,
    letterSpacing: 1,
  },
});
