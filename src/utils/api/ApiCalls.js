import {APICallWithCredentials} from "./APICall";
import { getUserKey } from "../storage";
import Env from "react-native-config";

export const getUserFavourites = async id => {
    try {
        const favourites = await APICallWithCredentials('get', `favourites/?id=${id}`); // TODO Check path
        console.log('Favourites json: ',favourites)
        return favourites;
    } catch (error) {
        console.log('[API Call] Categories ', error);
    }
};

export const fetchCategories = async () => {
    try {
        const fetchCategories = await fetch(`${Env.API_URL}/api/categories`);
        const categoriesJson = await fetchCategories.json();
        return categoriesJson;
    } catch(error) {
        console.log('[Categories] Error: ', error);
    }
}

export const getUserById = async () => {
    try {
        const userKey = await getUserKey();
        console.log('Get user by id (key): ', userKey)
        const user = await APICallWithCredentials('get', `users/${userKey.id}/`);
        return user;
    } catch (error) {
        console.log('[API Call] Error: ', error);
        return {'error':'Error fetching user'}
    }
};

export const getUserToken = async (username, password) => {
    try {
        const fetchCredentials = await fetch(`${Env.API_URL}/api/api-token`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username:username, password:password}),
        });
        const userJson = await fetchCredentials.json();
        return userJson;
        
    } catch (error) {
        console.log('Error signIn action', error);
    }
}

export const uploadUserPicture = async (new_image, user_id) => {
    try {
        const uploadPicture = await fetch(`${Env.API_URL}/user/upload-picture`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({image_data: new_image, user_id:user_id})
        })
    } catch(error) {
        console.log(error)
    }
}