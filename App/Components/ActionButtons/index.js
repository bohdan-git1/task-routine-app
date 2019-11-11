import {View} from 'react-native'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import styles from './styles'
import Colors from "../../Themes/Colors";
import Metrics from "../../Themes/Metrics";
import strings from "../../Constants/strings";
import {showMessage} from "../../Lib/Utilities";

export default class ActionButtons extends Component {

    static propTypes = {
        userSettings: PropTypes.object,
        onPressActionButton1: PropTypes.func,
        onPressActionButton2: PropTypes.func
    }

    static defaultProps = {
        userSettings: {},
        onPressActionButton1: () => {},
        onPressActionButton2: () => {}
    }

    onCreateActivity = () => {
        const { userSettings: { canCreateActivity = true } = {}, onPressActionButton1 } = this.props
        if (canCreateActivity) {
            onPressActionButton1()
        } else {
            showMessage(strings.cantCreateActivity)
        }
    }

    onCreateRoute = () => {
        const { userSettings: { canCreateRoute = true } = {}, onPressActionButton2 } = this.props
        if (canCreateRoute) {
            onPressActionButton2()
        } else {
            showMessage(strings.cantCreateRoute)
        }
    }

    render() {
        return (
            <ActionButton buttonColor={Colors.actionButton}
                          backdrop={<View style={styles.actionBtnBackdrop}/>}
                          buttonTextStyle={styles.plusText}>
                <ActionButton.Item buttonColor={Colors.actionButton}
                                   title={strings.createTask}
                                   size={Metrics.doubleSection}
                                   textStyle={styles.buttonText}
                                   textContainerStyle={styles.textContainer}
                                   onPress={this.onCreateActivity}>
                    <Icon name="md-create"
                          style={styles.actionButtonIcon}/>
                </ActionButton.Item>
                <ActionButton.Item buttonColor={Colors.actionButton}
                                   title={strings.createRoute}
                                   size={Metrics.doubleSection}
                                   textStyle={styles.buttonText}
                                   textContainerStyle={styles.textContainer}
                                   onPress={this.onCreateRoute}>
                    <MaterialIcons name="my-location"
                                   style={styles.actionButtonIcon}/>
                </ActionButton.Item>
            </ActionButton>
        )
    }
}
