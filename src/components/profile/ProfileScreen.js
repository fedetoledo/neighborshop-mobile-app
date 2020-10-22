import React, {useEffect, useState} from 'react';
import {Button, Text, View, Image, StyleSheet, SafeAreaView} from 'react-native';
import global from '../../styles/global.css';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../../navigations/';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getUserById, uploadUserPicture } from '../../utils/api/ApiCalls';
import ImagePicker from 'react-native-image-picker';
import { LoadingView } from '../utils';

function Profile({navigation}) {

    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const {signOut} = React.useContext(AuthContext);

    const showUserFullName = () => {
        return `${user.first_name} ${user.last_name}`;
    };

    const getImageFromDevice = () => {
        const options = {
            title: 'Cambiar foto de perfil',
            storageOptions: {
              allowsEditing: true,
              skipBackup: true,
              path: 'images',
            },
          };

          ImagePicker.showImagePicker(options, async (response) => {
            // console.log('Response = ', response.uri);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
                let type = response.type.split('/').slice(-1)[0];
                   let new_image = {
                        'image64': response.data,
                        'type': type,
                    };
                await uploadUserPicture(new_image, user.id);

                setUser(prevState => ({
                    ...prevState,
                    picture: response.uri,
                }));
                }
          });
    };

    useEffect(() => {
        async function getUser() {
            try {
                setIsLoading(true);
                const userData = await getUserById();
                setUser(userData);
                setIsLoading(false);
            } catch (error) {
                console.log('profile data error: ', error);
            }
        }
        getUser();
    },[]);

    return (
        !isLoading ?
            <ScrollView style={global.container}>
                <SafeAreaView style={global.safeArea} />
                <View style={global.outerShadow}>
                    <LinearGradient style={styles.profileCard} useAngle angle={100} colors={['#234949', '#517fa4']} locations={[0,1]}>
                        <Text style={styles.userName}>{showUserFullName()}</Text>
                        <TouchableOpacity style={styles.profileImage} onPress={() => {getImageFromDevice();}}>
                            <Image style={styles.userPic} source={{uri: user.image}} />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>

                <LinearGradient useAngle angle={100} colors={['#517fa4', '#234949']} style={styles.userDataContainer}>
                    <View style={styles.userField}>
                        <Text style={styles.label}>Nombre de usuario</Text>
                        <View style={styles.userControl}>
                            <MaterialCommunityIcons style={styles.fieldIcon} name="account" color="#fff" size={25} />
                            <Text style={styles.userData}>{user.username}</Text>
                        </View>
                    </View>
                    <View style={styles.userField}>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.userControl}>
                            <MaterialCommunityIcons style={styles.fieldIcon} name="email" color="#fff" size={25} />
                            <Text style={styles.userData}>{user.email}</Text>
                        </View>
                    </View>
                    <View style={styles.userField}>
                        <Text style={styles.label}>Numero de telefono</Text>
                        <View style={styles.userControl}>
                            <MaterialCommunityIcons style={styles.fieldIcon} name="phone" color="#fff" size={25} />
                            <Text style={styles.userData}>{user.phone_number}</Text>
                        </View>
                    </View>
                </LinearGradient>
                    <TouchableOpacity
                        onPress={() => {navigation.navigate('ModifyProfile');}}
                        style={styles.profileButton}>
                        <Text style={styles.userInfoButton}>Cambiar mis datos</Text>
                        <MaterialCommunityIcons name="pencil" color="#fff" size={20}/>
                    </TouchableOpacity>
                <Button color="#c45461" title="Logout" onPress={() => {signOut();}}/>
            </ScrollView>
        :
            <LoadingView />
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        // backgroundColor: '#00b0f9',
        display: 'flex',
        paddingVertical: 25,
    },
    profileCard: {
        elevation: 3,
        marginVertical: 40,
        height: 150,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        backgroundColor: '#07689f',
        marginHorizontal: 0,
        borderRadius: 10,
    },
    userName: {
        color: '#fafafa',
        fontSize: 22,
        fontWeight: '500',
    },
    profileImage: {
        backgroundColor: '#333',
        borderRadius: 100,
    },
    userPic: {
        width: 128,
        height: 128,
        borderRadius: 100,
    },
    userDataContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
        borderRadius: 10,
        elevation: 3,
        marginBottom: 10,
        color: '#fff',
    },
    userField: {

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
    profileButton: {
        elevation: 2,
        borderRadius: 3,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 9,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#FAC748',
    },
    userInfoButton: {
        elevation: 2,
        color: '#fafafa',
        fontSize: 16,
    },
});

export default Profile;
