import React, { useState, useEffect } from 'react'
import {StyleSheet, View, ScrollView, Platform, Linking, TouchableOpacity, Dimensions} from 'react-native'
import { Container, Content, Left, Icon, Title, Header, Button, Body, Text, Grid, Col, Card, CardItem} from 'native-base'
import { Actions } from 'react-native-router-flux';
import {Calendar, Agenda} from 'react-native-calendars';

export default function CalenderScreen() {
    const [selectedStudent, setSelectedStudent] = useState(0)
    const [selectedDate, setSelectedDate] = useState(getCurrentDate())
    const [events, setEvents] = useState([])
    const screenWidth = Dimensions.get('window').width
    const optimumLayoutWidth = screenWidth - screenWidth/10
    let students = []
    
    useEffect( () => {
        students = fetchStudentDetails()
        const events = fetchEvents(selectedStudent, selectedDate)
        setEvents(events)
    }, [])

    useEffect( () => {
        const events = fetchEvents(selectedStudent, selectedDate)
        setEvents(events)
    }, [selectedDate])

    useEffect( () => {
        const events = fetchEvents(selectedStudent, selectedDate)
        setEvents(events)
    }, [selectedStudent])


    function formatDate(date){
        // date = 2020-02-22
        const dates = date.split('-')
        const day = dates[2]
        const months = [
            'January', 'February', 'March', 'April', 'May',
            'June', 'July', 'August', 'September', 'October', 
            'November', 'December'
        ]
        const month = months[
            dates[1] >= 10 ? dates[1] - 1: dates[1]%10 - 1 
        ]
        return month + ' ' + day + ', ' + dates[0]
        // February 22, 2020
    }

    function getCurrentDate(){
        const date = new Date()

        let day = date.getDate()
        day = day >= 10 ? day : '0' + day 

        let month = date.getMonth() + 1
        month = month >= 10 ? month : '0' + month

        return date.getFullYear() + '-' + month + '-' + day
    }

    const fetchEvents = (student, date) => {

    }

    const fetchStudentDetails = () => {
        return []
    }

    return (
        <Container> 
            <Header style={styles.header}  androidStatusBarColor="#3295E9" 
            iosBarStyle="light-content">
                <Left style={{maxWidth:60}}>
                    <Button 
                        transparent 
                        onPress={()=>Actions.pop()}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>Calender</Title>
                </Body> 
            </Header>
            <ScrollView>
            <Content 
                contentContainerStyle={styles.container}>
                <View style={{
                    flex:1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    marginTop: 10,
                    marginBottom: 10
                }}>
                    {
                        ['Soham','Shahid','Mehika','Aditya'].map((student, index) => 
                        (
                            <Button 
                                key = {student}
                                rounded 
                                bordered
                                light 
                                style = {
                                    index === selectedStudent ?
                                    styles.selectedStudent :
                                    styles.unSelectedStudent
                                }
                                onPress = { () => setSelectedStudent(index)} >
                                    <Text style = {
                                        index === selectedStudent ?
                                        styles.selectedStudentText :
                                        styles.unSelectedStudentText
                                    }>{ student }</Text>
                            </Button>
                            
                        ))
                    }
                </View>
                
                <View style={{   
                            borderColor: '#f2f2f2',
                            borderWidth: 4,
                            borderStyle:'solid',
                            borderWidth: 2,
                            overflow:'hidden',
                            borderTopColor: '#2C96EA',
                            height: 'auto',
                            width: optimumLayoutWidth,
                        }}>
                    <Calendar
                        monthFormat={'MMM yyyy'}
                        hideExtraDays={true}
                        firstDay={1}
                        onMonthChange={(month) => {console.log('month changed', month)}}
                        onPressArrowLeft={substractMonth => substractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        style={{
                            borderWidth: 1,
                            borderColor: '#f2f2f2',
                            shadowOffset:{
                                width: 5,
                                height:2
                            },
                            shadowOpacity: 0.4
                        }}
                        onDayPress={
                            (day) => setSelectedDate(day.dateString)
                        }
                        markedDates = {{
                            [selectedDate]: {
                                selected: true,
                            },
                        }}
                        theme={{
                            todayTextColor: '#F8C732',
                            selectedDayBackgroundColor: '#F8C732',
                            selectedDayTextColor: '#ffffff',
                        }}
                    /> 
                </View >       
                   
                <View style={{width: optimumLayoutWidth, marginTop:10}}> 
                    <ScrollView 
                        horizontal={true} 
                        showsHorizontalScrollIndicator={false} 
                        pagingEnabled={true}
                        decelerationRate={10}
                        snapToInterval={100-60}
                        snapToAlignment={'center'}
                        > 
                        {
                            [0,1,2,3].map((event)=>(
                                <Card  style={{
                                    width:
                                    optimumLayoutWidth-6,
                                    shadowOffset:{
                                        width: 0,
                                        height: 0
                                    }
                                }}> 
                                    <CardItem 
                                        header 
                                        bordered 
                                        button 
                                        onPress={()=>alert(event)}
                                        style={{
                                            width:
                                            optimumLayoutWidth-6.8,
                                        }}>
                                        <Text
                                        style={{
                                            color: '#2C96EA'
                                        }}>
                                            Event on {formatDate(selectedDate)} 
                                        </Text>
                                    </CardItem>
                                    <CardItem>
                                        <Body  
                                            style={{
                                                width: optimumLayoutWidth-10,
                                                flexWrap: 'wrap', 
                                            }}>
                                            <Text>
                                            You may also access these  You may also access these.
                                            </Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            ))
                        }
                    </ScrollView>
                </View>
            </Content>
            </ScrollView>
        </Container>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header:{
        backgroundColor: '#2C96EA',
        color: 'white'
    },
    selectedStudent:{
        backgroundColor: '#2C96EA',
        color: 'white',
        margin: 5,
        maxWidth: 160,
        minWidth: 150,
        justifyContent: 'center'
    },
    unSelectedStudent:{
        backgroundColor: '#f2f2f2',
        margin: 5,
        maxWidth: 160,
        minWidth: 150,
        justifyContent: 'center'
    },
    selectedStudentText:{
        color: 'white',
    },
    unSelectedStudentText:{
        color: '#808080'
    },
    content:{

    }
});
  