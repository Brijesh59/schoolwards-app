import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import { Platform } from 'react-native';
import app_config from './config'
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import APIs from './api';
import config from './config';
import NetworkRequest from './NetworkRequest';

export default class FirebaseConfig{

  async checkPermission() {
    console.log('Checking for FCM Permission ...');
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      console.log('User not reqistered for FCM. Requesting Permission ...');
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('Permission Rejected! => ', error);
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
        console.log('fcmToken: ', fcmToken);
        return fcmToken;
      }
      console.log('fcmToken: ', fcmToken);
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
      // Cache the payload data...
      await this.cachePayloadData(payload)
      // send local notification
      this.sendLocalNotification(payload);
    });

    
  }

  onFirebaseTokenRefresh(mobile){
    const unsubscribeToken = firebase.messaging().onTokenRefresh( async (fcmToken) => {
      // Update the backend about new Token
      await AsyncStorage.setItem('fcmToken', fcmToken)
      let formData = new FormData();
      formData.append('mobile', mobile)
      formData.append('deviceid', fcmToken)
      formData.append('appname', app_config.schoolName)
      
      axios.post(APIs.UPDATE_DEVICE_ID, formData, {
          headers: {
              'content-type': 'multipart/form-data'
          }
      })
      .then(res => {
          const response = res.data.status
          if(response === 'success')
            console.log('Token Updated on Server.')  
          else
            console.log('Token Updated on Server Failed: ', response) 
      })
      .catch(err => {
        console.log('Server/Network Error => ', err)
      })
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

  async cachePayloadData(){
    console.log("Payload: ")
    const [mobile, fcmToken] = await AsyncStorage.multiGet(["mobile", "fcmToken"])
    console.log("MOBILE: ", mobile[1], " fcmToken: ", fcmToken[1])
    const networkRequest = new NetworkRequest()
    const formData = new FormData()
    formData.append('mobile_no', mobile[1])
    formData.append('device_id', fcmToken[1])
    formData.append('appname', app_config.schoolName)
    const data = await networkRequest.getPendingContents(formData) 
    if(data.device_valid === 'yes'){
      const dataToSave = {
        students: [],
        events: []
      }
      const cachedData = await AsyncStorage.getItem('cachedData')
      const JSONData = JSON.parse(cachedData)
      dataToSave.events = [...JSONData.events]
      dataToSave.students = [...JSONData.students]

      data.pending_objects.map(async (obj) => {
        const data = await networkRequest.getEvent(obj.type, obj.id)
        const NIA_NDA = data.non_interaction_attributes.non_display_attributes
        const NIA_DA  = data.non_interaction_attributes.display_attributes
        dataToSave.events.push({
          id: NIA_NDA.id,
          title: NIA_DA.title,
          description: NIA_DA.body,
          type: NIA_DA.series,
          to: obj.object_type ==='common' ? 'all' : 'individual',
          dateTime: NIA_DA.created_on,
          attatchment: NIA_DA.url != "" ? NIA_DA.url : null,
          venue: NIA_DA.venue,
          studentName: obj.student_name,
          studentId: obj.prn_no
        })
        await AsyncStorage.setItem('cachedData', JSON.stringify(dataToSave))
      })

      
    }
    else{
      console.log("Invalid Device ID ")
    } 
   
  }
}  

