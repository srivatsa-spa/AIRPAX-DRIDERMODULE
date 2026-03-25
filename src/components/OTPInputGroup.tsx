import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../theme';

interface OTPInputGroupProps {
  code: string;
  length?: number;
}

export const OTPInputGroup: React.FC<OTPInputGroupProps> = ({ code, length = 4 }) => {
  const digits = code.split('');
  const boxes = Array(length).fill(0);

  return (
    <View style={styles.container}>
      {boxes.map((_, index) => {
        const digit = digits[index];
        const isFocused = index === digits.length;
        
        return (
          <View 
            key={index} 
            style={[
              styles.box, 
              digit ? styles.boxFilled : null,
              isFocused ? styles.boxFocused : null
            ]}
          >
            {digit ? (
              <Text style={styles.digitText}>{digit}</Text>
            ) : (
              <View style={styles.dot} />
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.md,
    marginVertical: SPACING.xl,
  },
  box: {
    width: 65,
    height: 65,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxFilled: {
    backgroundColor: COLORS.white,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  boxFocused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  digitText: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.textSecondary,
  },
});
