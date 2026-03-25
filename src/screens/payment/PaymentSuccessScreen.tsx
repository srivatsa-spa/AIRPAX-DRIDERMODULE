import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography } from '../../components';
import { COLORS, SPACING, SHADOWS } from '../../theme';
import { CheckCircle2, FileText, Home } from 'lucide-react-native';

export const PaymentSuccessScreen = ({ navigation }: any) => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, [scale, opacity]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.successIconWrapper, { transform: [{ scale }], opacity }]}>
          <CheckCircle2 color={COLORS.accent} size={100} strokeWidth={1.5} />
        </Animated.View>
        
        <Typography variant="h1" bold style={styles.title}>Payment Successful!</Typography>
        <Typography variant="body" color={COLORS.textSecondary} align="center" style={styles.subtitle}>
          Your payment of <Typography bold color={COLORS.textPrimary}>₹180.00</Typography> has been received successfully.
        </Typography>

        <View style={styles.receiptBrief}>
          <View style={styles.receiptIcon}>
            <FileText color={COLORS.primary} size={20} />
          </View>
          <View style={styles.receiptText}>
            <Typography variant="caption" bold color={COLORS.textSecondary}>TRANSACTION ID</Typography>
            <Typography variant="body" bold color={COLORS.textPrimary}>#TAX123456789</Typography>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.invoiceBtn}
          onPress={() => navigation.navigate('Invoice')} 
        >
          <FileText color={COLORS.primary} size={20} />
          <Typography bold color={COLORS.primary} style={styles.invoiceBtnText}>VIEW INVOICE</Typography>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.homeBtn}
          onPress={() => navigation.navigate('MainTabs')} 
        >
          <Typography bold color={COLORS.white} style={styles.homeBtnText}>BACK TO HOME</Typography>
          <Home color={COLORS.white} size={20} />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconWrapper: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: COLORS.accent + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  subtitle: {
    lineHeight: 22,
    marginBottom: 48,
    paddingHorizontal: 20,
  },
  receiptBrief: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
    borderRadius: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  receiptIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
  },
  receiptText: {
    marginLeft: 16,
  },
  footer: {
    padding: SPACING.xl,
    paddingBottom: SPACING.xl + 10,
  },
  invoiceBtn: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  invoiceBtnText: {
    fontSize: 14,
    letterSpacing: 0.5,
  },
  homeBtn: {
    flexDirection: 'row',
    height: 64,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    ...SHADOWS.medium,
  },
  homeBtnText: {
    fontSize: 16,
    letterSpacing: 1,
  },
});
