import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PrivateStackParamList } from '@interfaces/navigation';

import DashboardScreen from '../screens/dashboard';
import ProfileScreen from '../screens/profile';
import SettingsScreen from '../screens/settings';

const Stack = createNativeStackNavigator<PrivateStackParamList>();

export default function PrivateNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
    );
}