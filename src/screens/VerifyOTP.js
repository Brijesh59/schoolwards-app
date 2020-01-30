import React, { useState, useEffect, useRef } from 'react';
import {View, Text, StyleSheet} from 'react-native'
import { Actions }  from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo   from 'react-native-device-info';
import axios        from 'axios'

import ActivityLoader from '../components/common/ActivityLoader'
import APIs           from '../utils/api'
import app_config     from '../utils/config'
import CustomButton   from '../components/common/CustomButton'
import Input          from '../components/common/Input'


const VerifyOTP = (props) => {
    const [isLoading, setIsLoding] = useState(false);
    const [deviceType, setDeviceType] = useState(DeviceInfo.getSystemName());
    const [mobileNo, setMobileNo] = useState(props.data);
    const [fcmToken, setFcmToken] = useState(null);
    const [showErrorMessage, setShowErrorMessage] = useState(null);
    const [firstDigit, setFirstDigit] = useState('');
    const [secondDigit, setSecondDigit] = useState('');
    const [thirdDigit, setThirdDigit] = useState('');
    const [fourthDigit, setFourthDigit] = useState('');
    const [fifthDigit, setFifthDigit] = useState('');
    const [sixthDigit, setSixthDigit] = useState('');

    const firstDigitRef  = useRef(null);
    const secondDigitRef = useRef(null);
    const thirdDigitRef  = useRef(null);
    const fourthDigitRef = useRef(null);
    const fifthDigitRef  = useRef(null);
    const sixthDigitRef  = useRef(null);

    async function getToken(){
        let fcmToken = null
        try {
            fcmToken = await AsyncStorage.getItem('fcmToken')
            setFcmToken(fcmToken)
        } 
        catch (error) {
            console.log('Error in fetching fcmToken')  
        }
    }
    useEffect(() => {
        getToken()
        console.log("FCMToken: ", fcmToken)
        setFcmToken(fcmToken)
        firstDigitRef.current.focus();
    }, [])

    useEffect(() => {
        setFocus('secondDigit')
    }, [firstDigit])

    useEffect(() => {
        setFocus('thirdDigit')
    }, [secondDigit])

    useEffect(() => {
        setFocus('fourthDigit')
    }, [thirdDigit])

    useEffect(() => {
        setFocus('fifthDigit')
    }, [fourthDigit])

    useEffect(() => {
        setFocus('sixthDigit')
    }, [fifthDigit])

    const loginToDashboard = async() => {
        setIsLoding(true)
        // verify OTP, then redirect to dashboard.
        const OTP = firstDigit + secondDigit + thirdDigit + fourthDigit + fifthDigit + sixthDigit
        
        let formData = new FormData();
        formData.append('mobile', mobileNo)
        formData.append('deviceid', fcmToken)
        formData.append('devicetype', deviceType)
        formData.append('otp', OTP)
        formData.append('app_version', app_config.version)
        formData.append('appname', app_config.schoolName)

        console.log('Requesting Login for...', formData)
        
        axios.post(APIs.VERIFY_OTP, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(async(res) => {
            setIsLoding(false)
            const response = res.data.response
            console.log("Response: " , res.data)
            if(response === 'success'){
                console.log('Login Success.')  
                await setUserLoggedIn(res.data.students, res.data.common_events)
                Actions.dashboard();
            }
            else{
                console.log('Login Failed => ', response)
                setShowErrorMessage(response)  
            }
        })
        .catch(err => {
            setIsLoding(false)
            console.log('Server/Network Error => ', err)
            setShowErrorMessage(err.toString())
        })

    } 

    const setUserLoggedIn = async (students, commonEvents) => {
        await AsyncStorage.setItem('isUserLoggedIn', 'true')
        const dataToSave = {
            students: [],
            events: []
        }

        // Saving Students details
        students.forEach(student => {
            dataToSave.students.push({
                name: `${student.first_name} ${student.middle_name} ${student.last_name}` ,
                prnNo: student.prn_no,
                dateOfBirth: student.dob,
                gender: student.gender,
                address: `${student.address}, ${student.city}, ${student.pincode}`,
                city: student.city,
                pincode: student.pincode,
                profileImage: student.photo,
                fatherName: student.father_name,
                motherName: student.mother_name,
                fatherEmail: student.father_email,
                motherEmail: student.mother_email,
                fatherMobile: student.father_mobile,
                motherMobile: student.mother_mobile,
                preferenceContact: student.prefence_contact,
                class: student.standard,
                division: student.division,
                rollNo: student.roll_no
            })
        })

        // Saving Individual Student events
        students.forEach(student => {
            const studentId = student.prn_no
            const studentName = student.first_name
            student.events.forEach(event => {
                const NIA_NDA = event.non_interaction_attributes.non_display_attributes
                const NIA_DA  = event.non_interaction_attributes.display_attributes
                dataToSave.events.push({
                    id: NIA_NDA.id,
                    title: NIA_DA.name,
                    description: NIA_DA.description,
                    type: NIA_DA.series,
                    to: 'individual',
                    dateTime: NIA_DA.date_time,
                    attatchment: NIA_DA.url != "" ? NIA_DA.url : null,
                    venue: NIA_DA.venue,
                    studentName: studentName,
                    studentId: studentId
                })
            })
        })

        // Saving Common events
        commonEvents.forEach(event => {
            const NIA_NDA = event.non_interaction_attributes.non_display_attributes
            const NIA_DA  = event.non_interaction_attributes.display_attributes
            dataToSave.events.push({
                id: NIA_NDA.id,
                title: NIA_DA.name,
                description: NIA_DA.description,
                type: NIA_DA.series,
                to: 'all',
                dateTime: NIA_DA.date_time,
                attatchment: NIA_DA.url != "" ? NIA_DA.url : null,
                venue: NIA_DA.venue
            })
        })


       await AsyncStorage.setItem('cachedData', JSON.stringify(dataToSave))

    }

    const setFocus = (focusEle) => {
        switch(focusEle){
            case 'secondDigit': 
                    if(firstDigit && (secondDigit==null || secondDigit==''))
                        secondDigitRef.current.focus();
                    break;
            case 'thirdDigit': 
                    if(secondDigit && (thirdDigit==null || thirdDigit=='')) 
                        thirdDigitRef.current.focus();
                    break;
            case 'fourthDigit': 
                    if(thirdDigit && (fourthDigit==null || fourthDigit=='')) 
                        fourthDigitRef.current.focus();
                    break;
            case 'fifthDigit': 
                    if(fourthDigit && (fifthDigit==null || fifthDigit=='')) 
                        fifthDigitRef.current.focus();
                    break;
            case 'sixthDigit': 
                    if(fifthDigit && (sixthDigit==null || sixthDigit=='')) 
                        sixthDigitRef.current.focus();
                    break;
        }
    }

    const onChangeText = (inputEle, text) => {
        setShowErrorMessage(null)
        switch(inputEle){
            case 'firstDigit' : setFirstDigit(text);  break;
            case 'secondDigit': setSecondDigit(text); break;
            case 'thirdDigit' : setThirdDigit(text);  break;
            case 'fourthDigit': setFourthDigit(text); break;
            case 'fifthDigit' : setFifthDigit(text);  break;
            case 'sixthDigit' : setSixthDigit(text);  break;
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Verify details</Text>
            <Text style={styles.subTitle}>
                We have sent 6 digit OTP on +91{mobileNo}
            </Text>
            <Text style={styles.subTitle}>
                OTP is valid for 30 min
            </Text>
            <View style={styles.inputContainer}>
                <Input 
                    reference={firstDigitRef} 
                    onChangeText={(text) => onChangeText('firstDigit', text)}
                />
                <Input 
                    reference={secondDigitRef}  
                    onChangeText={(text) => onChangeText('secondDigit', text)}
                />
                <Input 
                    reference={thirdDigitRef} 
                    onChangeText={(text) => onChangeText('thirdDigit', text)}
                />
                <Input 
                    reference={fourthDigitRef} 
                    onChangeText={(text) => onChangeText('fourthDigit', text)}
                />
                <Input 
                    reference={fifthDigitRef} 
                    onChangeText={(text) => onChangeText('fifthDigit', text)}
                />
                <Input 
                    reference={sixthDigitRef} 
                    onChangeText={(text) => onChangeText('sixthDigit', text)}
                />
            </View>
            <CustomButton 
                title='Verify Now'
                onPressFunction={loginToDashboard}
                style={{marginTop: 20, width:'80%'}}
            />
            { showErrorMessage &&
                <Text style={styles.errorStyle}>
                    {showErrorMessage}
                </Text> 
            }   
            { isLoading && <ActivityLoader /> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    //   backgroundColor: '#F5FCFF',
      marginTop: 120 
    },
    welcome: {
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
    },
    inputContainer:{
        flexDirection: 'row',
        paddingRight: 1
    },
    errorStyle: {
      width: '80%',
      marginTop: 20,
      backgroundColor: '#ffcdd2',
      padding: 10,
      textAlign: 'center',
      borderColor: '#f44336',
      borderWidth: 1
    }
})

export default VerifyOTP