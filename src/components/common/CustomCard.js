import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Left, Text, Right, Body } from 'native-base'
import {AnnouncementIcon, CalendarIcon, HomeworkIcon, MessageIcon, NewsIcon, TimetableIcon, ContactIcon, ContactsIcon, TagIcon} from './Icons'

export default function CustomCard({title, type, description, to, studentName, dateTime, onCardPressed}) {

    const getIcon = (iconType) => {
        switch(iconType.toLowerCase()){
            case 'announcement': 
                return <AnnouncementIcon />
            case 'event': 
                return <CalendarIcon />
            case 'homework': 
                return <HomeworkIcon />
            case 'message':
                return <MessageIcon />
            case 'news':
                return <NewsIcon />  
            case 'timetable':
                return <TimetableIcon />          
            default: 
                return ''
        }
    }

    return (
        <View>
            <Card style={styles.container} >
                <CardItem header bordered >
                    <Left>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                    </Left>
                    <Right>
                        { getIcon(type) }
                    </Right>
                </CardItem>
                <CardItem onPress={()=>onCardPressed()}>
                    <Body>
                        <Text style={styles.description}>          
                            {description}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        { to === "all" ? <ContactsIcon /> : <ContactIcon /> }
                        <Text style={styles.normal}>
                            {studentName}
                        </Text>
                    </Left>
                </CardItem>
                <CardItem footer bordered>
                    <Left>
                        <TagIcon />
                        <Text style={styles.normal}>
                            {type}
                        </Text>
                    </Left>
                    <Right>
                        <Text style={styles.normal}>
                            {dateTime}
                        </Text>
                    </Right>
                </CardItem>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,  
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: { 
        color: '#363636',
        fontWeight: '600'
    },
    description:{
        color: '#707070', 
    },
    normal: {
        color: '#2C96EA', 
        fontWeight: '400',
        fontSize: 14,
        width: '100%'
    },
});
