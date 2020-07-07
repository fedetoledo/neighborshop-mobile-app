import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import global from '../styles/global';
import Sell from '../components/shop/atoms/Sell';
import { ScrollView } from 'react-native-gesture-handler';

function Store() {
    return (
        <>
            <View style={global.container}>
                <Text style={styles.storeName}>Almacen de Frutos</Text>
                <View style={styles.lastSellsContainer}>
                    <Text style={styles.sellsText}>Ultimas Ventas</Text>
                    <ScrollView>
                            <Sell product="1kg helado" buyer="Federico" qty="500"/>
                            <Sell product="1kg helado" buyer="Roxana" qty="500"/>
                            <Sell product="1kg helado" buyer="Ariel" qty="500"/>
                            <Sell product="1kg helado" buyer="Ariel" qty="500"/>
                            <Sell product="1kg helado" buyer="Ariel" qty="500"/>
                            <Sell product="1kg helado" buyer="Ariel" qty="500"/>
                            <Sell product="1kg helado" buyer="Santiago" qty="500"/>
                            <Sell product="Producto de nombre largo largo ....." buyer="Felipe" qty="500"/>
                    </ScrollView>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    storeName: {
        backgroundColor: '#0077c1',
        borderRadius: 5,
        elevation: 4,
        fontSize: 32,
        color: '#fff',
        textAlign: 'center',
    },
    lastSellsContainer: {
        marginTop: 20,
    },
    sellsText: {
        fontSize: 20,
        textAlign: 'center',
    },
});

export default Store;
