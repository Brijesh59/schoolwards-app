import React from 'react'
import {View, StyleSheet} from 'react-native'

import { Drawer } from 'native-base'
import SideBar from './SideBar'

export default class DrawerExample extends React.Component {
    closeDrawer = () => { this.drawer._root.close() }
    openDrawer  = () => { this.drawer._root.open()  } 
  
    render() { 
        return ( 
            <Drawer 
                ref={ (ref) => { this.drawer = ref }} 
                content={ <SideBar navigator={this.navigator} />} 
                onClose={() => this.closeDrawer()} > 
            </Drawer> 
        ) 
    } 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 150
    }
});
  