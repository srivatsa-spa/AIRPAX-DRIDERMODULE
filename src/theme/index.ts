export const COLORS = {
  primary: '#0A2E5B', // Dark Navy
  primaryDark: '#071F3F',
  primaryLight: '#F1F5F9',
  secondary: '#1E293B',
  accent: '#00D67D', // Vibrant Green
  accentDark: '#00B368',
  accentLight: '#E6FFF5',
  success: '#00D67D',
  successLight: '#E6FFF5',
  warning: '#F59E0B',
  warningLight: '#FFFBEB',
  danger: '#EF4444',
  dangerLight: '#FEF2F2',
  info: '#3B82F6',
  black: '#0F172A',
  white: '#FFFFFF',
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  surface: '#FFFFFF',
  background: '#F8FAFC',
  transparent: 'transparent',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

export const RADII = {
  small: 8,
  medium: 12,
  large: 24,
  xlarge: 32,
  round: 99,
};

export const SHADOWS = {
  light: {
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  medium: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  heavy: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 12,
  },
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
  },
  h2: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  h3: {
    fontSize: 18,
    fontWeight: '500' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 18,
  },
  overline: {
    fontSize: 11,
    fontWeight: '400' as const,
    lineHeight: 16,
    textTransform: 'uppercase' as const,
  },
};
