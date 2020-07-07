import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

function CustomTextInput(props) {
    return (
        <TextInput style={styles.input} placeholder={props.placeholder}/>
    );
}

const styles = StyleSheet.create({
    input: {
    },
});

export default CustomTextInput;
