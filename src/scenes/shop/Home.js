import React, { useEffect } from 'react';
import {StyleSheet, View, Text, Image, Button, StatusBar} from 'react-native';
import global from '../../styles/global';
import { ScrollView } from 'react-native-gesture-handler';
import FeatureSlideShow from '../../components/shop/molecules/FeatureSlideShow';
import CategoryButton from '../../components/shop/atoms/CategoryButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

function Home({navigation}) {

    const [authUser, setAuthUser] = React.useState(auth().currentUser);
    const [categories, setCategories] = React.useState([]);

    const premiumProducts = [
        {
            name: 'Hamburguesas caseras',
            description: 'Las mejores hambuerguesas caseras con un poco de ketchup, y mostaza, quesito cheddar y mayonesa',
            price: '$500',
            picture: 'https://images.rappi.com.ar/products/f2dc6046-b5f0-4cf3-8b49-25dd768eb7c3-1589323836317.png?d=128x90',
        },
        {
            name: 'Piletas de material',
            description: 'Las mejores piletas de material',
            price: '$500000',
            picture: 'https://i.pinimg.com/474x/2c/f6/83/2cf6835095e0def00b200b36950f54fe.jpg',
        },
    ];

    async function getCategories() {
        setCategories([]);
        await firestore().collection('categories').get()
            .then(querySnapshot => {
                console.log('useEffect getCategories');
                querySnapshot.forEach(doc => {
                    let cat = {
                        name: doc.data().name,
                        imageURL: doc.data().imageURL,
                    };
                    setCategories(prevState => [...prevState, cat]);
                });
            }).catch(error => {console.error('error', error);});
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <View on style={global.container}>
            <StatusBar hidden={false} translucent={true} backgroundColor="#00b0f9" barStyle="light-content" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <FeatureSlideShow
                    itemsPerInterval={1}
                    items={premiumProducts}
                />
                <Text>Hola, {authUser.displayName}</Text>
                <Text style={styles.categoriesTitle}>Categorias</Text>
                <View style={styles.categoriesContainer}>
                    {
                        categories.map((item, key) => {
                            return <CategoryButton
                                        key={key}
                                        name={item.name}
                                        picture={item.imageURL}
                                        onPress={() => {
                                            navigation.navigate('Category', {name:item.name});
                                        }}
                                    />;
                        })
                    }
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    categoriesTitle: {
        marginBottom: 5,
        textAlign: 'center',
        fontSize: 30,
    },
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    picture: {
        width: 100,
        height: 100,
    },
});

export default Home;
