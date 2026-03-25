import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAppStore } from './src/store/useAppStore'; 
import { AuthNavigator } from './src/navigation/AuthNavigator';
import { DrawerNavigator } from './src/navigation/DrawerNavigator';

const queryClient = new QueryClient();

const App = () => {
  const { user, lastActive, logout, updateLastActive } = useAppStore();
  const hasCheckedSession = React.useRef(false);

  React.useEffect(() => {
    if (user && lastActive && !hasCheckedSession.current) {
      hasCheckedSession.current = true;
      const now = Date.now();
      const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
      
      if (now - lastActive > SEVEN_DAYS_MS) {
        console.log('Session expired (7 days of inactivity). Logging out...');
        logout();
      } else {
        updateLastActive();
      }
    }
  }, [user, lastActive, logout, updateLastActive]); // Dependencies included to satisfy lint

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          {user ? <DrawerNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};

export default App;
