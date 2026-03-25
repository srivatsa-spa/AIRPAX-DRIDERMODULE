import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Typography } from '../components';
import { COLORS, SPACING } from '../theme';
import { MainNavigator } from './MainNavigator';
import { useAppStore } from '../store/useAppStore';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { user, logout } = useAppStore();

  const menuItems = [
    { label: 'Home', icon: '🏠', screen: 'Home' },
    { label: 'Ride History', icon: '📜', screen: 'RideHistory' },
    { label: 'Profile', icon: '👤', screen: 'Profile' },
    { label: 'Safety & Support', icon: '🛡️', screen: 'SafetySupport' },
  ];

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Typography style={styles.avatarEmoji}>👤</Typography>
          </View>
          <View style={styles.userInfo}>
            <Typography variant="h3" style={styles.userName}>{user?.name || 'User'}</Typography>
            <Typography variant="caption" color={COLORS.textSecondary}>+91 {user?.phone || '8888888888'}</Typography>
          </View>
        </View>
      </View>

      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollView}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.screen}
            style={styles.menuItem}
            onPress={() => props.navigation.navigate(item.screen)}
          >
            <Typography style={styles.menuIcon}>{item.icon}</Typography>
            <Typography variant="body" style={styles.menuLabel}>{item.label}</Typography>
          </TouchableOpacity>
        ))}
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Typography style={styles.menuIcon}>🚪</Typography>
          <Typography variant="body" color={COLORS.danger} style={styles.menuLabel}>Logout</Typography>
        </TouchableOpacity>
        <Typography variant="caption" style={styles.version}>Version 1.0.0</Typography>
      </View>
    </View>
  );
};

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: '80%',
          backgroundColor: COLORS.white,
        },
      }}
    >
      <Drawer.Screen name="MainStack" component={MainNavigator} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarEmoji: {
    fontSize: 30,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  scrollView: {
    paddingTop: SPACING.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: SPACING.lg,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  menuLabel: {
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  footer: {
    padding: SPACING.lg,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  version: {
    marginTop: 16,
    color: '#94A3B8',
    textAlign: 'center',
  },
});
