import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, MobileInput, Button, Card } from '../../components';
import { COLORS, SPACING, SHADOWS } from '../../theme';
import { authService } from '../../api/authService';

export const LoginScreen = ({ navigation }: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (phoneNumber.length === 10) {
      setLoading(true);
      try {
        await authService.sendOTP(phoneNumber);
        navigation.navigate('OTP', { phoneNumber });
      } catch (error) {
        console.error('Failed to send OTP:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={styles.header}>
          <Image 
            source={require('../../assets/images/logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Typography variant="h1" style={styles.brandName}>AIRPAX CABS</Typography>
          <Typography variant="caption" style={styles.appType}>RIDER APP</Typography>
        </View>

        <Card style={styles.card}>
          <Typography variant="h2" style={styles.cardTitle}>Login with mobile number</Typography>
          
          <MobileInput
            placeholder="Enter mobile number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={10}
            keyboardType="phone-pad"
          />

          <Button 
            label={loading ? "" : "SEND OTP"} 
            onPress={handleSendOTP}
            style={styles.button}
            disabled={phoneNumber.length !== 10 || loading}
            loading={loading}
          />

          <Typography variant="caption" style={styles.termsText}>
            By continuing you agree to AIRPAX <Text style={styles.linkText}>Terms & Conditions</Text>
          </Typography>
        </Card>

        <View style={styles.footer}>
          <Typography variant="caption" style={styles.versionText}>AIRPAX Rider App v1.0</Typography>
          <View style={styles.homeIndicator} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  brandName: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  appType: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginTop: 4,
    letterSpacing: 2,
  },
  card: {
    marginHorizontal: SPACING.lg,
    padding: 32,
    borderRadius: 32,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
    height: 52,
    borderRadius: 16,
  },
  termsText: {
    marginTop: 24,
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: 11,
    lineHeight: 18,
  },
  linkText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingBottom: 10,
  },
  versionText: {
    color: COLORS.textSecondary,
    fontSize: 11,
  },
  homeIndicator: {
    width: 100,
    height: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 2,
    marginTop: 24,
  },
});
