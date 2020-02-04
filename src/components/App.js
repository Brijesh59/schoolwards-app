
import React, {Component} from 'react'
import {StatusBar} from 'react-native'
import {Provider} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import Router from './Router'
import FirebaseConfig from '../utils/Firebase'

export default class App extends Component{

  constructor(props){
    super(props)
    this.firebase = new FirebaseConfig()
  }
  
  componentDidMount = async() => {
    this.firebase.checkPermission();
    this.firebase.createForegroundNotificationListeners();
    console.log("IsUserLoggedIn: ", await AsyncStorage.getItem('isUserLoggedIn'))
  }

  componentWillUnmount() {}

  render(){
    return (
      <> 
        <StatusBar 
          backgroundColor="#3295E9" 
          barStyle="light-content" />
          <Router />  
      </>
    )
  }
}  


