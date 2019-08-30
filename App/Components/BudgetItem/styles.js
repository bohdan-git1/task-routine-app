import {StyleSheet, Platform} from 'react-native'
import {ApplicationStyles, Colors, Metrics, Fonts} from '../../Themes/index'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    gradientContainer: {
        flex: 1,
        padding: Metrics.baseMargin,
        margin: Metrics.smallMargin,
    },
    remaining: {
        color: Colors.snow,
        fontSize: Fonts.size.small
    },
    budgetRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.snow,
        justifyContent: 'space-between'
    },
    budget: {
        color: Colors.snow,
        fontSize: Fonts.size.h6
    },
    budgetType: {
        color: Colors.snow,
        fontSize: Fonts.size.small
    },
    expenseRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    expenseItem: {
        flex: 1,
        padding: Metrics.baseMargin,
        justifyContent: 'center'
    },
    budgetContainer: {
        width: 1,
        height: 20,
        backgroundColor: Colors.snow
    }
})
