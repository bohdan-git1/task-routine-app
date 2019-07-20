import React, {Component} from 'react'
import {ImageBackground, SafeAreaView, StatusBar, Text, View, TouchableOpacity} from 'react-native'
import styles from './styles'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Colors, Images} from "../../Themes";
import {CalendarData} from "../../DummyData";
import {FormatDateTime} from "../../Lib/Utilities";
import Input from "../../Components/Input";
import VectorIcon from "../../Components/VectorIcon";
import {ActivityActions} from "../../Lib/AppConstants";

export default class ActivityDetails extends Component {
    constructor(props) {
        super(props)

        StatusBar.setBackgroundColor(Colors.primaryColorI)
    }

    renderTime = (label, time) => {
        return (
            <View>
                <Text>{label}</Text>
                <Text style={styles.timeText}>{FormatDateTime(time, 'hh:mm A')}</Text>
            </View>
        )
    }

    renderDate = (label, time) => {
        return (
            <View>
                <Text>{label}</Text>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{FormatDateTime(time, 'DD')}</Text>
                    <View style={styles.monthContainer}>
                        <Text style={styles.monthText}>{FormatDateTime(time, 'MMM,')}</Text>
                        <Text style={styles.monthText}>{FormatDateTime(time, 'YYYY')}</Text>
                    </View>
                </View>
            </View>
        )
    }

    renderDetailsItem = (label, value) => {
        return (
            <View>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        )
    }

    renderActionItem = (label, color, id) => {
        return (
            <TouchableOpacity activeOpacity={0.8} style={styles.actionItem}>
                <View style={styles.actionTitleContainer}>
                    <Text style={styles.actionTitle}>{label}</Text>
                    {id !== 3 && <View style={styles.verticalLine}/>}
                </View>
                <View style={[styles.colorLine, {backgroundColor: color}]}/>
            </TouchableOpacity>
        )
    }

    render() {
        const {title, location2, dateTime} = CalendarData['2019-07-10'][0]
        return (
            <SafeAreaView style={styles.mainContainer}>
                <KeyboardAwareScrollView
                    style={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}>
                    <ImageBackground source={Images.event} style={styles.headerContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.locationText}>{location2}</Text>
                    </ImageBackground>
                    <View style={styles.innerContainer}>
                        <View style={styles.timeContainer}>
                            {this.renderTime('From', dateTime)}
                            {this.renderTime('To', Date.now())}
                        </View>

                        <View style={styles.detailsRow}>
                            {this.renderDetailsItem('Priority', 'Normal')}
                            {this.renderDetailsItem('Budget', '$0')}
                        </View>

                        <View style={styles.detailsRow}>
                            {this.renderDetailsItem('Type', 'ERRAND')}
                            {this.renderDate('Date', dateTime)}
                        </View>

                        <Input
                            placeholder='Notes'
                            label='Notes (Optional)'
                            labelStyle={styles.grayLabel}
                            numberOfLines={3} multiLine
                            containerStyle={styles.notesContainer}
                            styleOverride={styles.notesInputContainer}
                        />

                        <VectorIcon name='plus' type='SimpleLineIcons' style={styles.addIcon}/>
                    </View>
                    <View style={styles.activityActionsContainer}>
                        {ActivityActions.map((item) => {
                            const {id, title, color} = item
                            return this.renderActionItem(title, color, id)
                        })}
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        )
    }
}
