import React from 'react'
import {StyleSheet} from 'react-native'
import { Text, Container, Content, Left, Icon, Title, List, ListItem, Thumbnail, Header, Button, Body, Grid, Col, Row} from 'native-base'
import { Actions } from 'react-native-router-flux';
import CustomButton from '../components/common/CustomButton'

export default function ContactUs() {
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
                    <Title>Contact Us</Title>
                </Body> 
            </Header>
            <Content 
                contentContainerStyle={styles.container}>
                <Thumbnail 
                    large
                    style={styles.thumbnail} source={ require('./assets/schoolLogo.png')} />
                <Text style={styles.name}>Swami Vivekanand School</Text>    
                <Grid style={styles.grid}>
                    <Row style={{height:'auto'}}>
                        <Col style={{width:'40%'}}>
                            <Text 
                                style={styles.key}>
                                Address :
                            </Text>
                        </Col>
                        <Col> 
                            <Text 
                                style={styles.value}>
                                Swami Vivekanand School, Katraj Undri Hadaspur Bypass Road, Sai Colony, Hadaspur, Autowadi Handiwadi, Pune, Maharashtra, 411028
                            </Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col style={{width:'40%'}}>
                            <Text 
                                style={styles.key}>
                                Contact :
                            </Text>
                        </Col>
                        <Col> 
                            <Text 
                                style={styles.value}>
                                020-26940500
                            </Text>
                        </Col>
                    </Row>
                    
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
        //marginTop: 150
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
  