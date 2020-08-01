import Env from 'react-native-config';
import React from 'react';
import {ScrollView, View, Text, StyleSheet, Alert, Button} from 'react-native';
import global from '../../styles/global';
import {Rating} from 'react-native-ratings';
import ProductDetailBox from '../../components/shop/molecules/ProductDetailBox';
import PictureSlideShow from '../../components/shop/molecules/PicturesSlideshow';
import FlashMessage from 'react-native-flash-message';
import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px';

const getPreferenceId = async (payer, ...items) => {
    const response = await fetch(
        `https://api.mercadopago.com/checkout/preferences?access_token=${Env.MP_ACCESS_TOKEN}`,
        {
            method: 'POST',
            body: JSON.stringify({
                items,
                payer: {
                    email: payer,
                },
            }),
        }
    );

     console.log(payer);

    const preference = await response.json();

    return preference.id;
};

function ProductDetail({route}) {

    const [paymentResult, setPaymentResult] = React.useState(null);
    const [product, setProduct] = React.useState({});

    const startCheckout = async () => {
        try {
            const preferenceId = await getPreferenceId('test_user_46875236@testuser.com', {
                // 'title': product.name,
                // 'description': product.description,
                'title': 'Dummy item',
                'description': 'Dummy description',
                'quantity': 1,
                'currency_id': 'ARS',
                'unit_price': 10.0,
            });

            console.log('prefernece: ' + preferenceId);

            const payment = await MercadoPagoCheckout.createPayment({
                // publicKey: Env.MP_PUBLIC_KEY,
                publicKey: Env.MP_PUBLIC_KEY,
                preferenceId,
            });

            setPaymentResult(payment);
        } catch (err) {
            Alert.alert('Something went wrong', err.message);
        }
    };

    async function getProductInfo(productID) {
        try {
            const productInfoCall = await fetch(`${Env.API_URL}api/products/${productID}`);
            const productInfo = await productInfoCall.json();

            //console.log('useEffect geProductInfo: ', productInfo.images);

            setProduct(productInfo);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getProductInfo(route.params.productId);
    }, [route.params.productId]);

    return (
        <ScrollView style={global.container}>
            {
                product.images !== undefined ? <PictureSlideShow itemsPerInterval={1} items={product.images}/> : <></>
            }
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                        <Text style={styles.productName}>{product.name}</Text>
                    <View style={styles.belowName}>
                        <Text style={styles.productPrice}>$ {product.price}</Text>
                        <Rating tintColor="#eee" style={styles.rating} type="star" fractions={1} ratingCount={5} imageSize={30} />
                    </View>
                </View>
                <View style={styles.detailsContainer}>
                    <ProductDetailBox description={product.description} />
                    <Text style={styles.text}>Payment: {JSON.stringify(paymentResult)}</Text>
                    <Button onPress={startCheckout} title="comprar mp"/>
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
        marginBottom: -10,
    },
    rating: {
        backgroundColor: 'red',
    },
});

export default ProductDetail;
