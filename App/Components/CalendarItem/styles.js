import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, Metrics, Fonts} from '../../Themes/index'

const commonStyles = {
    borderBottomColor: Colors.frost,
    borderBottomWidth: StyleSheet.hairlineWidth
}
export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        marginLeft: Metrics.smallMargin,
        borderBottomColor: Colors.offWhiteI
    },
    yellowLine: {
        width: 8,
        backgroundColor: Colors.yellow
    },
    timeContainer: {
        width: 100,
        paddingVertical: Metrics.marginFifteen,
        paddingHorizontal: Metrics.smallMargin
    },
    titleContainer: {
        flex: 1,
        padding: Metrics.marginFifteen,
        backgroundColor: Colors.offWhite
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
        paddingLeft: Metrics.smallMargin
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
    markDoneBtnContainer: {
        alignSelf: 'flex-end',
        padding: Metrics.baseMargin
    },
    markDoneTxt: {
        fontSize: Fonts.size.small,
        color: Colors.purpleII,
        fontFamily: Fonts.type.bold
    },
    completeTxt: {
        fontSize: Fonts.size.small,
        color: Colors.greenXDark,
        fontFamily: Fonts.type.bold
    }

})
