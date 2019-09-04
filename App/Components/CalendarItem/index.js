import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'

import styles from './styles'
import {FormatDateTime, TASK_STATUSES} from "../../Lib/Utilities";
import VectorIcon from "../VectorIcon";
import strings from "../../Constants/strings";
import Colors from "../../Themes/Colors";


export default class CalendarItem extends Component {
    static propTypes = {
        item: PropTypes.object,
        onPress: PropTypes.func,
        onMarkTaskDone: PropTypes.func
    }
    static defaultProps = {
        item: {},
        onPress: () => {
        }
    }

    render() {
        const {item, onPress, onMarkTaskDone} = this.props
        const {fromTime, date, type = '', locationName = '', name = '', taskStatus} = item || {}
        const bgColor = taskStatus && taskStatus === TASK_STATUSES.COMPLETED ? {backgroundColor: Colors.green} : {}
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.mainContainer}>
                <View style={styles.mainContainer}>
                    <View style={[styles.yellowLine, bgColor]}/>
                    <View style={styles.rightContainer}>
                        <View style={styles.timeContainer}>
                            <Text numberOfLines={1}
                                  style={styles.time}>{FormatDateTime(fromTime || date, 'h:mm A')}</Text>
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
                            {
                                typeof onMarkTaskDone === 'function' ? taskStatus && taskStatus === TASK_STATUSES.INCOMPLETE
                                    ? <TouchableOpacity onPress={() => onMarkTaskDone(item.id, TASK_STATUSES.COMPLETED)}
                                                        style={styles.markDoneBtnContainer}>
                                        <Text style={styles.markDoneTxt}>{strings.markDone}</Text>
                                    </TouchableOpacity> : (taskStatus === TASK_STATUSES.COMPLETED ?
                                        <View style={styles.markDoneBtnContainer}>
                                            <Text style={styles.completeTxt}>{strings.completed}</Text>
                                        </View> : null) : null
                            }
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
