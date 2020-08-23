import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { View, Text, Image, StyleSheet } from 'react-native';

function ProductCard(props) {
    return (
        <TouchableWithoutFeedback
            onPress={props.onPress}
            style={styles.container}
        >
            <View style={styles.title}>
                <Text style={styles.productName}>{props.name}</Text>
                <Text style={styles.productPrice}>$ {props.price}</Text>
            </View>
            <Image style={styles.picture} source={{uri: props.picture}}/>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#888',
        padding: 20,
    },
    title: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    productName: {
        fontSize: 16,
        color: '#676767',
    },
    productPrice: {
        color: '#545454',
        fontSize: 20,
    },
    picture: {
        marginLeft: 5,
        borderRadius: 2,
        width: 110,
        height: 100,
    },
});

export default ProductCard;
