import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Text, View, ImageBackground} from 'react-native'

import styles from './styles'
import {Colors} from "../../Themes";
import LinearGradient from "react-native-linear-gradient";


export default class BudgetHeadingItem extends Component {
    static propTypes = {
        item: PropTypes.object,
        image: PropTypes.string
    }
    static defaultProps = {
        item: {},
        image: ''
    }

    render() {
        const {item: {budget = '$2500.00', type = 'TOTAL REMAINING'}, image} = this.props
        return (
            <ImageBackground source={image} style={styles.mainContainer}>
                <Text style={styles.type}>{type}</Text>
                <Text style={styles.budget}>{budget}</Text>
            </ImageBackground>
        )
    }
}
