import React from 'react';
import {StatusBar} from 'react-native';
import Navigator from './navigations';

const App = () => {
    return (
    <>
        <StatusBar backgroundColor="#00b0f9" barStyle="light-content" />
        <Navigator />
    </>
    );
};

export default App;
