import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'

export default function Button({title, onPressFunction, style}) {
    return (
        <View style = {style}>
            <TouchableOpacity
                style={styles.btn}>
                <Text style={{fontSize: 16, letterSpacing: 1, width: '100%', textAlign: 'center'}} 
                onPress={() => onPressFunction()}>
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btn:{
        backgroundColor: '#F8C732',
        padding: 10,
        //width: 230,
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
});

