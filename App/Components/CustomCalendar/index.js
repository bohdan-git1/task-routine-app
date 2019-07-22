import PropTypes from 'prop-types'
import {Agenda} from 'react-native-calendars'
import Colors from '../../Themes/Colors'
import React, {Component} from 'react'
import {View} from 'react-native'
import AnimatedAlert from "../AnimatedAlert";

export default class AgendaCalendar extends Component {
    static propTypes = {
        items: PropTypes.object,
        renderItem: PropTypes.function,
        loadItems: PropTypes.function,
        hideDot: PropTypes.boolean,
        isCalendarShown: PropTypes.function,
        renderEmptyData: PropTypes.function
    }

    static defaultProps = {
        items: {},
        refreshing: false,
        hideDot: false,
    }

    renderEmptyData = () => {
        return <AnimatedAlert title={'No Activity Found'}/>
    }

    render () {
        const {items, renderItem, renderEmptyData} = this.props
        return (
            <Agenda
                items={items}
                selected={new Date()}
                renderItem={renderItem}
                renderDay={this.renderDay}
                rowHasChanged={this.rowHasChanged}
                renderEmptyDate={<View/>}
                renderEmptyDay={<View/>}
                renderEmptyData = {this.renderEmptyData}
                theme={{
                    dayTextColor: Colors.black,
                    weekTextColor: Colors.black,
                    textMonthFontWeight: 'bold',
                    todayTextColor: Colors.black,
                    monthTextColor: Colors.black,
                    backgroundColor: Colors.snow,
                    agendaKnobColor: Colors.primaryColorI,
                    selectedDayTextColor: Colors.snow,
                    textSectionTitleColor: Colors.black,
                    agendaDayNumColor: Colors.darkgray,
                    agendaTodayColor: Colors.black,
                    agendaDayTextColor: Colors.gray,
                    calendarBackground: Colors.snow,
                    dotColor: Colors.themeColor,
                    selectedDotColor: Colors.transparent,
                    selectedDayBackgroundColor: Colors.facebook
                }}
            />)
    }


    rowHasChanged = (r1, r2) => {
        return r1.name !== r2.name
    }

    renderDay = (day) => {
    }
}
