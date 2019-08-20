import {StyleSheet, Platform} from 'react-native'
import {ApplicationStyles, Colors, Metrics, Fonts} from '../../Themes/index'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    gradientContainer: {
        flex: 1,
        padding: Metrics.baseMargin,
        marginVertical: Metrics.smallMargin,
        marginHorizontal: Metrics.baseMargin
    },
    remaining: {
        color: Colors.snow
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
        fontSize: Fonts.size.h5
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
