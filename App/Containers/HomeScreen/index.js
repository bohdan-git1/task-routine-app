import React, {Component} from 'react'
import {Image, Text, View} from 'react-native'
// Styles
import RoundedButton from '../../Components/RoundedButton'
import GradientView from "../../Components/GradientView";
import {Actions} from 'react-native-router-flux'
import i18n from 'i18n-js'
import styles from "./styles";
import {Images} from "../../Themes";

export default class HomeScreen extends Component {
    render () {
        return (
            <GradientView>
                <View style={styles.mainContainer}>
                    <Image source={Images.appFullLogo} style={styles.logo}/>
                </View>
                <RoundedButton onPress={Actions.signup} text={i18n.t('getStart')}/>
                <Text style={styles.alreadyAccount}>{i18n.t('alreadyHaveAccount')}<Text onPress={Actions.login} style={styles.signIn}>{i18n.t('signIn')}</Text></Text>
            </GradientView>
        )
    }
}
