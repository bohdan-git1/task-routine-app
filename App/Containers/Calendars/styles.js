import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
    },
    topDateContainer: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.themeColor,
        paddingHorizontal: Metrics.baseMargin
    },
    dateText: {
        color: Colors.snow,
        fontSize: Fonts.size.regular
    },
    addButton: {
        width: 60,
        right: 20,
        bottom: 20,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: Colors.orange,
    },
    plusIcon: {
        fontSize: 45,
        color: Colors.snow,
    },
})
