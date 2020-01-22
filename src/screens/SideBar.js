import React from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import { Text, Container, Content, Left, Icon, List, ListItem, Thumbnail} from 'native-base'
import { Actions } from 'react-native-router-flux';

export default function SideBar() {
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
                    <ListItem 
                        avatar 
                        onPress={()=>Actions.profileScreen()}> 
                        <Left style={styles.left}>
                            <Thumbnail style={styles.thumbnail} source={{uri: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/68.png'}} />
                        </Left>
                        <Text style={styles.listItemTitle}>Soham Satpute</Text>
                    </ListItem>
                    <ListItem 
                        avatar 
                        onPress={()=>Actions.profileScreen()}>  
                        <Left style={styles.left}>
                            <Thumbnail style={styles.thumbnail} source={{uri: 'https://storage.jewnetwork.com/content/users/avatars/3675/avatar_3675_500.jpg'}} />
                        </Left>
                        <Text style={styles.listItemTitle}>Mehika Jadhav</Text>
                    </ListItem>
                    <ListItem 
                        avatar 
                        onPress={()=>Actions.profileScreen()}> 
                        <Left style={styles.left}>
                            <Thumbnail style={styles.thumbnail} source={{uri: 'https://cdn3.vectorstock.com/i/1000x1000/26/07/girl-icon-woman-avatar-face-icon-cartoon-style-vector-24742607.jpg'}} />
                        </Left>
                        <Text style={styles.listItemTitle}>Purvi Pancholi</Text>
                    </ListItem>

                    <ListItem header style={styles.listHeader}> 
                        <Text style={styles.listHeaderText}>General</Text>
                    </ListItem>
                    <ListItem
                        avatar 
                        onPress={()=>Actions.calenderScreen()}> 
                        <Left style={styles.left}>
                            <Icon name='calendar' style={styles.icon}/>
                        </Left>
                        <Text style={styles.listItemTitle}>Calender</Text>
                    </ListItem>
                    <ListItem 
                        avatar 
                        onPress={()=>Actions.contactUsScreen()}> 
                        <Left style={styles.left}>
                            <Icon name='call' style={styles.icon}/>
                        </Left>
                        <Text style={styles.listItemTitle}>Contact Us</Text>
                    </ListItem >
                    <ListItem
                        avatar 
                        onPress={()=>Actions.aboutUsScreen()}> 
                        <Left style={styles.left}>
                            <Icon name='contacts' style={styles.icon}/>
                        </Left>
                        <Text style={styles.listItemTitle}>About Us</Text>   
                    </ListItem>
                    <ListItem
                        avatar 
                        onPress={()=>Actions.settingScreen()}> 
                        <Left style={styles.left}>
                            <Icon name='md-settings' style={styles.icon}/>
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
    icon:{
        width: '100%',
        marginLeft: 10,
        color: 'white',
        fontSize: 35
    },
    left:{
        width: 60
    }
});
  