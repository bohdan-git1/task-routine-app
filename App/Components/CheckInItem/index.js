import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {TouchableOpacity, View, Text, Image} from 'react-native'

import styles from './styles'
import {FormatDateTime} from "../../Lib/Utilities";
import VectorIcon from "../VectorIcon";
import moment from "moment";
import Images from "../../Themes/Images";


export default class CheckInItem extends Component {
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
        const {createdAt = moment(), address = '', taskName = ''} = item || {}
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.mainContainer}>
                <View style={styles.mainContainer}>
                    <View style={styles.yellowLine}/>
                    <View style={styles.rightContainer}>
                        <View style={styles.timeContainer}>
                            <Text numberOfLines={1} style={styles.time}>{FormatDateTime(createdAt, 'h:mm A')}</Text>
                            <View style={styles.typeContainer}>
                                <VectorIcon name={'ios-car'} type={'Ionicons'} style={styles.carIcon}/>
                                <Image source={Images.avatar} style={styles.userIcon}/>
                            </View>
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{taskName}</Text>
                            <View style={styles.locationContainer}>
                                <VectorIcon name={'location-pin'} type={'SimpleLineIcons'} style={styles.locationIcon}/>
                                <Text style={styles.location}>{address}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}
