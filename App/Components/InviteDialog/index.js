import styles from './styles'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import Input from "../Input";
import VectorIcon from "../VectorIcon";
import {User_Roles} from "../../Lib/AppConstants";
import {Dropdown} from "react-native-material-dropdown";
import {Colors} from "../../Themes";


export default class InviteDialog extends Component {
    static propTypes = {
        onDone: PropTypes.function,
        onCancel: PropTypes.function
    }

    static defaultProps = {
        onDone: () => {},
        onCancel: () => {}
    }


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            role: 'Admin'
        };
    }

    addInvite = () => {
        const {onDone} = this.props
        const {name, phone, role} = this.state
        onDone({name, phone, role})
    }

    renderHeader = () => {
        return (
            <View style={styles.header}>
                <Text style={styles.heading}>External Invites</Text>
            </View>
        )
    }


    render() {
        const {onCancel} = this.props
        const {name, phone, role} = this.state
        return (
            <TouchableOpacity activeOpacity={1} style={styles.mainContainer}>
                <TouchableOpacity activeOpacity={1} style={styles.innerContainer}>
                    {this.renderHeader()}
                    <View style={styles.contentContainer}>
                     <Input
                         value={name}
                         label={'User Name'}
                         placeholder={'User Name'}
                         labelStyle={styles.inputLabel}
                         containerStyle={styles.bottomLine}
                         onChangeText={(name) => {this.setState({name})}}
                     />
                        <View style={styles.rowContainer}>
                         <View style={styles.phoneContainer}>
                             <Input
                                 value={phone}
                                 label={'Phone'}
                                 placeholder={'Phone'}
                                 keyboardType={'number-pad'}
                                 labelStyle={styles.inputLabel}
                                 containerStyle={styles.phoneInputContainer}
                                 onChangeText={(phone) => {this.setState({phone})}}
                             />
                             <VectorIcon name={'contacts'} type={'AntDesign'} style={styles.contactIcon}/>
                         </View>
                            <Dropdown
                                value={role}
                                data={User_Roles}
                                baseColor={Colors.offWhiteI}
                                dropdownOffset={styles.dropdownOffset}
                                containerStyle={styles.dropdownContainer}
                                onChangeText={(role) => {this.setState({role})}}
                            />
                        </View>

                        <TouchableOpacity onPress={this.addInvite} style={styles.addButton}>
                            <Text style={styles.addText}>ADD</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onCancel}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
}
