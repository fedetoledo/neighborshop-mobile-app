import Env from 'react-native-config';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigation';
import {showMessage} from 'react-native-flash-message';
import { setUserKey, removeUserKey, getUserKey } from '../utils/storage';
import { getUserToken } from '../utils/api/ApiCalls';
import { LoadingView } from '../components/utils';

export const AuthContext = React.createContext();

export default function Navigator() {

    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
          switch (action.type) {
            case 'RESTORE_TOKEN':
              return {
                ...prevState,
                user: action.user,
                isLoading: false,
              };
            case 'SIGN_IN':
              return {
                ...prevState,
                isSignout: false,
                user: action.user,
              };
            case 'SIGN_OUT':
              return {
                ...prevState,
                isSignout: true,
                user: null,
              };
          }
        },
        {
          isLoading: true,
          isSignout: false,
          user: null,
        }
      );

      React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
          let credentials;
          try {
            credentials = await getUserKey();
            console.log('CREDENTIALS AT FIRST LOAD: ', credentials);
            dispatch({ type: 'RESTORE_TOKEN', user: credentials });
          } catch (e) {
            console.log('[RestoreToken]Restore failed:', e);
          }
        };

        bootstrapAsync();
      }, []);

      const authContext = React.useMemo(
        () => ({
          signIn: async (username, password) => {
            try {
              const credentials = await getUserToken(username, password);
              console.log(credentials);
              credentials.token !== undefined ? [
                await setUserKey(credentials),
                dispatch({type: 'SIGN_IN', user: credentials}),
              ] :
                showMessage({
                  message: 'Usuario o contrasena incorrecto',
                  type: 'danger',
                });
            } catch (error) {
              console.log('Error signIn action', error);
            }

          },
          signOut: async () => {
            try {
              await removeUserKey();
              dispatch({ type: 'SIGN_OUT' });
            } catch (error) {
              console.log('[signout] Error', error);
            }
          },
          signUp: async (data) => {
            // In a production app, we need to send user data to server and get a token
            // We will also need to handle errors if sign up failed
            // After getting token, we need to persist the token using `AsyncStorage`
            // In the example, we'll use a dummy token
            try {
              const signupUser = await fetch(`${Env.API_URL}/api/user/signup-mobile`, {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  firstName: data.firstName,
                  lastName: data.lastName,
                  username: data.username,
                  email: data.email,
                  password: data.password,
                }),
              });
              const credentials = await signupUser.json();
              console.log(credentials);
              credentials.token !== undefined ? [
                await setUserKey(credentials),
                dispatch({type: 'SIGN_IN', user: credentials}),
              ] :
                showMessage({
                  message: 'Usuario o contrasena incorrecto',
                  type: 'danger',
                });
            } catch (error) {
              console.log('[Signup]Error: ', error);
            }
          },
        }),
        []
      );

    return (
      state.isLoading ? (
        <LoadingView />
      ) : (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {
                //If the user is logged in, show the App home, if not, show Login screen
                state.user !== null ? <AppNavigator /> : <AuthNavigator />
                }
            </NavigationContainer>
        </AuthContext.Provider>
      )
    );
}

