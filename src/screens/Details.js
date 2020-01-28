import React from 'react'
import {StyleSheet} from 'react-native'
import { Container, Content, Left, Icon, Title, Header, Button, Body} from 'native-base'
import { Actions } from 'react-native-router-flux';

import AnnouncementDetails from './details/AnnouncementDetails'
import EventDetails from './details/EventDetails'
import HomeworkDetails from './details/HomeworkDetails'
import MessageDetails from './details/MessageDetails'
import NewsDetails from './details/NewsDetails'
import TimetableDetails from './details/TimetableDetails'


export default function Details({ details}) {
    const showDetails = () => {
        console.log("Showing Details")
        switch(details.type.toLowerCase()){
            case 'announcement':
                return <AnnouncementDetails details={details} />
            case 'event':
                return <EventDetails details={details} />
            case 'homework':
                return <HomeworkDetails details={details} />
            case 'message':
                return <MessageDetails details={details} />
            case 'news':
                return <NewsDetails details={details} />
            case 'timetable':
                return <TimetableDetails details={details} />
            default: 
                return null
        }
    }
    return (
        <Container> 
            <Header style={styles.header}   androidStatusBarColor="#3295E9" 
            iosBarStyle="light-content">
                <Left style={{maxWidth:60, marginLeft: 8}}>
                    <Button 
                        transparent 
                        onPress={()=>Actions.pop()}>
                        <Icon name='arrow-back' style={styles.iconStyle}/>
                    </Button>
                </Left>
                <Body style={{alignItems: 'flex-start'}}>
                    <Title style={styles.headerTitle}>{details.type}</Title>
                </Body> 
            </Header>
            <Content 
                contentContainerStyle={styles.container}>
                {showDetails()}
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        width: '98%',
        marginLeft: '1%'
    },
    header:{
        backgroundColor: '#2C96EA'
    },
    headerTitle:{
        color: 'white', 
    },
    iconStyle:{
        color: 'white',
    },
    name:{
        fontSize:22,
        fontWeight: 'bold',
        padding: 15,
        color: '#2C96EA'
    },
    grid:{
        marginTop: 5,
        width: '95%',
    },
    row:{
        marginTop: 10
    },
    key:{
        fontSize: 16,
        marginLeft: 40,
    },
    value:{
        fontSize: 16,
        color: '#808080'
    },
    thumbnail:{
       marginTop: 30,
       width:150,
       height:150
    },
});
  