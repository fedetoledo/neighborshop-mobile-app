import React from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput, Linking} from 'react-native';
import {Button} from '../utils';
import global from '../../styles/global.css';
import {Rating} from 'react-native-ratings';
import PictureSlideShow from '../../components/market/molecules/PicturesSlideshow';
import FlashMessage from 'react-native-flash-message';
import FavouriteButton from '../../components/market/atoms/FavouriteButton';
import { 
    getProductInfo, 
    checkFavourite, 
    toggleFavourite, 
    checkProductRating,
    addProductRating 
} from "../../utils/api/product";

function ProductDetail({navigation, route}) {

    const [product, setProduct] = React.useState({});
    const [whatsappMessage, setWhatsappMessage] = React.useState('');
    const [isFav, setIsFav] = React.useState(false);
    const [rating, setRating] = React.useState({});

    const sendWhatsapp = async (message) => {
        try {
            await Linking.openURL(`whatsapp://send?text=${message}&phone=${route.params.market.phone_number}`)
            console.log('Message sent');
        } catch(error) {
            console.log(error);
        }
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <FavouriteButton isToggled={isFav} onPress={() => toggleFavourite(route.params.productID)} />
            ),
        });
    });

    React.useEffect(() => {
        async function getData() {
            try {
                const fetchedProduct = await getProductInfo(route.params.productID);
                const checkFav = await checkFavourite(route.params.productID);
                const productRating = await checkProductRating(route.params.productID);
                console.log('product rating', productRating)
                setProduct(fetchedProduct);
                setRating(productRating);
                setIsFav(checkFav.isAlreadyFav);
            } catch(error) { 
                console.log(error);
            }
        }
        getData();
    }, []);

    return (
        <ScrollView style={global.container}>
            {
                product.images !== undefined ? 
                    <PictureSlideShow itemsPerInterval={1} items={product.images}/> 
                : 
                    <></>
            }
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <View style={styles.belowName}>
                        <Text style={styles.productPrice}>${product.price}</Text>
                        <Rating
                            onFinishRating={rating => {
                                addProductRating(route.params.productID, rating)
                            }}
                            tintColor="#f5f1da"
                            ratingBackgroundColor='#545454'
                            type="custom" 
                            fractions={1}
                            startingValue={rating.average_rating}
                            readonly={rating.is_rated}
                            ratingCount={5} 
                            imageSize={30} />
                    </View>
                </View>
                <View style={global.horizontalLine} />
                <View style={styles.detailsContainer}>
                    <Text style={styles.descriptionTitle}>Descripcion</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>
                <View style={global.horizontalLine} />
                <TextInput
                    style={global.textInput} 
                    placeholder="Mensaje"
                    onChangeText={(text) => {setWhatsappMessage(text)}}
                />
                <Button
                    onPress={() => {sendWhatsapp(whatsappMessage);}}
                    title='Contactar (Whatsapp)'
                />
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
        fontWeight: '300',
        color: '#323232',
    },
    belowName: {
        marginTop: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productPrice: {
        fontSize: 30,
        fontWeight: '200',
        color: '#323232',
    },
    detailsContainer: {
        paddingVertical: 10,
        marginVertical: 15,
    },
    descriptionTitle: {
        fontSize: 20,
        marginBottom: 10,
        color: '#606060'
    },
    description: {
        color: '#909090'
    },
});

export default ProductDetail;
