import React from 'react';
import {View, StyleSheet, TextInput, Button} from 'react-native';
import global from '../../styles/global';
import auth from '@react-native-firebase/auth';

function Login({navigation}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const doLogin = () => {
        auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('signed in');
        });
    };

    return (
        <View style={[global.container, styles.wrapper]}>
            <View style={styles.inputs}>
                <TextInput onChangeText={text => {
                        setEmail(text);
                    }}
                    style={styles.input} placeholder="Email"/>
                <TextInput onChangeText={text => {
                        setPassword(text);
                    }}
                    style={styles.input} placeholder="Contraseña"/>
            </View>
            <View style={styles.buttons}>
                <Button
                    onPress={() => {doLogin();}}
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
