import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'

import styles from './styles'
import {FormatDateTime} from "../../Lib/Utilities";
import VectorIcon from "../VectorIcon";


export default class CalendarItem extends Component {
    static propTypes = {
        item: PropTypes.object,
        onPress: PropTypes.function
    }
    static defaultProps = {
        item: {},
        onPress: () => {
        }
    }

    render() {
        const {item, onPress} = this.props
        const {fromTime, date,  type = '', locationName = '', name = ''} = item || {}
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.mainContainer}>
                <View style={styles.mainContainer}>
                    <View style={styles.yellowLine}/>
                    <View style={styles.rightContainer}>
                        <View style={styles.timeContainer}>
                            <Text numberOfLines={1} style={styles.time}>{FormatDateTime(fromTime || date, 'h:mm A')}</Text>
                            <View style={styles.typeContainer}>
                                <VectorIcon name={'ios-car'} type={'Ionicons'} style={styles.carIcon}/>
                                <Text style={styles.type}>{type}</Text>
                            </View>
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{name}</Text>
                            <View style={styles.locationContainer}>
                                <VectorIcon name={'location-pin'} type={'SimpleLineIcons'} style={styles.locationIcon}/>
                                <Text style={styles.location}>{locationName}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
