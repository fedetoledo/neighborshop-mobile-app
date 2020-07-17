import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function SearchButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <MaterialCommunityIcons
                name="magnify"
                size={30}
                color="#000"
                style={styles.icon}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    icon: {
        marginRight: 10,
    },
});

export default SearchButton;
