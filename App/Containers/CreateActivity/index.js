import React, {Component} from 'react'
import RNGooglePlaces from 'react-native-google-places';
import {Text, TouchableOpacity, View, StatusBar} from 'react-native'
import Input from "../../Components/Input";
import styles from './styles'
import ActivityInputItem from "../../Components/ActivityInputItem";
import DateTimePicker from "react-native-modal-datetime-picker";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {FormatDateTime} from "../../Lib/Utilities";
import moment from "moment";
import PriorityItem from "../../Components/PriorityItem";
import VectorIcon from "../../Components/VectorIcon";
import GradientView from "../../Components/GradientView";
import RoundedButton from "../../Components/RoundedButton";
import FolderDialog from "../../Components/FolderDialog";
import CheckBox from "../../Components/CheckBox";
import i18n from "i18n-js";
import {Colors} from "../../Themes";

export default class CreateActivity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            location: 'Location',
            showDatePicker: false,
            pickerKey: '',
            date: moment(),
            form: moment(),
            to: moment(),
            budget: '',
            category: 'Category',
            priority: 1,
            showFolderDialog: false
        }
        StatusBar.setBackgroundColor(Colors.primaryColorI)
    }

    openPlacePicker = () => {
        RNGooglePlaces.openAutocompleteModal()
            .then((place) => {
                console.tron.warn(place);
                this.setState({location: place.address || ''})
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

    render() {
        const {name, location, showDatePicker, date, to, from, pickerKey, budget, category, priority, showFolderDialog} = this.state
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
                            value={FormatDateTime(from, 'hh:mm A')}
                            onPress={() => this.showDatePicker('from')}
                        />

                        <View style={styles.dummyItem}/>

                        <ActivityInputItem
                            label='To'
                            iconType='Ionicons'
                            iconName='md-arrow-dropdown'
                            value={FormatDateTime(to, 'hh:mm A')}
                            onPress={() => this.showDatePicker('to')}
                        />

                    </View>

                    <View style={styles.budgetContainer}>

                        <ActivityInputItem
                            type='input'
                            label='Budget'
                            value={budget}
                            iconType='Ionicons'
                            iconName='md-arrow-dropdown'
                            onChangeText={this.setBudget}
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
                        placeholder='Notes'
                        label='Notes (Optional)'
                        labelStyle={styles.grayLabel}
                        numberOfLines={3} multiLine
                        containerStyle={styles.notesContainer}
                        styleOverride={styles.notesInputContainer}
                    />

                    <View>
                        <Text style={styles.inviteLabel}>Invites</Text>
                        <VectorIcon name='plus' type='SimpleLineIcons' style={styles.addIcon}/>
                    </View>

                    <View style={styles.synchronizeContainer}>
                        <CheckBox
                            tickColor={Colors.black}
                            borderColor={Colors.black}
                        />
                        <Text style={styles.synchronizeText}>{i18n.t('synchronizeCalendar')}</Text>
                    </View>

                </KeyboardAwareScrollView>

                <RoundedButton
                    text={'ADD'}
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
                  onDone={()=> this.setState({showFolderDialog:false})}
                  onCancel={()=> this.setState({showFolderDialog:false})}
                /> }
            </GradientView>
        )
    }
}
