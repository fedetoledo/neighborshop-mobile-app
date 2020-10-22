import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, RefreshControl} from 'react-native';
import ProductCard from '../market/atoms/ProductCard';
import { ScrollView } from 'react-native-gesture-handler';
import { getUserFavourites } from '../../utils/api/ApiCalls';
import { getUserKey } from '../../utils//storage';
import global from '../../styles/global.css';
import { LoadingView } from '../utils';

function Favourites({navigation}) {

    const [favourites, setFavourites] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getFavourites();
        setRefreshing(false);
    }, []);

    const getProductsFromFavourites = favs => {
        const products = [];
        favs.map(fav => {
            products.push(fav.product);
        });
        return products;
    };

    const showFavouriteProducts = () => {
        const products = getProductsFromFavourites(favourites);
        return products.map((item, index) => {
            return (
                <ProductCard
                    onPress={() => {
                        navigation.navigate('ProductDetail', {productID: item.id, market: item.market.name});
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

    async function getFavourites(){
        const user = await getUserKey();
        const fetchedFavourites = await getUserFavourites(user.id);
        setFavourites(fetchedFavourites);
        console.log(fetchedFavourites);
    }

    async function getFavourites(){
        try {
            setIsLoading(true);
            const user = await getUserKey();
            const fetchedFavourites = await getUserFavourites(user.id);
            setFavourites(fetchedFavourites);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getFavourites();
    },[]);

    return (
    !isLoading ?
        <ScrollView
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            style={global.container}>
            <SafeAreaView />
            <Text style={styles.favouritesTitle}>Tus productos favoritos</Text>
            <View>
            {
                favourites.length !== 0 ? showFavouriteProducts() :
                <View style={styles.noProducts}>
                    <Text>No tenes productos favoritos</Text>
                </View>
            }
            </View>
        </ScrollView>
    : <LoadingView />
    );
}

const styles = StyleSheet.create({
    favouritesTitle: {
        fontSize: 30,
        textAlign: 'center',
        color: '#333',
        paddingVertical: 10,
        elevation: 4,
    },
    noProducts: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Favourites;
