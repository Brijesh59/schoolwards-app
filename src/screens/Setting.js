import React from 'react'
import {StyleSheet} from 'react-native'
import { Container, Content, Left, Icon, Title, Header, Button, Body} from 'native-base'
import { Actions } from 'react-native-router-flux';


export default function Setting() {
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
                    <Title>Settings</Title>
                </Body> 
            </Header>
            <Content 
                contentContainerStyle={styles.container}>
                
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
        backgroundColor: '#2C96EA'
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
  