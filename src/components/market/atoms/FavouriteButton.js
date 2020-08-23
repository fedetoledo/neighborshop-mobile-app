import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';

function FavouriteButton(props) {

    const [iconName, setIconName] = React.useState('heart-outline');

    const favMessage = () => {
        showMessage({
            message: 'Agregado a favoritos',
            type: 'danger',
        });
    };

    const toggleHeart = () => {
        iconName === 'heart-outline' ? [favMessage(), setIconName('heart')] : setIconName('heart-outline');
    };

    return (
        <TouchableOpacity onPress={() => {props.onPress(); toggleHeart();}}
        >
            <MaterialCommunityIcons style={styles.icon} name={iconName} size={30} color="#f40000" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    icon: {
        marginRight: 10,
    },
});

export default FavouriteButton;
