import React, {Component} from 'react'
import MapView from "react-native-maps";
import {View} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../../Themes/Colors";
import RNLocation from "react-native-location";
import {ARRIVED_DISTANCE_THRESHOLD, getLatLonDiffInMeters} from "../../Lib/Utilities";

export default class CurrentLocationMarker extends Component {
    constructor(props) {
        super(props)
        const { defaultLocation = { latitude: 0, longitude: 0 } } = props
        this.state = {
            currentLocation: defaultLocation
        }
    }

    async componentDidMount() {
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
            } else {
            }
        });
    }

    _startUpdatingLocation = () => {
        this.locationSubscription = RNLocation.subscribeToLocationUpdates(
            (locations) => {
                console.tron.warn({locations})
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
                            this.props.onArrived()
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

    render() {
        const {currentLocation} = this.state
        const {isTracking} = this.props
        if (!isTracking) {
            return null
        }

        return (
            <MapView.Marker key={'trackingMarker'} ref={ref => this.trackingMarker = ref}
                            coordinate={currentLocation}
                            anchor={{x: 0.5, y: 0.5}}>
                <View style={{
                    width: 35,
                    height: 35,
                    borderRadius: 35 / 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <LinearGradient
                        style={{width: 15, height: 15, borderRadius: 15 / 2, overflow: 'hidden'}}
                        colors={[Colors.themeColor, Colors.panther]}/>
                </View>
            </MapView.Marker>
        )
    }
}
