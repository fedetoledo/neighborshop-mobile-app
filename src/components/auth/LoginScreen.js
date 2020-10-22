import React from 'react';
import {Text, TextInput, View, StyleSheet, SafeAreaView, Image} from 'react-native';
import global from '../../styles/global.css';
import {AuthContext} from '../../navigations/';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from '../utils';
import { ScrollView } from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';
function Login({navigation}) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const {signIn} = React.useContext(AuthContext);

    const clearInputFields = () => {
        setUsername('');
        setPassword('');
    };

    return (
        <LinearGradient
        colors={['#00c6fb', '#005bea']}
        useAngle
        angle={180}
        angleCenter={{x:0.5, y:0.5}}
        style={styles.wrapper}
        locations={[0,1]}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView />
                <View style={styles.imageWrapper}>
                    <Image
                    style={styles.image}
                    source={{
                        uri: 'https://storage.googleapis.com/barrio-ecommerce.appspot.com/assets/ns_logo.png',
                    }}/>
                </View>
                <View style={styles.textInputs}>
                    <TextInput
                        onChangeText={text => {setUsername(text);}}
                        style={styles.textInput}
                        placeholder="Nombre de usuario"
                        value={username}
                    />

                    <TextInput
                        secureTextEntry={true}
                        onChangeText={text => {setPassword(text);}}
                        style={styles.textInput}
                        placeholder="Contraseña"
                        value={password}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        onPress={() => {signIn(username, password); clearInputFields();}}
                        style={styles.button}
                        title="Iniciar Sesion"/>

                    <Text style={styles.noAccount}>No tenes una cuenta?{' '}
                        <Text
                            onPress={() => {
                                navigation.navigate('Signup');
                            }}
                            style={global.linkText}>Registrate ahora!</Text>
                    </Text>
                </View>
                <FlashMessage position="top"/>
        </ScrollView>
            </LinearGradient>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
    },
    imageWrapper: {
    },
    image: {
        alignSelf: 'center',
        width: 200,
        height: 200,
    },
    textInputs: {
    },
    textInput: {
        borderRadius: 4,
        padding: 8,
        marginVertical: 15,
        backgroundColor: '#fff',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width:0, height:3},
        shadowOpacity: 0.15,
        shadowRadius: 1,
    },
    buttonWrapper: {
    },
    noAccount: {
        marginTop: 10,
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
    },
});

export default Login;
