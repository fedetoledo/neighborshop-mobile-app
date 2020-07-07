import React from 'react';
import {StyleSheet, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function CategoryButton(props) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{props.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    categoryContainer: {
        elevation: 4,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 170,
        backgroundColor: '#00b0ff',
        marginVertical: 5,
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 5,
    },
    categoryTitle: {
        fontSize: 18,
        color: '#fafafa',
    },
});

export default CategoryButton;
