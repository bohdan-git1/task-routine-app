import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, Fonts, Metrics} from '../../Themes/'
const border = {
    borderBottomWidth: 1,
    borderBottomColor: Colors.frost,
    paddingVertical: Metrics.baseMargin
}
export default StyleSheet.create({
    ...ApplicationStyles.screen,
    filterDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Metrics.baseMargin
    },
    filterDate: {
        flex: 1,
        textAlign: 'center',
        color: Colors.grayIII
    },
    arrowIcon: {
        fontSize: 25,
        color: Colors.grayIII,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.snow
    },
    listContainer: {
        height: 360
    },
    routeName: {
        textAlign: 'center',
        color: Colors.snow,
        padding: Metrics.baseMargin,
        fontSize: Fonts.size.input,
        backgroundColor: Colors.primaryColorI,
    },
    createRouteButton: {
        padding: Metrics.baseMargin,
        backgroundColor: Colors.primaryColorI
    },
    createRouteText: {
        color: Colors.snow,
        textAlign: 'center',
        padding: Metrics.baseMargin,
        fontSize: Fonts.size.input,
    },
    calendarIcon: {
        fontSize: 20,
        color: Colors.frost,
        marginLeft: Metrics.baseMargin
    },
    dateRow: {
        flexDirection: 'row'
    },
    dateInput: {
        padding: 5
    },
    dateContainer: {
        ...border,
        width: 140,
        flexDirection: 'row',
    },
    inputLabel: {
        padding: 0,
        color: Colors.black
    },
    inputContainer: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.frost
    },
    routeDataContainer: {
        padding: Metrics.marginFifteen
    },
    noOfEventsContainer: {
        ...border,
        width: Metrics.screenWidth - 180,
        flexDirection: 'row',
    },
   })
