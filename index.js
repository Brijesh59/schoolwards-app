/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/components/App';
import {name as appName} from './app.json';
import FirebaseConfig from './src/utils/Firebase'
let firebase = new FirebaseConfig()
firebase.createBackgroundNotificationListeners(); //Headless task

AppRegistry.registerComponent(appName, () => App);

