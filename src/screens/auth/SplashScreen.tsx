import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Image } from 'react-native';
import { Typography } from '../../components';
import { COLORS } from '../../theme';

export const SplashScreen = ({ navigation }: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.content, 
          { 
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Image 
          source={require('../../assets/images/logo.png')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Typography variant="h1" color={COLORS.primary} style={styles.brandName}>
          AIRPAX CABS
        </Typography>
        <Typography variant="body" color={COLORS.textSecondary} style={styles.loadingText}>
          Loading . . .
        </Typography>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoImage: {
    width: 140,
    height: 140,
    marginBottom: 20,
  },
  brandName: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 2,
    color: COLORS.primary,
  },
  loadingText: {
    marginTop: 40,
    letterSpacing: 1.2,
    fontSize: 14,
    color: '#94A3B8',
  },
});
