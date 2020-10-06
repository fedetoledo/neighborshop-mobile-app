import React from "react";
import {View, Text, TouchableOpacity, StyleSheet } from "react-native";
import SearchButton from "../market/atoms/SearchButton";

export const Button = (props) => {
    return (
        <TouchableOpacity 
        onPress={props.onPress}
        style={styles.button}>
            <Text style={styles.buttonTitle}>{props.title}</Text>
        </TouchableOpacity>
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

export const SearchBar = (props) => {
    return (
        <View style={styles.searchBarContainer}>
                <TextInput 
                    onChangeText={props.onChangeText}
                    placeholder={props.placeholder}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    // BUTTON STYLE
    button: {
        width: '100%',
        backgroundColor: '#81d4fa',
        padding: 10,
        marginVertical: 15,
        borderRadius: 4,

        shadowColor: "#000",
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
        textAlign: "center"
    },

    // SEARCH BAR STYLE
    searchBarContainer: {
        marginVertical: 20,
        marginHorizontal: 10,
    }
});
