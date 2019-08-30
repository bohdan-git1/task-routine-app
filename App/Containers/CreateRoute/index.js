import moment from "moment";
import React, {Component} from 'react'
import DateTimePicker from "react-native-modal-datetime-picker";
import {FlatList, Keyboard, SafeAreaView, Text, TouchableOpacity, View} from 'react-native'

import styles from "./styles";
import Input from "../../Components/Input";
import strings from "../../Constants/strings";
import VectorIcon from "../../Components/VectorIcon";
import RouteItem from "../../Components/RouteItem";
import CalendarActions from "../../Redux/CalendarRedux";
import RouteActions from "../../Redux/RouteRedux";
import {connect} from "react-redux";
import AnimatedAlert from "../../Components/AnimatedAlert";
import {ProgressDialog} from "../../Components/ProgressDialog";

class CreateRoute extends Component {
    constructor(props) {
        super(props)
        const {tasks} = props
        this.state = {
            showDatePicker: false,
            date: moment(),
            filterDate: moment(),
            name: '',
            noOfTask: '',
            tasks,
            taskId: [],
            pickerKey: 'date'
        }
    }

    componentDidMount() {
        const {getAllTaskReq} = this.props
        getAllTaskReq()
    }

    onSelectRoute = (routeId) => {
        let {taskId = []} = this.state
        if (taskId.includes(routeId.toString())) {
            const index = taskId.findIndex((item) => item === routeId)
            taskId.splice(index, 1)
        } else {
            taskId.push(routeId.toString())
        }
        this.setState({taskId})
    }

    onConfirmedDate = (pickedDate) => {
        const {pickerKey} = this.state
        this.setState({[pickerKey]: pickedDate, showDatePicker: false})
    }

    createNewRoute = () => {
        const {createRoute} = this.props
        const {date, noOfTask, name, taskId} = this.state
        const stepCoordinates = [
            30.7333148,
            76.7794179
        ]
        createRoute({date, noOfTask: taskId.length, taskId, name, stepCoordinates})
    }


    renderRouteItem = ({item}) => {
        const {taskId} = this.state
        return <RouteItem item={item} selectedRoutes={taskId} onPress={() => this.onSelectRoute(item.id)}/>
    }

    renderRouteData = () => {
        const {date, name, taskId} = this.state
        const noOfTasks = taskId.length
        return (
            <View style={styles.routeDataContainer}>
                <Input
                    value={name}
                    label={strings.name}
                    labelStyle={styles.inputLabel}
                    containerStyle={styles.inputContainer}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    onChangeText={(name) => {
                        this.setState({name})
                    }}
                />
                <View style={styles.dateRow}>
                    <TouchableOpacity
                        style={styles.dateInput}
                        onPress={() => this.setState({showDatePicker: true, pickerKey: 'date'})}>
                        <Text>Date</Text>
                        <View style={styles.dateContainer}>
                            <Text>{moment(date).format('MM/DD/YYYY')}</Text>
                            <VectorIcon name={'calendar'} type={'FontAwesome'} style={styles.calendarIcon}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.dateInput}>
                        <Text>No of Events</Text>
                        <View style={styles.noOfEventsContainer}>
                            <Text>{noOfTasks.toString()}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const {showDatePicker, filterDate, tasks} = this.state
        const {fetching, fetchingEvent} = this.props
        const filteredTasks = tasks.filter(({date}) => moment(date).format('DD-MM-YYYY') === moment(filterDate).format('DD-MM-YYYY'))
        return (
            <SafeAreaView style={styles.mainContainer}>
                <TouchableOpacity style={styles.filterDateContainer} onPress={() => {
                    this.setState({showDatePicker: true, pickerKey: 'filterDate'})
                }}>
                    <VectorIcon name={'ios-arrow-back'} type={'Ionicons'} style={styles.arrowIcon}/>
                    <Text style={styles.filterDate}>{moment(filterDate).format('DD MMMM, YYYY')}</Text>
                    <VectorIcon name={'ios-arrow-forward'} type={'Ionicons'} style={styles.arrowIcon}/>
                </TouchableOpacity>
                <FlatList
                    data={filteredTasks}
                    extraData={this.state}
                    renderItem={this.renderRouteItem}
                    keyExtractor={item => String(item.id)}
                    ListEmptyComponent={<AnimatedAlert title={strings.noTaskFound}/>}
                />
                <Text style={styles.routeName}>{strings.routeName}</Text>
                {this.renderRouteData()}
                <TouchableOpacity onPress={this.createNewRoute} style={styles.createRouteButton}>
                    <Text style={styles.createRouteText}>{strings.createRoute}</Text>
                </TouchableOpacity>
                <DateTimePicker
                    mode='date'
                    is24Hour={false}
                    isVisible={showDatePicker}
                    onConfirm={this.onConfirmedDate}
                    onCancel={() => this.setState({showDatePicker: false})}
                />
                <ProgressDialog hide={!fetching && !fetchingEvent}/>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = ({calendar: {fetching: fetchingEvent, tasks = []}, route: {fetching}}) => {
    return {fetching, tasks, fetchingEvent}
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTaskReq: (params) => dispatch(CalendarActions.getAllTasks(params)),
        createRoute: (route) => dispatch(RouteActions.createRoute(route))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoute)
