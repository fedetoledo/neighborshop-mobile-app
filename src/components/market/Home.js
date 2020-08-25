import React, { useEffect } from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import global from '../../styles/global.css';
import { ScrollView } from 'react-native-gesture-handler';
import FeatureSlideShow from '../../components/market/molecules/FeatureSlideShow';
import CategoryButton from '../../components/market/atoms/CategoryButton';
import firestore from '@react-native-firebase/firestore';
import SearchButton from '../../components/market/atoms/SearchButton';
import LinearGradient from 'react-native-linear-gradient';

function Home({navigation}) {

    const [categories, setCategories] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');

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

    //Promises
    function getCategories() {
        setCategories([]);
        firestore().collection('categories').get()
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
        <View>
            <View style={styles.searchBarContainer}>
                <View style={styles.searchBar}>
                    <TextInput
                        onChangeText={(text) => {setSearchQuery(text);}}
                        placeholder="Encontra lo que buscas "/>
                    <SearchButton onPress={() => {
                        navigation.navigate('Category', {name: searchQuery});
                    }} />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <LinearGradient style={styles.slideShowContainer} colors={['#00b0f9','#fff']}>
                        <FeatureSlideShow
                            itemsPerInterval={1}
                            items={premiumProducts}
                        />
                    </LinearGradient>
                </View>
                <View style={global.container}>
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
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBarContainer: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#00b0f9',
    },
    searchBar: {
        backgroundColor: '#fff',
        elevation: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 30,
        borderColor: '#aaa',
    },
    slideShowContainer: {
        paddingHorizontal: 10,
    },
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
