import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card, CardItem, Left, Text, Icon, Right, Body } from 'native-base'

export default function CustomCard({title, type, description, to, studentName, dateTime, onCardPressed}) {

    const getIcon = (iconType) => {
        switch(iconType.toLowerCase()){
            case 'announcement': 
                return 'megaphone'
            case 'event': 
                return 'calendar'
            case 'homework': 
                return 'journal'
            case 'message':
                return 'mail'
            case 'news':
                return 'cellular'  
            case 'timetable':
                return 'list-box'          
            default: 
                return ''
        }
    }

    return (
        <View>
            <Card style={styles.container} >
                <CardItem header bordered >
                    <Left>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                    </Left>
                    <Right>
                        <Icon name={ getIcon(type) } style={styles.iconStyle} />
                    </Right>
                </CardItem>
                <CardItem onPress={()=>onCardPressed()}>
                    <Body>
                        <Text style={styles.description}>          
                            {description}
                        </Text>
                    </Body>
                </CardItem>
                <CardItem>
                    <Left>
                        <Icon name={
                            to === "all" ?
                            'contacts' :
                            'contact'
                        } style={styles.iconStyle} />
                        <Text style={styles.normal}>
                            {studentName}
                        </Text>
                    </Left>
                </CardItem>
                <CardItem footer bordered>
                    <Left>
                        <Icon name='pricetag' style={styles.iconStyle} />
                        <Text style={styles.normal}>
                            {type}
                        </Text>
                    </Left>
                    <Right>
                        <Text style={styles.normal}>
                            {dateTime}
                        </Text>
                    </Right>
                </CardItem>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,  
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: { 
        color: '#363636',
        fontWeight: '600'
    },
    description:{
        color: '#707070', 
    },
    normal: {
        color: '#2C96EA', 
        fontWeight: '400',
        fontSize: 14,
        width: '100%'
    },
    iconStyle:{
        color: '#2C96EA',
        fontSize: 22
    }
});
