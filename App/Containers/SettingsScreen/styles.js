import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, Metrics} from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.snow
    },
    premiumVersion: {
        textAlign: 'center',
        color: Colors.purple,
        padding: Metrics.baseMargin,
        textDecorationLine: 'underline',
    },
    selectCalendar: {
        color: Colors.black,
        padding: Metrics.baseMargin,
    },
    termsText: {
        textAlign: 'center',
        padding: Metrics.smallMargin,
        color: Colors.semiTransBlack,
    },
    horizontalLine: {
        height: 1,
        width: 100,
        alignSelf: 'center',
        backgroundColor: Colors.semiTransBlack
    }
})
