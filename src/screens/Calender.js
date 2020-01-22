import React, { useState } from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import { Container, Content, Left, Icon, Title, Header, Button, Body, Text, Grid, Col} from 'native-base'
import { Actions } from 'react-native-router-flux';
import {Calendar, Agenda} from 'react-native-calendars';

export default function CalenderScreen() {
    const [selectedStudent, setSelectedStudent] = useState(0)

    return (
        <Container> 
            <Header style={styles.header}   androidStatusBarColor="#3295E9" 
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
                <Grid style={{
                    flexDirection: 'row',
                    // margin: 30, 
                    // backgroundColor: 'red',
                    // width: '90%'
                }}>
                    {
                        ['Soham','Shahid','Mehika','Aditya'].map((student, index) => (
                           
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
                                onPress = { () => setSelectedStudent(index) }
                                >
                                    <Text style = {
                                        index === selectedStudent ?
                                        styles.selectedStudentText :
                                        styles.unSelectedStudentText
                                    }>{ student }</Text>
                                </Button>
                            
                        ))
                    }
                </Grid>
                
                <Calendar
                    onDayPress={(day) => {console.log('selected day', day)}}

                    monthFormat={'MMM yyyy'}

                    onMonthChange={(month) => {console.log('month changed', month)}}

                    hideExtraDays={true}

                    firstDay={1}
        
                    onPressArrowLeft={substractMonth => substractMonth()}
                    style={{
                        borderWidth: 1,
                        borderColor: '#f2f2f2',
                        borderTopWidth: 5,
                        borderTopColor: '#2C96EA',
                        height: 'auto',
                        width: '90%',
                        shadowOffset:{
                            width: 5,
                            height:2
                        },
                        shadowOpacity: 0.4
                      }}
                      theme={{
                        selectedDayBackgroundColor: '#2C96EA',
                        selectedDayTextColor: '#ffffff',
                      }}
                      selected={'2020-01-24'}
                    onPressArrowRight={addMonth => addMonth()}
                    />
                    
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
        margin: 10
    },
    unSelectedStudent:{
        backgroundColor: '#f2f2f2',
        margin: 10
    },
    selectedStudentText:{
        color: 'white',
    },
    unSelectedStudentText:{
        color: '#808080'
    }
});
  