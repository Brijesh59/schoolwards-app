import React from 'react'
import {StyleSheet} from 'react-native'
import { Container, Content} from 'native-base'
import CustomHeader from '../../components/common/CustomHeader'

export default function Setting() {
    return (
        <Container> 
            <CustomHeader title="Fee Details" />
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
  