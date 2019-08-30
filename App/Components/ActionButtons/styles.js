import {Platform, StyleSheet} from 'react-native'
import Metrics from "../../Themes/Metrics";
import Colors from "../../Themes/Colors";
import Fonts from "../../Themes/Fonts";

export default StyleSheet.create({
    actionBtnBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    plusText: {
        ...Platform.select({
            ios: {
                paddingTop: Metrics.baseMargin
            }
        }),
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    textContainer: {
        backgroundColor: Colors.transparent,
        shadowOpacity: 0,
        elevation: 0,
        ...Platform.select({
            ios: {
                paddingTop: Metrics.smallMargin,
            }
        })
    },
    buttonText: {
        color: Colors.snow
    },
})
