import React, { Component } from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'
import IconButton from "../IconButton";
import AntDesign from "react-native-vector-icons/AntDesign";
import VectorIcon from "../VectorIcon";
export default class CircleIcon extends Component {

    static propTypes = {
        onPress: PropTypes.func,
        iconName: PropTypes.string,
        iconType: PropTypes.string,
        iconContainer: PropTypes.object
    }

    static defaultProps = {
        onPress: () => {},
        iconName: 'my-location',
        iconType: 'MaterialIcons',
        iconContainer: {}
    }

    render () {
        const { onPress, iconName, iconContainer, iconType } = this.props
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.iconContainer, iconContainer]}>
                <VectorIcon name={iconName} type={iconType} style={styles.icon}/>
            </TouchableOpacity>
        )
    }
}
