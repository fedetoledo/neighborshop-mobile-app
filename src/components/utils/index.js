import React from 'react';
import {ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';


export const Button = (props) => {
    return (
        <TouchableOpacity
        onPress={props.onPress}
        style={styles.button}>
            <Text style={styles.buttonTitle}>{props.title}</Text>
        </TouchableOpacity>
    );
};

export const LoadingView = () => {
    return (
        <View style={styles.centeredView}>
            <ActivityIndicator size="large" color="#363636"/>
            <Text style={styles.loadingText}>Cargando...</Text>
        </View>
    );
};

// export const TextInput = (props) => {
//     return (
//         <TextInput
//             style={styles.textInput}
//             placeholder={props.placeholder}
//             onChangeText={props.onChangeText}
//         />
//     )
// };

const styles = StyleSheet.create({
    // Button style
    button: {
        width: '100%',
        backgroundColor: '#81d4fa',
        padding: 10,
        marginVertical: 15,
        borderRadius: 4,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2,
        elevation: 3,
    },
    buttonTitle: {
        fontFamily: 'System',
        fontWeight: '700',
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },

    // Loading view style
    centeredView: {
        backgroundColor: '#f5f1da',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      loadingText: {
        marginTop: 10,
      },
    // Search Bar style
    searchBarContainer: {
        marginVertical: 20,
        marginHorizontal: 10,
    },
});
