import Env from 'react-native-config';
import React from 'react';
import {View, Text } from 'react-native';
import global from '../../styles/global.css';
import ProductCard from './atoms/ProductCard';
import { ScrollView } from 'react-native-gesture-handler';
import { LoadingView } from '../utils';

function CategoryDetail({route, navigation}) {

    const [products, setProducts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const getProducts = async category => {
        try {
            setIsLoading(true);
            const productsCall = await fetch(`${Env.API_URL}/api/products/?search=` + category);
            const productsResponse = await productsCall.json();
            setProducts(productsResponse);
            console.log(productsResponse);
            setIsLoading(false);
        } catch (error) {
            console.log('fetching error');
            console.log(error);
        }
    };

    React.useEffect(() => {
        getProducts(route.params.name);
    },[route.params.name]);

    return (
    !isLoading ?
        <View style={global.container}>
            {products.length !== 0 ?
                <ScrollView>
                    {products.map((item, index)=> {
                        console.log(item.id);
                        return (
                            <ProductCard
                                onPress={() => {
                                    navigation.navigate('ProductDetail', {productID: item.id, market: item.market});
                                }}
                                key={index}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                picture={item.images[0]}
                            />
                        );
                    })}
                </ScrollView>
            :
                <View style={global.errorContainer}>
                    <Text style={global.errorText}>No hay productos disponibles</Text>
                </View>
            }
        </View>
    : <LoadingView />
    );
}

export default CategoryDetail;
