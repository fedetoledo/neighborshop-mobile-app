import Env from 'react-native-config';
import React from 'react';
import {StyleSheet, View, Text } from 'react-native';
import global from '../../styles/global.css';
import ProductCard from './atoms/ProductCard';
import { ScrollView } from 'react-native-gesture-handler';

function CategoryDetail({route, navigation}) {

    const [products, setProducts] = React.useState([]);
    const [displayError, setDisplayError] = React.useState('');

    const getProducts = async category => {
        try {
            console.log('CAT: ', category);
            const productsCall = await fetch(`${Env.API_URL}/api/products/?search=` + category);
            const productsResponse = await productsCall.json();
                setProducts(productsResponse);
                console.log('products',products);
        } catch (error) {
            setDisplayError(error);
            console.log(error);
        }
    };

    React.useEffect(() => {
        getProducts(route.params.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return (
        <View style={global.container}>
            <ScrollView>
                {products.length !== 0 ?
                    products.map((item, index)=> {
                        return <ProductCard
                                    onPress={() => {
                                        navigation.navigate('ProductDetail', {productID: item.id, market: item.market});
                                    }}
                                    key={index}
                                    name={item.name}
                                    description={item.description}
                                    price={item.price}
                                    picture={item.images[0]}
                                />;
                    })
                : displayError === '' ? <Text style={styles.noProducts}>No hay productos disponibles</Text>
                    : <Text style={styles.noProducts}>Ocurrio un error, intente mas tarde</Text>
                }
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    noProducts: {
        textAlign: 'center',
    },
});

export default CategoryDetail;
