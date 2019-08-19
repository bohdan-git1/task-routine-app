import React, {Component} from 'react'
import { Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native'
import {Menu, MenuOption, MenuOptions, MenuTrigger} from 'react-native-popup-menu';
import PropTypes from 'prop-types'
import * as _ from 'lodash'

import styles from './style'
import ApplicationStyles from "../../Themes/ApplicationStyles";
import strings from "../../Constants/strings";
import Colors from "../../Themes/Colors";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import RoundedButton from "../RoundedButton";
import {showErrorMessage} from "../../Lib/Utilities";


export const rolesData = [
    {
        id: 1,
        name: 'Admin',
        value: 'admin'
    },
    {
        id: 2,
        name: 'Friend',
        value: 'friend'
    },
    {
        id: 3,
        name: 'Minor',
        value: 'minor'
    },
]

export default class CreateNewContact extends Component {
    static propTypes = {
        onSelectContact: PropTypes.func,
        headerText: PropTypes.string,
        onAddContact: PropTypes.func,
        onCancel: PropTypes.func,
    }

    static defaultProps = {
        headerText: strings.createNew
    }

    constructor (props) {
        super(props)
        const { contact: { role = rolesData[0].value, phone = '', name = ''} = {}} = props
        this.state = {
            userName: name,
            phoneNumber: phone,
            role
        }
    }

    componentWillReceiveProps({contact: newContact = {}}) {
        const { contact = {} } = this.props
        if (newContact && !_.isEqual(contact, newContact)) {
            const { phone = '', name = '' } = newContact
            this.setState({
                userName: name,
                phoneNumber: phone,
                role: newContact.role || rolesData[0].value
            })
        }
    }

    onCreateNew = () => {
        const { contact = {}, onAddContact } = this.props
        const { userName, phoneNumber, role } = this.state
        if (!userName) {
            Keyboard.dismiss()
            showErrorMessage(strings.userNameEmpty)
        } else if (!phoneNumber) {
            Keyboard.dismiss()
            showErrorMessage(strings.phoneNumberEmpty)
        } else if (!role) {
            Keyboard.dismiss()
            showErrorMessage('kindly select a role')
        } else {
            let newContact = {}
            if (contact.name !== userName || contact.phone !== phoneNumber) {
                newContact.name = userName
                newContact.phone = phoneNumber
                newContact.role = role
            } else {
                const { name, phone, recordID } = contact
                newContact.name = name
                newContact.phone = phone
                newContact.recordID = recordID
                newContact.role = role
            }
            onAddContact(newContact)
        }
    }

    handleSelectContact = () => {
        const { onSelectContact } = this.props
        if (onSelectContact && typeof onSelectContact === 'function') {
            onSelectContact()
        }
    }

    render () {
        const { userName, phoneNumber, role = strings.userType } = this.state
        const { onCancel, headerText} = this.props
        return (
            <View style={[styles.container, ApplicationStyles.shadow]}>
                <View style={styles.contentContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>{headerText}</Text>
                    </View>
                    <Text style={styles.headings}>{strings.userName}</Text>
                    <TextInput value={userName}
                               onChangeText={userName => this.setState({userName})}
                               placeholder={strings.enterUserName}
                               onSubmitEditing={() => this.refs.phoneNumberRef.focus()}
                               style={[styles.inputs, styles.rightMarginFifteen]}/>

                    <View style={styles.contactDetailsContainer}>
                        <View style={styles.telephoneNumContainer}>
                            <Text style={styles.headings}>{strings.phoneNumber}</Text>
                            <TextInput value={phoneNumber}
                                       ref={'phoneNumberRef'}
                                       onSubmitEditing={this.onCreateNew}
                                       keyboardType={'phone-pad'}
                                       onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                                       placeholder={strings.enterPhoneNumber}
                                       style={[styles.inputs, styles.grayBottomBorder]}/>
                        </View>
                        <TouchableOpacity style={styles.contactIconContainer} onPress={this.handleSelectContact}>
                            <FontAwesome5 name={'address-book'} color={Colors.gray} size={20} />
                        </TouchableOpacity>
                        <View style={styles.userTypeContainer}>
                            <Menu>
                                <MenuTrigger>
                                    <View style={styles.menuTriggerContainer}>
                                        <Text style={styles.menuTriggerText}>{role}</Text>
                                        <AntDesign name={'caretdown'} color={Colors.black} size={10} />
                                    </View>
                                </MenuTrigger>
                                <MenuOptions>
                                    {
                                        rolesData.map(item => {
                                            return (
                                                <MenuOption onSelect={() => this.setState({role: item.value})} value={item.value} >
                                                    <Text>{item.name}</Text>
                                                </MenuOption>
                                            )
                                        })
                                    }
                                </MenuOptions>
                            </Menu>
                        </View>
                    </View>
                    <RoundedButton text={strings.add}
                                   buttonContainer={styles.addBtn}
                                   onPress={this.onCreateNew}/>

                    {
                        onCancel && typeof onCancel === 'function' ? <RoundedButton text={strings.cancel}
                                    buttonContainer={styles.cancelBtn} btnText={styles.cancelBtnTxt}
                                    onPress={onCancel}/>
                            : null

                    }
                </View>
            </View>
        )
    }
}
