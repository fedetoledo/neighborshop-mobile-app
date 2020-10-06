import Env from 'react-native-config';
import { getUserKey } from '../storage';
import {APICall} from './APICall'

export const getProductInfo = async (product_id) => {
    try {
        const productInfoCall = await fetch(`${Env.API_URL}/api/products/${product_id}`);
        const productInfo = await productInfoCall.json();
        return productInfo;
    } catch (error) {
        console.log(error);
    }
}

export const checkProductRating = async (product_id) => {
    try {
        const response = await APICall('post', `product/rating/${product_id}`, {})
        return response;
    } catch(error) {
        console.log(error);
    }
}

export const addProductRating = async (product_id, rating) => {
    try {
        const response = await APICall('post', 'rating/', {
            rating_value: rating,
            product: product_id,
        });
        return response;
    } catch(error) {
        console.log(error);
    }
}

export const checkFavourite = async (product_id) => {
    try {
        const user = await getUserKey();
        const checkFavouriteCall = await fetch(`${Env.API_URL}/api/user/check-favourite`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user: user.id, product: product_id}),
        });
        const response = await checkFavouriteCall.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const toggleFavourite = async (product_id) => {
    try {
        const user = await getUserKey();
        const toggleFavouriteCall = await fetch(`${Env.API_URL}/api/user/toggle-favourite`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user: user.id, product: product_id}),
        });
        const response = await toggleFavouriteCall.json()
        return response;
    } catch (error) {
        console.log(error);
    }
}