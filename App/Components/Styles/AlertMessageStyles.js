import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  message: {
    textAlign: 'center',
    fontSize: Fonts.size.regular
  },
  icon: {
    color: Colors.steel
  }
})
