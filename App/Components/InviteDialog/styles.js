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
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.snow,
        backgroundColor: Colors.snow,
        width: Metrics.screenWidth - 20
    },
    header: {
        alignItems: 'center',
        padding: Metrics.baseMargin,
        backgroundColor: Colors.purple,
        borderTopLeftRadius: Metrics.marginFifteen,
        borderTopRightRadius: Metrics.marginFifteen
    },
    heading: {
        color: Colors.snow,
        fontFamily: Fonts.type.semiBold
    },
    inputLabel: {
        color: Colors.black
    },
    bottomLine: {
        borderBottomWidth: 1.5,
        borderBottomColor: Colors.offWhiteI
    },
    contentContainer: {
        padding: Metrics.baseMargin
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    phoneContainer: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1.5,
        borderBottomColor: Colors.offWhiteI
    },
    phoneInputContainer: {
        flex: 1
    },
    contactIcon: {
        width: 30,
        fontSize: 25,
        color: Colors.gray,
        alignSelf: 'flex-end',
        paddingBottom: Metrics.smallMargin
    },
    dropdownContainer: {
        width: 100,
        height: 35,
        marginBottom: Metrics.smallMargin,
        marginLeft: Metrics.doubleBaseMargin
    },
    dropdownOffset: {
        top: 10
    },
    addButton: {
        alignSelf: 'center',
        backgroundColor: Colors.purple,
        marginTop: Metrics.marginFifteen,
        paddingVertical: Metrics.baseMargin,
        paddingHorizontal: Metrics.doubleSection
    },
    addText: {
        color: Colors.snow,
        fontSize: Fonts.size.input,
    },
    cancelText: {
        textAlign: 'center',
        color: Colors.purple,
        padding: Metrics.baseMargin
    }
})
