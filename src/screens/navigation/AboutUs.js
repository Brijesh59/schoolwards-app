import React from 'react'
import {StyleSheet, ScrollView} from 'react-native'
import { Text, Container, Content, Thumbnail, Grid, Col, Row} from 'native-base'
import CustomHeader from '../../components/common/CustomHeader';

export default function AboutUs() {
    return (
        <Container> 
            <CustomHeader title="About Us" />
            {/* <ScrollView> */}

            <Content 
                showsVerticalScrollIndicator
                contentContainerStyle={styles.container}>
                <Thumbnail 
                    large
                    style={styles.thumbnail} source={ require('../assets/schoolLogo.png')} />
                <Text style={styles.name}>Swami Vivekanand School</Text>    
                <Grid style={styles.grid}>
                    <Row style={{height:'auto'}}>
                        <Col>
                            <Text 
                                style={styles.key}>
                               Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
                            </Text>
                        </Col>
                    </Row>
                    <Row style={{height:'auto'}}>
                        <Col>
                            <Text 
                                style={styles.key}>
                               The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
                            </Text>
                        </Col>
                    </Row>
                </Grid>
            </Content>
            {/* </ScrollView> */}
        </Container>
    )
}
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'flex-start',
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
        width: '85%',
    },
    row:{
        marginTop: 10
    },
    key:{
        fontSize: 16,
        marginBottom: 30,
        color: '#363636'
    },
    thumbnail:{
       marginTop: 30,
       width:150,
       height:150
    },
});
  