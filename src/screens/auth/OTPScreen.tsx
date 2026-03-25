import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeft, Clock } from 'lucide-react-native';

import { Typography, Button, OTPInputGroup, NumericKeypad } from '../../components';
import { COLORS, SPACING, SHADOWS } from '../../theme';
import { useAppStore } from '../../store/useAppStore';
import { authService } from '../../api/authService';

export const OTPScreen = ({ route, navigation }: any) => {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(45);
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useAppStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleKeyPress = (digit: string) => {
    if (otp.length < 4) {
      setOtp((prev) => prev + digit);
    }
  };

  const handleDelete = () => {
    setOtp((prev) => prev.slice(0, -1));
  };

  const handleVerify = async () => {
    if (otp.length === 4) {
      setLoading(true);
      try {
        const response = await authService.verifyOTP(phoneNumber, otp);
        const { user, token } = response.data;
        setUser(user);
        setToken(token);
        // Navigation will be handled by Auth navigator logic or top level App.tsx 
        // if it watches the 'user' state. For simulation, we can navigate too.
      } catch (error: any) {
        Alert.alert('Verification Failed', error.response?.data?.error || 'Invalid OTP');
        setOtp('');
      } finally {
        setLoading(false);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ChevronLeft color={COLORS.primary} size={20} strokeWidth={2.5} />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Typography variant="h1" style={styles.title}>Verify your number</Typography>
          <Typography variant="body" style={styles.subtitle}>
            Enter the 4-digit code sent to <Text style={styles.phoneText}>+91 {phoneNumber}</Text>
          </Typography>
        </View>

        <OTPInputGroup code={otp} />

        <View style={styles.resendContainer}>
          <Typography variant="caption" style={styles.resendText}>Didn't receive code?</Typography>
          <View style={styles.timerRow}>
            <TouchableOpacity disabled={timer > 0}>
              <Typography variant="caption" style={[styles.resendAction, timer > 0 && styles.disabledAction]}>
                RESEND CODE
              </Typography>
            </TouchableOpacity>
            <View style={styles.timerBadge}>
              <Clock color={COLORS.textSecondary} size={10} strokeWidth={2.5} />
              <Text style={styles.timerText}>{formatTime(timer)}</Text>
            </View>
          </View>
        </View>

        <Button 
          label={loading ? "" : "VERIFY & CONTINUE"} 
          onPress={handleVerify}
          style={styles.button}
          loading={loading}
          disabled={otp.length !== 4 || loading}
        />
      </View>

      <NumericKeypad onPress={handleKeyPress} onDelete={handleDelete} />
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
    paddingHorizontal: SPACING.lg,
    paddingTop: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.light,
    marginBottom: 40,
  },
  textContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  phoneText: {
    fontWeight: '700',
    color: COLORS.primary,
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  resendText: {
    color: COLORS.textSecondary,
    marginBottom: 8,
    fontSize: 13,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  resendAction: {
    fontWeight: '700',
    color: COLORS.primary,
    letterSpacing: 0.5,
    fontSize: 13,
  },
  disabledAction: {
    color: '#CBD5E1',
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 6,
  },
  timerText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  button: {
    marginTop: 'auto',
    marginBottom: 32,
    height: 52,
    borderRadius: 16,
  },
});
