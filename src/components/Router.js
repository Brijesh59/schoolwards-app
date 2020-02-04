import React from 'react'
import { Router, Scene, Stack } from 'react-native-router-flux'

import OnBoarding   from '../screens/OnBoarding'
import Login        from '../screens/Login'
import Details      from '../screens/Details'
import SplashScreen from '../screens/SplashScreen'
import VerifyOTP    from '../screens/VerifyOTP'
import Home         from '../screens/Home'
import Profile      from '../screens/navigation/Profile'
import ContactUs    from '../screens/navigation/ContactUs'
import AboutUs      from '../screens/navigation/AboutUs'
import Calender     from '../screens/navigation/Calender'
import Setting      from '../screens/navigation/Setting'
import FeeDetails      from '../screens/navigation/FeeDetails'

const RouterComponent = () => {
    return (
        <>
            <Router>
                <Stack key="root" hideNavBar >
                     
                    <Scene 
                        key="splashScreen" 
                        component={SplashScreen} 
                        direction="left" />
                 
                    <Scene 
                        key="onBoarding" 
                        hideNavBar>
                        <Scene 
                            key="onBoardingScreeen" 
                            component={OnBoarding} />
                    </Scene>

                    <Scene 
                        key="auth" 
                        hideNavBar>
                        <Scene 
                            key="login" 
                            component={Login} />
                    </Scene>
                    <Scene 
                        key="OTP" 
                        hideNavBar>                             
                        <Scene 
                            key="verifyOTP" 
                            component={VerifyOTP} />
                    </Scene>
 
                    <Scene 
                        gesturesEnabled={false}
                        key="dashboard" 
                        component={Home} />
                    <Scene 
                        key="details" 
                        component={Details} />
                    <Scene
                        key="profileScreen"
                        component={Profile} />
                    <Scene
                        key="calenderScreen"
                        component={Calender} />
                    <Scene
                        key="contactUsScreen"
                        component={ContactUs} />
                    <Scene
                        key="aboutUsScreen"
                        component={AboutUs} />
                    <Scene
                        key="settingScreen"
                        component={Setting} />
                    <Scene
                        key="detailsScreen"
                        component={Details} />
                    <Scene
                        key="feeScreen"
                        component={FeeDetails} />
                </Stack> 
            </Router>   
        </>
    )
}

export default RouterComponent;