import Env from 'react-native-config';
import React from 'react';
import {ScrollView, View, Text, StyleSheet, Alert, Button} from 'react-native';
import global from '../../styles/global.css';
import {Rating} from 'react-native-ratings';
import PictureSlideShow from '../../components/market/molecules/PicturesSlideshow';
import FlashMessage from 'react-native-flash-message';
import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px';
import APICallWithCredentials from '../../utils/APICallWithCredentials';
import FavouriteButton from '../../components/market/atoms/FavouriteButton';
import { TextInput } from 'react-native-gesture-handler';

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
                marketplace_fee: 1.25,
            }),
        }
    );
    const preference = await response.json();

    return preference.id;
};

function ProductDetail({navigation, route}) {

    const [paymentResult, setPaymentResult] = React.useState(null);
    const [product, setProduct] = React.useState({});

    const startCheckout = async () => {
        try {
            const preferenceId = await getPreferenceId('test@user.com', {
                'title': product.name,
                'description': product.description,
                'quantity': 1,
                'currency_id': 'ARS',
                'unit_price': 10.0,
            });

            console.log('prefernece: ' + preferenceId);

            const payment = await MercadoPagoCheckout.createPayment({
                //publicKey: 'TEST-34cf509b-6f78-4318-ae23-dcd4d639fe5d',
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
            const productInfoCall = await fetch(`${Env.API_URL}/api/products/${productID}`);
            const productInfo = await productInfoCall.json();
            setProduct(productInfo);
        } catch (error) {
            console.log(error);
        }
    }

    const toggleFavourite = async () => {
        const newFavourite = await APICallWithCredentials('post', 'favourites/', {user:27,product:route.params.productID});
        console.log('newfav',newFavourite);
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <FavouriteButton onPress={() => toggleFavourite()} />
            ),
        });
    });

    React.useEffect(() => {
        getProductInfo(route.params.productID);
    }, [route.params.productID]);

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
                    <Text style={styles.descriptionTitle}>Descripcion</Text>
                    <Text style={styles.description}>{product.description}</Text>
                    <TextInput placeholder="Cantidad"/>
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
