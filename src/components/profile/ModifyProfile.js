import React from 'react';
import {Button, Image, View, Text, StyleSheet} from 'react-native';
import { getUserById } from '../../utils/api/ApiCalls';
import global from '../../styles/global.css';
import { LoadingView } from '../utils';
import { TextInput } from 'react-native-gesture-handler';
import { updateProfile } from '../../utils/api/user';

function ModifyProfile({navigation}) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        async function getUserData() {
            try {
                setIsLoading(true);
                const updatedUser = await getUserById();
                setUser(updatedUser);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        setIsLoading(true);
        getUserData();
        setIsLoading(false);
    }, []);

    return (
        !isLoading ?
            <View style={[global.container, styles.container]}>

                <Image style={styles.userPic} source={{uri: user.image}}/>

                <View style={styles.userField}>
                    <Text style={styles.label}>Nombre</Text>
                    <View style={styles.userControl}>
                        <TextInput style={global.textInput}
                            placeholder="Nombre"
                            value={user.first_name}
                            onChangeText={(text) => setUser(prev => ({...prev, first_name: text}))}
                        />
                    </View>
                </View>
                <View style={styles.userField}>
                    <Text style={styles.label}>Apellido</Text>
                    <View style={styles.userControl}>
                        <TextInput style={global.textInput}
                            placeholder="Apellido"
                            value={user.last_name}
                            onChangeText={(text) => setUser(prev => ({...prev, last_name: text}))}
                        />
                    </View>
                </View>
                <View style={styles.userField}>
                    <Text style={styles.label}>Usuario</Text>
                    <View style={styles.userControl}>
                        <TextInput style={global.textInput}
                            placeholder="Usuario"
                            value={user.username}
                            onChangeText={(text) => setUser(prev => ({...prev, username: text}))}
                        />
                    </View>
                </View>
                <View style={styles.userField}>
                    <Text style={styles.label}>Email</Text>
                    <View style={styles.userControl}>
                        <TextInput style={global.textInput}
                            placeholder="Email"
                            value={user.email}
                            onChangeText={(text) => setUser(prev => ({...prev, email: text}))}
                        />
                    </View>
                </View>
                <View style={styles.userField}>
                    <Text style={styles.label}>Numero de telefono</Text>
                    <View style={styles.userControl}>
                        <TextInput style={global.textInput}
                            value={user.phone_number}
                            // placeholder="Numero de telefono"
                            onChangeText={(text) => {setUser(prev => ({...prev, phone_number: text}));}}
                        />
                    </View>
                </View>
                <Button onPress={() => {
                    updateProfile(user);
                    navigation.push('Profile');}}
                    title="Actualizar perfil"/>
            </View>
        : <LoadingView />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'left',
    },
    userPic: {
        width: 128,
        height: 128,
    },
    userField: {
        marginVertical: 5,
        width: '100%',

    },
    label: {
        color: '#aaa',
        fontWeight: '600',
    },
    userControl: {
        marginTop: 5,
        flexDirection: 'row',
    },
    fieldIcon: {
        marginRight: 10,
    },
    userData: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 10,
        fontFamily: 'System',
    },
});

export default ModifyProfile;
