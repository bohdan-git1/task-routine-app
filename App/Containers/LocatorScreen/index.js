import {isEmpty} from 'lodash'
import React, {Component} from 'react'
import {SafeAreaView, Text, TouchableOpacity} from 'react-native'
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import CheckInItem from "../../Components/CheckInItem";
import styles from "./styles";
import {getCurrentGPSLocation} from "../../Lib/Utilities";
import VectorIcon from "../../Components/VectorIcon";
const DefaultDelta = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}
export default class LocatorScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            location: {}
        }
    }


    locateCurrentLocation = () => {
        const location = getCurrentGPSLocation().then((location) => {
            this.setState({location})
        })
    }

    componentDidMount() {
        this.locateCurrentLocation()
    }

    renderCurrentLocation = () => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={this.locateCurrentLocation} style={styles.currentLocation}>
                <VectorIcon name='my-location' type='MaterialIcons' style={styles.currentLocationIcon}/>
            </TouchableOpacity>
        )
    }

    renderMarker = () => {
        const {location = {}} = this.state
        return (
            <Marker
                title='MC'
                coordinate={{...DefaultDelta, ...location}}
                animateMarkerToCoordinate={{...DefaultDelta, ...location}}
            />
        )
    }


    render() {
        const {location: {latitude = 0.0, longitude = 0.0}} = this.state
        const location = { latitude, longitude, ...DefaultDelta}
        return (
            <SafeAreaView style={styles.mainContainer}>
                <MapView
                    center
                    region={location}
                    provider={PROVIDER_GOOGLE}
                    style={styles.mapContainer}
                    initialRegion={location}>
                    {!isEmpty(this.state.location) && this.renderMarker()}
                </MapView>
                {this.renderCurrentLocation()}
                <Text style={styles.checkIn}>Previous Check-ins</Text>
                <CheckInItem/>
            </SafeAreaView>
        )
    }
}
