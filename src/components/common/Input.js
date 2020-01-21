import React, { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

export default function Input(props) {
    const [focusStyle, setFocusStyle] = useState(0);
    return (
        <View style={ focusStyle ? styles.focusStyle : styles.root } >
            <TextInput 
                ref={props.reference}
                onChangeText={props.onChangeText}
                numeric value
                keyboardType={'numeric'} 
                maxLength={1}
                style={{fontSize: 18}}
                onFocus={() => setFocusStyle(1)}
                onBlur={() => setFocusStyle(0)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root:{
        width: 45,
        height: 45,
        borderWidth: 1,
        borderColor: '#808080', 
        alignItems: "center",
        margin: 3
    },
    focusStyle:{
        width: 45,
        height: 45,
        borderWidth: 1,
        borderColor: '#808080', 
        alignItems: "center",
        margin: 3,
        borderBottomColor: '#F8C732',
        borderBottomWidth: 3,
    }
})
