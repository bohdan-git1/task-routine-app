import {StyleSheet, Platform} from 'react-native'
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
        shadowColor: '#ccc',
        shadowOffset: {width: 3, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: Metrics.smallMargin,
        backgroundColor: Colors.snow,
        marginRight: Metrics.baseMargin,
    },
    priority: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingTop: Platform.OS === 'ios' ? Metrics.baseMargin : 0
    }
})
