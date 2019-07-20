import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, Metrics, Fonts} from '../../Themes/index'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    priorityContainer: {
        flexDirection: 'row'
    },
    priorityLabel: {
        color: Colors.gray,
        paddingLeft: Metrics.smallMargin,
        paddingVertical: Metrics.doubleBaseMargin
    },
    itemContainer: {
        width: 75,
        height: 40,
        elevation: Metrics.smallMargin,
        backgroundColor: Colors.snow,
        marginRight: Metrics.baseMargin
    },
    priority: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})
