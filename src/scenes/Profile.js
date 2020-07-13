import React from 'react';
import {Button, Text, View, Image, StyleSheet} from 'react-native';
import global from '../styles/global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';

function Profile() {

    const logout = () => {
        auth().signOut().then(() => {console.log('signed out');});
    };

    return (
        <View style={global.container}>
            {/* <View style={styles.profileCard}>
            </View> */}
            <LinearGradient style={styles.profileCard} colors={['#0077c1','#42a5f4']}>
                <Text style={styles.userName}>Federico Toledo</Text>
                <Image style={styles.userPic} source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                }} />
            </LinearGradient>
            <View style={styles.profileButton}>
                <Text style={styles.purchasesButtonText}>Mis compras</Text>
                <MaterialCommunityIcons name="arrow-right" color="#fff" size={20}/>
            </View>
            <View style={styles.profileButton}>
                <Text style={styles.userInfoButton}>Ver mis datos</Text>
                <MaterialCommunityIcons name="arrow-right" color="#fff" size={20}/>
            </View>
            <Button title="Logout" onPress={() => {logout();}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    profileCard: {
        height: 100,
        borderRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    userName: {
        color: '#fafafa',
        fontSize: 20,
    },
    userPic: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    profileButton: {
        borderRadius: 3,
        marginVertical: 10,
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#0077c1',
    },
    purchasesButtonText: {
        color: '#fafafa',
        fontSize: 16,
    },
    userInfoButton: {
        color: '#fafafa',
        fontSize: 16,
    },
});

export default Profile;
