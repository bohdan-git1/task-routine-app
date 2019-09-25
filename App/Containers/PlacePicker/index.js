import React, {Component} from 'react'
import {SafeAreaView} from 'react-native'
import styles from "./styles";
import {Colors} from "../../Themes";
import {MAPS_KEY} from "../../Lib/AppConstants";
import PropTypes from "prop-types";
import LocationView from "../../Components/LocationView/LocationView";

export default class PlacePicker extends Component {
    static propTypes = {
        onPlacePicked: PropTypes.function,
    }

    static defaultProps = {
        onPlacePicked: () => {},
    }

    render() {
        const {onPlacePicked} = this.props
        return (
            <SafeAreaView style={styles.mainContainer}>
                <LocationView
                    apiKey={MAPS_KEY}
                    markerColor={Colors.themeColor}
                    onLocationSelect={onPlacePicked}
                    actionButtonStyle={{backgroundColor: Colors.themeColor}}
                    initialLocation={{  longitude: -158.0209227, latitude: 21.5010495}}
                />
            </SafeAreaView>
        )
    }
}
