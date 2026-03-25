import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { 
  AddressEntryScreen, 
  CategorySelectionScreen, 
  ConfirmBookingScreen,
  TrackingScreen, 
  TripSuccessScreen,
  RideSearchingScreen,
  RideInProgressScreen,
  PaymentDueScreen,
  PaymentCheckoutScreen,
  PaymentSuccessScreen,
  InvoiceScreen,
  SafetySupportScreen
} from '../screens';

export type MainStackParamList = {
  MainTabs: undefined;
  Home: undefined;
  AddressEntry: undefined;
  CategorySelection: undefined;
  ConfirmBooking: undefined;
  Tracking: undefined;
  TripSuccess: undefined;
  RideSearching: undefined;
  RideInProgress: undefined;
  PaymentDue: undefined;
  PaymentCheckout: undefined;
  PaymentSuccess: undefined;
  Invoice: undefined;
  Profile: undefined;
  RideHistory: undefined;
  SafetySupport: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

import { TabNavigator } from './TabNavigator';

export const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="AddressEntry" component={AddressEntryScreen} />
      <Stack.Screen name="CategorySelection" component={CategorySelectionScreen} />
      <Stack.Screen name="ConfirmBooking" component={ConfirmBookingScreen} />
      <Stack.Screen name="RideSearching" component={RideSearchingScreen} />
      <Stack.Screen name="Tracking" component={TrackingScreen} />
      <Stack.Screen name="RideInProgress" component={RideInProgressScreen} />
      <Stack.Screen name="PaymentDue" component={PaymentDueScreen} />
      <Stack.Screen name="PaymentCheckout" component={PaymentCheckoutScreen} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
      <Stack.Screen name="Invoice" component={InvoiceScreen} />
      <Stack.Screen name="TripSuccess" component={TripSuccessScreen} />
      <Stack.Screen name="SafetySupport" component={SafetySupportScreen} />
    </Stack.Navigator>
  );
};
