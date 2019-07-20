import {StyleSheet} from 'react-native'
import {Fonts, Colors, Metrics, ApplicationStyles} from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: Colors.snow
    },
    headerContainer: {
        height: 100,
        width: '100%',
        justifyContent: 'center'
    },
    innerContainer: {
      padding: Metrics.baseMargin
    },
    title: {
        color: Colors.snow,
        textAlign: 'center',
        fontSize: Fonts.size.h5,
        fontFamily: Fonts.type.bold,
        paddingBottom: Metrics.smallMargin
    },
    locationText: {
        color: Colors.snow,
        textAlign: 'center',
        fontSize: Fonts.size.regular
    },
    timeContainer: {
        height: 60,
        borderWidth: 1.5,
        borderRadius: 30,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderColor: Colors.black,
        justifyContent: 'space-between'
    },
    timeText: {
        fontSize: Fonts.size.input,
        fontFamily: Fonts.type.bold
    },
    dateText: {
        fontSize: Fonts.size.h5,
        fontFamily: Fonts.type.semiBold
    },
    dateContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    monthContainer: {
        paddingLeft: 5
    },
    monthText: {
        fontSize: Fonts.size.regular,
        fontFamily: Fonts.type.semiBold
    },
    addIcon: {
        fontSize: 50,
        color: Colors.offWhiteI,
        padding: Metrics.baseMargin
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: Metrics.baseMargin,
        paddingHorizontal: Metrics.marginFifteen
    },
    label: {
        color: Colors.gray
    },
    value: {
        fontFamily: Fonts.type.semiBold
    },
    activityActionsContainer: {
        height: 100,
        flexDirection: 'row',
        backgroundColor: Colors.offWhite,
        paddingBottom: Metrics.baseMargin
    },
    actionItem: {
       flex: 1,
    },
    colorLine: {
        height: 8,
        backgroundColor: Colors.orange
    },
    verticalLine: {
        width: 2,
        height: 30,
        backgroundColor: Colors.offWhiteI
    },
    actionTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    actionTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: Fonts.size.h5,
        fontFamily: Fonts.type.bold
    }
})
