import React from 'react'
import {StyleSheet, Platform, Linking, TouchableOpacity} from 'react-native'
import { Text, Container, Content, Thumbnail, Grid, Col, Row} from 'native-base'
import CustomHeader from '../../components/common/CustomHeader';


export default function ContactUs() {
    const dialCall = (phoneNumber) => {
        console.log('Dialing ...')
        let phone = ''
        if (Platform.OS === 'android') {
            phone = `tel:${phoneNumber}`
        }
        else {
            phone = `telprompt:${phoneNumber}`
        }
        Linking.openURL(phone)
    }
    return (
        <Container> 
            <CustomHeader title="Contact Us" />
            <Content 
                contentContainerStyle={styles.container}>
                <Thumbnail 
                    large
                    style={styles.thumbnail} source={ require('../assets/schoolLogo.png')} />
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
                            <TouchableOpacity 
                                onPress={()=>dialCall('020-26940500')}>
                                <Text 
                                    style={styles.value, {textDecorationLine: 'underline'}}>
                                    020-26940500
                                </Text>
                            </TouchableOpacity>
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
  