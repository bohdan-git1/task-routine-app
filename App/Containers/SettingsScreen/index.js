import React, {Component} from 'react'
import {SafeAreaView, ScrollView, Text, View} from 'react-native'

import styles from "./styles";
import strings from "../../Constants/strings";
import SwitchButton from "../../Components/SwitchButton";
import CalendarDialog from "../../Components/CalendarDialog";
import SwitchButtonGroup from "../../Components/SwitchButtonGroup";

const RouteSettings = [
    'John',
    'Adam',
    'Mom',
    'Dad'
]
export default class SettingsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pushNotifications: false,
            showCalendarDialog: false
        }
    }

    render() {
        const {pushNotification, showCalendarDialog} = this.state
        return (
            <SafeAreaView style={styles.mainContainer}>
                <ScrollView>
                    <Text style={styles.premiumVersion}>{strings.premiumVersion}</Text>
                    <SwitchButtonGroup groupSettingsLabel='Route' groupSettings={RouteSettings}/>
                    <SwitchButtonGroup groupSettingsLabel='Calendar' groupSettings={['I', 'J', 'K']}/>
                    <SwitchButtonGroup groupSettingsLabel='Budget' groupSettings={['X', 'Y', 'Z']}/>
                    <SwitchButton label='Push Notification' showBorder={false} checked={pushNotification}
                                  onChangeSetting={() => {
                                      this.setState({pushNotification: !pushNotification})
                                  }}/>
                    <Text style={styles.selectCalendar} onPress={() => {this.setState({showCalendarDialog: true})}}>{strings.selectCalendar}</Text>
                    <Text style={styles.termsText}>{strings.termsConditions}</Text>
                    <View style={styles.horizontalLine}/>
                    <Text style={styles.termsText}>{strings.aboutUs}</Text>
                </ScrollView>
                {showCalendarDialog && <CalendarDialog onDone={() => this.setState({showCalendarDialog: false})}/>}
            </SafeAreaView>
        )
    }
}


