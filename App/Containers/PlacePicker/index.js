import React, {Component} from 'react'
import {SafeAreaView} from 'react-native'
import styles from "./styles";
import {Colors} from "../../Themes";
import {MAPS_KEY} from "../../Lib/AppConstants";
import PropTypes from "prop-types";
import LocationView from "../../Components/LocationView/LocationView";
import {connect} from "react-redux";

class PlacePicker extends Component {
    static propTypes = {
        onPlacePicked: PropTypes.function,
    }

    static defaultProps = {
        onPlacePicked: () => {},
    }

    render() {
        const {onPlacePicked, currentLocation} = this.props
        return (
            <SafeAreaView style={styles.mainContainer}>
                <LocationView
                    apiKey={MAPS_KEY}
                    markerColor={Colors.themeColor}
                    onLocationSelect={onPlacePicked}
                    actionButtonStyle={{backgroundColor: Colors.themeColor}}
                    initialLocation={currentLocation}
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({user: {currentLocation = {}}}) => {
    return {currentLocation}
}

export default connect(mapStateToProps, null)(PlacePicker)

