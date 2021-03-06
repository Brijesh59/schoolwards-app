import React, { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

export default function Input(props) {
    const [focusStyle, setFocusStyle] = useState(0);
    return (
        <View style={ focusStyle ? styles.focusStyle : styles.root } >
            <TextInput 
                ref={props.reference}
                onChangeText={props.onChangeText}
                numeric 
                keyboardType={'numeric'} 
                maxLength={1}
                style={styles.inputStyle}
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
        justifyContent: 'center',
        alignItems: "center",
        margin: 3
    },
    inputStyle:{
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#808080'
    },
    focusStyle:{
        width: 45,
        height: 45,
        borderWidth: 1,
        borderColor: '#808080', 
        justifyContent: 'center',
        alignItems: "center",
        margin: 3,
        borderBottomColor: '#F8C732',
        borderBottomWidth: 3,
    }
})
