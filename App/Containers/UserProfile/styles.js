import {StyleSheet} from 'react-native'
import {ApplicationStyles, Colors, Fonts, Metrics} from '../../Themes'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    userImage: {
        height: 150,
        width: 150,
        alignSelf: 'center',
        borderRadius: 75,
        borderColor: Colors.snow,
        marginBottom: Metrics.baseMargin,
        borderWidth: StyleSheet.hairlineWidth
    },
    inputLabel: {
        padding: 0,
        color: Colors.snow
    },
    inputContainer: {
        borderBottomWidth: 1,
        marginVertical: Metrics.baseMargin,
        borderBottomColor: Colors.primaryColor,
    },
    inputContainerMain: {
        color: Colors.snow,
        backgroundColor: Colors.transparent
    },
    buttonText: {
        color: Colors.snow
    }
})
