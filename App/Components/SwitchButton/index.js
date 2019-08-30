import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Switch, Text, View} from 'react-native'

import styles from './styles'
import VectorIcon from "../VectorIcon";
import {Colors} from "../../Themes";

export default class SwitchButton extends Component {
    static propTypes = {
        label: PropTypes.string,
        onChangeSetting: PropTypes.func,
        checked: PropTypes.boolean,
        isHeading: PropTypes.boolean,
        showBorder: PropTypes.boolean
    }

    static defaultProps = {
        label: '',
        checked: false,
        isHeading: false,
        showBorder: true,
        onChangeSetting: () => {
        },
    }

    render() {
        const {label, checked, onChangeSetting, isHeading, showBorder} = this.props
        return (
            <View style={[styles.mainContainer, isHeading && styles.headingContainer, showBorder && styles.borderBottom]}>
                <Text style={[styles.label, isHeading && styles.headingLabel]}>{label}</Text>
                <Switch thumbColor={Colors.themeColor} onValueChange={onChangeSetting} value={checked}/>
                {isHeading && <VectorIcon name={checked ? 'ios-arrow-down' : 'ios-arrow-forward'} type='Ionicons'
                                          style={styles.arrowIcon}/>}
            </View>
        )
    }
}
