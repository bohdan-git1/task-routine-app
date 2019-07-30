import React, {Component} from 'react'
import RNGooglePlaces from 'react-native-google-places';
import {Text, TouchableOpacity, View, StatusBar, Keyboard} from 'react-native'
import DateTimePicker from "react-native-modal-datetime-picker";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import moment from "moment";
import i18n from "i18n-js";
import {connect} from "react-redux";

import styles from './styles'
import {Colors} from "../../Themes";
import Input from "../../Components/Input";
import CheckBox from "../../Components/CheckBox";
import {FormatDateTime} from "../../Lib/Utilities";
import VectorIcon from "../../Components/VectorIcon";
import GradientView from "../../Components/GradientView";
import RoundedButton from "../../Components/RoundedButton";
import FolderDialog from "../../Components/FolderDialog";
import CalendarActions from "../../Redux/CalendarRedux";
import PriorityItem from "../../Components/PriorityItem";
import {Priority_Types} from "../../Lib/AppConstants";
import InviteDialog from "../../Components/InviteDialog";
import {ProgressDialog} from "../../Components/ProgressDialog";
import ActivityInputItem from "../../Components/ActivityInputItem";
import BudgetDialog from "../../Components/BudgetDialog";

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
            locationCoordinates: [0,0],
            showFolderDialog: false,
            showInviteDialog: false,
            showBudgetDialog: false,
            invites: []
        }
        StatusBar.setBackgroundColor(Colors.primaryColorI)
    }

    addNewTask = () => {
        const {addNewTaskReq} = this.props
        const {name, locationName, date, fromTime, toTime, budget, category, priority, locationCoordinates, note, syncCalendar, invites} = this.state
        const task = {
            name,
            locationName,
            date,
            fromTime,
            toTime,
            budget,
            note,
            folderId: 32,
            category,
            priority: Priority_Types[priority]['type'],
            invites,
            locationCoordinates
        }
        addNewTaskReq(task, syncCalendar)
    }

    openPlacePicker = () => {
        RNGooglePlaces.openAutocompleteModal()
            .then((place) => {
                const {address, location: {latitude = '', longitude = ''} = {}} = place
                const locationCoordinates = [0, 0]
                locationCoordinates[0] = latitude
                locationCoordinates[1] = longitude
                this.setState({locationName: address || '', locationCoordinates})
            })
            .catch(error => console.log(error.message));  // error is a Javascript Error object
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
        this.setState({budget, showBudgetDialog: false})
    }

    render() {
        const {fetching} = this.props
        const {name, locationName, showDatePicker, date, toTime, fromTime, pickerKey, budget, category, priority, showFolderDialog, note, syncCalendar, showInviteDialog, showBudgetDialog} = this.state
        const mode = pickerKey === 'date' ? 'date' : 'time'
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
                        value={locationName}
                        iconName='my-location'
                        iconType='MaterialIcons'
                        onPress={this.openPlacePicker}
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

                    <View style={styles.budgetContainer}>

                        <ActivityInputItem
                            type='input'
                            label='Budget'
                            value={budget}
                            iconType='Ionicons'
                            iconName='md-arrow-dropdown'
                            onPress={() => {this.setState({showBudgetDialog: true})}}
                        />

                        <View style={styles.dummyCategory}/>

                        <ActivityInputItem
                            type='dropdown'
                            value={category}
                            iconType='Ionicons'
                            label='Budget Category'
                            iconName='md-arrow-dropdown'
                            onChangeCategory={(category) => {
                                this.setState({category})
                            }}
                        />

                    </View>

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
                <ProgressDialog hide={!fetching}/>
            </GradientView>
        )
    }
}

const mapStateToProps = ({calendar: {fetching}}) => {
    return {fetching}
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewTaskReq: (task, syncCalendar) => dispatch(CalendarActions.addNewTask(task, syncCalendar))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateActivity)
