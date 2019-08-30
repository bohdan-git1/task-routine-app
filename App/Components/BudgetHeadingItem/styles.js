import {StyleSheet, Platform} from 'react-native'
import {ApplicationStyles, Colors, Metrics, Fonts} from '../../Themes/index'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
        padding: Metrics.baseMargin,
        marginVertical: Metrics.smallMargin,
        marginHorizontal: Metrics.smallMargin
    },
    type: {
        color: Colors.snow,
        borderBottomWidth: 1,
        fontSize: Fonts.size.regular,
        borderBottomColor: Colors.snow,
        paddingVertical: Metrics.smallMargin
    },
    budget: {
        color: Colors.snow,
        fontSize: Fonts.size.h3,
        fontFamily: Fonts.type.bold,
        paddingVertical: Metrics.baseMargin
    },
})
