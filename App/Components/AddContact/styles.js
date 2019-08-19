import { StyleSheet } from 'react-native'
import Metrics from "../../Themes/Metrics";
import Colors from "../../Themes/Colors";
import Fonts from "../../Themes/Fonts";

export default StyleSheet.create({
    contactItemContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: Metrics.baseMargin,
        paddingHorizontal: Metrics.baseMargin,
        backgroundColor: Colors.snow
    },
    userName: {
        paddingTop: Metrics.smallMargin,
        marginVertical: Metrics.smallMargin,
        fontSize: Fonts.size.regular
    },
    actionIconsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    role: {
        fontSize: Fonts.size.medium
    },
    editBtnContainer: {
        paddingLeft: Metrics.baseMargin
    }
})
