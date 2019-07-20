import React, {Component} from 'react';
import {Text, TouchableOpacity, View, ImageBackground, StatusBar} from 'react-native'
import styles from './styles'
import CustomCalendar from "../../Components/CustomCalendar";
import {CalendarData} from "../../DummyData";
import CalendarItem from "../../Components/CalendarItem";
import i18n from 'i18n-js'
import {FormatDateTime} from "../../Lib/Utilities";
import VectorIcon from "../../Components/VectorIcon";
import {Colors, Images} from "../../Themes";
import {Actions} from "react-native-router-flux";

export default class Calendars extends Component {
    constructor(props) {
        super(props)
        StatusBar.setBackgroundColor(Colors.primaryColorI)
    }

    renderCalendarItem = (item) => {
        const {dateTime} = item
        return <CalendarItem onPress={() => Actions.activityDetail({title: FormatDateTime(dateTime, 'MMMM DD, YYYY')})} item={item}/>
    }

    renderNewEventButton = () => {
        return (
            <TouchableOpacity onPress={Actions.createActivity} style={styles.addButton}>
                <VectorIcon name={'plus'} type={'Entypo'} style={styles.plusIcon}/>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <ImageBackground source={Images.event} style={styles.topDateContainer}>
                    <Text style={styles.dateText}>{i18n.t('today')}</Text>
                    <Text style={styles.dateText}>{FormatDateTime(Date.now(), 'MMMM YYYY')}</Text>
                </ImageBackground>
                <CustomCalendar renderItem={this.renderCalendarItem} items={CalendarData}/>
                {this.renderNewEventButton()}
            </View>
        )
    }


}

