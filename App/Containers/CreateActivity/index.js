import React, {Component} from 'react'
import {isEmpty} from 'lodash'
import {Keyboard, StatusBar, Text, TouchableOpacity, View} from 'react-native'
import DateTimePicker from "react-native-modal-datetime-picker";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import moment from "moment";
import i18n from "i18n-js";
import {connect} from "react-redux";

import styles from './styles'
import {Colors} from "../../Themes";
import Input from "../../Components/Input";
import CheckBox from "../../Components/CheckBox";
import {FormatDateTime, getCurrentLocation, showErrorMessage, showMessage} from "../../Lib/Utilities";
import VectorIcon from "../../Components/VectorIcon";
import GradientView from "../../Components/GradientView";
import RoundedButton from "../../Components/RoundedButton";
import FolderDialog from "../../Components/FolderDialog";
import CalendarActions from "../../Redux/CalendarRedux";
import BudgetActions from "../../Redux/BudgetRedux";
import PriorityItem from "../../Components/PriorityItem";
import {Priority_Types} from "../../Lib/AppConstants";
import InviteDialog from "../../Components/InviteDialog";
import {ProgressDialog} from "../../Components/ProgressDialog";
import ActivityInputItem from "../../Components/ActivityInputItem";
import BudgetDialog from "../../Components/BudgetDialog";
import PlacePicker from "../PlacePicker";

