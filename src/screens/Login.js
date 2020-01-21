import React, { Component } from 'react';
import { View, Text, TextInput, BackHandler, StyleSheet } from 'react-native';
import ActivityLoader from '../components/common/ActivityLoader'
import APIs from '../../utils/api'
import { Actions } from 'react-native-router-flux';
import CustomButton from '../components/common/CustomButton'

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      value: '',
      isLoading: false,
      data: '',
    }
  }
  componentDidMount(){
    // Prevent going Back
    BackHandler.addEventListener('hardwareBackPressed', () => {
        //BackHandler.exitApp()
        return true;
    })
  }

  onChangeText = (text) => {
      this.setState({
        value: text
        ,data: ''
      })  
  }

  sendOTP = () => {
    if(!this.state.value){
      this.setState({ data: {response: "invalid_mobile"}, value: ''})
      return
    }
    this.setState({isLoading: true, data: ''})
    let formData = new FormData();
    formData.append('mobile', this.state.value)
    formData.append('appname', 'svs')

    fetch(APIs.GET_OTP, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      this.setState({isLoading: false, data})
      if(data.response === 'success'){
          Actions.OTP(this.state.value);
      }
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Enter your mobile number
        </Text>
        <Text style={styles.subTitle}>
          Please enter your registered mobile number.
        </Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width:'80%', textAlign:'center', marginTop: 20 }}
          onChangeText={text => this.onChangeText(text)}
          value={this.state.value}
          numeric value
          keyboardType={'numeric'} 
          placeholder="Your 10 digit Mobile No"
        />
        <CustomButton 
          title='Next'
          onPressFunction={this.sendOTP}
          style={{marginTop: 20, width:'80%'}}
        />
        {this.state.isLoading && <ActivityLoader />}
        <Text>
          {this.state.data.response}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
   // backgroundColor: '#F5FCFF',
    marginTop: 150
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  subTitle:{
    fontSize: 17,
    width: 250,
    textAlign: 'center',
    margin: 10,
    color: '#808080'
  }
});

export default Login;