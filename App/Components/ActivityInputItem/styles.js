import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, Metrics, Fonts} from '../../Themes/index'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1,
        borderBottomWidth: 1.5,
        marginVertical: Metrics.baseMargin,
        borderBottomColor: Colors.offWhiteI,
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: Metrics.baseMargin,
    },
    label: {
        color: Colors.gray,
        fontSize: Fonts.size.regular,
        paddingBottom: Metrics.smallMargin
    },
    value: {
        flex: 1,
        color: Colors.black,
        fontSize: Fonts.size.regular,
        paddingLeft: Metrics.smallMargin
    },
    icon: {
        width: 25,
        fontSize: 22,
        color: Colors.gray
    },
    textInput: {
      flex: 1,
    },
    dropdownContainer: {
        flex: 1,
        height: 25
    },
    dropdownOffset: {
        top: 0
    }
})
