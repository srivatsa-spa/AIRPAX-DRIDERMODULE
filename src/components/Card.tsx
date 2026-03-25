import React from 'react';
import { View, StyleSheet, ViewProps, ViewStyle } from 'react-native';
import { COLORS, RADII, SPACING, SHADOWS } from '../theme';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'elevated' | 'flat' | 'outline';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'elevated', 
  style, 
  ...props 
}) => {
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'flat':
        return { backgroundColor: COLORS.surface };
      case 'outline':
        return { 
          backgroundColor: COLORS.white, 
          borderWidth: 1, 
          borderColor: COLORS.border 
        };
      default:
        return { 
          backgroundColor: COLORS.white,
          ...SHADOWS.medium 
        };
    }
  };

  return (
    <View style={[styles.container, getVariantStyle(), style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RADII.large,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
});
