import styles from './styles'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {isEmpty} from 'lodash'
import {Keyboard, Text, TouchableOpacity, View} from 'react-native'
import Input from "../Input";
import VectorIcon from "../VectorIcon";
import {Dropdown} from "react-native-material-dropdown";
import {Colors} from "../../Themes";
import RoundedButton from "../RoundedButton";
import {connect} from "react-redux";
import {showMessage} from "../../Lib/Utilities";


class BudgetDialog extends Component {
    static propTypes = {
        onDone: PropTypes.function,
        onCancel: PropTypes.function
    }

    static defaultProps = {
        onDone: () => {
        },
        onCancel: () => {
        }
    }


    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            description: '',
            type: 'Select Category',
            categoryId: ''
        };
    }

    saveBudget = () => {
        Keyboard.dismiss()
        const {onDone} = this.props
        const {amount, description, type, categoryId} = this.state
        if (isEmpty(categoryId)) {
            showMessage('Please select category')
        } else if (isEmpty(amount)) {
            showMessage('Please enter amount')
        } else if (isEmpty(description)) {
            showMessage('Please enter description')
        } else {
            onDone({amount, description, categoryId})
        }
    }

    renderHeader = () => {
        const {onCancel} = this.props
        return (
            <View style={styles.header}>
                <Text style={styles.heading}>AMOUNT SPENT</Text>
                <VectorIcon name='closecircleo' type='AntDesign' style={styles.closeIcon} onPress={onCancel}/>
            </View>
        )
    }


    render() {
        const {amount, description, type} = this.state
        const {categories} = this.props
        const Budget_Types = categories.map(({name, id, budget, totalSpent}) => {
            return {value: name, id, budget, totalSpent}
        })
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
                            onChangeText={(type, index, data) => {
                                const {id: categoryId = ''} = data[index]
                                this.setState({type, categoryId: String(categoryId)})
                            }}
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

const mapStateToProps = ({budget: {categories}}) => {
    return {
        categories
    }
}

export default connect(mapStateToProps, null)(BudgetDialog)

