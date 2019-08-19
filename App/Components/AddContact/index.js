import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'
import IconButton from "../IconButton";
import AntDesign from "react-native-vector-icons/AntDesign";
export default class AddContact extends Component {

    static propTypes = {
        item: PropTypes.object,
        onEdit: PropTypes.func
    }

    static defaultProps = {

    }

    render () {
        const { item: { name, role } = {}, onEdit, onDelete } = this.props
        return (
            <View style={styles.contactItemContainer}>
                <Text style={styles.userName}>{name}</Text>
                <View style={styles.actionIconsContainer}>
                    <Text style={styles.role}>{role}</Text>
                    <IconButton onPress={onEdit} buttonContainer={styles.editBtnContainer}/>
                    <IconButton onPress={onDelete} IconClass={AntDesign}  iconName={'delete'}/>
                </View>
            </View>
        )
    }
}
