// @flow

import React from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import {Actions, Router, Scene, Stack, Tabs} from 'react-native-router-flux'
import {createReactNavigationReduxMiddleware, createReduxContainer} from 'react-navigation-redux-helpers'
import styles from './Styles/NavigationContainerStyle'
import TabIcon from '../Components/TabIcon'
import HomeScreen from '../Containers/HomeScreen'
import TabScreen from '../Containers/TabScreen'
import CustomWebview from '../Components/CustomWebview'
import {Colors} from '../Themes'
import LoginScreen from "../Containers/LoginScreen";
import BackButton from "../Components/BackButton";
import SingupScreen from "../Containers/SignupScreen";
import PhoneVerificationScreen from "../Containers/PhoneVerificationScreen";
import SignupInfoScreen from "../Containers/SignupInfoScreen";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Calendars from "../Containers/Calendars";
import CreateActivity from "../Containers/CreateActivity";
import Defaults from "../Config/ElementDefaults";
import TextConfig from "../Config/ElementDefaults/defaultStyles";
import ActivityDetails from "../Containers/ActivityDetails";
import NavigationButton from "../Components/NavigationButton";

export const navigationMiddleware = createReactNavigationReduxMiddleware(state => state.nav)
Defaults.loadGlobalTextProps(TextConfig.customTextProps)
Defaults.loadGlobalInputTextProps(TextConfig.customTextInputProps)

export const Routes = Actions.create(
    <Stack
        headerMode='screen'
        navigationBarStyle={styles.navBarStyle}
        titleStyle={styles.navBarTextScreens}
        backButtonTintColor={Colors.snow}>
        <Scene
            key='webView'
            url='https://www.google.com' // todo: change url according to your default
            component={CustomWebview}
            title='Webview'
            titleStyle={styles.navBarTextTabs}
        />
        <Scene
            initial
            key='home'
            hideNavBar
            component={HomeScreen}
            titleStyle={styles.navBarTextTabs}
        />
        <Scene
            key='login'
            title='SIGN IN'
            component={LoginScreen}
            renderLeftButton={<BackButton/>}
            titleStyle={styles.navBarTextTabs}
            renderRightButton={<View style={styles.emptyRightButton}/>}
        />
        <Scene
            key='signup'
            title='SIGN UP'
            component={SingupScreen}
            renderLeftButton={<BackButton/>}
            titleStyle={styles.navBarTextTabs}
            renderRightButton={<View style={styles.emptyRightButton}/>}
        />
        <Scene
            key='verifyPhone'
            title='Verify Phone'
            component={PhoneVerificationScreen}
            renderLeftButton={<BackButton/>}
            titleStyle={styles.navBarTextTabs}
            renderRightButton={<View style={styles.emptyRightButton}/>}
        />
        <Scene
            key='createActivity'
            title='CREATE ACTIVITY'
            component={CreateActivity}
            renderLeftButton={<BackButton/>}
            titleStyle={styles.navBarTextTabs}
            navigationBarStyle={styles.primaryNavBar}
            renderRightButton={<View style={styles.emptyRightButton}/>}
        />
        <Scene
            key='activityDetail'
            component={ActivityDetails}
            renderLeftButton={<BackButton/>}
            titleStyle={styles.navBarTextTabs}
            navigationBarStyle={styles.primaryNavBar}
            renderRightButton={<NavigationButton iconName={'mode-edit'} iconType='MaterialIcons'/>}
        />
        <Scene
            key='profileInfo'
            title='BASIC INFO'
            component={SignupInfoScreen}
            renderLeftButton={<BackButton onLeft={() => Actions.home({type: 'reset'})}/>}
            titleStyle={styles.navBarTextTabs}
            renderRightButton={<View style={styles.emptyRightButton}/>}
        />
        <Tabs
            key='tabbar'
            hideNavBar
            showLabel={false}
            tabBarPosition={'bottom'}
            tabBarStyle={styles.tabBar}
            titleStyle={styles.navBarTextTabs}
            tabStyle={styles.tabBarIcon}>
            <Scene
                iconName='map'
                key='tab1'
                icon={TabIcon}
                component={TabScreen}
                IconClass={Entypo}
                title={'Route'}
                navigationBarStyle={styles.primaryNavBar}
            />
            <Scene
                key='tab2'
                icon={TabIcon}
                title={'Calendar'}
                component={Calendars}
                IconClass={FontAwesome5}
                iconName='calendar-check'
                navigationBarStyle={styles.primaryNavBar}
                renderLeftButton={<NavigationButton iconName={'monetization-on'} iconType='MaterialIcons'/>}
                renderRightButton={<NavigationButton iconName={'md-notifications-outline'} iconType='Ionicons'/>}
            />
            <Scene
                key='tab3'
                iconName='map'
                icon={TabIcon}
                component={TabScreen}
                title={'Budget'}
                IconClass={Entypo}
                navigationBarStyle={styles.primaryNavBar}
            />
            <Scene
                key='tab4'
                icon={TabIcon}
                iconName='location-pin'
                title={'Locator'}
                IconClass={SimpleLineIcons}
                component={TabScreen}
                navigationBarStyle={styles.primaryNavBar}
            />
            <Scene
                initial
                key='tab5'
                icon={TabIcon}
                title={'Home'}
                iconName='ios-home'
                component={TabScreen}
                navigationBarStyle={styles.primaryNavBar}
            />
        </Tabs>
    </Stack>
)

export const ReduxNavigator = createReduxContainer(Routes)
export default connect(state => ({state: state.nav}))(Router)
