import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Text, View} from 'react-native'

import styles from './styles'
import {Colors} from "../../Themes";
import LinearGradient from "react-native-linear-gradient";


export default class BudgetItem extends Component {
    static propTypes = {
        item: PropTypes.object
    }
    static defaultProps = {
        item: {}
    }

    render() {
        const {item: {budget = 0, name = '', totalSpent = 0}} = this.props
        return (
            <LinearGradient start={{x: 0, y: 0.3}} end={{x: 0, y: 0.8}}
                            colors={[Colors.primaryColor, Colors.primaryColorI]} style={styles.gradientContainer}>
                    <Text style={styles.remaining}>Remaining</Text>
                    <View style={styles.budgetRow}>
                        <Text style={styles.budget}>{budget - totalSpent}</Text>
                        <Text style={styles.budgetType}>{name}</Text>
                    </View>
                    <View style={styles.expenseRow}>
                        <View style={styles.expenseItem}>
                            <Text style={styles.budgetType}>SPENT</Text>
                            <Text style={styles.budget}>{totalSpent}</Text>
                        </View>
                        <View style={styles.budgetContainer}/>
                        <View style={styles.expenseItem}>
                            <Text style={styles.budgetType}>BUDGET</Text>
                            <Text style={styles.budget}>{budget}</Text>
                        </View>
                    </View>
            </LinearGradient>
        )
    }
}
