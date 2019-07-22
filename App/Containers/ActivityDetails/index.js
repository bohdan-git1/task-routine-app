import React, {Component} from 'react'
import {ImageBackground, SafeAreaView, StatusBar, Text, TouchableOpacity, View} from 'react-native'
import styles from './styles'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Colors, Images} from "../../Themes";
import {FormatDateTime} from "../../Lib/Utilities";
import Input from "../../Components/Input";
import VectorIcon from "../../Components/VectorIcon";
import {ActivityActions} from "../../Lib/AppConstants";
import CalendarActions from "../../Redux/CalendarRedux";
import {connect} from "react-redux";
import moment from "moment";
import {upperFirst} from 'lodash'
import {ProgressDialog} from "../../Components/ProgressDialog";

class ActivityDetails extends Component {
    constructor(props) {
        super(props)
        StatusBar.setBackgroundColor(Colors.primaryColorI)
    }

    componentDidMount() {
        const {getTaskDetails, taskId = ''} = this.props
        getTaskDetails(taskId)
    }

    onPressAction = (actionId) => {
        const {deleteTask, taskId} = this.props
        if (actionId === 1) {
           deleteTask(taskId)
        }
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
            <TouchableOpacity onPress={() => this.onPressAction(id)} activeOpacity={0.8} style={styles.actionItem}>
                <View style={styles.actionTitleContainer}>
                    <Text style={styles.actionTitle}>{label}</Text>
                    {id !== 3 && <View style={styles.verticalLine}/>}
                </View>
                <View style={[styles.colorLine, {backgroundColor: color}]}/>
            </TouchableOpacity>
        )
    }

    render() {
        const {task: {name = '', locationName = '', priority = '', budget = '', fromTime = moment(), toTime = moment(), date = moment()}, fetching} = this.props
        return (
            <SafeAreaView style={styles.mainContainer}>
                <KeyboardAwareScrollView
                    style={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}>
                    <ImageBackground source={Images.event} style={styles.headerContainer}>
                        <Text style={styles.title}>{name}</Text>
                        <Text style={styles.locationText}>{locationName}</Text>
                    </ImageBackground>
                    <View style={styles.innerContainer}>
                        <View style={styles.timeContainer}>
                            {this.renderTime('From', fromTime)}
                            {this.renderTime('To', toTime)}
                        </View>

                        <View style={styles.detailsRow}>
                            {this.renderDetailsItem('Priority', upperFirst(priority))}
                            {this.renderDetailsItem('Budget', `$ ${budget}`)}
                        </View>

                        <View style={styles.detailsRow}>
                            {this.renderDetailsItem('Type', 'ERRAND')}
                            {this.renderDate('Date', date)}
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
                <ProgressDialog hide={!fetching}/>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({calendar: {fetching, task = {}}}) => {
    return {fetching, task}
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTaskDetails: (taskId) => dispatch(CalendarActions.getTaskDetails(taskId)),
        deleteTask: (taskId) => dispatch(CalendarActions.deleteTask(taskId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDetails)

