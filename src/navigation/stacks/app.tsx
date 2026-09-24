import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AppStackParamList } from '@interfaces/navigation';

import AppInitScreen from '../screens/appInit';
import PublicNavigator from './public';
import PrivateNavigator from './private';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="AppInit"
            screenOptions={{
                headerShown: false,
                animation: 'none',
            }}
        >
            <Stack.Screen name="AppInit" component={AppInitScreen} />
            <Stack.Screen name="PublicStack" component={PublicNavigator} options={{ animation: 'fade' }} />
            <Stack.Screen name="PrivateStack" component={PrivateNavigator} />
        </Stack.Navigator>
    );
}