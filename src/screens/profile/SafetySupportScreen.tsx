import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Typography, Card, Button } from '../../components';
import { COLORS, SPACING } from '../../theme';

export const SafetySupportScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button 
          label="Back" 
          variant="secondary" 
          outline 
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        />
        <Typography variant="h2">Safety & Support</Typography>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.sosCard}>
          <Typography variant="h1" color={COLORS.danger}>🚨 SOS EMERGENCY</Typography>
          <Typography variant="body" align="center" style={styles.sosDesc}>
            Call local authorities immediately and share your live location with your emergency contacts.
          </Typography>
          <Button 
            label="CALL EMERGENCY (112)" 
            variant="danger" 
            style={styles.sosBtn}
            onPress={() => Linking.openURL('tel:112')}
          />
        </Card>

        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>Help Center</Typography>
          <Card style={styles.menuCard}>
            <TouchableOpacity style={styles.menuItem}>
              <Typography variant="body">I lost an item</Typography>
              <Typography variant="body">›</Typography>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem}>
              <Typography variant="body">Report a safety issue</Typography>
              <Typography variant="body">›</Typography>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem}>
              <Typography variant="body">Billing & Payment issues</Typography>
              <Typography variant="body">›</Typography>
            </TouchableOpacity>
          </Card>
        </View>

        <View style={styles.section}>
          <Typography variant="h3" style={styles.sectionTitle}>Contact Us</Typography>
          <View style={styles.contactRow}>
            <Card style={styles.contactCard}>
              <Typography variant="h2">💬</Typography>
              <Typography variant="caption" bold>Live Chat</Typography>
            </Card>
            <Card style={styles.contactCard}>
              <Typography variant="h2">📧</Typography>
              <Typography variant="caption" bold>Email Support</Typography>
            </Card>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  backBtn: {
    marginRight: SPACING.md,
    height: 40,
    width: 70,
  },
  content: {
    padding: SPACING.lg,
  },
  sosCard: {
    backgroundColor: COLORS.dangerLight,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  sosDesc: {
    marginVertical: SPACING.lg,
  },
  sosBtn: {
    width: '100%',
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  menuCard: {
    backgroundColor: COLORS.white,
    padding: 0,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.lg,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactCard: {
    flex: 0.48,
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
  },
});
