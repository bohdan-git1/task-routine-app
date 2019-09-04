import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {TouchableOpacity, View, Text, Image} from 'react-native'

import styles from './styles'
import moment from "moment";
import VectorIcon from "../VectorIcon";
import Images from "../../Themes/Images";
import {FormatDateTime} from "../../Lib/Utilities";
import {Colors} from "../../Themes";


export default class RouteItem extends Component {
    static propTypes = {
        item: PropTypes.object,
        onPress: PropTypes.function,
        selectedRoutes: PropTypes.array
    }
    static defaultProps = {
        item: {},
        selectedRoutes: [],
        onPress: () => {
        }
    }

    render() {
        const {item, onPress, selectedRoutes} = this.props
        const {id, fromTime = moment(), type = '', locationName = 'Building No 1', name = 'MC'} = item || {}
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={onPress}
                              style={[styles.mainContainer, selectedRoutes.includes(String(id)) && {backgroundColor: Colors.frost}]}>
                <View style={styles.yellowLine}/>
                <View style={styles.rightContainer}>
                    <View style={styles.timeContainer}>
                        <Text numberOfLines={1} style={styles.time}>{FormatDateTime(fromTime, 'h:mm A')}</Text>
                        <View style={styles.typeContainer}>
                            <VectorIcon name={'ios-car'} type={'Ionicons'} style={styles.carIcon}/>
                        </View>
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{name}</Text>
                        <View style={styles.locationContainer}>
                            <VectorIcon name={'location-pin'} type={'SimpleLineIcons'} style={styles.locationIcon}/>
                            <Text numberOfLines={2} style={styles.location}>{locationName}</Text>
                        </View>
                        {selectedRoutes.includes(String(id)) ?
                            <VectorIcon name={'check'} type={'FontAwesome'} style={styles.checkIcon}/> :
                            <View style={styles.dot}/>}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
