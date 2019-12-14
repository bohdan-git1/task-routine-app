import {isEmpty} from 'lodash'
import React, {Component} from 'react'
import {SafeAreaView, Text, TouchableOpacity, FlatList, View} from 'react-native'
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import CheckInItem from "../../Components/CheckInItem";
import styles from "./styles";
import {getCurrentGPSLocation} from "../../Lib/Utilities";
import VectorIcon from "../../Components/VectorIcon";
import LocatorActions from "../../Redux/LocatorRedux";
import {connect} from "react-redux";
import {ProgressDialog} from "../../Components/ProgressDialog";
import moment from "moment";

const DefaultDelta = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

class LocatorScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            location: {},
            taskName: 'Current Location'
        }
    }


    locateCurrentLocation = () => {
        const location = getCurrentGPSLocation().then((location) => {
            this.setState({location})
        })
    }

    componentDidMount() {
        const {getAllLocation} = this.props
        this.locateCurrentLocation()
        getAllLocation({date: moment().format('DD/MM/YYYY')})
    }

    renderCurrentLocation = () => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={this.locateCurrentLocation} style={styles.currentLocation}>
                <VectorIcon name='my-location' type='MaterialIcons' style={styles.currentLocationIcon}/>
            </TouchableOpacity>
        )
    }

    renderMarker = () => {
        const {location = {}, taskName} = this.state
        return (
            <Marker
                title={taskName}
                coordinate={{...DefaultDelta, ...location}}
                animateMarkerToCoordinate={{...DefaultDelta, ...location}}
            />
        )
    }

    locatePosition = (locationCoordinates, taskName) => {
        const location = {latitude: locationCoordinates[0], longitude: locationCoordinates[1]}
        this.setState({location, taskName})
    }


    renderLocationItem = ({item}) => {
        const {locationCoordinates = [], taskName} = item || {}
        return (
            <CheckInItem item={item} onPress={ () => this.locatePosition(locationCoordinates, taskName)}/>
        )
    }


    render() {
        const {fetching, locations} = this.props
        const {location: {latitude = 0.0, longitude = 0.0}, taskName} = this.state
        const location = {latitude, longitude, ...DefaultDelta}
        return (
            <SafeAreaView style={styles.mainContainer}>
                <View style={{flex: 1}}>
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
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        data={locations}
                        renderItem={this.renderLocationItem}
                        keyExtractor={(item, index) => String(item.id || index)}
                    />
                </View>
                <ProgressDialog hide={!fetching}/>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({locator: {fetching, locations}}) => {
    return {
        fetching, locations
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllLocation: (params) => dispatch(LocatorActions.getAllLocations(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocatorScreen)
