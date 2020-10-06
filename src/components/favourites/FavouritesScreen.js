import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, RefreshControl} from 'react-native';
import ProductCard from '../market/atoms/ProductCard';
import { ScrollView } from 'react-native-gesture-handler';
import { getUserFavourites } from "../../utils/api/ApiCalls";
import { getUserKey } from "../../utils//storage";
import global from '../../styles/global.css';

function Favourites({navigation}) {

    const [favourites, setFavourites] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getFavourites();
        setRefreshing(false);
    })

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
    
    async function getFavourites(){
        const user = await getUserKey();
        const fetchedFavourites = await getUserFavourites(user.id);
        setFavourites(fetchedFavourites);
        console.log(fetchedFavourites);
    }

    React.useEffect(() => {
        getFavourites();
    },[]);

    return (
        <ScrollView 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            style={global.container}>
            <SafeAreaView />
            <Text style={styles.favouritesTitle}>Tus productos favoritos</Text>
            <View>
            {
                favourites !== [] ? showFavouriteProducts() :
                <Text style={styles.noProducts}>No tenes productos favoritos</Text>
            }
            </View>
        </ScrollView>
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
        justifyContent: "center",
        alignItems: "center",
    }
});

export default Favourites;
