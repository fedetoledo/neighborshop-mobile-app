import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../scenes/auth/Login';
import SignupScreen from '../scenes/auth/Signup';
import WelcomeScreen from '../scenes/Welcome';

const Stack = createStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
            <Stack.Screen name="Login" options={{headerTitleAlign: 'center'}} component={LoginScreen} />
            <Stack.Screen name="Signup" optons={{headerTitleAlign: 'center'}} component={SignupScreen} />
        </Stack.Navigator>
    );
}
