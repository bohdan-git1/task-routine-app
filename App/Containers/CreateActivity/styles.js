import {StyleSheet} from 'react-native'
import {Fonts, Colors, Metrics, ApplicationStyles} from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        padding: Metrics.baseMargin,
        backgroundColor: Colors.snow
    },
    scrollContent: {
        paddingVertical: Metrics.baseMargin
    },
    gradientStyles: {
        padding: 0
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    folderContainer: {
        width: 90,
        height: 35,
        borderRadius: 20,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Metrics.baseMargin,
        borderColor: Colors.themeColor,
        marginBottom: Metrics.baseMargin
    },
    folderText: {
        color: Colors.black,
        fontSize: Fonts.size.input,
        fontFamily: Fonts.type.semiBold
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dummyItem: {
        width: 70
    },
    budgetContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dummyCategory: {
        width: 30
    },
    bottomLine: {
        borderBottomWidth: 1.5,
        borderBottomColor: Colors.offWhiteI
    },
    inviteLabel: {
        color: Colors.gray,
        paddingLeft: Metrics.smallMargin,
    },
    addIcon: {
        fontSize: 50,
        color: Colors.offWhiteI,
        padding: Metrics.baseMargin
    },
    addButtonContainer: {
        margin: Metrics.baseMargin
    },
    synchronizeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Metrics.marginFifteen
    },
    synchronizeText: {
        color: Colors.black,
        fontSize: Fonts.size.regular,
        marginLeft: Metrics.baseMargin
    }
})
