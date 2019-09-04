import React, {Component} from 'react'
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native'
import MapView from "react-native-maps";
import Colors from "../../Themes/Colors";
import strings from "../../Constants/strings";
import CurrentLocationMarker from "../CurrentLocationMarker";
import MapViewDirections from "react-native-maps-directions";
import {Actions} from 'react-native-router-flux'
import RouteActions from '../../Redux/RouteRedux'

import {MAPS_KEY} from "../../Lib/AppConstants";
import {connect} from "react-redux";
import Metrics from "../../Themes/Metrics";
import {ProgressDialog} from "../ProgressDialog";
import {showMessage, TASK_STATUSES} from "../../Lib/Utilities";

const DefaultNavigationDelta = {
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0421,
}

const {width, height} = Dimensions.get('window');

class NavigationToTask extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount(){
        showMessage(strings.navigationStarted)
    }

    render() {
        const {currentLocation, nextTask, nextRouteId} = this.props
        const {task: {locationName: destinationName, name, id: taskID, locationCoordinates = [0, 0]} = {}} = nextTask
        const destination = {latitude: locationCoordinates[0], longitude: locationCoordinates[1]}
        return (
            <View style={styles.mainContainer}>
                <View style={styles.topContainer}>
                    <View style={[styles.row, styles.borderBottom]}>
                        <Text>From: {currentLocation.latitude}, {currentLocation.longitude}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text>To: {destinationName}</Text>
                    </View>
                </View>
                <MapView
                    region={{...currentLocation, ...DefaultNavigationDelta}}
                    initialRegion={{...currentLocation, ...DefaultNavigationDelta}}
                    style={styles.mapContainer}
                    ref={c => this.mapView = c}
                >
                    <MapView.Marker key={`${taskID}`}
                                    coordinate={destination}
                                    title={destinationName}
                                    pinColor={Colors.red}/>
                    <MapView.Marker key={'userCurrentLocationMarker'}
                                    coordinate={currentLocation}
                                    title={strings.startOf}/>
                    <CurrentLocationMarker defaultLocation={currentLocation}
                                           isTracking={true}
                                           onArrived={() => {
                                               Alert.alert(
                                                   'Arrived',
                                                   'your destination has arrived. ',
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
                    <MapViewDirections
                        origin={currentLocation}
                        destination={destination}
                        apikey={MAPS_KEY}
                        strokeWidth={5}
                        strokeColor={Colors.red}
                        optimizeWaypoints={true}
                        onStart={(params) => {
                            console.tron.warn(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}
                        onReady={result => {
                            this.setState({startedNavigation: true}, () => {
                                this.mapView.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: (width / 20),
                                        bottom: (height / 20),
                                        left: (width / 20),
                                        top: (height / 20),
                                    }
                                });
                            })
                        }}
                        onError={(errorMessage) => {
                            console.tron.warn(errorMessage)
                        }}
                    />
                </MapView>
                <ProgressDialog hide={!this.props.fetching}/>
            </View>
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
    },
    topContainer: {
        width: '100%',
        padding: Metrics.doubleBaseMargin,
        backgroundColor: Colors.snow
    },
    row: {
        flexDirection: 'row',
        paddingVertical: Metrics.smallMargin,
    },
    borderBottom: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.grayI
    },
    mapContainer: {
        flex: 1
    },
    navigationContainer: {
        width: 40,
        right: 25,
        height: 40,
        borderRadius: 20,
        bottom: Metrics.screenHeight / 2
    },
    locationContainer: {
        bottom: Metrics.screenHeight / 2 - 60
    },
    routeContainer: {
        flex: 1
    }
})
