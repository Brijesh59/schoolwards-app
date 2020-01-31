import React, { useEffect, useState } from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import { Text, Container, Content, Left, List, ListItem, Thumbnail} from 'native-base'
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

import {CalendarIcon, CallIcon, ContactsIcon, SettingsIcon} from '../components/common/Icons'

export default function SideBar() {
    const [students, setStudents] = useState([])

    useEffect(() => {
        const getCachedData = async()=>{
            const cachedData = await AsyncStorage.getItem('cachedData')
            const JSONData = JSON.parse(cachedData)
            setStudents(JSONData.students)
        }
        getCachedData()
    }, [])
    return (
        <Container style={styles.container}>
           <View style={{alignItems:'center'}}>
                <Thumbnail 
                    large
                    style={styles.schoolLogo} 
                    source={require('./assets/schoolLogo.png')} />
           </View>
           <ScrollView>
            <Content>
                <List>
                    <ListItem header style={styles.listHeader}> 
                        <Text style={styles.listHeaderText}>Children</Text>
                    </ListItem>
                    {
                        students.map(student => (
                            <ListItem 
                                avatar 
                                onPress={()=>Actions.profileScreen({student})}>  
                                <Left style={styles.left}>
                                    <Thumbnail style={styles.thumbnail} source={{uri: 'https://storage.jewnetwork.com/content/users/avatars/3675/avatar_3675_500.jpg'}} />
                                </Left>
                                <Text style={styles.listItemTitle}>
                                    {student.name}
                                </Text>
                            </ListItem>
                        ))
                    }
                    <ListItem header style={styles.listHeader}> 
                        <Text style={styles.listHeaderText}>General</Text>
                    </ListItem>
                    <ListItem
                        avatar 
                        onPress={()=>Actions.calenderScreen()}> 
                        <Left style={styles.left}>
                            <CalendarIcon style={styles.iconStyle}/>
                        </Left>
                        <Text style={styles.listItemTitle}>Calender</Text>
                    </ListItem>
                    <ListItem 
                        avatar 
                        onPress={()=>Actions.contactUsScreen()}> 
                        <Left style={styles.left}>
                            <CallIcon style={styles.iconStyle}/>
                        </Left>
                        <Text style={styles.listItemTitle}>Contact Us</Text>
                    </ListItem >
                    <ListItem
                        avatar 
                        onPress={()=>Actions.aboutUsScreen()}> 
                        <Left style={styles.left}>
                            <ContactsIcon style={styles.iconStyle}/>
                        </Left>
                        <Text style={styles.listItemTitle}>About Us</Text>   
                    </ListItem>
                    <ListItem
                        avatar 
                        onPress={()=>Actions.settingScreen()}> 
                        <Left style={styles.left}>
                            <SettingsIcon style={styles.iconStyle}/>
                        </Left>
                        <Text style={styles.listItemTitle}>Setting</Text>
                    </ListItem>
                </List>
            </Content>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: '#2C96EA',
      fontFamily: `'Roboto', sans-serif`
    },
    title:{
        fontSize: 40,
        marginTop:30,
        color: '#FDC702',
    },
    schoolLogo:{
        marginTop: 15,
        width:110,
        height:110,
        borderRadius: 55,
        backgroundColor: 'white'
    },
    listHeader:{
        width: '85%',
    },
    listHeaderText:{
        color: 'white',
        fontSize: 20,
        marginTop: 8,
        fontWeight: "900"
    },
    listItemTitle:{
        color: 'white',
        fontSize: 18,
        marginTop: 10,
        marginLeft: 12
    },
    thumbnail:{
        width: 50,
        height: 50
    },
    iconStyle:{
        width: '100%',
        marginLeft: 10,
        color: 'white',
        fontSize: 35
    },
    left:{
        width: 60
    }
});
  