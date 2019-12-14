import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, Fonts, Metrics} from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
    },
    checkIn: {
        color: Colors.snow,
        padding: Metrics.baseMargin,
        fontSize: Fonts.size.regular,
        backgroundColor: Colors.primaryColorI,
    },
    currentLocation: {
        height: 50,
        width: 50,
        right: 20,
        bottom: 60,
        elevation: 5,
        borderRadius: 25,
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: Colors.snow,
    },
    currentLocationIcon: {
        fontSize: 25,
        alignSelf: 'center',
        color: Colors.black
    },
    mapContainer: {
        flex: 1
    },
    listContainer: {
        height: 200
    }
})
