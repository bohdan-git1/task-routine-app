import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, Metrics, Fonts} from '../../Themes/index'

const commonStyles = {
    borderBottomColor: Colors.frost,
    borderBottomWidth: StyleSheet.hairlineWidth
}
export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.frost,
        paddingVertical: Metrics.smallMargin,
        paddingHorizontal: Metrics.smallMargin
    },
    innerContainer: {
        height: 100,
        flexDirection: 'row',
        backgroundColor: Colors.snow,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: Metrics.smallMargin
    },
    yellowLine: {
        width: 8,
        backgroundColor: Colors.orange
    },
    timeContainer: {
        borderRightWidth: 1,
        borderRightColor: Colors.frost,
        paddingVertical: Metrics.marginFifteen,
        paddingHorizontal: Metrics.smallMargin,
    },
    titleContainer: {
        flex: 1,
        padding: Metrics.marginFifteen,
        width: Metrics.screenWidth - 100
    },
    title: {
        fontWeight: 'bold',
        color: Colors.grayIII,
        fontSize: Fonts.size.h6
    },
    time: {
        flex: 1,
        fontWeight: 'bold',
        color: Colors.grayIII,
        fontSize: Fonts.size.h6,
        paddingTop: Metrics.baseMargin
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.marginFifteen
    },
    locationIcon: {
        fontSize: 15,
        color: Colors.grayIII
    },
    location: {
        flex: 1,
        color: Colors.grayIII,
        fontSize: Fonts.size.medium,
        paddingLeft: Metrics.smallMargin
    },
    typeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    type: {
        color: Colors.grayIII,
        fontSize: Fonts.size.medium,
        marginLeft: Metrics.baseMargin
    },
    carIcon: {
        fontSize: 22,
        color: Colors.grayIII
    },
    dot: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColorI,
        marginRight: Metrics.baseMargin
    },
    itemId: {
        color: Colors.snow,
        textAlign: 'center',
    }
})
