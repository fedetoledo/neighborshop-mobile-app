import React from 'react';
import {View, StyleSheet, TextInput, Button} from 'react-native';
import global from '../../styles/global';

function Login({navigation}) {
    return (
        <View style={[global.container, styles.wrapper]}>
            <View style={styles.inputs}>
                <TextInput style={styles.input} placeholder="Usuario"/>
                <TextInput style={styles.input} placeholder="Contraseña"/>
            </View>
            <View style={styles.buttons}>
                <Button
                    onPress={() => {navigation.navigate('Main', {isLoggedIn: true});}}
                    color="#81d4fa" style={styles.button} title="Iniciar Sesion"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
    },
    inputs: {
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        borderRadius: 3,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: '#fafafa',
    },
});

export default Login;
