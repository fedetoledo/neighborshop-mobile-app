import React from 'react';
import {StyleSheet, View, Text, Button } from 'react-native';
import CustomTextInput from '../../general/components/atoms/CustomTextInput';

function ProductDetailBox(props) {
    return (
        <View>
            <Text style={styles.descriptionTitle}>Descripcion</Text>
            <Text style={styles.description}>{props.description}</Text>
            <CustomTextInput placeholder="Cantidad"/>
            <Button title="Comprar"/>
        </View>
    );
}

const styles = StyleSheet.create({
    descriptionTitle: {
        fontSize: 22,
    },
    description: {
        marginVertical: 10,
        color: '#656565',
    },
});

export default ProductDetailBox;
