import { StyleSheet, Dimensions } from 'react-native'

import ApplicationStyles from "../../../Themes/ApplicationStyles";
import Metrics from "../../../Themes/Metrics";
import Colors from "../../../Themes/Colors";
import Fonts from "../../../Themes/Fonts";

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    topHeaderImage: {
        width: Dimensions.get('window').width,
        height: 3 * Metrics.doubleSection,
        paddingHorizontal: Metrics.marginFifteen,
        paddingTop: Metrics.baseMargin
    },
    contentFlexEnd: {
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
        alignItems: 'center'
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
    }
})
