import i18n from 'i18n-js'
import React, {Component} from 'react'
import {Image, Platform, Text} from 'react-native'
import PhoneInput from 'react-native-phone-input'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

import styles from "./styles";
import {Images} from "../../Themes";
import UserActions from "../../Redux/UserRedux";
import GradientView from "../../Components/GradientView";
import RoundedButton from '../../Components/RoundedButton'
import {connect} from "react-redux";
import DeviceInfo from "react-native-device-info";
import {ProgressDialog} from "../../Components/ProgressDialog";

class SignupScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            phone: '+1'
        }
    }

    signUpUser = () => {
        const {signUp} = this.props
        const {phone} = this.state
        const deviceType =  Platform.OS
        const deviceId = DeviceInfo.getDeviceId()
        signUp({phone, deviceId, deviceType})
    }

    render() {
        const {phone} = this.state
        const {fetching} = this.props
        return (
            <GradientView>
                <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' key style={styles.mainContainer}
                                         showsVerticalScrollIndicator={false}>
                    <Image source={Images.logo} style={styles.logo}/>
                    <Text style={styles.enterPhone}>{i18n.t('enterPhoneNumber')}</Text>
                    <PhoneInput
                        ref='phone'
                        value={phone}
                        style={styles.phoneInput}
                        textStyle={styles.phoneText}
                        onChangePhoneNumber={(phone) => {this.setState({phone})}}
                    />
                    <RoundedButton onPress={this.signUpUser} buttonContainer={styles.buttonContainer}
                                   text={i18n.t('signUp')}/>
                </KeyboardAwareScrollView>
                <ProgressDialog hide={!fetching}/>
            </GradientView>
        )
    }
}

const mapStateToProps = ({user: {fetching}}) => {
    return {fetching}
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (info) => dispatch(UserActions.signUp(info))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)


