import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

interface MobileInputProps extends TextInputProps {
  countryCode?: string;
}

export const MobileInput: React.FC<MobileInputProps> = ({ 
  countryCode = '+91', 
  ...props 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.prefixContainer}>
        <Text style={styles.flag}>🇮🇳</Text>
        <Text style={styles.countryCode}>{countryCode}</Text>
      </View>
      <View style={styles.separator} />
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.textSecondary}
        keyboardType="phone-pad"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
  },
  prefixContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 20,
    marginRight: 8,
  },
  countryCode: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.md,
  },
  input: {
    flex: 1,
    height: '100%',
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
});
