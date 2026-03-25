import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin } from 'lucide-react-native';
import { Typography, Button } from '../../components';
import { COLORS, SPACING } from '../../theme';

export const PermissionsScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MapPin color={COLORS.primary} size={40} strokeWidth={2} />
        </View>
        <Typography variant="h2" style={styles.title}>Location Access</Typography>
        <Typography variant="body" color={COLORS.textSecondary} align="center" style={styles.subtitle}>
          AIRPAX needs your location to find nearby cabs and provide accurate ETAs.
        </Typography>
      </View>
      <View style={styles.footer}>
        <Button 
          label="ALLOW ACCESS" 
          onPress={() => navigation.replace('Main')} 
          style={styles.btn}
          textStyle={styles.btnText}
        />
        <Button 
          label="Skip for now" 
          variant="secondary" 
          outline 
          onPress={() => navigation.replace('Main')} 
          style={styles.skipBtn}
          textStyle={styles.skipText}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    marginBottom: 12,
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: COLORS.textSecondary,
  },
  footer: {
    padding: SPACING.lg,
    paddingBottom: 40,
  },
  btn: {
    marginBottom: 16,
    height: 52,
    borderRadius: 16,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
  },
  skipBtn: {
    width: '100%',
    height: 52,
    borderRadius: 16,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
});
