import React from 'react';
import {StyleSheet, View, Text, SafeAreaView} from 'react-native';
import global from '../../styles/global.css';
import LinearGradient from 'react-native-linear-gradient';
import {Button} from "../utils";

export default function Welcome({navigation}) {
    return (
        <LinearGradient
            colors={['#00c6fb', '#005bea']}
            useAngle
            angle={180}
            angleCenter={{x:0.5, y:0.5}}
            style={styles.wrapper}
            locations={[0,1]}>
            <SafeAreaView/>
            <Text style={styles.welcomeText}>Bienvenido!</Text>
            <View style={styles.buttons}>
                <Button
                    onPress={() => {navigation.navigate('Login');}}
                    title="Iniciar sesion" />
                <Button
                    onPress={() => {navigation.navigate('Signup');}}
                    title="Registrarse" />
            </View>
        </LinearGradient>
    );
}
// background-image: linear-gradient(to top, #00c6fb 0%, #005bea 100%);
// background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        
    },
    welcomeText: {
        flex: .2,
        // color: '#454542',
        color: '#fff',
        fontSize: 40,
        fontWeight: '700',
    },
    buttons: {
        flex: .3,
        width: '100%',
        paddingHorizontal: 10,
    },
});
