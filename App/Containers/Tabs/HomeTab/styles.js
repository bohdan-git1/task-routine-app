import { StyleSheet, Dimensions, Platform } from 'react-native'

import ApplicationStyles from "../../../Themes/ApplicationStyles";
import Metrics from "../../../Themes/Metrics";
import Colors from "../../../Themes/Colors";
import Fonts from "../../../Themes/Fonts";

const avatarSize = 50
const panelHeadingsCommon = {
    fontSize: Fonts.size.h5,
    fontFamily: Fonts.type.semiBold,
    paddingVertical: Metrics.smallMargin
}

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    contentContainer: {
        paddingBottom: Metrics.tabbarHeight
    },
    topHeaderImage: {
        width: Dimensions.get('window').width,
        height: 3 * Metrics.doubleSection,
        paddingHorizontal: Metrics.marginFifteen,
        paddingTop: Metrics.baseMargin
    },
    contentFlexEnd: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: Metrics.baseMargin
    },
    modalMainContainer: {
        margin: 0,
        padding: 0
    },
    userNameContainer: {
        height: Metrics.section,
        backgroundColor: Colors.semiTransBlack,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.semiTransBlack
    },
    familyTitleContainer: {
        flexDirection: 'row'
    },
    familyTxtContainer: {
      backgroundColor: Colors.halfSemiTransBlack
    },
    familyName: {
        color: Colors.snow,
        textAlignVertical: 'center',
        textAlign: 'center',
        margin: Metrics.smallMargin,
        fontFamily: Fonts.type.bold
    },
    familyTxt: {
        color: Colors.offWhite,
        fontFamily: Fonts.type.semiBold
    },
    familyMembersContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: Metrics.baseMargin
    },
    enterFamilyName: {
        color: Colors.snow,
        fontSize: Fonts.size.regular,
        marginBottom: Metrics.baseMargin
    },
    familyNameInput: {
        minWidth: 170,
        color: Colors.snow,
        fontSize: Fonts.size.regular,
        borderBottomWidth: 1,
        borderBottomColor: Colors.snow,
        marginRight: Metrics.smallMargin,
        paddingHorizontal: Metrics.smallMargin,
        paddingBottom: Metrics.smallMargin
    },
    familyNameInputContainer: {
        flexDirection: 'row',
        marginTop: Metrics.baseMargin,
        alignItems: 'center',
    },
    goBtnContainer: {
        width: 70,
        height: 30,
        borderRadius: 35/2,
        overflow: 'hidden',
        backgroundColor: Colors.snow,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Metrics.smallMargin
    },
    goTxt: {
        color: Colors.themeColor,
        textAlignVertical: 'center',
        fontSize: Fonts.size.medium
    },
    contactItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Metrics.smallMargin,
        paddingHorizontal: Metrics.baseMargin
    },
    thumbnail: {
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize/2,
        overflow: 'hidden',
        marginHorizontal: Metrics.baseMargin,
        backgroundColor: Colors.offWhiteI,
        alignItems: 'center',
        justifyContent: 'center'
    },
    initials: {
        fontSize: Fonts.size.h5,
        color: Colors.themeColor,
        ...Platform.select({
            ios: {
                paddingTop: Metrics.marginSeven
            }
        })
    },
    contactName: {
        fontSize: Fonts.size.regular,
        ...Platform.select({
          ios: {
              paddingTop: Metrics.smallMargin
          }
        })
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    textContainer: {
        backgroundColor: Colors.transparent,
        shadowOpacity: 0,
        elevation: 0,
        ...Platform.select({
            ios: {
                paddingTop: Metrics.smallMargin,
            }
        })
    },
    plusText: {
        ...Platform.select({
            ios: {
                paddingTop: Metrics.baseMargin
            }
        }),
    },
    buttonText: {
        color: Colors.snow
    },
    actionBtnBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    taskAndRoutePanels: {
        marginHorizontal: Metrics.doubleBaseMargin,
        marginTop: Metrics.doubleBaseMargin
    },
    taskHeaderContainer: {
        backgroundColor: Colors.primaryColorI,
        paddingVertical: Metrics.baseMargin,
        paddingHorizontal: Metrics.marginThirty
    },
    routeHeaderContainer: {
        flexDirection:'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.transparent,
        paddingVertical: Metrics.baseMargin,
        paddingHorizontal: Metrics.marginThirty
    },
    activeRouteBg: {
        minHeight: Metrics.hundredTwenty,

    },
    taskHeadingText: {
        color: Colors.snow,
        ...panelHeadingsCommon
    },
    routeHeadingText: {
        color: Colors.black,
        ...panelHeadingsCommon
    },
    activeRouteheading: {
        color: Colors.green,
        ...panelHeadingsCommon
    },
    currentTaskContent: {
        minHeight: Metrics.hundredTwenty,
        justifyContent: 'center',
        backgroundColor: Colors.snow,
        borderRightWidth: Metrics.marginSeven,
        borderRightColor: Colors.orange,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.orange
    },
    activeRouteContent: {
        flexDirection: 'row',
        backgroundColor: Colors.transparent,
        minHeight: Metrics.hundredTwenty
    },
    noTaskText: {
        color: Colors.orange,
        fontFamily: Fonts.type.semiBold,
        textAlign: 'center',
        fontSize: Fonts.size.input
    },
    bottomActionsRow: {
        flexDirection: 'row',
        minHeight: Metrics.hundred,
        alignItems: 'center',
        backgroundColor: Colors.snow
    },
    taskLeftActionBtn: {
        flex: 3.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Metrics.baseMargin,
        borderBottomWidth: Metrics.marginSeven,
        borderBottomColor: Colors.green,
        minHeight: Metrics.hundred,
        backgroundColor: Colors.snow
    },
    taskRightActionBtn: {
        flex: 3.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Metrics.baseMargin,
        borderBottomWidth: Metrics.marginSeven,
        borderBottomColor: Colors.orange,
        minHeight: Metrics.hundred,
    },
    taskMiddleBtn: {
        flex: 3,
        flexDirection:'row',
        alignItems: 'center',
        minHeight: Metrics.hundred,
        marginTop: Metrics.baseMargin
    },
    verticalActionSeperator: {
        height: Metrics.marginThirty,
        width: 1,
        backgroundColor: Colors.gray
    },
    tasksStatusText: {
        flex: 1,
        textAlign: 'center',
        paddingHorizontal: Metrics.baseMargin,
        fontSize: Fonts.size.input,
        fontFamily: Fonts.type.semiBold
    },
    taskBtnText: {
        textAlign: 'center',
        paddingHorizontal: Metrics.baseMargin,
        fontSize: Fonts.size.h5,
        fontFamily: Fonts.type.semiBold,
        color: Colors.black
    },
    routeLeftIconContainer: {
        flex: 0.2,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    routeLeftIcon: {
        height: Metrics.hundredTen,
        width: Metrics.doubleSection,
        resizeMode: 'contain'
    },
    activeRouteDetailsContainer: {
        flex: 0.8,
        paddingLeft: Metrics.baseMargin,
        justifyContent: 'center'
    },
    routerHorizontalSeperator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.gray,
        marginVertical: Metrics.baseMargin
    },
    activeRouteTaskName: {
        fontFamily: Fonts.type.semiBold,
        fontSize: Fonts.size.h5,

    },
    activeRouteLocationName: {
        fontSize: Fonts.size.h5
    },
    foldersComponentContainer: {
        marginHorizontal: Metrics.doubleBaseMargin,
        marginTop: Metrics.doubleBaseMargin
    }
})
