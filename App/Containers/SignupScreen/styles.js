import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
    },
    alreadyAccount: {
        textAlign: 'center',
        color: Colors.gray,
        fontSize: Fonts.size.regular,
        paddingVertical: Metrics.baseMargin
    },
    signIn: {
        color: Colors.snow,
        fontSize: Fonts.size.regular
    },
    phoneInput: {
        height: 50,
        backgroundColor: Colors.snow,
        paddingHorizontal: Metrics.baseMargin
    },
    phoneText: {
        color: Colors.black,
        fontSize: Fonts.size.input,
    },
    enterPhone: {
        color: Colors.snow,
        textAlign: 'center',
        fontSize: Fonts.size.input,
        paddingVertical: Metrics.baseMargin,
        marginTop: Metrics.doubleBaseMargin,
    },
    buttonContainer: {
        marginTop: Metrics.section
    }
})
