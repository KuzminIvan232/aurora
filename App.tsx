/**
* Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import AppNavigator from '@navigation/stacks/app';
import { navigationRef } from '@navigation/navigationUtils';
import { useEffect } from 'react';
import { incrementLaunchCount } from '@services/appStats';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { linking } from '@navigation/deepLinking';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useTheme } from '@hooks/useTheme';
import { observer } from 'mobx-react-lite';
import EStyleSheet from 'react-native-extended-stylesheet';
import { lightColors } from '@utils/colors';

EStyleSheet.build({
  $primary: lightColors.primary,
  $background: lightColors.background,
  $accent: lightColors.accent,
  $rem: 16,
});

const FallbackLoader = observer(function () {
  const { colors } = useTheme();

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
});

function App() {
  const { isDark } = useTheme();

  useEffect(() => {
    incrementLaunchCount();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
          <NavigationContainer
            ref={navigationRef}
            linking={linking}
            fallback={<FallbackLoader />}
            theme={isDark ? DarkTheme : DefaultTheme}
          >
            <AppNavigator />
          </NavigationContainer>
          <FlashMessage position="top" duration={2500} />
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default observer(App);