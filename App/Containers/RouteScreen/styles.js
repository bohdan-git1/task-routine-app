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
    }
})
