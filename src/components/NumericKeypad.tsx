import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../theme';

interface NumericKeypadProps {
  onPress: (digit: string) => void;
  onDelete: () => void;
}

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 3;

export const NumericKeypad: React.FC<NumericKeypadProps> = ({ onPress, onDelete }) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'DEL'];

  return (
    <View style={styles.container}>
      {keys.map((key, index) => {
        if (key === '') return <View key={index} style={styles.key} />;
        
        return (
          <TouchableOpacity 
            key={index} 
            style={styles.key} 
            onPress={() => key === 'DEL' ? onDelete() : onPress(key)}
          >
            {key === 'DEL' ? (
              <Text style={styles.keyText}>⌫</Text>
            ) : (
              <Text style={styles.keyText}>{key}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 20,
    backgroundColor: COLORS.white,
  },
  key: {
    width: ITEM_WIDTH,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});
