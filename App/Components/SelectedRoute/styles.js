import {StyleSheet, Platform} from 'react-native'
import {ApplicationStyles, Colors, Metrics, Fonts} from '../../Themes/index'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    gradientContainer: {
        height: 130,
        flexDirection: 'row',
    },
    greenLocation: {
        width: 35,
        height: 130,
        marginLeft: Metrics.smallMargin
    },
    contentContainer: {
        flex: 1,
        marginLeft: Metrics.baseMargin
    },
    accomplishedContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: Metrics.baseMargin
    },
    accomplished: {
        color: Colors.black,
        backgroundColor: Colors.snow,
        paddingHorizontal: Metrics.fourty,
        paddingVertical: Metrics.smallMargin,
        borderRadius: Metrics.doubleBaseMargin
    },
    closeIcon: {
        fontSize: 25,
        color: Colors.snow,
        marginLeft: Metrics.baseMargin
    },
    taskText: {
        color: Colors.snow,
    },
    borderLine: {
        height: 1,
        backgroundColor: Colors.snow,
        width: Metrics.screenWidth - 35,
        marginVertical: Metrics.smallMargin
    }
})