class CreateActivity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            locationName: 'Location',
            showDatePicker: false,
            pickerKey: '',
            date: moment(),
            fromTime: moment(),
            toTime: moment(),
            budget: '',
            category: 'Category',
            priority: 1,
            note: '',
            syncCalendar: false,
            locationCoordinates: [0, 0],
            showFolderDialog: false,
            showInviteDialog: false,
            showBudgetDialog: false,
            invites: [],
            currentLocation: {},
            fetchingCurrentLocation: false,
            showPlacePicker: false,
            budgetInfo: {},
            folderId: ''
        }
        StatusBar.setBackgroundColor(Colors.primaryColorI)
    }

    addNewTask = () => {
        const {addNewTaskReq, addNewBudget} = this.props
        const {name, locationName, date, fromTime, toTime, budget, category, priority, locationCoordinates, note, syncCalendar, invites, budgetInfo, folderId} = this.state
        if(isEmpty(name)){
            showMessage('Please enter folder name')
        }else if(isEmpty(budget)){
            showMessage('Please enter budget for this task')
        }else if(isEmpty(String(folderId))){
            showMessage('Please select folder for this task')
        }else {
            const task = {
                name,
                locationName,
                date,
                fromTime,
                toTime,
                budget,
                note,
                folderId,
                category,
                priority: Priority_Types[priority - 1]['type'],
                invites,
                locationCoordinates
            }
            addNewTaskReq(task, syncCalendar)
            addNewBudget(budgetInfo)
        }
    }

    openPlacePicker = () => {
        this.setState({currentLocation: {}, showPlacePicker: true})
    }

    onConfirmDate = (date) => {
        const {pickerKey} = this.state
        this.setState({[pickerKey]: date, showDatePicker: false})
    }

    showDatePicker = (pickerKey) => {
        this.setState({pickerKey, showDatePicker: true})
    }

    setBudget = (value) => {
        const budget = value.split('$ ')
        this.setState({budget: budget[1]})
    }

    addInvite = (invite) => {
        let {invites} = this.state
        invites.push(invite)
        this.setState({invites, showInviteDialog: false})
    }

    saveBudget = (budgetInfo) => {
        const {amount: budget} = budgetInfo
        this.setState({budget, budgetInfo, showBudgetDialog: false})
    }

    getCurrentLocation = () => {
        this.setState({fetchingCurrentLocation: true})
        getCurrentLocation().then(currentLocation => {
            const {location: {longitude, latitude} = {}, address} = currentLocation
            this.setState({
                currentLocation,
                fetchingCurrentLocation: false,
                locationName: address,
                locationCoordinates: [latitude, longitude]
            })
        }).catch((error) => {
            showErrorMessage(error.message)
            this.setState({fetchingCurrentLocation: false})
        })
    }

    onSelectedPlace = (location) => {
        this.setState({
            showPlacePicker: false,
            locationName: location.address,
            locationCoordinates: [location.latitude, location.longitude]
        })
    }

    render() {
        const {fetching, folders} = this.props
        const {currentLocation: {address: currentLocaitonName = ''}, showPlacePicker, name, locationName, showDatePicker, date, toTime, fromTime, pickerKey, budget, category, priority, showFolderDialog, note, syncCalendar, showInviteDialog, showBudgetDialog, fetchingCurrentLocation} = this.state
        const mode = pickerKey === 'date' ? 'date' : 'time'
        const location = currentLocaitonName || locationName
        return (
            <GradientView gradientStyles={styles.gradientStyles}>
                <KeyboardAwareScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}>

                    <Input
                        value={name}
                        label={'Name'}
                        placeholder={'Name'}
                        labelStyle={styles.grayLabel}
                        returnKeyType={'done'}
                        onSubmitEditing={Keyboard.dismiss}
                        containerStyle={styles.bottomLine}
                        onChangeText={(name) => {
                            this.setState({name})
                        }}
                    />

                    <ActivityInputItem
                        label='Location'
                        value={location}
                        iconName='my-location'
                        iconType='MaterialIcons'
                        onPress={this.openPlacePicker}
                        onIconPress={this.getCurrentLocation}
                        fetchingCurrentLocation={fetchingCurrentLocation}
                    />

                    <View style={styles.dateContainer}>
                        <ActivityInputItem
                            label='Date'
                            iconName='calendar-check'
                            iconType='FontAwesome5'
                            value={FormatDateTime(date, 'MMMM DD, YYYY')}
                            onPress={() => this.showDatePicker('date')}
                        />
                        <TouchableOpacity
                            style={styles.folderContainer}
                            onPress={() => this.setState({showFolderDialog: true})}
                        >
                            <Text style={styles.folderText}>Folder</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.timeContainer}>

                        <ActivityInputItem
                            label='From'
                            iconType='Ionicons'
                            iconName='md-arrow-dropdown'
                            value={FormatDateTime(fromTime, 'hh:mm A')}
                            onPress={() => this.showDatePicker('fromTime')}
                        />

                        <View style={styles.dummyItem}/>

                        <ActivityInputItem
                            label='To'
                            iconType='Ionicons'
                            iconName='md-arrow-dropdown'
                            value={FormatDateTime(toTime, 'hh:mm A')}
                            onPress={() => this.showDatePicker('toTime')}
                        />

                    </View>

                    <ActivityInputItem
                        type='input'
                        label='Budget'
                        value={budget}
                        iconType='Ionicons'
                        iconName='md-arrow-dropdown'
                        onPress={() => {
                            this.setState({showBudgetDialog: true})
                        }}
                    />

                    <PriorityItem
                        priority={priority}
                        onPressPriority={(priority) => this.setState({priority})}
                    />

                    <Input
                        value={note}
                        placeholder='Notes'
                        label='Notes (Optional)'
                        labelStyle={styles.grayLabel}
                        numberOfLines={3} multiLine
                        containerStyle={styles.notesContainer}
                        onChangeText={(note) => {
                            this.setState({note})
                        }}
                        styleOverride={styles.notesInputContainer}
                    />

                    <TouchableOpacity onPress={() => {
                        this.setState({showInviteDialog: true})
                    }}>
                        <Text style={styles.inviteLabel}>Invites</Text>
                        <VectorIcon name='plus' type='SimpleLineIcons' style={styles.addIcon}/>
                    </TouchableOpacity>

                    <View style={styles.synchronizeContainer}>
                        <CheckBox
                            tickColor={Colors.black}
                            borderColor={Colors.black}
                            checked={syncCalendar}
                            onChange={(syncCalendar) => this.setState({syncCalendar})}
                        />
                        <Text style={styles.synchronizeText}>{i18n.t('synchronizeCalendar')}</Text>
                    </View>

                </KeyboardAwareScrollView>

                <RoundedButton
                    text={'ADD'}
                    onPress={this.addNewTask}
                    buttonContainer={styles.addButtonContainer}
                />

                <DateTimePicker
                    mode={mode}
                    is24Hour={false}
                    isVisible={showDatePicker}
                    onConfirm={this.onConfirmDate}
                    minimumDate={new Date()}
                    onCancel={() => this.setState({showDatePicker: false})}
                />
                {showFolderDialog && <FolderDialog
                    folders={folders}
                    onSelectFolder={(folderId) => this.setState({folderId})}
                    onDone={() => this.setState({showFolderDialog: false})}
                    onCancel={() => this.setState({showFolderDialog: false})}
                />}

                {showInviteDialog && <InviteDialog
                    onDone={this.addInvite}
                    onCancel={() => this.setState({showInviteDialog: false})}
                />
                }
                {showBudgetDialog && <BudgetDialog
                    onCancel={() => this.setState({showBudgetDialog: false})}
                    onDone={this.saveBudget}
                />}
                {showPlacePicker && <PlacePicker onPlacePicked={this.onSelectedPlace}/>}
                <ProgressDialog hide={!fetching}/>
            </GradientView>
        )
    }
}

const mapStateToProps = ({calendar: {fetching}, folder: {folders = []} = {}}) => {
    return {fetching, folders}
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewBudget: (params) => dispatch(BudgetActions.addNewBudget(params)),
        addNewTaskReq: (task, syncCalendar) => dispatch(CalendarActions.addNewTask(task, syncCalendar))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateActivity)
