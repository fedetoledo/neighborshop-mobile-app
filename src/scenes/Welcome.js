import React from 'react';
import {StyleSheet, View, Text, Button } from 'react-native';
import global from '../styles/global';

export default function Welcome({navigation}) {
    return (
      <View style={[global.container, styles.wrapper]}>
          <Text style={styles.welcomeText}>Bienvenido!</Text>
          <View style={styles.buttons}>
            <Button
                onPress={() => {navigation.navigate('Login');}}
                color="#81d4fa" title="Iniciar sesion" />
            <Button
                onPress={() => {navigation.navigate('Signup');}}
                title="Registrarse" />
          </View>
      </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    welcomeText: {
        textAlign: 'center',
        color: '#454542',
        fontFamily: 'Roboto',
        fontSize: 40,
        fontWeight: '700',
    },
    buttons: {
        width: 300,
        flex: 0.2,
        justifyContent: 'space-between',
    },
});
