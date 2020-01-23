import React from 'react'
import {StyleSheet, YellowBox, PermissionsAndroid, Alert} from 'react-native'
import { Text, Container, Content, Left, Button, Icon, Title, Body, Right, Header ,Drawer, Toast} from 'native-base'
import SideBar from './SideBar'
import { Actions } from 'react-native-router-flux'
import AsyncStorage from '@react-native-community/async-storage'


export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            showToast: false
        }
    }
    closeDrawer = () => { this._drawer._root.close() }
    openDrawer  = () => { this._drawer._root.open()  } 

    render(){
        return (
            <Container>

            <Drawer 
                ref={ (ref) => { this._drawer = ref }} 
                content={ <SideBar navigator={this._navigator} />} 
                onClose={() => this.closeDrawer()} 
               > 
            <Container> 
                <Header style={styles.header}   androidStatusBarColor="#3295E9" 
                iosBarStyle="light-content">
                    <Left style={{maxWidth:60}}>
                        <Button transparent onPress={this.openDrawer}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>SVS</Title>
                    </Body>
                    <Right style={{maxWidth:60}} >
                        <Button transparent >
                            <Icon name='options'/>
                        </Button>
                    </Right>
                    <Right style={{maxWidth:60}}>
                        <Button transparent 
                                onPress={async()=>{
                                    console.log("Pressed")
                                    
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
                                 }}
                        >
                            <Icon name='log-out' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Text>Here goes some content</Text>
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
        backgroundColor: '#2C96EA'
    }
});
  