import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'

import styles from './styles'
import moment from "moment";
import VectorIcon from "../VectorIcon";
import {FormatDateTime} from "../../Lib/Utilities";


export default class TaskItem extends Component {
    static propTypes = {
        item: PropTypes.object,
        onPress: PropTypes.function,
        move: PropTypes.function,
        moveEnd: PropTypes.function
    }
    static defaultProps = {
        item: {},
        onPress: () => {},
        move: () => {},
        moveEnd: () => {},
    }

    render() {
        const {item, onPress, move, moveEnd, index} = this.props
        const {id, fromTime = moment(), type = 'Errand', locationName = 'Building No 1', name = 'MC'} = item || {}
        return (
            <TouchableOpacity onLongPress={move}
            onPressOut={moveEnd} activeOpacity={0.8} onPress={onPress} style={styles.mainContainer}>
                <View style={styles.innerContainer}>
                    <View style={styles.yellowLine}/>
                    <View style={styles.rightContainer}>
                        <View style={styles.timeContainer}>
                            <Text numberOfLines={1} style={styles.time}>{FormatDateTime(fromTime, 'h:mm A')}</Text>
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
                                <View style={styles.dot}>
                                    <Text style={styles.itemId}>{index}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
