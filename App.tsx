/**
* Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '@navigation/stacks/app';
import { navigationRef } from '@navigation/navigationUtils';
import { useEffect } from 'react';
import { incrementLaunchCount } from '@services/appStats';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '@utils/colors';
import { linking } from '@navigation/deepLinking';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

function FallbackLoader() {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    }}>
      <ActivityIndicator size="large" color={colors.muted} />
    </View>
  );
}

export default function App() {
  useEffect(() => {
    incrementLaunchCount();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <NavigationContainer
            ref={navigationRef}
            linking={linking}
            fallback={<FallbackLoader />}
          >
            <AppNavigator />
          </NavigationContainer>
          <FlashMessage position="top" duration={2500} />
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}