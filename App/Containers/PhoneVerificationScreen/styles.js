import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, Fonts, Metrics} from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
    },
    enterPhone: {
        color: Colors.snow,
        textAlign: 'center',
        fontSize: Fonts.size.input,
        paddingVertical: Metrics.baseMargin,
    },
    enter4DigitPhone: {
        color: Colors.grayI,
        textAlign: 'center',
        fontSize: Fonts.size.medium,
        paddingVertical: Metrics.baseMargin,
    },
    codeInputContainer: {
        marginTop: 30,
        alignSelf: 'center'
    },
    codeInput: {
        borderWidth: 1.5,
        borderRadius: 2.5,
        borderColor: Colors.snow,
        backgroundColor: Colors.snow,
    },
    codeInputFocused: {
        borderWidth: 1.5,
        borderRadius: 2.5,
        borderColor: Colors.themeColor,
        backgroundColor: Colors.snow,
    },
    codeInputText: {
        color: Colors.black,
        fontSize: Fonts.size.regular
    },
    codeInputTextFocused: {
        color: Colors.green,
        fontSize: Fonts.size.regular
    },
    buttonContainer: {
        marginTop: Metrics.section
    },
    notReceivedCode: {
        textAlign: 'center',
        color: Colors.gray,
        fontSize: Fonts.size.regular,
        paddingVertical: Metrics.baseMargin
    },
    reSend: {
        color: Colors.snow,
        fontSize: Fonts.size.regular
    }
})
