import { StyleSheet } from 'react-native'
import Metrics from "../../Themes/Metrics";
import Colors from "../../Themes/Colors";
import Fonts from "../../Themes/Fonts";

export default StyleSheet.create({
    iconContainer: {
        height: 50,
        width: 50,
        right: 20,
        bottom: 170,
        elevation: 5,
        borderRadius: 25,
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: Colors.snow,
    },
    icon: {
        fontSize: 25,
        alignSelf: 'center',
        color: Colors.black
    },
})
