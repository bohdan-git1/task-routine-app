import styles from './styles'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Keyboard, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import Input from "../Input";
import VectorIcon from "../VectorIcon";
import RoundedButton from "../RoundedButton";
import BudgetActions from "../../Redux/BudgetRedux";
import {connect} from "react-redux";

class CategoryDialog extends Component {
    static propTypes = {
        closeDialog: PropTypes.function
    }

    static defaultProps = {
        closeDialog: () => {}
    }


    constructor(props) {
        super(props);
        this.state = {
            budget: '',
            name: '',
        };
    }

      componentDidUpdate(prevProps) {
          const {success, closeDialog} = this.props
          if(success && prevProps.success !== success ) {
              closeDialog()
          }
      }

    addCategory = () => {
        Keyboard.dismiss()
        const {budget, name} = this.state
        this.props.addCategory({budget, name})
    }

    renderHeader = () => {
        const {closeDialog} = this.props
        return (
            <View style={styles.header}>
                <Text style={styles.heading}>BUDGET CATEGORY</Text>
                <VectorIcon name='closecircleo' type='AntDesign' style={styles.closeIcon} onPress={closeDialog}/>
            </View>
        )
    }


    render() {
        const {budget, name} = this.state
        const {updating} = this.props
        return (
            <TouchableOpacity activeOpacity={1} style={styles.mainContainer}>
                <TouchableOpacity activeOpacity={1} style={styles.innerContainer}>
                    {this.renderHeader()}
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        <Input
                            value={name}
                            placeholder={'Name'}
                            returnKeyType={'next'}
                            label={'Category Name'}
                            labelStyle={styles.inputLabel}
                            containerStyle={styles.bottomLine}
                            onSubmitEditing={() => this.budget.focus()}
                            onChangeText={(name) => {this.setState({name})}}
                        />
                        <Input
                            value={budget}
                            placeholder={'Budget'}
                            returnKeyType={'done'}
                            keyboardType={'numeric'}
                            label={'Total Budget'}
                            ref={ref => this.budget = ref}
                            labelStyle={styles.inputLabel}
                            onSubmitEditing={Keyboard.dismiss}
                            containerStyle={styles.bottomLine}
                            onChangeText={(budget) => {this.setState({budget})}}
                        />
                    </ScrollView>
                    <RoundedButton
                        text={updating ? 'ADDING NEW CATEGORY...' : 'ADD CATEGORY'}
                        onPress={this.addCategory}
                        buttonContainer={styles.buttonContainer}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = ({budget: {updating, success}}) => {
    return {
        updating, success
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCategory: (params) => dispatch(BudgetActions.addCategory(params))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDialog)

