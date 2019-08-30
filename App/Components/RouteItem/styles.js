import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, Metrics, Fonts} from '../../Themes/index'

const commonStyles = {
    borderBottomColor: Colors.frost,
    borderBottomWidth: StyleSheet.hairlineWidth
}
export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        height: 120,
        flexDirection: 'row',
        backgroundColor: Colors.snow
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: Metrics.smallMargin
    },
    yellowLine: {
        width: 8,
        backgroundColor: Colors.yellow
    },
    timeContainer: {
        ...commonStyles,
        width: 100,
        borderRightWidth: 1,
        borderRightColor: Colors.frost,
        paddingVertical: Metrics.marginFifteen,
        paddingHorizontal: Metrics.smallMargin,
    },
    titleContainer: {
        ...commonStyles,
        height: 120,
        padding: Metrics.marginFifteen,
        width: Metrics.screenWidth - 100,
    },
    title: {
        fontWeight: 'bold',
        color: Colors.black,
        fontSize: Fonts.size.h6
    },
    time: {
        flex: 1,
        fontWeight: 'bold',
        color: Colors.black,
        fontSize: Fonts.size.h6,
        paddingTop: Metrics.baseMargin
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.marginFifteen
    },
    locationIcon: {
        fontSize: 22,
        color: Colors.black
    },
    location: {
        color: Colors.offWhiteI,
        fontSize: Fonts.size.medium,
        paddingHorizontal: Metrics.smallMargin
    },
    typeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    type: {
        color: Colors.grayI,
        fontSize: Fonts.size.medium,
        marginLeft: Metrics.baseMargin
    },
    carIcon: {
        fontSize: 22,
        color: Colors.black
    },
    dot: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignSelf: 'flex-end',
        marginRight: Metrics.baseMargin,
        backgroundColor: Colors.primaryColorI
    },
    checkIcon: {
        fontSize: 20,
        color: Colors.black,
        alignSelf: 'flex-end',
        marginRight: Metrics.baseMargin
    }
})
