import Env from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';
import { getUserKey } from '../storage';

export async function APICallWithCredentials(method, path, params) {
    try {
        const userString = await AsyncStorage.getItem('user');
        const user = JSON.parse(userString);
        console.log('User [API call]:', user.token);
        if (params) {
            const response = await fetch(`${Env.API_URL}/api/${path}`,{
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${user.token}`,
                },
                body: JSON.stringify(params),
            });
            return response.json();
        } else {
            const response = await fetch(`${Env.API_URL}/api/${path}`,{
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${user.token}`,
                },
            });
            return response.json();
        }
    } catch (error) {
        console.log('Error APICALL', error);
        return;
    }

}

export async function APICall(method, path, params) {
    try {
        const user = await getUserKey();
        params.user = user.id;
        console.log('params with user', params);
        if (params && method !== 'get') {
            const request = await fetch(`${Env.API_URL}/api/${path}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });
            const response = await request.json();
            return response;
        } else {
            const request = await fetch(`${Env.API_URL}/api/${path}`);
            const response = await request.json();
            return response;
        }
    } catch (error) {
        console.log(error);
    }
}
