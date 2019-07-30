import {StyleSheet} from 'react-native'
import {Fonts, Colors, Metrics, ApplicationStyles} from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
    },
    buttonContainer: {
        marginTop: Metrics.section
    },
    profileImageContainer: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        marginVertical: Metrics.baseMargin
    },
    profileImage: {
        height: 150,
        width: 150,
        borderRadius: 75,
        borderWidth: 1.5,
        borderColor: Colors.snow,
        backgroundColor: Colors.silver
    },
    termsConditionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Metrics.marginFifteen
    },
    acceptTermsConditions: {
        color: Colors.snow,
        fontSize: Fonts.size.regular,
        marginLeft: Metrics.baseMargin
    },
    passwordInfo: {
        color:  Colors.gray,
        fontSize: Fonts.size.small
    }
})
