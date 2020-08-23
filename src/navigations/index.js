import Env from 'react-native-config';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import { Text } from 'react-native';

export const AuthContext = React.createContext();

export default function Navigator() {

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'RESTORE_TOKEN':
              return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
              };
            case 'SIGN_IN':
              return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
              };
            case 'SIGN_OUT':
              return {
                ...prevState,
                isSignout: true,
                userToken: null,
              };
          }
        },
        {
          isLoading: true,
          isSignout: false,
          userToken: null,
        }
      );

      React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
          let userToken;

          try {
            userToken = await AsyncStorage.getItem('tokenKey');
          } catch (e) {
            // Restoring token failed
          }

          // After restoring token, we may need to validate it in production apps

          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
      }, []);

      const authContext = React.useMemo(
        () => ({
          signIn: async (username, password) => {
            // In a production app, we need to send some data (usually username, password) to server and get a token
            // We will also need to handle errors if sign in failed
            // After getting token, we need to persist the token using `AsyncStorage`
            // In the example, we'll use a dummy token
            try {
                const getTokenAuth = await fetch(`${Env.API_URL}/api-token`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({username:username, password:password}),
                });
                const tokenResponse = await getTokenAuth.json();
                console.log('token in login: ',tokenResponse.token);
                await AsyncStorage.setItem('tokenKey', tokenResponse.token);
                dispatch({ type: 'SIGN_IN', token: tokenResponse.token });
            } catch (error) {
                console.log(error);
            }

          },
          signOut: () => dispatch({ type: 'SIGN_OUT' }),
          signUp: async data => {
            // In a production app, we need to send user data to server and get a token
            // We will also need to handle errors if sign up failed
            // After getting token, we need to persist the token using `AsyncStorage`
            // In the example, we'll use a dummy token

            dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
          },
        }),
        []
      );

    return (
      state.isLoading ? (
        <Text>LOADING</Text>
      ) : (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {
                //If the user is logged in, show the App home, if not, show Login screen
                state.userToken !== null ? <AppNavigator /> : <AuthNavigator />
                }
            </NavigationContainer>
        </AuthContext.Provider>
      )
    );
}
