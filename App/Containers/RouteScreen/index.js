import React, {Component} from 'react'
import {FlatList, SafeAreaView, StatusBar} from 'react-native'
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import styles from "./styles";
import {getCurrentGPSLocation} from "../../Lib/Utilities";
import CircleIcon from "../../Components/CircleIcon";
import ActionButtons from "../../Components/ActionButtons";
import {Actions} from "react-native-router-flux";
import SelectedRoute from "../../Components/SelectedRoute";
import CalendarItem from "../../Components/CalendarItem";
import moment from "moment";
import ActionSheet from "react-native-actionsheet";
import strings from "../../Constants/strings";
import {Colors} from "../../Themes";
import RouteActions from "../../Redux/RouteRedux";
import {connect} from "react-redux";
import {ProgressDialog} from "../../Components/ProgressDialog";

const Route = {
    fromTime: moment(), locationName: '4113 W Johnson Cir\nAtlanta, GA, United States', name: 'Meal Prep'
}
const DefaultDelta = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}
class RouteScreen extends Component {
    constructor(props) {
        super(props)
        StatusBar.setBackgroundColor(Colors.primaryColorI)
        this.state = {
            location: {}
        }
    }

    componentDidMount() {
        this.locateCurrentLocation()
        const {getAllRoutes} = this.props
        getAllRoutes({})
    }

    locateCurrentLocation = () => {
        const location = getCurrentGPSLocation().then((location) => {
            this.setState({location})
        })
    }


    renderRouteItem = ({item}) => {
        return <CalendarItem onPress={() => this.RouteAction.show()} item={item}/>
    }

    renderListHeaderComponent = () => {
        return <SelectedRoute item={Route}/>
    }

    render() {
        const {fetching, routes} = this.props
        const {location: {latitude = 0.0, longitude = 0.0}} = this.state
        const location = {latitude, longitude, ...DefaultDelta}

        return (
            <SafeAreaView style={styles.mainContainer}>
                <MapView
                    center
                    region={location}
                    provider={PROVIDER_GOOGLE}
                    style={styles.mapContainer}
                    initialRegion={location}/>
                <CircleIcon iconName='navigation' iconType='Feather' iconContainer={styles.navigationContainer}/>
                <CircleIcon onPress={this.locateCurrentLocation} iconContainer={styles.locationContainer}/>
                <FlatList
                    data={routes}
                    style={styles.routeContainer}
                    renderItem={this.renderRouteItem}
                    keyExtractor={item => String(item.id)}
                    ListHeaderComponent={this.renderListHeaderComponent}
                />
                <ActionButtons onPressActionButton1={Actions.createActivity}
                               onPressActionButton2={Actions.createRoute}/>
                <ActionSheet
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    title={strings.selectOption}
                    ref={o => this.RouteAction = o}
                    onPress={this.onImageActionPressed}
                    options={[strings.markActive, strings.delete, strings.cancel]}
                />
                <ProgressDialog hide={!fetching}/>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({route: {fetching, routes}}) => {
    return {fetching, routes}
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllRoutes: (params) => dispatch(RouteActions.getRoutes(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteScreen)
