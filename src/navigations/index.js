import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigation';
import auth from '@react-native-firebase/auth';


export default function Navigator() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(null);

    auth().onAuthStateChanged(user => {
        setIsLoggedIn(user);
    });

    return (
        <NavigationContainer>
            {
            //If the user is logged in, show the App home, if not, show Login screen
            isLoggedIn ? <AppNavigator /> : <AuthNavigator />
            }
        </NavigationContainer>
    );
}
