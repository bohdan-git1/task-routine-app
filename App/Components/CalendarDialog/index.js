import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'

import styles from './styles'
import VectorIcon from "../VectorIcon";
import strings from "../../Constants/strings";
import CalendarActions from "../../Redux/CalendarRedux";
import {connect} from "react-redux";

class CalendarDialog extends Component {
    static propTypes = {
        onDone: PropTypes.function,
        calendars: PropTypes.array
    }

    static defaultProps = {
        onDone: () => {},
        calendars: []
    }


    constructor(props) {
        super(props);
        this.state = {
            selectedCalendars: []
        };
    }

    renderHeader = () => {
        const {onDone} = this.props
        return (
            <View style={styles.header}>
                <VectorIcon name={'ios-arrow-back'} type={'Ionicons'} style={styles.backIcon} onPress={onDone}/>
                <Text style={styles.heading}>{strings.selectCalendar}</Text>
            </View>
        )
    }

    onSelectCalendar = (calendar) => {
        const {id: calendarId = ''} = calendar
        let {selectedCalendar = []} = this.state
        if (selectedCalendar.includes(calendarId)) {
            const index = selectedCalendar.findIndex((item) => item === calendarId)
            selectedCalendar.splice(index, 1)
        } else {
            selectedCalendar.push(calendarId)
        }
        this.setState({selectedCalendar})
    }


    render() {
        const {calendars} = this.props
        const {selectedCalendar = []} = this.state
        return (
            <TouchableOpacity activeOpacity={1} style={styles.mainContainer}>
                <TouchableOpacity activeOpacity={1} style={styles.innerContainer}>
                    {this.renderHeader()}
                    <ScrollView style={styles.contentContainer}>
                        {calendars.map((calendar) => {
                            const {id = '', title = ''} = calendar
                            return (
                                <TouchableOpacity onPress={() => this.onSelectCalendar(calendar)}
                                                  style={styles.itemContainer}>
                                    <Text style={styles.calendarType}>{title}</Text>
                                    {selectedCalendar.includes(id) &&
                                    <VectorIcon name={'checkcircle'} type={'AntDesign'} style={styles.checkCircle}/>}
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = ({calendar: {fetching, tasks = []}}) => {
    return {fetching, tasks}
}

const mapDispatchToProps = (dispatch) => {
    return {
        syncCalendar: (calendarId) => dispatch(CalendarActions.syncCalendar(calendarId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDialog)

