import React from 'react'
import {StyleSheet, View} from 'react-native'
import { Container, Content, Left, Button, Icon, Title, Body, Right, Header ,Drawer } from 'native-base'
import { Actions } from 'react-native-router-flux'
import AsyncStorage from '@react-native-community/async-storage'

import CustomCard from '../components/common/CustomCard'
import SideBar from './SideBar'

export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showToast: false,
            cards: [
                {
                    title:"Test Announcement",
                    type:"Announcement",
                    description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                    to: "all",
                    dateTime:"16 January 2020, 09:57 AM",
                    attatchment: null
                },
                {
                    title:"Test Announcement",
                    type:"Announcement",
                    description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                    to: "individual",
                    studentName:"Aman Verma",
                    dateTime:"16 January 2020, 09:57 AM",
                    attatchment: null
                },
                {
                    title:"Test Event",
                    type:"Event",
                    description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                    to: "individual",
                    studentName:"Vikas Verma",
                    dateTime:"20 February 2020, 09:57 AM",
                    venue: "School Hall",
                    startDate: "23 February 2020, 09:57 AM",
                    endDate: "25 February 2020, 09:57 AM",
                    attatchment: null
                },
                {
                    title:"Test Homework",
                    type:"Homework",
                    description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                    assignedBy: "Raman Vohra",
                    to: "individual",
                    studentName:"Vikas Verma",
                    dateTime:"20 February 2020, 09:57 AM",
                    attatchment: "https://images.unsplash.com/photo-1579705743135-bc6ef4f6a8d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
                },
                {
                    title:"Test Homework 2",
                    type:"Homework",
                    description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                    assignedBy: "Raman Vohra",
                    to: "individual",
                    studentName:"Vikas Verma",
                    dateTime:"20 February 2020, 09:57 AM",
                    attatchment: null,
                },
                {
                    title:"Test Message",
                    type:"Message",
                    description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                    sendBy: "Akansha Vats",
                    to: "individual",
                    studentName:"Vikas Verma",
                    dateTime:"20 February 2020, 09:57 AM"
                },
                {
                    title:"Test News",
                    type:"News",
                    description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                    to: "individual",
                    studentName:"Vikas Verma",
                    dateTime:"20 February 2020, 09:57 AM",
                    attatchment: null,
                },
                {
                    title:"Test Timetable",
                    type:"Timetable",
                    description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                    to: "individual",
                    studentName:"Vikas Verma",
                    dateTime:"20 February 2020, 09:57 AM"
                }
            ]
        }
    }
    componentDidMount(){}

    closeDrawer = () => { this._drawer._root.close() }
    openDrawer  = () => { this._drawer._root.open()  } 
    handleLogout = async() => {
        alert(
            'Attention',
            'Are you sure you want to log out ?',
            [
                {
                    text: 'No',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: async()=>{
                        await AsyncStorage.setItem('isUserLoggedIn', 'false')
                        Actions.auth()
                    },
                    style: 'ok'
                }
            ]
        )
    }

    render(){
        const mainContent = 
            this.state.cards.map((card, index)=>
                <View   
                    onStartShouldSetResponder={() => 
                        Actions.detailsScreen({card})
                    }
                    key={index}>
                    <CustomCard 
                        title={card.title}
                        type={card.type}
                        description={card.description}
                        to={card.to}
                        studentName={card.studentName}
                        dateTime={card.dateTime}
                    />
                </View>
            )

        return (
            <Container>
                <Drawer 
                    ref={ (ref) => { this._drawer = ref } } 
                    content={ <SideBar navigator={this._navigator} /> }
                    onClose={() => this.closeDrawer() } 
                > 
                    <Container> 
                        <Header style={styles.header} androidStatusBarColor="#3295E9" 
                        iosBarStyle="light-content">
                            <Left style={{maxWidth:60, marginLeft: 8}}>
                                <Button transparent onPress={this.openDrawer}>
                                    <Icon name='menu' style={styles.iconStyle} />
                                </Button>
                            </Left>
                            <Body style={{alignItems: 'flex-start'}}>
                                <Title style={styles.headerTitle}>SVS</Title>
                            </Body>
                            <Right style={{maxWidth:60}} >
                                <Button transparent >
                                    <Icon name='options' style={styles.iconStyle}/>
                                </Button>
                            </Right>
                            <Right style={{maxWidth:60}}>
                                <Button transparent onPress={this.handleLogout} >
                                    <Icon name='log-out' style={styles.iconStyle}/>
                                </Button>
                            </Right>
                        </Header>
                        <Content contentContainerStyle={styles.content}>
                            { mainContent }
                        </Content>
                    </Container>
            </Drawer> 
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    header: { 
        backgroundColor: '#2C96EA',
    },
    headerTitle:{
        color: 'white',
    },
    iconStyle:{
        color: 'white',
    },
    content:{
        width: '90%',
        marginTop: 20,
        marginLeft: '5%',
    } 
});
  