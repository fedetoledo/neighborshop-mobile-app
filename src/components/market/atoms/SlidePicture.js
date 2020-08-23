import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';

function SlidePicture(props) {
    return (
        <View style={styles.slideContainer}>
            <ImageBackground
                style={styles.picture}
                imageStyle={styles.picture}
                source={{uri: props.picture}}
             />
        </View>
    );
}

const styles = StyleSheet.create({
    slideContainer: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 200,
    },
    picture: {
        width: '100%',
        height: '100%',
    },
});

export default SlidePicture;
