import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../components/auth/LoginScreen';
import SignupScreen from '../components/auth/SignupScreen';
import WelcomeScreen from '../components/auth/Welcome';

const Stack = createStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome"component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
}
