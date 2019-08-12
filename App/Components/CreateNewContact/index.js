import React, {Component} from 'react'
import {Text, TextInput, TouchableOpacity, View} from 'react-native'
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
    }
    constructor (props) {
        super(props)
        const { contact: { phoneNumbers: {0: firstItem = {}} = [], name = ''} = {}} = props
        const { number = '' } = firstItem
        this.state = {
            userName: name,
            phoneNumber: number
        }
    }

    componentWillReceiveProps({contact: newContact = {}}) {
        const { contact = {} } = this.props
        if(newContact && !_.isEqual(contact, newContact)) {
            const { phoneNumbers: {0: firstItem = {}} = [], name = '' } = newContact
            const { number = '' } = firstItem
            this.setState({
                userName: name,
                phoneNumber: number
            })
        }
    }

    onCreateNew = () => {

    }

    handleSelectContact = () => {
        const { onSelectContact } = this.props
        if (onSelectContact && typeof onSelectContact === 'function') {
            onSelectContact()
        }
    }

    render () {
        const { userName, phoneNumber, role = strings.userType } = this.state
        return (
            <View style={[styles.container, ApplicationStyles.shadow]}>
                <View style={styles.contentContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Create New</Text>
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
                </View>
            </View>
        )
    }
}
