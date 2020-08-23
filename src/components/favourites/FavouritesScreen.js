import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ProductCard from '../market/atoms/ProductCard';
import { ScrollView } from 'react-native-gesture-handler';
import APICallWithCredentials from '../../utils/APICallWithCredentials';

function Favourites({navigation}) {

    const [favourites, setFavourites] = React.useState([]);

    const getUserFavourites = async (uid) => {
        try {
            const fetchFavourites = await APICallWithCredentials('get', `favourites/?uid=${uid}`);
            setFavourites(fetchFavourites);
        } catch (error) {
            console.log(error);
        }
    };

    const getProductsFromFavourites = favs => {
        console.log(favs);
        const products = [];
        favs.map(fav => {
            console.log(fav);
            products.push(fav.product);
        });
        return products;
    };

    const showFavouriteProducts = () => {
        const products = getProductsFromFavourites(favourites);
        return products.map((item, index) => {
            console.log(item.market);
            return (
                <ProductCard
                    onPress={() => {
                        console.log(item);
                        navigation.navigate('ProductDetail', {productID: item.id, market: item.market});
                    }}
                    key={index}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    picture={item.images[0]}
                />
            );
        });
    };

    React.useEffect(() => {
        console.log('UseEffect favourites');
        getUserFavourites('bDoC6Rc2TedHDRFOyeMcJFisFSm1');
    },[]);

    return (
        <ScrollView>
            <Text style={styles.favouritesTitle}>Tus productos favoritos</Text>
            <View>
            {
                favourites !== [] ? showFavouriteProducts() :
                <Text>No tenes productos favoritos</Text>
            }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    favouritesTitle: {
        backgroundColor: '#00b0f9',
        fontSize: 30,
        textAlign: 'center',
        color: '#fff',
        paddingVertical: 10,
        elevation: 4,
    },
});

export default Favourites;
