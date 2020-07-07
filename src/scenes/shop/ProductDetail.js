import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import global from '../../styles/global';
import {Rating} from 'react-native-ratings';
import ProductDetailBox from '../../components/shop/molecules/ProductDetailBox';
import PictureSlideShow from '../../components/shop/molecules/PicturesSlideshow';
import FlashMessage from 'react-native-flash-message';

function ProductDetail({route}) {

    const {product} = route.params;

    return (
        <ScrollView style={global.container}>
            <PictureSlideShow itemsPerInterval={1} items={product.pictures}/>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                        <Text style={styles.productName}>{product.name}</Text>
                    <View style={styles.belowName}>
                        <Text style={styles.productPrice}>$ {product.price}</Text>
                        <Rating type="star" fractions={1} ratingCount={5} imageSize={30} />
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <ProductDetailBox description={product.description} />
                </View>
            </View>
            <FlashMessage position="top" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    headerContainer: {
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    productName: {
        fontSize: 26,
        color: '#323232',
    },
    belowName: {
        marginHorizontal: 5,
        marginTop: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productPrice: {
        fontSize: 30,
        color: '#323232',
    },
    detailsContainer: {
        marginBottom: 10,
    },
});

export default ProductDetail;
