import React, {Component} from 'react';
import {ImageBackground, StatusBar, Text, TouchableOpacity, View} from 'react-native'
import styles from './styles'
import CustomCalendar from "../../Components/CustomCalendar";
import CalendarItem from "../../Components/CalendarItem";
import i18n from 'i18n-js'
import {convertDataTasks, FormatDateTime} from "../../Lib/Utilities";
import VectorIcon from "../../Components/VectorIcon";
import {Colors, Images} from "../../Themes";
import {Actions} from "react-native-router-flux";
import CalendarActions from "../../Redux/CalendarRedux";
import {connect} from "react-redux";
import {ProgressDialog} from "../../Components/ProgressDialog";
import RNCalendarEvents from "react-native-calendar-events";

class Calendars extends Component {
    constructor(props) {
        super(props)
        StatusBar.setBackgroundColor(Colors.primaryColorI)
    }

    componentDidMount() {
        const {getAllTaskReq} = this.props
        getAllTaskReq()
        RNCalendarEvents.authorizeEventStore().then(() => {
            RNCalendarEvents.findCalendars().then((calendars) => {
                const primaryCalendar = calendars.find(c => c.isPrimary && c.allowsModifications)
                RNCalendarEvents.saveCalendar(primaryCalendar).then((res) => {
                    console.tron.warn({res})
                })
                console.tron.warn(calendars)
            })
        })
    }

    renderCalendarItem = (item) => {
        const {date, id: taskId = ''} = item
        return <CalendarItem
            onPress={() => Actions.activityDetail({title: FormatDateTime(date, 'MMMM DD, YYYY'), taskId})}
            item={item}/>
    }

    renderNewEventButton = () => {
        return (
            <TouchableOpacity onPress={Actions.createActivity} style={styles.addButton}>
                <VectorIcon name={'plus'} type={'Entypo'} style={styles.plusIcon}/>
            </TouchableOpacity>
        )
    }

    render() {
        const {fetching, tasks} = this.props
        const Events = convertDataTasks(tasks)
        return (
            <View style={styles.mainContainer}>
                <ImageBackground source={Images.event} style={styles.topDateContainer}>
                    <Text style={styles.dateText}>{i18n.t('today')}</Text>
                    <Text style={styles.dateText}>{FormatDateTime(Date.now(), 'MMMM YYYY')}</Text>
                </ImageBackground>
                <CustomCalendar renderItem={this.renderCalendarItem} items={Events}/>
                {this.renderNewEventButton()}
                <ProgressDialog hide={!fetching}/>
            </View>
        )
    }
}

const mapStateToProps = ({calendar: {fetching, tasks = []}}) => {
    return {fetching, tasks}
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTaskReq: (params) => dispatch(CalendarActions.getAllTasks(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendars)

