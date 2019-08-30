import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'

import styles from './styles'
import VectorIcon from "../VectorIcon";
import strings from "../../Constants/strings";
import {CalendarTypes} from "../../Lib/AppConstants";

export default class CalendarDialog extends Component {
    static propTypes = {
        onDone: PropTypes.function,
    }

    static defaultProps = {
        onDone: () => {
        }
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
        let {selectedCalendar = []} = this.state
        if (selectedCalendar.includes(calendar)) {
            const index = selectedCalendar.findIndex((item) => item === calendar)
            selectedCalendar.splice(index, 1)
        } else {
            selectedCalendar.push(calendar)
        }
        this.setState({selectedCalendar})
    }


    render() {
        const {selectedCalendar = []} = this.state
        return (
            <TouchableOpacity activeOpacity={1} style={styles.mainContainer}>
                <TouchableOpacity activeOpacity={1} style={styles.innerContainer}>
                    {this.renderHeader()}
                    <ScrollView style={styles.contentContainer}>
                        {CalendarTypes.map((calendar) => {
                            return (
                                <TouchableOpacity onPress={() => this.onSelectCalendar(calendar)}
                                                  style={styles.itemContainer}>
                                    <Text style={styles.calendarType}>{calendar}</Text>
                                    {selectedCalendar.includes(calendar) &&
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
