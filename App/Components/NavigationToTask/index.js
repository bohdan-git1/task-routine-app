import React, {Component} from 'react'
import {Alert, Dimensions, StyleSheet, Text, BackAndroid, BackHandler, View, SafeAreaView} from 'react-native'
import Colors from "../../Themes/Colors";
import strings from "../../Constants/strings";
import CurrentLocationMarker from "../CurrentLocationMarker";
import {Actions} from 'react-native-router-flux'
import RouteActions from '../../Redux/RouteRedux'
import {connect} from "react-redux";
import {ProgressDialog} from "../ProgressDialog";
import {showMessage, TASK_STATUSES} from "../../Lib/Utilities";
import {Fonts, Metrics} from "../../Themes";
import openMap from 'react-native-open-maps';
import NavigationButton from "../NavigationButton";

const DefaultNavigationDelta = {
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0421,
}

class NavigationToTask extends Component {
    constructor(props) {
        super(props)
        this.state = {
            taskInProgress: true,
        }
    }

    componentDidMount(){
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        const {currentLocation, nextTask, nextRouteId} = this.props
        const {task: {locationCoordinates = [0, 0]} = {}} = nextTask
        const destination = {latitude: locationCoordinates[0], longitude: locationCoordinates[1]}
        const mapUrl = {latitude: currentLocation.latitude, longitude: currentLocation.longitude, start: `${currentLocation.latitude},${currentLocation.longitude}`, end: `${destination.latitude},${destination.longitude}`}
        setTimeout(() => {
            showMessage(strings.navigationStarted)
            openMap(mapUrl)
        }, 1000)
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }


    onPressedBack = () => {
       return Alert.alert(
            'Navigation is in progress',
            'Do you want to cancel the current navigation to task',
            [
                {
                    text: 'Yes',
                    onPress: () => Actions.tabbar({type: 'reset'}),
                    style: 'cancel',
                },
                {
                    text: 'Mark Task Done',
                    onPress: () => this.props.updateTaskStatusReq(nextTask.task.id, nextRouteId, TASK_STATUSES.COMPLETED)
                },
                {
                    text: 'Do Nothing',
                    onPress: () => {},
                    style: 'cancel',
                },
            ],
            {cancelable: false},
        );
    }

    handleBackPress = () => {
        this.onPressedBack()
        return true;
    }

    render() {
        const {taskInProgress} = this.state
        const {currentLocation, nextTask, nextRouteId} = this.props
        const {task: {locationName: destinationName, name, id: taskID, locationCoordinates = [0, 0]} = {}} = nextTask
        const destination = {latitude: locationCoordinates[0], longitude: locationCoordinates[1]}
        return (
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.navBar}>
                    <NavigationButton onPress={this.onPressedBack} iconName={'chevron-thin-left'} iconType={'Entypo'}  size={20} style={styles.backIcon} />
                    <Text style={styles.title}>{strings.turnByTurnNav}</Text>
                    <View style={styles.dummyView}/>
                </View>
                <View style={styles.innerContainer}>
                {taskInProgress && <Text style={styles.navInProgress}>{strings.navigationInProgress}</Text>}
                {taskInProgress && <Text style={styles.closeApp}>{strings.closeApp}</Text>}
                    <CurrentLocationMarker defaultLocation={currentLocation}
                                           isTracking={true}
                                           onArrived={() => {
                                               this.setState({taskInProgress: false})
                                               Alert.alert(
                                                   'Arrived',
                                                   'Your destination has arrived. Mark Task as completed or Cancel.',
                                                   [
                                                       {
                                                           text: 'Cancel',
                                                           onPress: () => Actions.tabbar({type: 'reset'}),
                                                           style: 'cancel',
                                                       },
                                                       {
                                                           text: 'Mark Done',
                                                           onPress: () => this.props.updateTaskStatusReq(nextTask.task.id, nextRouteId, TASK_STATUSES.COMPLETED)
                                                       },
                                                   ],
                                                   {cancelable: false},
                                               );
                                           }}
                                           destination={destination}/>
                <ProgressDialog hide={!this.props.fetching}/>
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({route: {fetching}, user: {currentLocation}}) => {
    return {
        currentLocation, fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTaskStatusReq: (taskId, routeId, status) => dispatch(RouteActions.updateTaskStatus(taskId, routeId, status))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationToTask)

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.snow,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: Metrics.marginThirty,
    },
    navInProgress: {
        color: Colors.black,
        textAlign: 'center',
        fontSize: Fonts.size.h5
    },
    closeApp: {
        color: Colors.gray,
        textAlign: 'center',
        fontSize: Fonts.size.regular,
        marginTop: Metrics.marginFifteen
    },
    navBar: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        width: Metrics.screenWidth,
        backgroundColor: Colors.primaryColorI,
    },
    backIcon: {
        padding: 10,
        fontSize: 20,
        color: Colors.snow
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        fontWeight: null,
        fontFamily: Fonts.type.medium,
        color: Colors.snow
    },
    dummyView: {
        width: 40
    }
})
