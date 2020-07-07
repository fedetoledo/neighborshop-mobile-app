import React from 'react';
import {View, StyleSheet, TextInput, Button} from 'react-native';
import global from '../../styles/global';
import { ScrollView } from 'react-native-gesture-handler';

function Login() {
    return (
        <View style={[global.container, styles.wrapper]}>
            <ScrollView contentContainerStyle={styles.wrapper}>
                <View style={styles.inputs}>
                    <TextInput style={styles.input} placeholder="Nombre" />
                    <TextInput style={styles.input} placeholder="Usuario"/>
                    <TextInput style={styles.input} placeholder="Contraseña" type="password"/>
                    <TextInput style={styles.input} placeholder="Email" />
                    <TextInput style={styles.input} placeholder="Telefono" />
                </View>
                <View style={styles.buttons}>
                    <Button color="#81d4fa" style={styles.button} title="Registrarse"/>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    inputs: {
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        borderRadius: 2,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: '#fafafa',
    },
});

export default Login;
