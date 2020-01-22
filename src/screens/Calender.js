import React, { useState } from 'react'
import {StyleSheet, View} from 'react-native'
import { Container, Content, Left, Icon, Title, Header, Button, Body, Text, Grid, Col} from 'native-base'
import { Actions } from 'react-native-router-flux';

export default function Calender() {
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
            </Content>
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
  