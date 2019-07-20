import {StyleSheet} from 'react-native'
import {ApplicationStyles, Metrics} from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    mainContainer: {
        flex: 1
    },
    gradientContainer: {
        flex: 1,
        padding: Metrics.section
    }
})
