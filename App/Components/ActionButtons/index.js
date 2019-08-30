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

export default class ActionButtons extends Component {

    static propTypes = {
        onPressActionButton1: PropTypes.func,
        onPressActionButton2: PropTypes.func
    }

    static defaultProps = {
        onPressActionButton1: () => {
        },
        onPressActionButton2: () => {
        }
    }

    render() {
        const {onPressActionButton1, onPressActionButton2} = this.props
        return (
            <ActionButton buttonColor={Colors.actionButton}
                          backdrop={<View style={styles.actionBtnBackdrop}/>}
                          buttonTextStyle={styles.plusText}>
                <ActionButton.Item buttonColor={Colors.actionButton}
                                   title={strings.createTask}
                                   size={Metrics.doubleSection}
                                   textStyle={styles.buttonText}
                                   textContainerStyle={styles.textContainer}
                                   onPress={onPressActionButton1}>
                    <Icon name="md-create"
                          style={styles.actionButtonIcon}/>
                </ActionButton.Item>
                <ActionButton.Item buttonColor={Colors.actionButton}
                                   title={strings.createRoute}
                                   size={Metrics.doubleSection}
                                   textStyle={styles.buttonText}
                                   textContainerStyle={styles.textContainer}
                                   onPress={onPressActionButton2}>
                    <MaterialIcons name="my-location"
                                   style={styles.actionButtonIcon}/>
                </ActionButton.Item>
            </ActionButton>
        )
    }
}
