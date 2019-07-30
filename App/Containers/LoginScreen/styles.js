import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
    },
    input: {
      textAlign: 'center'
    },
    alreadyAccount: {
        textAlign: 'center',
        color: Colors.gray,
        fontSize: Fonts.size.regular,
        paddingVertical: Metrics.baseMargin
    },
    signIn: {
        color: Colors.snow,
        fontSize: Fonts.size.regular,
        paddingVertical: Metrics.baseMargin
    },
    buttonContainer: {
        marginTop: Metrics.marginThirty
    }
})
