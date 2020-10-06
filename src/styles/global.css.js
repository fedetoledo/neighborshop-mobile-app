import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    safeArea: {
        backgroundColor: '#f5f1da'
    },
    container: {
        paddingHorizontal: 10,
        backgroundColor: '#f5f1da',
    },
    primaryColor: {
        backgroundColor: '#00b0f9',
    },
    textInput: {
        borderRadius: 4,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width:0, height:0},
        shadowOpacity: 0.12,
        shadowRadius: 4,
    },
    horizontalLine: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 0.75,
    },
    errorContainer: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center"
    },
    errorText: {
        fontSize: 20,
        color: '#999'
    },
    outerShadow: {
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {width:0, height: 3},
        shadowOpacity: 0.25,
        shadowRadius: 2,
    },
    linkText: {
        textDecorationLine: "underline",
        fontWeight: '600'
    }
});
