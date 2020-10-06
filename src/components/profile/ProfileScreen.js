import React, {useEffect, useState} from 'react';
import {Button, TextInput, Text, View, Image, StyleSheet, SafeAreaView, ActivityIndicator, Linking} from 'react-native';
import global from '../../styles/global.css';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../../navigations/';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { getUserById, uploadUserPicture } from "../../utils/api/ApiCalls";
import ImagePicker from 'react-native-image-picker';

function Profile() {

    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [messageText, setMessageText] = useState('');

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
                let type = response.type.split('/').slice(-1)[0]
                console.log(type)
                   let new_image = {
                        "image_64": response.data,
                        "type": type
                    }
                await uploadUserPicture(new_image, user.id);

                setUser(prevState => ({
                    ...prevState,
                    picture: response.uri
                }))
                }
          });
    }

    useEffect(() => {
        async function getUser() {
            try {
                setIsLoading(true);
                const user = await getUserById();
                setUser(user)
                setIsLoading(false);
            } catch(error) {
                console.log('profile data error: ', error)
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

                {/* <View>
                    <View style={styles.profileButton}>
                        <Text style={styles.purchasesButtonText}>Mis compras</Text>
                        <MaterialCommunityIcons name="arrow-right" color="#fff" size={20}/>
                    </View>
                    <View style={styles.profileButton}>
                        <Text style={styles.userInfoButton}>Ver mis datos</Text>
                        <MaterialCommunityIcons name="arrow-right" color="#fff" size={20}/>
                    </View>
                </View> */}
                <Button title="Logout" onPress={() => {signOut();}}/>
            </ScrollView>
        :
            <View style={global.errorContainer}>
                <ActivityIndicator size='large' color='#00b0f9'/>
            </View>
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
        fontWeight: '500'
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
    container: {
        backgroundColor: '#333'
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
