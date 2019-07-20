import React, {Component} from 'react'
import {ScrollView, StatusBar, Text, View} from 'react-native'
// Styles
import styles from './Styles/TabScreenStyles'
import {Colors} from "../Themes";

export default class TabScreen extends Component {

    constructor(props) {
        super(props)
        StatusBar.setBackgroundColor(Colors.primaryColorI)
    }

    render() {
        const {title = 'Tab 1'} = this.props
        return (
            <View style={styles.mainContainer}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.title}>{title} Screen</Text>
                </ScrollView>
            </View>
        )
    }
}
