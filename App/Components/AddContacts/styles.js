import {StyleSheet} from 'react-native'

import Colors from '../../Themes/Colors';
import Metrics from "../../Themes/Metrics";
export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.offWhite
    },
    selectedContactsContainer: {
        marginTop: Metrics.doubleBaseMargin,
        marginHorizontal: Metrics.baseMargin
    }
})
