import Env from 'react-native-config';
import AsyncStorage from '@react-native-community/async-storage';

export default async function APICallWithCredentials(method, path, params) {
    try {
        const token = await AsyncStorage.getItem('tokenKey');
        console.log(token);
        console.log(params);
        if (params) {
            console.log('with params');
            const response = await fetch(`${Env.API_URL}/api/${path}`,{
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(params),
            });
            return response.json();
        } else {
            console.log('without params');
            const response = await fetch(`${Env.API_URL}/api/${path}`,{
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
            });
            return response.json();
        }
    } catch (error) {
        console.log(error);
        return;
    }

}
