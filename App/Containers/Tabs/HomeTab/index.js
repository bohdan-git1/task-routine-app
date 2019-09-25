import React, {Component} from 'react'
import {
    Alert,
    FlatList,
    Image,
    ImageBackground,
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    ScrollView, StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import * as _ from 'lodash'
import {connect} from "react-redux";
import ActionSheet from "react-native-actionsheet";
import ContactsSectionList from "react-native-sectionlist-contacts";

import styles from './styles'
import {ProgressDialog} from "../../../Components/ProgressDialog";
import images from "../../../Themes/Images";
import FamilyActions from "../../../Redux/FamilyRedux";
import FamilyMember from "../../../Components/FamilyMember";
import {ADD_FAMILY_MEMBER_BUTTON_ID} from "../../../Lib/AppConstants";
import Colors from "../../../Themes/Colors";
import AddContacts from "../../../Components/AddContacts";
import ModalComponent from "../../../Components/ModalComponent";
import strings from "../../../Constants/strings";
import {showErrorMessage, TASK_STATUSES} from "../../../Lib/Utilities";
import CreateNewContact from "../../../Components/CreateNewContact";
import FoldersComponent from "../../../Components/FoldersComponent";
import {Actions} from "react-native-router-flux";
import ActionButtons from "../../../Components/ActionButtons";
import RouteActions from "../../../Redux/RouteRedux";
import {isEmpty} from "ramda";
import moment from "moment";

class HomeTab extends Component {

    static propTypes = {}

    constructor(props) {
        super(props)
        this.state = {
            showFamilyMembers: false,
            selectedContacts: [],
            showContactsList: false,
            showAddFamilyMember: false
        }
        StatusBar.setBackgroundColor(Colors.primaryColorI)
    }

    async componentDidMount() {
        this.props.getActiveRoute({status: 'active', sort: 'today'})
        if (Platform.OS === "android") {
            await this.requestContactPermissionAndroid();
            this.processData();
        } else {
            this.processData();
        }
    }

    componentWillReceiveProps({fetching: newFetching}) {
        const {showAddFamilyMember} = this.state
        if (!newFetching && newFetching !== this.props.fetching && showAddFamilyMember) {
            this.setState({showAddFamilyMember: false})
        }
    }

    requestContactPermissionAndroid = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS
            ]);
            if (
                granted[PermissionsAndroid.PERMISSIONS.READ_CONTACTS] ===
                PermissionsAndroid.RESULTS.GRANTED
            ) {
                this.setState({androidPermission: true});
                return true
            } else {
                Alert.alert("Permissions Denied. Please Grant Permissions.");
                await this.requestContactPermissionAndroid();
            }
        } catch (err) {
            console.error("Robot: ", err);
            return false
        }
    };

    componentWillMount() {
        const {fetchFamilyReq, user} = this.props
        if (user.familyId) {
            fetchFamilyReq(user.familyId)
        } else {
            showErrorMessage(strings.hasNoFamily)
        }
    }

    renderFamilyMember = ({item, index}) => {
        return (
            <FamilyMember item={item} onAddFamilyMember={this.onAddFamilyMember}/>
        )
    }

    onAddFamilyMember = () => {
        const {showAddFamilyMember} = this.state
        if (!showAddFamilyMember) {
            this.setState({showAddFamilyMember: true})
        }
    }

    onAddNewFamilyMember = (contact) => {
        const {family: {name} = {}, createFamilyReq} = this.props
        if (name && !_.isEmpty(contact) && createFamilyReq && typeof createFamilyReq === 'function') {
            createFamilyReq(name, [contact])
        }
    }

    onContactSelected = (contact) => {
        this.setState({contact, showContactsList: false})
    }

    onAddContact = (newContact) => {
        const {contact: stateContact, selectedContacts} = this.state
        const contact = !_.isEmpty(newContact) ? newContact : stateContact
        console.tron.warn({
            cond: !contact || _.isEmpty(contact),
            contact,
            newContact,
            stateContact
        })
        if (!contact || _.isEmpty(contact)) {
            Alert.alert('kindly select a contact first')
            return
        }
        const prevIndex = selectedContacts.findIndex(item => item.phone === newContact.phone)
        if (prevIndex === -1) {
            this.setState({contact, selectedContacts: [contact, ...selectedContacts]})
        } else if (!_.isEqual(selectedContacts[prevIndex], contact)) {
            const newSelected = selectedContacts
            newSelected.splice(prevIndex, 1, contact)
            this.setState({contact, selectedContacts: newSelected})
        } else {
            Alert.alert(strings.contactAlreadyAdded)
        }
    }

    onSelectContact = () => {
        const {showContactsList} = this.state
        if (!showContactsList) {
            this.setState({showContactsList: true, contact: null})
        }
    }

    onEditContact = (contact) => {
        this.setState({contact, role: contact.role})
    }

    onDeleteContact = (contact) => {
        const {selectedContacts} = this.state
        const newSelectedContacts = selectedContacts.filter(item => !_.isEqual(item, contact))
        this.setState({selectedContacts: newSelectedContacts})
    }

    onHideContactList = () => {
        const {showContactsList} = this.state
        if (showContactsList) {
            this.setState({showContactsList: false})
        }
    }

    renderContactItem = (item, index, section) => {
        const {thumbnailPath = '', name = ''} = item
        return (
            <TouchableOpacity style={styles.contactItemRow} onPress={() => this.onContactSelected(item)}>
                {!!thumbnailPath ? <Image style={styles.thumbnail} source={{uri: thumbnailPath}}/> :
                    <View style={styles.thumbnail}>
                        <Text style={styles.initials}>{name.substring(0, 1)}</Text>
                    </View>}
                <Text style={styles.contactName}>{name}</Text>
            </TouchableOpacity>
        )
    }

    onCreateFamily = () => {
        const {familyName, selectedContacts} = this.state
        const {createFamilyReq} = this.props
        if (!familyName) {
            showErrorMessage(strings.familyNameEmpty)
            return
        }
        createFamilyReq(familyName, selectedContacts)
    }

    renderCurrentTask = () => {
        const {route: {tasks = []} = {}} = this.props
        const activeTask = tasks[0] || {}
        let {task: {name: taskName, fromTime= '', toTime = ''} = {}} = activeTask
             if(!isEmpty(taskName)){
                 taskName = `${taskName} at ${moment(fromTime).format('MM/DD/YYYY')}\n${moment(fromTime).format('HH:mm')} to ${moment(toTime).format('HH:mm')}`
             } else {
                 taskName = strings.noTaskPlanned
             }
            return <Text style={styles.noTaskText}>{taskName}</Text>
    }

    renderActiveRoute = () => {
        const {route: {tasks = []} = {}} = this.props
        const activeTask = tasks[1] || {}
        const {task: {locationName = strings.noLocationAvailable, name = strings.noTaskAvailable} = {}} = activeTask
        return (
            <>
                <View style={styles.routeLeftIconContainer}>
                    <Image source={images.greenLocationFull}
                           style={styles.routeLeftIcon}/>
                </View>
                <View style={styles.activeRouteDetailsContainer}>
                    <Text style={styles.activeRouteTaskName}>{name}</Text>
                    <View style={styles.routerHorizontalSeperator}/>
                    <Text numberOfLines={2} style={styles.activeRouteLocationName}>{locationName}</Text>
                </View>
            </>
        )
    }

    renderCurrentTaskPanel = () => {
        return (
            <View style={styles.taskAndRoutePanels}>
                <View style={styles.taskHeaderContainer}>
                    <Text style={styles.taskHeadingText}>{strings.tasks}</Text>
                </View>
                <View style={styles.currentTaskContent}>
                    {this.renderCurrentTask()}
                </View>
                <View>
                    {this.renderTaskActions()}
                </View>

            </View>
        )
    }

    renderCurrentRoutePanel = () => {
        return (
            <View style={styles.taskAndRoutePanels}>
                <ImageBackground style={styles.activeRouteBg} source={images.activeRouteBg}>
                    <View style={styles.routeHeaderContainer}>
                        <Text style={styles.routeHeadingText}>{strings.route}</Text>
                        <Text style={styles.activeRouteheading}>{strings.active}</Text>
                    </View>
                    <View style={styles.activeRouteContent}>
                        {this.renderActiveRoute()}
                    </View>
                </ImageBackground>
                <View>
                    {this.renderActiveRouteActions()}
                </View>
            </View>
        )
    }

    onMarkTaskDone = () => {
        const {updateTaskStatusReq, route: {tasks = []} = {}} = this.props
        const activeTask = tasks[0] || {}
        const {task: {id: taskId = ''} = {}, routeId = ''} = activeTask
        updateTaskStatusReq(taskId, routeId, TASK_STATUSES.COMPLETED)
    }

    onIgnoreTask = () => {
        // todo: ignore current task
    }

    onPauseActiveRoute = () => {
        // todo: PAUSE CURRENT ACTIVE ROUTE
    }

    onStopActiveRoute = () => {
        const {updateRouteStatus, activeRoute: {id: routeId} = {}} = this.props
        if(routeId) {
            updateRouteStatus(routeId, {status: 'inactive'}, true)
        }
    }

    renderTaskActions = () => {
        return (
            <View style={styles.bottomActionsRow}>
                <TouchableOpacity style={styles.taskLeftActionBtn}
                                  activeOpacity={0.8}
                                  onPress={this.onMarkTaskDone}>
                    <Text style={styles.taskBtnText}>{strings.markDone}</Text>
                </TouchableOpacity>
                <View style={styles.taskMiddleBtn}>
                    <View style={styles.verticalActionSeperator}/>
                    <Text style={styles.tasksStatusText}>No Tasks for today</Text>
                    <View style={styles.verticalActionSeperator}/>
                </View>
                <TouchableOpacity style={styles.taskRightActionBtn}
                                  activeOpacity={0.8}
                                  onPress={this.onIgnoreTask}>
                    <Text style={styles.taskBtnText}>{strings.ignoreForNow}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderActiveRouteActions = () => {
        const {activeRoute: {noOfTask = 0, noOfTaskCompleted = 0} = {}} = this.props
        return (
            <View style={styles.bottomActionsRow}>
                <TouchableOpacity style={styles.taskLeftActionBtn}
                                  activeOpacity={0.8}
                                  onPress={this.onPauseActiveRoute}>
                    <Text style={styles.taskBtnText}>{strings.pause}</Text>
                </TouchableOpacity>
                <View style={styles.taskMiddleBtn}>
                    <View style={styles.verticalActionSeperator}/>
                    <Text style={styles.tasksStatusText}>{`${noOfTaskCompleted} out of ${noOfTask} Done`}</Text>
                    <View style={styles.verticalActionSeperator}/>
                </View>
                <TouchableOpacity style={styles.taskRightActionBtn}
                                  activeOpacity={0.8}
                                  onPress={this.onStopActiveRoute}>
                    <Text style={styles.taskBtnText}>{strings.stopRoute}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    onAddFolder = () => {
        // todo: handle add folder
        Alert.alert('api needs to be integerated.')
    }

    onCreateTask = () => {
        Actions.createActivity()
    }

    onFolderActionPressed = (index) => {
        switch (index){
            case 0: this.photoAction.show()
            break
            case 1: () => {}
            break
            default: () => {}
        }
    }

    render() {
        const {familyName, selectedContacts, showContactsList, contact, showAddFamilyMember} = this.state
        const {isSignup, family = {}, fetching, contacts, folders, routesFetching} = this.props
        const {name, users = []} = family
        if (fetching) {
            return (
                <View style={styles.mainContainer}>
                    <ProgressDialog hasTabs/>
                </View>
            )
        }
        return (
            <View style={styles.mainContainer}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    {
                        !_.isEmpty(family) ? <>
                            <ImageBackground style={styles.topHeaderImage}
                                             source={images.bg}>
                                <View style={styles.familyTitleContainer}>
                                    <View style={styles.userNameContainer}>
                                        <Text style={styles.familyName}>{name}</Text>
                                    </View>
                                </View>
                                <View style={styles.familyMembersContainer}>
                                    <FlatList data={[{id: ADD_FAMILY_MEMBER_BUTTON_ID}, ...users]}
                                              renderItem={this.renderFamilyMember} horizontal
                                              extraData={this.props.family}/>
                                </View>
                            </ImageBackground>
                            {
                                showAddFamilyMember ? <CreateNewContact contact={contact}
                                                                        headerText={strings.externalInvites}
                                                                        onAddContact={this.onAddNewFamilyMember}
                                                                        onCancel={() => this.setState({
                                                                            showAddFamilyMember: false,
                                                                            showContactsList: false
                                                                        })}
                                                                        onSelectContact={this.onSelectContact}/> : null
                            }
                        </> : <>
                            <ImageBackground style={[styles.topHeaderImage]}
                                             source={images.mountainsPurpleBg}>
                                <View style={styles.contentFlexEnd}>
                                    <Text style={styles.enterFamilyName}>Enter Your Family Name</Text>
                                    <View style={styles.familyNameInputContainer}>
                                        <TextInput value={familyName}
                                                   style={styles.familyNameInput}
                                                   placeholder={`Yours family`}
                                                   placeholderTextColor={Colors.snow}
                                                   onChangeText={familyName => this.setState({familyName})}/>
                                        <TouchableOpacity style={styles.goBtnContainer}
                                                          onPress={this.onCreateFamily}>
                                            <Text style={styles.goTxt}>GO</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ImageBackground>
                            <AddContacts selectedContacts={selectedContacts}
                                         onSelectContact={this.onSelectContact}
                                         contact={contact}
                                         onAddContact={this.onAddContact}
                                         onEditContact={this.onEditContact}
                                         onDeleteContact={this.onDeleteContact}
                                         onContactSelected={this.onContactSelected}/>
                        </>
                    }

                    {this.renderCurrentTaskPanel()}
                    {this.renderCurrentRoutePanel()}
                    <FoldersComponent containerStyles={styles.foldersComponentContainer}
                                      folders={folders}
                                      onPressFolder={() => this.folderActions.show()}
                                      onAddFolder={this.onAddFolder}/>
                </ScrollView>
                <ProgressDialog hide={!routesFetching}/>
                <ModalComponent isModalVisible={showContactsList}
                                closeModal={this.onHideContactList}>
                    <SafeAreaView style={{flex: 1, backgroundColor: Colors.snow}}>
                        <ContactsSectionList sectionListData={contacts} renderItem={this.renderContactItem}/>
                    </SafeAreaView>
                </ModalComponent>
                <ActionButtons onPressActionButton1={this.onCreateTask} onPressActionButton2={Actions.createRoute}/>
                <ActionSheet
                    cancelButtonIndex={3}
                    title={strings.sureEditFolder}
                    ref={o => this.folderActions = o}
                    onPress={this.onFolderActionPressed}
                    options={[strings.editFolder, strings.renameFolder, strings.deleteFolder, strings.cancel]}
                />
                 <ActionSheet
                    cancelButtonIndex={2}
                    title={strings.chooseIcon}
                    ref={o => this.photoAction = o}
                    options={[strings.takePhoto, strings.chooseFromLibrary, strings.cancel]}
                />
            </View>
        )
    }
}

const mapStateToProps = ({
                             config: {contacts = []} = {},
                             user: {user, isSignup} = {},
                             family: {fetching, family} = {},
                             route: {activeRoute = {}, route = {}, fetching: routesFetching} = {},
                             folder: {folders = [], hasNoMore: noMoreFolders = false} = {}
                         }) => {
    return {
        user, route, isSignup, fetching, routesFetching, activeRoute, family, contacts, folders, noMoreFolders
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteRoute: (routeId) => dispatch(RouteActions.deleteRoute(routeId)),
        getActiveRoute: (params) => dispatch(RouteActions.getActiveRoute(params)),
        fetchFamilyReq: (familyId) => dispatch(FamilyActions.fetchFamily(familyId)),
        createFamilyReq: (familyName, invites) => dispatch(FamilyActions.createFamily(familyName, invites)),
        updateTaskStatusReq: (taskId, routeId, status) => dispatch(RouteActions.updateTaskStatus(taskId, routeId, status)),
        updateRouteStatus: (routeId, params, fetchAfterUpdate) => dispatch(RouteActions.updateRouteStatus(routeId, params, fetchAfterUpdate))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab)
