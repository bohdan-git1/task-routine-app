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
        justifyContent: 'center',
        backgroundColor: Colors.promptBackground
    },
    innerContainer: {
        width: 280,
        borderRadius: 15,
        backgroundColor: Colors.snow
    },
    pickerContainer: {
        width: 280,
        height: 220,
        alignSelf: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Metrics.baseMargin,
        justifyContent: 'space-between',
        backgroundColor: Colors.themeColor,
        borderTopLeftRadius: Metrics.marginFifteen,
        borderTopRightRadius: Metrics.marginFifteen
    },
    heading: {
        color: Colors.black,
        fontFamily: Fonts.type.semiBold
    },
    whiteText: {
        color: Colors.snow
    },
    pickerItemStyle: {
        color: Colors.black,
        fontSize: Fonts.size.h4
    }
})
