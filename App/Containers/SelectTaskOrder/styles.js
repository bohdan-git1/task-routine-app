import {StyleSheet} from 'react-native'
import {Fonts, Colors, Metrics, ApplicationStyles} from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
    },
    createRouteButtonContainer: {
        padding: Metrics.baseMargin,
        backgroundColor: Colors.primaryColorI
    }
})
