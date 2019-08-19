import React, {Component} from 'react'
import {isEmpty, trim} from 'lodash'
import {Text, View, Image, Keyboard} from 'react-native'

import RoundedButton from '../../Components/RoundedButton'
import GradientView from "../../Components/GradientView";
import i18n from 'i18n-js'
import styles from "./styles";
import {Images} from "../../Themes";
import Input from "../../Components/Input";
import I18n from "../../I18n";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Actions} from "react-native-router-flux";
import UserActions from "../../Redux/UserRedux";
import {connect} from "react-redux";
import {ProgressDialog} from "../../Components/ProgressDialog";
import {showMessage} from "../../Lib/Utilities";

class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: 'user__1',
            password: 'Qwert@1234'
        }
    }

    onLogin = () => {
        Keyboard.dismiss()
        const {username, password} = this.state
        const {loginReq} = this.props
        if (isEmpty(trim(username))) {
            showMessage('Please enter username')
        } else if (isEmpty(trim(password))) {
            showMessage('Please enter password')
        } else {
            loginReq({username, password})
        }
    }

    render() {
        const {fetching} = this.props
        const {username, password} = this.state
        return (
            <GradientView>
                <KeyboardAwareScrollView style={styles.mainContainer}
                                         showsVerticalScrollIndicator={false}>
                    <Image source={Images.logo} style={styles.logo}/>

                    <Input
                        value={username}
                        returnKeyType={'next'}
                        styleOverride={styles.input}
                        label={I18n.t('userName')}
                        placeholder={I18n.t('userName')}
                        onChangeText={(username) => this.setState({username})}
                        onSubmitEditing={() => this.passwordRef.focus()}
                    />
                    <Input
                        password
                        value={password}
                        returnKeyType={'done'}
                        styleOverride={styles.input}
                        onSubmitEditing={this.onLogin}
                        label={I18n.t('password')}
                        ref={ref => this.passwordRef = ref}
                        placeholder={I18n.t('password')}
                        onChangeText={(password) => this.setState({password})}
                    />
                    <Text style={styles.alreadyAccount}>{i18n.t('forgotPassword')}<Text
                        style={styles.signIn}>{i18n.t('reset')}</Text></Text>

                    <RoundedButton
                        text={i18n.t('logIn')}
                        buttonContainer={styles.buttonContainer}
                        onPress={this.onLogin}
                    />
                    <Text style={styles.alreadyAccount}>{i18n.t('newUser')}<Text onPress={Actions.signup}
                                                                                 style={styles.signIn}>{i18n.t('signUp')}</Text></Text>
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
        loginReq: (info) => dispatch(UserActions.login(info))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
