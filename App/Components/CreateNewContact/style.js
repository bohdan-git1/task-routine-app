import { Platform, StyleSheet } from 'react-native'
import Metrics from "../../Themes/Metrics";
import Colors from "../../Themes/Colors";
import Fonts from "../../Themes/Fonts";


export default StyleSheet.create({
    container: {
        marginHorizontal: Metrics.baseMargin,
        borderRadius: Metrics.baseMargin,
        marginTop: Metrics.baseMargin,
        backgroundColor: Colors.snow,
        padding: 1
    },
    contentContainer: {
        borderRadius: Metrics.baseMargin,
        overflow: 'hidden',
        minHeight: Metrics.doubleSection,
        paddingBottom: Metrics.baseMargin
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Metrics.baseMargin,
        backgroundColor: Colors.themeColor,
        borderTopLeftRadius: Metrics.baseMargin,
        borderTopRightRadius: Metrics.baseMargin,
        overflow: 'hidden'
    },
    headerText: {
        color: Colors.snow,
        textAlignVertical: 'center',
        textAlign: 'center',
        ...Platform.select({
            ios: {
                paddingTop: Metrics.smallMargin
            }
        }),
    },
    headings: {
        marginTop: Metrics.baseMargin,
        paddingHorizontal: Metrics.marginFifteen
    },
    inputs: {
        marginTop: Metrics.baseMargin,
        marginLeft: Metrics.marginFifteen,
        paddingRight: Metrics.marginFifteen,
        paddingBottom: Metrics.baseMargin,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.gray
    },
    rightMarginFifteen: {
        marginRight: Metrics.marginFifteen
    },
    contactDetailsContainer: {
        flexDirection: 'row',
        marginTop: Metrics.baseMargin,
        paddingRight: Metrics.marginFifteen,
        alignItems: 'flex-end'
    },
    telephoneNumContainer: {
        flex: 1
    },
    grayBottomBorder: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.gray,
    },
    contactIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.gray,
        padding: Metrics.baseMargin,
        marginRight: Metrics.baseMargin
    },
    userTypeContainer: {
        height: Metrics.fourty,
        width: 100,
        paddingVertical: Metrics.smallMargin,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.gray,
        borderRadius: Metrics.smallMargin,
        overflow: 'hidden',
        alignItems: 'stretch',
        justifyContent: 'center'
    },
    menuTriggerContainer: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    menuTriggerText: {
        paddingTop: Metrics.smallMargin,
        marginRight: Metrics.smallMargin
    },
    addBtn: {
        backgroundColor: Colors.themeColor,
        alignSelf: 'center',
        width: 130,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Metrics.smallMargin
    },
    cancelBtn: {
        backgroundColor: Colors.transparent,
        alignSelf: 'center',
        width: 130,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Metrics.smallMargin
    },
    cancelBtnTxt: {
        color: Colors.gray,
        fontWeight: 'normal',
        fontSize: Fonts.size.medium
    }
})
