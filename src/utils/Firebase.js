import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import { Platform } from 'react-native';
import app_config from './config'
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";

export default class FirebaseConfig{

  async checkPermission() {
    console.log('Checking for Permission ...');
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      console.log('User not permitted for token.');
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      console.log('Requesting Permission...');
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('Permission Rejected!!', error);
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    console.log('fcmToken: ', fcmToken);
    return fcmToken;
  }

  createForegroundNotificationListeners() {
    console.log('Listening for Foreground messages ...')
    const unsubscribe = firebase.messaging().onMessage(async (remoteMessage) => {
      const JSONData = JSON.parse(remoteMessage.data.note)
      const payload = JSONData.non_interaction_attributes.display_attributes
      console.log('FCM Message in Foreground: ', payload)
      // do something with payload data...
      this.sendLocalNotification(payload);
    });
  }

  createBackgroundNotificationListeners() {
    console.log('Listening for Background messages ...')
    firebase
      .messaging()
      .setBackgroundMessageHandler( function(remoteMessage){
        const JSONData = JSON.parse(remoteMessage.data.note)
        const payload = JSONData.non_interaction_attributes.display_attributes
        console.log('FCM Message Back/AppClosed: ', payload);
        // await AsyncStorage.setItem('isUserLoggedIn', 'false')

        this.sendLocalNotification(payload);

      });

  }

  sendLocalNotification(payload) {
    if( Platform.OS === 'android') {
      PushNotification.localNotification({
        message: payload.title,
        //message: "Test Message"
      })
    }
    else{
      PushNotificationIOS.presentLocalNotification({
        alertTitle: payload.title
      });
    }
      
  }
}  

