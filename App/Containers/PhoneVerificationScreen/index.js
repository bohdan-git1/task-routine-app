import i18n from 'i18n-js'
import React, {Component} from 'react'
import {Image, Text} from 'react-native'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import styles from "./styles";
import RoundedButton from '../../Components/RoundedButton'
import GradientView from "../../Components/GradientView";
import {Images} from "../../Themes";
import UserActions from "../../Redux/UserRedux";
import {connect} from "react-redux";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import {ProgressDialog} from "../../Components/ProgressDialog";

class PhoneVerificationScreen extends Component {
    pinInput = React.createRef();

    constructor(props) {
        super(props)
        this.state = {
            activationCode: ''
        }
    }

    verifyCode = () => {
        const {activationCode} = this.state
        const {user: {id: userId = ''} = {}, verifyPin} = this.props
        verifyPin({userId, activationCode})
    }

    resendPinCode = () => {
        const {resendPin, user: {phone: phone= ''} = {},} = this.props
        resendPin({phone})
    }

    render() {
        const {fetching} = this.props
        const {activationCode} = this.state
        return (
            <GradientView>
                <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' style={styles.mainContainer}
                                         showsVerticalScrollIndicator={false}>
                    <Image source={Images.logo} style={styles.logo}/>
                    <Text style={styles.enterPhone}>{i18n.t('enterPhoneNumber')}</Text>
                    <Text style={styles.enter4DigitPhone}>{i18n.t('enter4DigitCode')}</Text>
                    <SmoothPinCodeInput
                        ref={this.pinInput}
                        value={activationCode}
                        onFulfill={this._checkCode}
                        containerStyle={styles.codeInputContainer}
                        cellStyle={styles.codeInput}
                        cellStyleFocused={styles.codeInputFocused}
                        textStyle={styles.codeInputText}
                        textStyleFocused={styles.codeInputTextFocused}
                        onBackspace={() => console.log('No more back.')}
                        onTextChange={activationCode => this.setState({activationCode})}
                    />
                    <Text style={styles.notReceivedCode}>{i18n.t('didNotGetCode')}<Text onPress={this.resendPinCode}
                        style={styles.reSend}>{i18n.t('resend')}</Text></Text>
                    <RoundedButton onPress={this.verifyCode} buttonContainer={styles.buttonContainer}
                                   text={i18n.t('verifyNow')}/>
                </KeyboardAwareScrollView>
                <ProgressDialog hide={!fetching}/>
            </GradientView>
        )
    }
}

const mapStateToProps = ({user: {fetching, user}}) => {
    return {fetching, user}
}

const mapDispatchToProps = (dispatch) => {
    return {
        verifyPin: (info) => dispatch(UserActions.verifyPin(info)),
        resendPin: (info) => dispatch(UserActions.resendPin(info))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerificationScreen)

