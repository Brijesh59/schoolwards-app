import React from 'react'
import {StyleSheet, YellowBox} from 'react-native'
import { Text, Container, Content, Left, Button, Icon, Title, Body, Right, Header ,Drawer} from 'native-base'
import SideBar from './SideBar'


export default class Home extends React.Component{

    closeDrawer = () => { this._drawer._root.close() }
    openDrawer  = () => { this._drawer._root.open()  } 
    render(){
        return (
            <>
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
                    <Right style={{maxWidth:60}}>
                        <Button transparent>
                            <Icon name='thumbs-up' />
                        </Button>
                    </Right>
                    <Right style={{maxWidth:60}}>
                        <Button transparent>
                            <Icon name='warning' />
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Text>Here goes some content</Text>
                </Content>
            </Container>
            </Drawer> 
            </>
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
  