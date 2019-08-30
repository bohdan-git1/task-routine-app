import { StyleSheet } from 'react-native'
import Metrics from "../../../Themes/Metrics";
import Colors from "../../../Themes/Colors";
import Fonts from "../../../Themes/Fonts";

export const drawerWidth = 0.8 * Metrics.screenWidth
export default StyleSheet.create({
    headerContainer: {
        width: drawerWidth,
        height: 220,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: Metrics.marginThirty,
        paddingBottom: Metrics.doubleBaseMargin
    },
    userImg: {
        width: 100,
        height: 100,
        borderRadius: 100/2,
        overflow: 'hidden',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.snow
    },
    userName: {
        fontSize: Fonts.size.input,
        color: Colors.snow,
        marginTop: Metrics.baseMargin
    }
})
