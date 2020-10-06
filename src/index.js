import React from 'react';
import {StatusBar} from 'react-native';
import Navigator from './navigations';

const App = () => {
    return (
    <>
        <StatusBar backgroundColor="#f5f1da" barStyle="dark-content" />
        <Navigator />
    </>
    );
};

export default App;
