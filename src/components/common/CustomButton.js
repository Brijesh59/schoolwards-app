import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'

export default function Button({title, onPressFunction, style, disabled}) {
    
    return (
        <View style = {style}>
            <TouchableOpacity
                disabled={disabled}
                style={[styles.btn, style.backgroundColor ? style.backgroundColor: styles.backgroundColor]}
                onPress={() => onPressFunction()}>
                <Text style={{fontSize: 16, letterSpacing: 1, width: '100%', textAlign: 'center'}} >
                    {title}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btn:{
        padding: 10,
        //width: 230,
        textAlign: 'center',
        alignItems: 'center',
        
        borderRadius: 5
    },
    backgroundColor: {
        backgroundColor: '#F8C732',
        borderWidth: 2,
        borderColor: '#F8C732'
    }
});

