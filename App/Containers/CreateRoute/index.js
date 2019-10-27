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
import {connect} from "react-redux";
import AnimatedAlert from "../../Components/AnimatedAlert";
import {ProgressDialog} from "../../Components/ProgressDialog";
import {Actions} from "react-native-router-flux";
import {isEmpty} from "ramda";
import {showMessage} from "../../Lib/Utilities";

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
            selectedTasks: [],
            pickerKey: 'date'
        }
    }

    componentDidMount() {
        const {getAllTaskReq} = this.props
        getAllTaskReq()
    }

    onSelectRoute = (item) => {
        const {id: routeId} = item || {}
        let {taskId = [], selectedTasks} = this.state
        if (taskId.includes(String(routeId))) {
            const index = taskId.findIndex((item) => item === String(routeId))
            taskId.splice(index, 1)
            selectedTasks = selectedTasks.filter(({id}) => { return String(id) !== String(routeId)})
        } else {
            taskId.push(String(routeId))
            selectedTasks.push(item)
        }
        this.setState({taskId, selectedTasks})
    }

    onConfirmedDate = (pickedDate) => {
        let {pickerKey, tasks} = this.state
        let taskId = []
        let selectedTasks = []
        if(pickerKey === 'filterDate'){
            const filteredTasks = tasks.filter(({date}) => moment(date).format('DD-MM-YYYY') === moment(pickedDate).format('DD-MM-YYYY'))
            filteredTasks.forEach((item) => {
                selectedTasks.push(item)
                taskId.push(String(item.id))
            })
            this.setState({selectedTasks, taskId})
        }
        this.setState({[pickerKey]: pickedDate, showDatePicker: false})
    }

    createNewRoute = () => {
        const {date, name, selectedTasks} = this.state
        const stepCoordinates = [
            0,
            0
        ]
        if(isEmpty(name)){
            showMessage(strings.enterRouteName)
        } else if(selectedTasks.length === 0){
            showMessage(strings.selectTasks)
        } else {
            const route = {date, name, selectedTasks, stepCoordinates}
            Actions.selectTaskOrder({route})
        }
    }


    renderRouteItem = ({item}) => {
        const {taskId} = this.state
        return <RouteItem item={item} selectedRoutes={taskId} onPress={() => this.onSelectRoute(item)}/>
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
                            <Text>{noOfTasks}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    render() {
        const {showDatePicker, filterDate, tasks, selectedTasks} = this.state
        const {fetching, fetchingEvent} = this.props
        const filteredTasks = tasks.filter(({date}) => moment(date).format('DD-MM-YYYY') === moment(filterDate).format('DD-MM-YYYY'))
        return (
            <SafeAreaView style={styles.mainContainer}>
                <TouchableOpacity style={styles.filterDateContainer} onPress={() => {
                    this.setState({showDatePicker: true, pickerKey: 'filterDate'})
                }}>
                    <VectorIcon name={'ios-arrow-back'} type={'Ionicons'} style={styles.arrowIcon}/>
                    <Text style={styles.filterDate}>{moment(filterDate).format('MM/DD/YYYY')}</Text>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoute)
