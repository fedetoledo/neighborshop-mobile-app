import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Button} from 'react-native';
import global from '../../styles/global';
import { ScrollView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

function Signup() {

    const [nombre, setNombre] = useState('');
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');

    const signup = () => {
        if (password === password2) {
            auth().createUserWithEmailAndPassword(email, password)
            .then(data => {
                data.user.updateProfile({
                    displayName: nombre,
                    phoneNumber: telefono,
                });
            });
        }
    };

    return (
        <View style={[global.container, styles.wrapper]}>
            <ScrollView contentContainerStyle={styles.wrapper}>
                <View style={styles.inputs}>
                    <TextInput style={styles.input} onChangeText={text => setNombre(text)} placeholder="Nombre" />
                    <TextInput style={styles.input} onChangeText={text => setUsuario(text)} placeholder="Usuario"/>
                    <TextInput style={styles.input} onChangeText={text => setPassword(text)} placeholder="Contraseña" type="password"/>
                    <TextInput style={styles.input} onChangeText={text => setPassword2(text)} placeholder="Confirmar contraseña" type="password"/>
                    <TextInput style={styles.input} onChangeText={text => setEmail(text)} placeholder="Email" />
                    <TextInput style={styles.input} onChangeText={text => setTelefono(text)} placeholder="Telefono" />
                </View>
                <View style={styles.buttons}>
                    <Button onPress={() => {signup();}} color="#81d4fa" style={styles.button} title="Registrarse"/>
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

export default Signup;
