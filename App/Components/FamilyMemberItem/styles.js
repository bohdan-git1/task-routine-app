import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, Metrics, Fonts} from '../../Themes/index'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: Colors.snow
    },
    userNameContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: Colors.grayII
    },
    userName: {
        flex: 1,
        color: Colors.grayII
    },
    greenLine: {
        width: 70,
        height: 30,
        marginBottom: 2.5,
        backgroundColor: Colors.greenXDark,
    },

})
