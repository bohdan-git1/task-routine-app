import React, {Component} from 'react'
import {SafeAreaView, ScrollView, Text, View} from 'react-native'

import styles from "./styles";
import strings from "../../Constants/strings";
import SwitchButton from "../../Components/SwitchButton";
import CalendarDialog from "../../Components/CalendarDialog";
import SwitchButtonGroup from "../../Components/SwitchButtonGroup";
import FamilyActions from "../../Redux/FamilyRedux";
import {connect} from "react-redux";
import RNCalendarEvents from "react-native-calendar-events";
import PaymentDialog from "../../Components/PaymentDialog";

class SettingsScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pushNotification: true,
            showCalendarDialog: false,
            showPaymentDialog: false,
            calendars: {},
        }
    }

    componentDidMount() {
        const {user: {familyId = ''}, fetchFamilyReq, getPermissions} = this.props
        fetchFamilyReq(familyId)
        getPermissions()
        RNCalendarEvents.authorizeEventStore().then(() => {
            RNCalendarEvents.findCalendars().then((calendars) => {
                  this.setState({calendars})
            })
        })
    }

    changePermission = ({id, permissions}) => {
        const {changePermissions} = this.props
        changePermissions(id, permissions)
    }
    render() {
        const {pushNotification, showCalendarDialog, calendars, showPaymentDialog} = this.state
        let {permissions = []} = this.props
        permissions = permissions.filter(family => family.user.status === 'active')
        const familyMembers = permissions.map((item) => {
            const {id = '', user: {name = ''} = {},calendarPermission = false, budgetPermission = false, routePermission = false} = item
            return {id, value: name, calendarPermission, budgetPermission, routePermission}
        })
        return (
            <SafeAreaView style={styles.mainContainer}>
                <ScrollView>
                    <Text onPress={() => this.setState({showPaymentDialog: true})} style={styles.premiumVersion}>{strings.premiumVersion}</Text>
                    <SwitchButtonGroup type={'routePermission'} groupSettingsLabel='Route' onChangeSetting={this.changePermission} groupSettings={familyMembers}/>
                    <SwitchButtonGroup type={'calendarPermission'} groupSettingsLabel='Calendar' onChangeSetting={this.changePermission} groupSettings={familyMembers}/>
                    <SwitchButtonGroup type={'budgetPermission'} groupSettingsLabel='Budget' onChangeSetting={this.changePermission} groupSettings={familyMembers}/>
                    <SwitchButton label='Push Notification' showBorder={false} checked={pushNotification}
                                  onChangeSetting={() => {
                                      this.setState({pushNotification: !pushNotification})
                                  }}/>
                    <Text style={styles.selectCalendar} onPress={() => {this.setState({showCalendarDialog: true})}}>{strings.selectCalendar}</Text>
                    <Text style={styles.termsText}>{strings.termsConditions}</Text>
                    <View style={styles.horizontalLine}/>
                    <Text style={styles.termsText}>{strings.aboutUs}</Text>
                </ScrollView>
                {showPaymentDialog && <PaymentDialog onClose={() => this.setState({showPaymentDialog: false})}/>}
                {showCalendarDialog && <CalendarDialog calendars={calendars} onDone={() => this.setState({showCalendarDialog: false})}/>}
            </SafeAreaView>
        )
    }
}


const mapStateToProps = ({
                             user: {user = {}} = {},
                             family: {fetching, family, permissions} = {},
                         }) => {
    return {
        fetching, family, user, permissions
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFamilyReq: (familyId) => dispatch(FamilyActions.fetchFamily(familyId)),
        getPermissions: () => dispatch(FamilyActions.getFamilyPermissions()),
        changePermissions: (familyId, permissions) => dispatch(FamilyActions.changeFamilyPermissions(familyId, permissions))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)



