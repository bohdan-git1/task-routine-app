import React, {Component} from 'react'
import {Dimensions, FlatList, Modal, SafeAreaView, StatusBar, Text, View} from 'react-native'
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import * as _ from 'lodash'

import styles from "./styles";
import CircleIcon from "../../Components/CircleIcon";
import ActionButtons from "../../Components/ActionButtons";
import {Actions} from "react-native-router-flux";
import SelectedRoute from "../../Components/SelectedRoute";
import CalendarItem from "../../Components/CalendarItem";
import ActionSheet from "react-native-actionsheet";
import strings from "../../Constants/strings";
import {Colors} from "../../Themes";
import RouteActions from "../../Redux/RouteRedux";
import UserActions from "../../Redux/UserRedux";
import {connect} from "react-redux";
import {ProgressDialog} from "../../Components/ProgressDialog";
import {MAPS_KEY} from "../../Lib/AppConstants";
import AnimatedAlert from "../../Components/AnimatedAlert";
import RNLocation from "react-native-location";
import {
    ARRIVED_DISTANCE_THRESHOLD,
    getLatLonDiffInMeters,
    routeHasIncompleteTask,
    routeHasTasks,
    showMessage,
    TASK_STATUSES
} from "../../Lib/Utilities";
import openMap from "react-native-open-maps";
import firebase from "react-native-firebase";
import RoundedButton from "../../Components/RoundedButton";

const {width, height} = Dimensions.get('window');

export const DefaultDelta = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

class RouteScreen extends Component {
    constructor(props) {
        super(props)
        const {route} = props
        StatusBar.setBackgroundColor(Colors.primaryColorI)
        this.state = {
            location: {},
            selectedRouteId: route.id || null,
            activeRoute: route || {},
            arrived: false,
            nextTask: {},
            nextRouteId: '',
            navigationInProgress: false
        }
        this.mapView = null;
        this.activeRoute = false
    }

    buildNotification = () => {
        const notification = new firebase.notifications.Notification()
            .setNotificationId('1')
            .setTitle('Arrived')
            .setBody('Your destination has arrived.')
            .android.setPriority(firebase.notifications.Android.Priority.High)
            .android.setChannelId('reminder')
            .android.setAutoCancel(true)

        return notification;
    };

    setNotification = async () => {
        firebase.notifications().displayNotification(this.buildNotification())
    };


    _startUpdatingLocation = (destination) => {
        this.locationSubscription = RNLocation.subscribeToLocationUpdates(
            (locations) => {
                // console.tron.warn({locations})
                const {0: {longitude = 0, latitude = 0} = {}} = locations
                this.currentLocation = {latitude, longitude}
                this.setState({currentLocation: {latitude, longitude}}, () => {
                    if (this.trackingMarker && this.trackingMarker.redraw) {
                        this.trackingMarker.redraw()
                    }
                    const distance = getLatLonDiffInMeters(latitude, longitude, destination.latitude, destination.longitude);
                    if (Math.abs(distance)) {
                        if (distance <= ARRIVED_DISTANCE_THRESHOLD) {
                            this.setState({arrived: true})
                            this.setNotification()
                            this._stopUpdatingLocation()
                        }
                    }
                });
            }
        );
    };


    _stopUpdatingLocation = () => {
        this.locationSubscription && this.locationSubscription();
        // this.setState({ userCurrentLocation: null });
    };

    componentWillUnmount() {
        this._stopUpdatingLocation()
    }


