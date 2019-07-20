import {StyleSheet} from 'react-native'
import {Fonts, Colors, Metrics, ApplicationStyles} from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
        alignItems: 'center'
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
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginTop: Metrics.marginThirty
    }
})
