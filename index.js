/**
 * @format
 */
import React from 'react'
import {AppRegistry} from 'react-native';
import { Provider } from "react-redux";
import App from './src/components/App';
import {name as appName} from './app.json';
import FirebaseConfig from './src/utils/Firebase'
import store from './src/store'

const SchoolWardsApp = () => 
    <Provider store={store}>
        <App />
    </Provider>


let firebase = new FirebaseConfig()
firebase.createBackgroundNotificationListeners(); //Headless task

AppRegistry.registerComponent(appName, () => SchoolWardsApp);

