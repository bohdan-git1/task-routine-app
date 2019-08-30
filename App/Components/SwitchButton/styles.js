import {StyleSheet} from 'react-native'
import {Colors, Metrics, Fonts} from '../../Themes/index'

export default StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Metrics.baseMargin,
    },
    headingContainer: {
        backgroundColor: Colors.primaryColorI
    },
    label: {
        flex: 1,
        color: Colors.black,
        fontSize: Fonts.size.regular
    },
    headingLabel: {
        color: Colors.snow
    },
    arrowIcon: {
        fontSize: 20,
        color: Colors.snow,
        paddingHorizontal: Metrics.baseMargin
    },
    borderBottom: {
        borderWidth: 1,
        borderColor: Colors.frost
    }
})
