import styles from './styles'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Text, TouchableOpacity, View, Keyboard} from 'react-native'
import Input from "../Input";
import VectorIcon from "../VectorIcon";
import {Budget_Types, User_Roles} from "../../Lib/AppConstants";
import {Dropdown} from "react-native-material-dropdown";
import {Colors} from "../../Themes";
import RoundedButton from "../RoundedButton";


export default class BudgetDialog extends Component {
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
            amount: '',
            description: '',
            type: 'Electricity'
        };
    }

    saveBudget = () => {
        Keyboard.dismiss()
        const {onDone} = this.props
        const {amount, description, type} = this.state
        onDone({amount, description, type})
    }

    renderHeader = () => {
        const {onCancel} = this.props
        return (
            <View style={styles.header}>
                <Text style={styles.heading}>AMOUNT SPENT</Text>
                <TouchableOpacity onPress={onCancel}>
                <VectorIcon name='closecircleo' type='AntDesign' style={styles.closeIcon}/>
                </TouchableOpacity>
            </View>
        )
    }


    render() {
        const {onCancel} = this.props
        const {amount, description, type} = this.state
        return (
            <TouchableOpacity activeOpacity={1} style={styles.mainContainer}>
                <TouchableOpacity activeOpacity={1} style={styles.innerContainer}>
                    {this.renderHeader()}
                    <View style={styles.contentContainer}>
                        <Dropdown
                            value={type}
                            data={Budget_Types}
                            baseColor={Colors.primaryColorI}
                            dropdownOffset={styles.dropdownOffset}
                            containerStyle={styles.dropdownContainer}
                            inputContainerStyle={styles.inputContainer}
                            onChangeText={(type) => {this.setState({type})}}
                        />
                        <Text style={styles.amountLabel}>Amount</Text>
                        <View style={styles.budgetContainer}>
                            <Input
                                value={'$'}
                                editable={false}
                                styleOverride={styles.currencyText}
                                containerStyle={styles.currency}
                            />
                            <Input
                                value={amount}
                                placeholder={'00'}
                                labelStyle={styles.inputLabel}
                                containerStyle={styles.amountInput}
                                onChangeText={(amount) => {
                                    this.setState({amount})
                                }}
                                returnKeyType={'next'}
                                onSubmitEditing={() => this.description.focus()}
                            />
                        </View>
                        <Input
                            ref={ref => this.description = ref}
                            value={description}
                            label={'Description'}
                            placeholder={'Description'}
                            labelStyle={styles.inputLabel}
                            containerStyle={styles.bottomLine}
                            onChangeText={(description) => {
                                this.setState({description})
                            }}
                            returnKeyType={'done'}
                            onSubmitEditing={Keyboard.dismiss}
                        />
                    </View>
                    <RoundedButton
                        text={'ADD NOW'}
                        onPress={this.saveBudget}
                        buttonContainer={styles.buttonContainer}
                    />
                    </TouchableOpacity>
            </TouchableOpacity>
        )
    }
}
