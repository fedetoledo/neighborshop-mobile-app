import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

function Sell(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.buyerText}>{props.buyer}</Text>
            <Text style={styles.productText}>{props.product}</Text>
            <Text>{props.qty}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        backgroundColor: '#b3e5fc',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
    },
    buyerText: {
        width: '20%',
    },
    productText: {
        width: '40%',
    },
});

export default Sell;
