import {Dimensions, StyleSheet} from 'react-native'
import {Fonts, Colors, Metrics, ApplicationStyles} from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.snow
    },
    mapContainer: {
        flex: 1
    },
    navigationContainer: {
        width: 40,
        right: 25,
        height: 40,
        borderRadius: 20,
        bottom: Metrics.screenHeight / 2
    },
    locationContainer: {
        bottom: Metrics.screenHeight / 2 - 60
    },
    routeContainer: {
        flex: 1
    },
    modalMainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.windowTint
    },
    navModalContainer: {
        borderRadius: 10,
        backgroundColor: Colors.snow,
        width: Metrics.screenWidth-30,
        paddingBottom: Metrics.doubleBaseMargin,
    },
    header: {
        alignItems: 'center',
        padding: Metrics.marginFifteen,
        borderTopRightRadius: Metrics.baseMargin,
        borderTopLeftRadius: Metrics.baseMargin,
        backgroundColor: Colors.primaryColorI,
    },
    heading: {
        color: Colors.snow,
        textAlign: 'center',
        fontSize: Fonts.size.input,
        fontFamily: Fonts.type.bold
    },
    cancelNavigation: {
        color: Colors.black,
        textAlign: 'center',
        fontSize: Fonts.size.input,
        paddingVertical: Metrics.doubleBaseMargin,
    },
    modalButton: {
        marginTop: Metrics.baseMargin,
        marginHorizontal: Metrics.baseMargin,
        backgroundColor: Colors.primaryColorI
    },
})