    async componentDidMount() {
        const {getAllRoutes} = this.props
        getAllRoutes({status: null, sort: 'today'})
        RNLocation.configure({
            desiredAccuracy: {
                ios: "bestForNavigation",
                android: "highAccuracy"
            },
            allowsBackgroundLocationUpdates: true,
            distanceFilter: 0.01,
            androidProvider: "auto",
            interval: 1000, // Milliseconds
            fastestInterval: 1000, // Milliseconds
            maxWaitTime: 1000, // Milliseconds
        }).then(() => RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
                detail: "fine",
                rationale: {
                    title: "Location permission",
                    message: "We use your location to show you real time directions.",
                    buttonPositive: "OK",
                    buttonNegative: "Cancel"
                }
            }
        })).then(granted => {
            console.tron.warn(granted)
            if (granted) {
                console.tron.warn('Start updating location')
            } else {
            }
        });
    }

    onPressedRoutesActions = (index) => {
        const {selectedRouteId} = this.state
        const {updateRouteStatus, deleteRoute, getSpecificRoute} = this.props
        if (index === 0) {
            updateRouteStatus(selectedRouteId, {status: 'active'}, true)
        } else if (index === 1) {
            deleteRoute(selectedRouteId)
        }
    }

    onPressedRouteItem = (selectedRouteId) => {
        if (_.isEmpty(this.getActiveRoute())) {
            this.setState({selectedRouteId})
            this.RouteAction.show()
        }
    }

    renderRouteItem = ({item}) => {
        return <CalendarItem onPress={() => this.onPressedRouteItem(item.id)} item={item}
                             onMarkTaskDone={this.onMarkTaskDone}/>
    }

    onMarkTaskDone = (taskId, status) => {
        const {updateTaskStatusReq, route} = this.props
        const {selectedRouteId} = this.state
        updateTaskStatusReq(taskId, (selectedRouteId || route.id), status)
    }

    renderListHeaderComponent = (activeRoute) => {
        return <SelectedRoute item={activeRoute} onCloseTask={this.removeActiveTask}/>
    }

    removeActiveTask = () => {
        const {updateRouteStatus, getSpecificRoute, route} = this.props
        const {selectedRouteId} = this.state
        const routeId = selectedRouteId || route.id

        if (_.isEmpty(route) || !routeId) {
            return
        }
        updateRouteStatus(routeId, {status: 'inactive'}, true)
    }

    onShowDirections = () => {
        const {fetching, fetchingTasks, route = {}} = this.props
        if (fetching || fetchingTasks) {
            return
        }
        const {id = '', tasks = []} = route || {}
        let nextTask = tasks.find((item) => item.task.taskStatus === TASK_STATUSES.INCOMPLETE)
        if (_.isEmpty(nextTask)) {
            const hasTasks = routeHasTasks(route)
            if (hasTasks) {
                showMessage(strings.allTasksCompletedForRoute)
            } else {
                showMessage(strings.noTaskFound)
            }
        } else {
            this.navigateToTask(nextTask, route.id)
        }
    }

    navigateToTask = (nextTask, nextRouteId) => {
        const {currentLocation, activeRoute} = this.props
        this.setState({nextRouteId, nextTask, navigationInProgress: true})
        const {task: {locationName: destinationName, name, id: taskID, locationCoordinates = [0, 0]} = {}} = nextTask
        const destination = {latitude: locationCoordinates[0], longitude: locationCoordinates[1]}
        this._startUpdatingLocation(destination);
        const mapUrl = {
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            start: `${currentLocation.latitude},${currentLocation.longitude}`,
            end: `${destination.latitude},${destination.longitude}`
        }
        showMessage(strings.navigationStarted)
        openMap(mapUrl)
    }

    onMarkerPress = (item) => {
        if (item && item.taskStatus === TASK_STATUSES.INCOMPLETE) {
            // todo: show Directions to next Task.
            this.onShowDirections()
        }
    }

    getActiveRoute = () => {
        const {route = {}} = this.props
        return route && route.routeStatus === 'active' ? route : {}
    }

    render() {
        const {fetching, fetchingTasks, routes = [], route = {}, currentLocation} = this.props
        let activeRoute = this.getActiveRoute()
        let tasksList = []
        const {selectedRouteId, navigationInProgress, nextTask, nextRouteId, arrived} = this.state
        const originLocation = {...currentLocation, ...DefaultDelta}
        let locationCoordinates = []
        let wayPoints = null
        if (!fetchingTasks) {
            const {id = '', tasks = []} = route || {}
            if (String(id) === String(selectedRouteId) && route.routeStatus === 'active') {
                tasksList = tasks.map((item) => ({...item.task, order: item.order} || {}))
                activeRoute = route.id === selectedRouteId ? route : (routes[0].id === selectedRouteId ? routes[0] : {})
                locationCoordinates.push(currentLocation)
                locationCoordinates = tasksList.map((item) => {
                    const {locationCoordinates = []} = item || {}
                    const latlong = {latitude: locationCoordinates[0], longitude: locationCoordinates[1]}
                    return latlong
                })
                wayPoints = (locationCoordinates.length > 2) ? locationCoordinates.slice(1, -1) : null
            }
        }
        locationCoordinates = [currentLocation, ...locationCoordinates]
        const showDirections = (locationCoordinates.length >= 2) && routeHasIncompleteTask(activeRoute)
        this.activeRoute = showDirections
        return (
            <SafeAreaView style={styles.mainContainer}>
                <MapView
                    region={originLocation}
                    initialRegion={originLocation}
                    style={styles.mapContainer}
                    ref={c => this.mapView = c}
                >
                    {
                        showDirections && tasksList.map((item, index) => {
                            const {locationCoordinates = [0, 0], taskStatus, name} = item
                            return <MapView.Marker key={`${item.id}`}
                                                   coordinate={{
                                                       latitude: locationCoordinates[0],
                                                       longitude: locationCoordinates[1]
                                                   }}
                                                   title={name}
                                                   onPress={() => this.onMarkerPress(item)}
                                                   pinColor={taskStatus === TASK_STATUSES.COMPLETED ? Colors.green : Colors.red}/>
                        })
                    }
                    <MapView.Marker key={'userCurrentLocationMarker'}
                                    coordinate={currentLocation}
                                    title={strings.startOf}/>
                    {showDirections && (
                        <MapViewDirections
                            origin={locationCoordinates[0]}
                            destination={locationCoordinates[locationCoordinates.length - 1]}
                            waypoints={wayPoints}
                            apikey={MAPS_KEY}
                            strokeWidth={5}
                            strokeColor={Colors.red}
                            optimizeWaypoints={true}
                            onStart={(params) => {
                                console.tron.warn(`Started routing between "${params.origin}" and "${params.destination}"`);
                            }}
                            onReady={result => {
                                this.mapView.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: (width / 20),
                                        bottom: (height / 20),
                                        left: (width / 20),
                                        top: (height / 20),
                                    }
                                });
                            }}
                            onError={(errorMessage) => {
                                console.tron.warn(errorMessage)
                            }}
                        />
                    )}
                </MapView>
                <CircleIcon iconName='navigation'
                            iconType='Feather'
                            iconContainer={styles.navigationContainer}
                            onPress={this.onShowDirections}/>
                <CircleIcon onPress={() => {
                }} iconContainer={styles.locationContainer}/>
                <FlatList
                    data={!_.isEmpty(activeRoute) && routeHasTasks(activeRoute) ? tasksList : routes}
                    style={styles.routeContainer}
                    renderItem={this.renderRouteItem}
                    keyExtractor={item => String(item.id)}
                    ListEmptyComponent={<AnimatedAlert title={strings.noRouteFound}/>}
                    ListHeaderComponent={this.renderListHeaderComponent(activeRoute)}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={navigationInProgress}
                    onRequestClose={() => {}}>
                    <View style={styles.modalMainContainer}>
                    <View style={styles.navModalContainer}>
                        <View style={styles.header}>
                            <Text style={styles.heading}>{arrived ? 'Arrived' : 'Navigation in progress'}</Text>
                        </View>
                        <Text style={styles.cancelNavigation}>{arrived ? 'Your destination has arrived. Mark Task as completed or Cancel.' : 'Do you want to cancel navigation?'}</Text>
                        <RoundedButton
                            buttonContainer={styles.modalButton}
                            text={'Mark Task Done'}
                            onPress={() => this.props.updateTaskStatusReq(nextTask.task.id, nextRouteId, TASK_STATUSES.COMPLETED)}
                        />
                        <RoundedButton buttonContainer={styles.modalButton} text={'Cancel'} onPress={() => {
                            this.setState({navigationInProgress: false})
                            Actions.tabbar({type: 'reset'})
                        }}/>
                    </View>
                    </View>
                </Modal>
                <ActionButtons onPressActionButton1={Actions.createActivity}
                               onPressActionButton2={Actions.createRoute}/>
                <ActionSheet
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    title={strings.selectOption}
                    ref={o => this.RouteAction = o}
                    onPress={this.onPressedRoutesActions}
                    options={[strings.markActive, strings.delete, strings.cancel]}
                />
                <ProgressDialog hide={!fetching && !fetchingTasks}/>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({route: {fetching, activeRoute, fetchingTasks, routes = [], route = {}}, user: {currentLocation}}) => {
    return {fetching, routes, route, currentLocation, activeRoute, fetchingTasks}
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllRoutes: (params) => dispatch(RouteActions.getRoutes(params)),
        deleteRoute: (routeId) => dispatch(RouteActions.deleteRoute(routeId)),
        getSpecificRoute: (routeId) => dispatch(RouteActions.getSpecificRoute(routeId)),
        getActiveRoute: (params) => dispatch(RouteActions.getActiveRoute(params)),
        updateRouteStatus: (routeId, params, fetchAfterUpdate) => dispatch(RouteActions.updateRouteStatus(routeId, params, fetchAfterUpdate)),
        getCurrentLocation: () => dispatch(UserActions.getCurrentLocation()),
        updateTaskStatusReq: (taskId, routeId, status, fetchAfterUpdate) => dispatch(RouteActions.updateTaskStatus(taskId, routeId, status, fetchAfterUpdate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteScreen)
