import React from 'react';
import {View, StyleSheet, TextInput, Button} from 'react-native';
import global from '../../styles/global.css';
import {AuthContext} from '../../navigations/';

function Login() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const {signIn} = React.useContext(AuthContext);

    return (
        <View style={[global.container, styles.wrapper]}>
            <View style={styles.inputs}>
                <TextInput onChangeText={text => {
                        setUsername(text);
                    }}
                    style={styles.input} placeholder="Nombre de usuario"/>
                <TextInput onChangeText={text => {
                        setPassword(text);
                    }}
                    style={styles.input} placeholder="Contraseña"/>
            </View>
            <View style={styles.buttons}>
                <Button
                    onPress={() => {signIn(username, password);}}
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
