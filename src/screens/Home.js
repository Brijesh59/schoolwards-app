import React from 'react'
import {StyleSheet, TouchableOpacity, FlatList, View, Alert} from 'react-native'
import Modal from 'react-native-modal'
import { Container, Content, Left, Button, Icon, Title, Body, Right, Header, Drawer, Text, Radio, ListItem } from 'native-base'
import { Actions }  from 'react-native-router-flux'
import AsyncStorage from '@react-native-community/async-storage'
import FeatherIcon  from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign    from 'react-native-vector-icons/AntDesign'

import CustomCard   from '../components/common/CustomCard'
import SideBar      from './SideBar'
import CustomButton from '../components/common/CustomButton'


export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showToast: false,
            showFilterModal: false,
            showSortModal: false,
            sortOldToNew: false,
            sortNewtoOld: true,
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
                    studentName:"Samay Verma",
                    dateTime:"20 February 2020, 09:57 AM",
                    attatchment: null,
                },
                {
                    title:"Test Timetable",
                    type:"Timetable",
                    description:"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                    to: "individual",
                    studentName:"Samay Verma",
                    dateTime:"20 February 2020, 09:57 AM"
                }
            ],
            events: []
        }
    }
    componentDidMount = async() => {
        const cachedData = await AsyncStorage.getItem('cachedData')
        const JSONData = JSON.parse(cachedData)
        this.setState({events: JSONData.events})
    }

    closeDrawer = () => { this._drawer._root.close() }
    openDrawer  = () => { this._drawer._root.open()  } 
    
    filterList = () => {
       this.setState({showFilterModal: false})
    }
    
    sortListNewToOld = () => { 
        this.setState({
            sortNewtoOld: true,
            sortOldToNew: false,
        })   
    }

    sortListOldToNew = () => { 
        this.setState({
            sortNewtoOld: false,
            sortOldToNew: true,
        })   
    }

    handleSort = () => {
        this.setState({showSortModal: false})
        if(this.state.sortNewtoOld){
            
        }
        else{

        }
    }

    handleLogout = async() => {
        Alert.alert(
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
        const header = 
            <Header 
                style={styles.header}           
                androidStatusBarColor="#3295E9" 
                iosBarStyle="light-content">
                <Left style={{maxWidth:60, marginLeft: 8}}>
                    <Button transparent onPress={this.openDrawer}>
                        <Icon name='menu' style={styles.iconStyle} />
                    </Button>
                </Left>
                <Body style={{alignItems: 'flex-start'}}>
                    <Title style={styles.headerTitle}>SVS</Title>
                </Body>
                <Right style={{maxWidth:50}} >
                    <Button transparent onPress={()=>this.setState({showFilterModal: true})} >
                        <FeatherIcon 
                            name="filter" 
                            color="white"
                            size={24} />
                    </Button>
                </Right>
                <Right style={{maxWidth:50}} >
                    <Button transparent onPress={()=>this.setState({showSortModal: true})} >
                        <MaterialIcon 
                            name="sort-descending" 
                            color="white"
                            size={24} />
                    </Button>
                </Right>
                <Right style={{maxWidth:50}}>
                    <Button transparent onPress={this.handleLogout} >
                        <AntDesign 
                            name='logout'   
                            color="white"
                            size={22}/>
                    </Button>
                </Right>
            </Header>

        const mainContent = this.state.events && 
            <FlatList 
                data={this.state.events}
                renderItem={
                    card => (
                        <TouchableOpacity
                            style={{width: '100%'}}
                            onPress={() => 
                                Actions.detailsScreen({
                                    details: card.item
                                })
                            }
                            >
                            <CustomCard 
                                title={card.item.title}
                                type={card.item.type}
                                description={card.item.description}
                                to={card.item.to}
                                studentName={card.item.studentName}
                                dateTime={card.item.dateTime}
                            />
                        </TouchableOpacity>
                    )
                }
                keyExtractor={(card, index) => index}
            />
        
        const sortModal = 
               <View style={{flex: 1}}>
                    <Modal 
                        isVisible={this.state.showSortModal}
                        animationIn='zoomIn'
                        animationOut="zoomOut"
                        animationInTiming={400}
                        animationOutTiming={400}
                        onBackdropPress={()=>this.setState({showSortModal: false})}>
                        <View style={styles.modalContent}>     
                        {/* <Text>
                            <MaterialIcon 
                            name="sort-descending" 
                            color="#2C96EA"
                            size={24}
                            /> 
                        </Text> */}
                        <Text style={{fontSize: 22, color: '#2C96EA' }}>Sort</Text>
                        <View style={{width: '90%'}}>
                            <ListItem onPress={this.sortListNewToOld} style={{alignItems:'center'}}>
                                <Left>
                                    <Text>New to Old</Text>
                                </Left>
                                <Left>
                                    <Radio 
                                        onPress={this.sortListNewToOld}
                                        selected={this.state.sortNewtoOld}
                                        selectedColor="#2C96EA"
                                    />
                                </Left>
                            </ListItem>  
                            <ListItem onPress={this.sortListOldToNew}>
                                    <Left>
                                        <Text>Old to New</Text>
                                    </Left>
                                    <Left>
                                        <Radio 
                                            onPress={this.sortListOldToNew}
                                            selected={this.state.sortOldToNew}
                                            selectedColor="#2C96EA"
                                        />
                                    </Left>
                            </ListItem> 
                        </View>
                        <CustomButton 
                            title="Ok"
                            onPressFunction={this.handleSort}
                            style={{width: '40%', marginTop: 10}}
                        />     
                        </View>
                    </Modal>
               </View>
        
        const filterModal = 
                <Modal>
                    
                </Modal>
        
        return (
            <Container>
                <Drawer 
                    ref = { (ref) => { this._drawer = ref } } 
                    content = { 
                        <SideBar navigator={this._navigator}/>
                    }
                    onClose = { () => this.closeDrawer() } > 
                    <Container> 
                        {header}
                        <Content contentContainerStyle={styles.content}>
                            { mainContent }
                            { sortModal }
                            { filterModal }
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
        width:'95%',
        marginLeft: '2.5%',
        marginTop: 10
    },
    grid:{
        marginTop: 5,
        width: '95%',
    },
    modalContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: `rgba(0,0,0,0.5)`,
    },
    modalContent:{
        backgroundColor: 'white',
        width: '90%',
        marginLeft: '5%',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5
    }
});
  