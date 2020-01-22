import React from 'react'
import {StyleSheet} from 'react-native'
import { Text, Container, Content, Left, Icon, Title, List, ListItem, Thumbnail, Header, Button, Body, Grid, Col, Row} from 'native-base'
import { Actions } from 'react-native-router-flux';
import CustomButton from '../components/common/CustomButton'

export default function Profile() {
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
                    <Title>Children</Title>
                </Body> 
            </Header>
            <Content 
                contentContainerStyle={styles.container}>
                <Thumbnail 
                    large
                    style={styles.thumbnail} source={{uri: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/68.png'}} />
                <Text style={styles.name}>Soham Patel</Text>    
                <Grid style={styles.grid}>
                    <Row style={styles.row}>
                        <Col>
                            <Text 
                                style={styles.key}>
                                Roll No
                            </Text>
                        </Col>
                        <Col> 
                            <Text 
                                style={styles.value}>
                                27
                            </Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col>
                            <Text 
                                style={styles.key}>
                                Class
                            </Text>
                        </Col>
                        <Col> 
                            <Text 
                                style={styles.value}>
                                1-A
                            </Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col>
                            <Text 
                                style={styles.key}>
                                Date of Birth
                            </Text>
                        </Col>
                        <Col> 
                            <Text 
                                style={styles.value}>
                                01/12/2020
                            </Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col>
                            <Text 
                                style={styles.key}>
                                Gender
                            </Text>
                        </Col>
                        <Col> 
                            <Text 
                                style={styles.value}>
                                Male
                            </Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col>
                            <Text 
                                style={styles.key}>
                                Father
                            </Text>
                        </Col>
                        <Col> 
                            <Text 
                                style={styles.value}>
                                Tushar Satpute
                            </Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col>
                            <Text 
                                style={styles.key}>
                                Mother
                            </Text>
                        </Col>
                        <Col> 
                            <Text 
                                style={styles.value}>
                                Swati Satpute
                            </Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col>
                            <Text 
                                style={styles.key}>
                                Address
                            </Text>
                        </Col>
                        <Col> 
                            <Text 
                                style={styles.value}>
                                Ashok Nagarm Khardi Bypass, Pune, 411038
                            </Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col>
                            <Text 
                                style={styles.key}>
                                
                            </Text>
                        </Col>
                        <Col> 
                            <Text 
                                style={styles.value}>
                            </Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col>
                            <Text 
                                style={styles.key}>
                                Mobile
                            </Text>
                        </Col>
                        <Col> 
                            <Text 
                                style={styles.value}>
                                88956592356
                            </Text>
                        </Col>
                    </Row>
                    <Row style={styles.row}>
                        <Col>
                            <Text 
                                style={styles.key}>
                                Email
                            </Text>
                        </Col>
                        <Col> 
                            <Text 
                                style={styles.value}>
                                tushatpute@gmail.com
                            </Text>
                        </Col>
                    </Row>
                </Grid>
                <CustomButton 
                    title="Fee Details" 
                    onPressFunction={()=>console.log('Fee Details')}
                    style={{marginBottom:20, width:'50%'}}/>
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
        fontSize:20,
        padding: 10,
        color: '#2C96EA'
    },
    grid:{
        marginTop: 5,
        width: '95%',
    },
    key:{
        fontSize: 16,
        marginLeft: 20,
    },
    value:{
        fontSize: 16,
        color: '#808080'
    },
    thumbnail:{
       marginTop: 10,
       width:100,
       height:100
    },
});
  