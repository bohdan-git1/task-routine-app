import { StyleSheet } from 'react-native'
import Colors from "../../Themes/Colors";
import Metrics from "../../Themes/Metrics";

const familyDimens = 75
export default StyleSheet.create({
    container: {
        width: familyDimens,
        height: familyDimens,
        borderRadius: familyDimens/2,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: Metrics.baseMargin
    },
    addItemContainer: {
        borderWidth: 2,
        borderColor: Colors.snow,
    },
    addIcon: {
        marginTop: Metrics.smallMargin
    },
    userImg: {
        width: familyDimens,
        height: familyDimens,

    }
})
