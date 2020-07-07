import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import global from '../../styles/global';
import { ScrollView } from 'react-native-gesture-handler';
import FeatureSlideShow from '../../components/shop/molecules/FeatureSlideShow';
import CategoryButton from '../../components/shop/atoms/CategoryButton';

function Home({navigation}) {

    const categories = ['Comida','Regalos','Jardineria','Decoracion','Postres',
                        'Eduacion','Servicios','Otros'];

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

    return (
        <View style={global.container}>
            <ScrollView>
                <FeatureSlideShow
                    itemsPerInterval={1}
                    items={premiumProducts}
                />
                <Text style={styles.categoriesTitle}>Categorias</Text>
                <View style={styles.categoriesContainer}>
                    {
                        categories.map((item, key) => {
                            return <CategoryButton
                                        key={key}
                                        name={item}
                                        onPress={() => {
                                            navigation.navigate('Category', {name:item});
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
});

export default Home;
