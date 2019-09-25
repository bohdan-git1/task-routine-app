import React, {Component} from 'react'
import {AppState, View} from "react-native";
import RNLocation from "react-native-location";
import {ARRIVED_DISTANCE_THRESHOLD, getLatLonDiffInMeters} from "../../Lib/Utilities";
import firebase from "react-native-firebase";

export default class CurrentLocationMarker extends Component {
    constructor(props) {
        super(props)
        const { defaultLocation = { latitude: 0, longitude: 0 } } = props
        this.state = {
            currentLocation: defaultLocation,
            appState: AppState.currentState,
            arrived: false
        }
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

    async componentDidMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
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
                this._startUpdatingLocation();
                console.tron.warn('Start updating location')
            } else {
            }
        });
    }

    _handleAppStateChange = (nextAppState) => {
        if (
            this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            if(this.state.arrived){
                this.props.onArrived()
            }
        }
        this.setState({appState: nextAppState});
    };

    _startUpdatingLocation = () => {
        this.locationSubscription = RNLocation.subscribeToLocationUpdates(
            (locations) => {
                // console.tron.warn({locations})
                const {0: {longitude = 0, latitude = 0} = {}} = locations
                this.currentLocation = { latitude, longitude }
                this.setState({currentLocation: {latitude, longitude}}, () => {
                    if (this.trackingMarker && this.trackingMarker.redraw) {
                        this.trackingMarker.redraw()
                    }
                    const { destination } = this.props
                    const distance = getLatLonDiffInMeters(latitude, longitude, destination.latitude, destination.longitude);
                    console.tron.warn({distance})
                    if (Math.abs(distance)) {
                        if(distance <= ARRIVED_DISTANCE_THRESHOLD) {
                            this.setState({arrived: true})
                            this.props.onArrived()
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
        AppState.removeEventListener('change', this._handleAppStateChange);
        this._stopUpdatingLocation()
    }

    render() {
        const {currentLocation} = this.state
        const {isTracking} = this.props
        if (!isTracking) {
            return null
        }

        return  <View/>
    }
}
