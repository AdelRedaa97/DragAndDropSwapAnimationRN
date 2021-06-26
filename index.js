/**
 * @format
 */
import React from 'react'; // Added for firebase configuration
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
        // App has been launched in the background by iOS, ignore
        return null;
    }
    return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
