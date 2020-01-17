import React from 'react'
import { AsyncStorage } from 'react-native'
import { Router, Scene, Stack, Actions, Drawer } from 'react-native-router-flux'

import Login from '../screens/Login'
import Dashboard from '../screens/Dashboard'
import Details from '../screens/Details'
import SplashScreen from '../screens/SplashScreen'
import VerifyOTP from '../screens/VerifyOTP'
import SideMenu from '../screens/SideMenu'

const RouterComponent = () => {
    return (
        <>
            <Router>
                <Stack key="root" hideNavBar >
                     
                    <Scene key="splashScreen" component={SplashScreen} direction="left" />
                 
                    <Scene key="auth" hideNavBar>
                        <Scene key="login" component={Login} />
                    </Scene>
                    <Scene key="OTP" hideNavBar>
                        <Scene key="verifyOTP" component={VerifyOTP} />
                    </Scene>
                    
                        {/* <Scene 
                            key="dashboard" 
                            component={Dashboard} 
                            title="Dashboard" 
                            rightTitle="Log Out"
                            onRight={async() => {
                                // clear isUserLoggedIn & redirect to auth Page
                                await AsyncStorage.setItem('isUserLoggedIn', 'false')
                                Actions.auth()
                            }}/>
                        <Scene key="details" component={Details} title="Details"/> */}
                        <Drawer
                            hideNavBar
                            key="drawerMenu"
                            contentComponent={SideMenu}
                            drawerWidth={250}
                            drawerPosition="left"
                            tapToClose={true}
                            openDrawerOffset={0.2}
                          
                            >
                            <Scene 
                                key="dashboard" 
                                component={Dashboard} 
                                title="Dashboard" 
                                rightTitle="Log Out"
                                onRight={ async() => {
                                    // clear isUserLoggedIn & redirect to auth Page
                                    await AsyncStorage.setItem('isUserLoggedIn', 'false')
                                    Actions.auth()
                                }}
                                
                            />
                            <Scene 
                                key="details" 
                                component={Details} 
                                title="Details"
                                back={true} /*Show Back Button, instead of drawer button 
                            
                                */
                               
                                />
                            <Scene
                                key="profileScreen"
                                component={Details}
                            />
                            <Scene
                                key="carsListScreen"
                                component={Details}
                            />
                            <Scene
                                key="carViewScreen"
                                component={Details}
                            />
                        </Drawer>
                </Stack> 
            </Router>   
        </>
    )
}

export default RouterComponent;