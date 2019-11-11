import React, {Component} from 'react'
import {Text, View} from 'react-native'
import {Actions, Drawer, Router, Scene, Stack, Tabs} from 'react-native-router-flux'
import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers'
import styles from './Styles/NavigationContainerStyle'
import TabIcon from '../Components/TabIcon'
import HomeScreen from '../Containers/HomeScreen'
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
import HomeTab from "../Containers/Tabs/HomeTab";
import strings from "../Constants/strings";
import BudgetScreen from "../Containers/BudgetScreen";
import LocatorScreen from "../Containers/LocatorScreen";
import SettingsScreen from "../Containers/SettingsScreen";
import DrawerComponent from "../Components/DrawerComponent";
import {drawerWidth} from "../Components/DrawerComponent/DrawerHeader/styles";
import RouteScreen from "../Containers/RouteScreen";
import CreateRoute from "../Containers/CreateRoute";
import SelectTaskOrder from "../Containers/SelectTaskOrder";
import UserProfile from '../Containers/UserProfile';
import FamilyMembers from '../Containers/FamilyMembers';
import NavigationToTask from "../Components/NavigationToTask";
import firebase from "react-native-firebase";
import RouteActions from "../Redux/RouteRedux";
import {connect} from "react-redux";

export const navigationMiddleware = createReactNavigationReduxMiddleware(state => state.nav)
Defaults.loadGlobalTextProps(TextConfig.customTextProps)
Defaults.loadGlobalInputTextProps(TextConfig.customTextInputProps)

class NavigationRouter extends Component {
    componentDidMount() {
        // Create notification channel required for Android devices
        this.createNotificationChannel();
        this.checkPermission();
    }

    onPressTab = (tab) => {
        const {getAllRoutes, getActiveRoute} = this.props
        const {navigation: {state: {key = ''} = {}} = {}} = tab
        if(key === 'tab1'){
            getAllRoutes({status: null, sort: 'today'})
        }else if(key === 'tab5'){
            getActiveRoute({status: 'active', sort: 'today'})
        }
        Actions.jump(key)
    }

    createNotificationChannel = () => {
        const channel = new firebase.notifications.Android.Channel(
            "reminder", // channelId
            "Reminders Channel", // channel name
            firebase.notifications.Android.Importance.High // channel importance
        ).setDescription("Used for getting reminder notification"); // channel description
        firebase.notifications().android.createChannel(channel);
    };

    checkPermission = async () => {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            // We've the permission
            this.notificationListener = firebase
                .notifications()
                .onNotification(async notification => {
                    // Display your notification
                    await firebase.notifications().displayNotification(notification);
                });
        } else {
            // user doesn't have permission
            try {
                await firebase.messaging().requestPermission();
            } catch (error) {
                Alert.alert("Unable to access the Notification permission. Please enable the Notification Permission from the settings");
            }
        }
    };

    render() {
        return (
            <Router>
                <Drawer
                    hideDrawerButton
                    drawerWidth={drawerWidth}
                    contentComponent={DrawerComponent}
                    drawerType={'slide'}>
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
                            navigationBarStyle={styles.primaryNavBar}
                            renderLeftButton={<BackButton/>}
                            titleStyle={styles.navBarTextTabs}
                            renderRightButton={<View style={styles.emptyRightButton}/>}
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
                            key='createRoute'
                            title='CREATE ROUTE'
                            component={CreateRoute}
                            renderLeftButton={<BackButton/>}
                            titleStyle={styles.navBarTextTabs}
                            navigationBarStyle={styles.primaryNavBar}
                            renderRightButton={<View style={styles.emptyRightButton}/>}
                        />
                        <Scene
                            hideNavBar
                            key='navigateToTask'
                            component={NavigationToTask}
                            titleStyle={styles.navBarTextTabs}
                            navigationBarStyle={styles.primaryNavBar}
                        />
                        <Scene
                            key='userProfile'
                            title='PROFILE'
                            component={UserProfile}
                            renderLeftButton={<BackButton/>}
                            titleStyle={styles.navBarTextTabs}
                            navigationBarStyle={styles.primaryNavBar}
                            renderRightButton={<Text onPress={() => Actions.familyMembers()}
                                                     style={styles.selectFamily}>SEE FAMILY</Text>}
                        />
                        <Scene
                            key='familyMembers'
                            title='FAMILY MEMBERS'
                            component={FamilyMembers}
                            renderLeftButton={<BackButton/>}
                            titleStyle={styles.navBarTextTabs}
                            navigationBarStyle={styles.primaryNavBar}
                            renderRightButton={<View style={styles.emptyRightButton}/>}
                        />
                        <Scene
                            key='selectTaskOrder'
                            title='SELECT TASK ORDER'
                            component={SelectTaskOrder}
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
                            titleStyle={styles.navBarTextTabs}
                            renderRightButton={<View style={styles.emptyRightButton}/>}
                            renderLeftButton={<BackButton onLeft={() => Actions.home({type: 'reset'})}/>}
                        />
                        <Scene
                            key='settings'
                            title='SETTINGS'
                            component={SettingsScreen}
                            renderLeftButton={<BackButton/>}
                            titleStyle={styles.navBarTextTabs}
                            navigationBarStyle={styles.primaryNavBar}
                            renderRightButton={<View style={styles.emptyRightButton}/>}
                        />
                        <Tabs
                            key='tabbar'
                            hideNavBar
                            showLabel={false}
                            tabBarPosition={'bottom'}
                            tabBarStyle={styles.tabBar}
                            tabBarOnPress={this.onPressTab}
                            titleStyle={styles.navBarTextTabs}
                            tabStyle={styles.tabBarIcon}>
                            <Scene
                                iconName='map'
                                key='tab1'
                                icon={TabIcon}
                                component={RouteScreen}
                                items
                                IconClass={Entypo}
                                title={'VIEW ROUTE'}
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
                                renderLeftButton={<NavigationButton iconName={'monetization-on'}
                                                                    iconType='MaterialIcons'/>}
                                renderRightButton={<NavigationButton iconName={'md-notifications-outline'}
                                                                     iconType='Ionicons'/>}
                            />
                            <Scene
                                key='tab3'
                                iconName='map'
                                icon={TabIcon}
                                title={'Budget'}
                                IconClass={Entypo}
                                component={BudgetScreen}
                                navigationBarStyle={styles.primaryNavBar}
                                renderLeftButton={<NavigationButton iconName={'monetization-on'}
                                                                    iconType='MaterialIcons'/>}
                                renderRightButton={<NavigationButton iconName={'md-notifications-outline'}
                                                                     iconType='Ionicons'/>}
                            />
                            <Scene
                                key='tab4'
                                icon={TabIcon}
                                iconName='location-pin'
                                title={'Locator'}
                                IconClass={SimpleLineIcons}
                                component={LocatorScreen}
                                navigationBarStyle={styles.primaryNavBar}
                            />
                            <Scene
                                initial
                                key='tab5'
                                icon={TabIcon}
                                title={strings.zeloo}
                                iconName='ios-home'
                                component={HomeTab}
                                navigationBarStyle={styles.primaryNavBar}
                                renderLeftButton={<NavigationButton iconName={'menu'} iconType='Feather'
                                                                    onPress={Actions.drawerOpen}/>}
                                renderRightButton={<View/>}
                            />
                        </Tabs>
                    </Stack>
                </Drawer>
            </Router>
        )

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllRoutes: (params) => dispatch(RouteActions.getRoutes(params)),
        getActiveRoute: (params) => dispatch(RouteActions.getActiveRoute(params)),
    }
}

export default connect(null, mapDispatchToProps)(NavigationRouter)

