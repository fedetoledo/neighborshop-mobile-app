import React from 'react';
import {StyleSheet, Text, ImageBackground} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


function CategoryButton(props) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.categoryContainer}>
                <ImageBackground style={styles.picture} imageStyle={styles.innerPicture} source={{uri: props.picture}}>
                    <Text style={styles.categoryTitle}>{props.name}</Text>
                </ImageBackground>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    categoryContainer: {
        elevation: 3,
        height: 100,
        width: 170,
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 4,
        backgroundColor: '#333',
    },
    picture: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 4,
    },
    innerPicture: {
        opacity: 0.4,
    },
    categoryTitle: {
        opacity: 1,
        margin: 10,
        fontSize: 20,
        color: '#fff',
    },
});

export default CategoryButton;
