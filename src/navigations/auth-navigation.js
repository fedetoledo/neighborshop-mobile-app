import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../scenes/auth/Login';
import SignupScreen from '../scenes/auth/Signup';

const Stack = createStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
}
