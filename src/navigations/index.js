import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigation';

const isLoggedIn = true;

export default function Navigator() {
    return (
        <NavigationContainer>
            {
            //If the user is logged in, show the App home, if not, show Login screen
            isLoggedIn ? <AppNavigator /> : <AuthNavigator />
            }
        </NavigationContainer>
    );
}
