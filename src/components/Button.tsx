import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacityProps,
  ViewStyle,
  TextStyle
} from 'react-native';
import { COLORS, SPACING, RADII, TYPOGRAPHY } from '../theme';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  loading?: boolean;
  outline?: boolean;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  variant = 'primary', 
  loading, 
  outline, 
  textStyle: customTextStyle, 
  style, 
  disabled, 
  ...props 
}) => {
  const getBackgroundColor = () => {
    if (outline) return 'transparent';
    if (disabled) return COLORS.border;
    switch (variant) {
      case 'secondary': return COLORS.secondary;
      case 'danger': return COLORS.danger;
      default: return COLORS.primary;
    }
  };

  const getTextColor = () => {
    if (outline) return variant === 'danger' ? COLORS.danger : COLORS.primary;
    if (variant === 'secondary') return COLORS.textPrimary;
    if (disabled) return COLORS.textSecondary;
    return COLORS.white;
  };

  const containerStyle: ViewStyle = {
    backgroundColor: getBackgroundColor(),
    borderColor: outline ? (variant === 'danger' ? COLORS.danger : COLORS.primary) : 'transparent',
    borderWidth: outline ? 1 : 0,
    opacity: disabled ? 0.6 : 1,
  };

  const textStyle: TextStyle = {
    color: getTextColor(),
  };

  return (
    <TouchableOpacity 
      style={[styles.container, containerStyle, style]} 
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text style={[styles.text, textStyle, customTextStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    borderRadius: RADII.large,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
  },
  text: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
});
