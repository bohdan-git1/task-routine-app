import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'
export default class AddContact extends Component {

    static propTypes = {
        item: PropTypes.object

    }

    static defaultProps = {

    }

    render () {
        const { item: {givenName} = {} } = this.props
        return (
            <View style={styles.contactItemContainer}>
                <Text style={styles.userName}>{givenName}</Text>
            </View>
        )
    }
}
