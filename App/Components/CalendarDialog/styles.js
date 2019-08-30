import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, Fonts, Metrics} from '../../Themes/index'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        backgroundColor: Colors.promptBackground
    },
    innerContainer: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.snow,
        backgroundColor: Colors.snow,
        width: Metrics.screenWidth - 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Metrics.baseMargin,
        backgroundColor: Colors.primaryColorI,
        borderTopLeftRadius: Metrics.marginFifteen,
        borderTopRightRadius: Metrics.marginFifteen
    },
    heading: {
        flex: 1,
        color: Colors.snow,
        textAlign: 'center',
        fontFamily: Fonts.type.semiBold
    },
    contentContainer: {
        paddingVertical: Metrics.baseMargin
    },
    calendarType: {
        color: Colors.black,
    },
    checkCircle: {
        fontSize: 25,
        color: Colors.primaryColorI
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        padding: Metrics.baseMargin,
        justifyContent: 'space-between',
        borderBottomColor: Colors.frost
    },
    backIcon: {
        fontSize: 30,
        color: Colors.snow,
        paddingHorizontal: Metrics.baseMargin,
    }
})
