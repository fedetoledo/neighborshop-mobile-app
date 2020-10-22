import React, { useEffect } from 'react';
import {StyleSheet, TextInput, View, Text, SafeAreaView} from 'react-native';
import global from '../../styles/global.css';
import { ScrollView } from 'react-native-gesture-handler';
import FeatureSlideShow from '../../components/market/molecules/FeatureSlideShow';
import CategoryButton from '../../components/market/atoms/CategoryButton';
import SearchButton from '../../components/market/atoms/SearchButton';
import { fetchCategories } from '../../utils/api/ApiCalls';
import { LoadingView } from '../utils';

function Home({navigation}) {

    const [categories, setCategories] = React.useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(true);

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

    useEffect(() => {
        async function getCategories() {
            try {
                setIsLoading(true);
                const categoriesResponse = await fetchCategories();
                categoriesResponse !== undefined ?
                    setCategories(categoriesResponse)
                : {};
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getCategories();
    }, []);

    return (
    !isLoading ?
        <>
        <SafeAreaView style={global.safeArea}/>
            <View style={styles.searchBarContainer}>
                <View style={[global.outerShadow,styles.searchBar]}>
                    <TextInput
                        style={styles.search}
                        onChangeText={(text) => {setSearchQuery(text);}}
                        placeholder="Encontra lo que buscas "/>
                    <SearchButton onPress={() => {
                        navigation.navigate('Category', {name: searchQuery});
                    }} />
                </View>
            </View>
            <ScrollView
                style={global.container}
                showsVerticalScrollIndicator={false}>
                <FeatureSlideShow
                    itemsPerInterval={1}
                    items={premiumProducts}
                />
                <View>
                    <Text style={styles.categoriesTitle}>Categorias</Text>
                    <View style={styles.categoriesContainer}>
                        {
                            categories.map((item, key) => {
                                return (
                                    <CategoryButton
                                        key={key}
                                        name={item.name}
                                        picture={item.image}
                                        onPress={() => {
                                            navigation.navigate('Category', {name:item.name});
                                        }}
                                    />);
                            })
                        }
                    </View>
                </View>
            </ScrollView>
            </>
        : <LoadingView />
    );
}

const styles = StyleSheet.create({
    searchBarContainer: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#f5f1da',
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
    search:{
        width: '90%',
        paddingVertical: '2.5%',
    },
    slideShowContainer: {
        paddingHorizontal: 10,
    },
    categoriesTitle: {
        marginVertical: 10,
        textAlign: 'center',
        fontSize: 30,
    },
    categoriesContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    picture: {
        width: 100,
        height: 100,
    },
});

export default Home;
