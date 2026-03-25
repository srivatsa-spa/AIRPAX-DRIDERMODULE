import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Button, Card } from '../../components';
import { COLORS, SPACING } from '../../theme';

export const TripSuccessScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Typography variant="h1" color={COLORS.white}>✓</Typography>
        </View>
        
        <Typography variant="h1" style={styles.title}>Hope you enjoyed your ride!</Typography>
        <Typography variant="body" color={COLORS.textSecondary} align="center" style={styles.subtitle}>
          Your trip to India Gate has been completed successfully.
        </Typography>

        <Card style={styles.fareCard}>
          <Typography variant="caption" color={COLORS.textSecondary}>Final Fare</Typography>
          <Typography variant="h1">₹180.00</Typography>
          <View style={styles.divider} />
          <Typography variant="caption" color={COLORS.textSecondary}>Payment Method</Typography>
          <Typography variant="body">💰 Paid via Cash</Typography>
        </Card>

        <Typography variant="h3" style={styles.ratingTitle}>Rate your driver</Typography>
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Typography key={star} variant="h1" style={styles.star}>⭐</Typography>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button 
          label="DONE" 
          onPress={() => navigation.navigate('Home')}
          style={styles.doneButton}
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
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: SPACING.xxl,
  },
  fareCard: {
    width: '100%',
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  ratingTitle: {
    marginBottom: SPACING.md,
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    marginHorizontal: SPACING.xs,
  },
  footer: {
    padding: SPACING.lg,
  },
  doneButton: {
    width: '100%',
  },
});
