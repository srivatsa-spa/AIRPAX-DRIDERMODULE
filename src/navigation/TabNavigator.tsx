import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Clock, Wallet, User } from 'lucide-react-native';

import { HomeScreen, RideHistoryScreen, WalletScreen, ProfileScreen } from '../screens';
import { COLORS, RADII, SHADOWS } from '../theme';

const TabIcon = ({ Icon, color }: { Icon: any; color: string }) => (
  <Icon color={color} size={20} strokeWidth={2.5} />
);

const HomeIcon = ({ color }: { color: string }) => <TabIcon Icon={Home} color={color} />;
const ActivityIcon = ({ color }: { color: string }) => <TabIcon Icon={Clock} color={color} />;
const WalletIcon = ({ color }: { color: string }) => <TabIcon Icon={Wallet} color={color} />;
const AccountIcon = ({ color }: { color: string }) => <TabIcon Icon={User} color={color} />;

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen 
        name="Activity" 
        component={RideHistoryScreen}
        options={{
          tabBarLabel: 'Rides',
          tabBarIcon: ActivityIcon,
        }}
      />
      <Tab.Screen 
        name="Wallet" 
        component={WalletScreen}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: WalletIcon,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: AccountIcon,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    paddingBottom: 25,
    paddingTop: 12,
    borderTopLeftRadius: RADII.xlarge,
    borderTopRightRadius: RADII.xlarge,
    backgroundColor: COLORS.white,
    borderTopWidth: 0,
    ...SHADOWS.heavy,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
});
