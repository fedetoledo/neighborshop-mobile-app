import Env from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';

export const getUserKey = async () => {
    try {
      const userKey = await AsyncStorage.getItem(`${Env.USER_KEY}`);
      return userKey != null ? JSON.parse(userKey) : null;
    } catch (e) {
        console.log('[StorageKeys] Error: ', e);
    }
  };

  export const setUserKey = async (value) => {
    try {
      const userKey = JSON.stringify(value);
      await AsyncStorage.setItem(`${Env.USER_KEY}`, userKey);
    } catch (e) {
        console.log('[StorageKeys] Error: ', e);
    }
  };

  export const removeUserKey  = async () => {
    try {
      await AsyncStorage.removeItem(`${Env.USER_KEY}`);
      console.log('Token removed');
    } catch (e) {
        console.log('[StorageKeys] Error: ', e);
    }
  };
