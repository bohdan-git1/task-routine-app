import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Actions} from 'react-native-router-flux'
import {Text, TouchableOpacity, View} from 'react-native'
import styles from './styles'
import VectorIcon from "../VectorIcon";
import strings from "../../Constants/strings";
import RoundedButton from "../RoundedButton";
import {APP_URL} from "../../Lib/AppConstants";

export default class PaymentDialog extends Component {
    static propTypes = {
        onClose: PropTypes.function
    }

    static defaultProps = {
        onClose: () => {}
    }

    renderHeader = () => {
        const {onClose} = this.props
        return (
            <View style={styles.header}>
                <VectorIcon name={'closecircleo'} type={'AntDesign'} style={styles.backIcon} onPress={onClose}/>
                <Text style={styles.heading}>{strings.getPremium}</Text>
            </View>
        )
    }

    getToPayPal = () => {
        this.props.onClose()
        Actions.webView({url: `${APP_URL}paypal-ui`, title: 'Get Premium Version'})
    }


    render() {
        return (
            <TouchableOpacity activeOpacity={1} style={styles.mainContainer}>
                <TouchableOpacity activeOpacity={1} style={styles.innerContainer}>
                    {this.renderHeader()}
                    <View style={styles.contentContainer}>
                        <Text style={styles.message}>Choose the premium subscription monthly or yearly</Text>
                        <RoundedButton onPress={this.getToPayPal} buttonContainer={styles.buttonContainer} text={'Balance'}/>
                        <RoundedButton onPress={this.getToPayPal} buttonContainer={styles.buttonContainer} text={'Zen'}/>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
}


