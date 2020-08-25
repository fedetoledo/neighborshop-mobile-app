import React from 'react';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';

function FeatureCard(props) {
    return (
        <View style={styles.cardFeaturing}>
            <View style={styles.title}>
                <Text style={styles.name}>{props.name}</Text>
                <Text style={styles.description}>{props.description}</Text>
            </View>

            <ImageBackground
                style={styles.picture}
                imageStyle={styles.picture}
                source={{uri: props.picture}}
            >
                <Text style={styles.price}>{props.price}</Text>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    cardFeaturing: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 140,
        marginHorizontal: 5,
    },
    title: {
        height: '100%',
        backgroundColor: '#333',
        flex: 1,
        justifyContent: 'flex-start',
        paddingLeft: 5,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        paddingTop: 10,
    },
    name: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 10,
    },
    description: {
        color: '#dedede',
    },
    picture: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        width: 128,
        height: '100%',
    },
    price: {
        textAlign: 'center',
        backgroundColor: '#b71c1c',
        marginTop: 10,
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        fontSize: 18,
        color: '#fff',
    },
});

export default FeatureCard;
