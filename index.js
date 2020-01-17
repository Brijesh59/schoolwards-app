/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/components/App';
import {name as appName} from './app.json';
import FirebaseConfig from './utils/Firebase'
let firebase = new FirebaseConfig()
firebase.createBackgroundSync();

AppRegistry.registerComponent(appName, () => App);
