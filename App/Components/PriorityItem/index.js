import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Text, TouchableOpacity, View, TextInput} from 'react-native'

import styles from './styles'
import VectorIcon from "../VectorIcon";
import {Dropdown} from "react-native-material-dropdown";
import {Activity_category, Priority_Types} from "../../Lib/AppConstants";
import {Colors} from "../../Themes";


export default class PriorityItem extends Component {
    static propTypes = {
        priority: PropTypes.string,
        onPressPriority: PropTypes.function
    }
    static defaultProps = {
        priority: 1,
        onPressPriority: () => {
        }
    }


    render() {
        const {onPressPriority, priority} = this.props
        return (
            <View>
                <Text style={styles.priorityLabel}>Priority</Text>
                <View style={styles.priorityContainer}>
                    {Priority_Types.map(item => {
                        const {id, color} = item
                        const bottomLineStyle = {height: 5, backgroundColor: color}
                        return <TouchableOpacity onPress={() => onPressPriority(id)}
                                                 style={[styles.itemContainer, priority === id && {backgroundColor: color}]}>
                            <Text style={styles.priority}>{id}</Text>
                            <View style={bottomLineStyle}/>
                        </TouchableOpacity>
                    })}
                </View>
            </View>
        )
    }
}
