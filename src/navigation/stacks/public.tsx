import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { PublicStackParamList } from '@interfaces/navigation';

import WelcomeScreen from '../screens/welcome';
import LoginScreen from '../screens/login';

const Stack = createNativeStackNavigator<PublicStackParamList>();

export default function PublicNavigator() {
    return (
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    );
}