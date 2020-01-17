import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import { AsyncStorage } from 'react-native';
import app_config from './config'
import PushNotification from 'react-native-push-notification';

export default class FirebaseConfig{

  async checkPermission() {
    console.log('Checking for Permission ...');
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      console.log('User not permitte for token.');
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
      console.log('Permission Rejected!!');
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

  async createNotificationListeners() {

    console.log("Listening for Foreground Notifications... ")

    const unsubscribe = firebase.messaging().onMessage(async (remoteMessage) => {
      console.log('FCM Message in Foreground:', remoteMessage.data);
      this.sendLocalNotification();
    });
    
  }

  async createBackgroundSync() {
    console.log("Listening for Background Notifications... ")
    firebase
      .messaging()
      .setBackgroundMessageHandler(async (remoteMessage) => {
        console.log('FCM Message in Back/AppClosed:', JSON. remoteMessage.data);
        await AsyncStorage.setItem('isUserLoggedIn', 'false')
        this.sendLocalNotification();
      });
  }

  sendLocalNotification() {
    PushNotification.localNotification({
      title: "Test Title",
      message: "Test Message"
    })
  }
}  

