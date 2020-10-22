import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Button, SafeAreaView} from 'react-native';
import global from '../../styles/global.css';
import {AuthContext} from '../../navigations';
import { ScrollView } from 'react-native-gesture-handler';

function Signup() {

    const {signUp} = React.useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    // const [telefono, setTelefono] = useState('');

    const doSignup = () => {
        if (password !== password2) {
            console.log('Passwords does not match!');
        } else {
            const data = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                password: password,
            };
            signUp(data);
        }
    };

    return (
        <View style={[global.container, styles.wrapper]}>
            <SafeAreaView style={global.safeArea}/>
            <ScrollView contentContainerStyle={styles.wrapper}>
                <View style={styles.inputs}>
                    <TextInput style={styles.textInput} onChangeText={text => setFirstName(text)} placeholder="Nombre" />
                    <TextInput style={styles.textInput} onChangeText={text => setLastName(text)} placeholder="Apellido" />
                    <TextInput style={styles.textInput} onChangeText={text => setUsername(text)} placeholder="Usuario"/>
                    <TextInput style={styles.textInput} onChangeText={text => setEmail(text)} placeholder="Email" />
                    <TextInput style={styles.textInput} onChangeText={text => setPassword(text)} placeholder="Contraseña" type="password"/>
                    <TextInput style={styles.textInput} onChangeText={text => setPassword2(text)} placeholder="Confirmar contraseña" type="password"/>
                    {/* <TextInput style={styles.input} onChangeText={text => setTelefono(text)} placeholder="Telefono" /> */}
                </View>
                <View style={styles.buttons}>
                    <Button
                        onPress={() => {doSignup();}}
                        color="#81d4fa"
                        style={styles.button}
                        title="Registrarse"/>
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
    textInput: {
        borderRadius: 4,
        padding: 8,
        marginVertical: 15,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width:0, height:2},
        shadowOpacity: 0.15,
        shadowRadius: 1,
    },
});

export default Signup;
