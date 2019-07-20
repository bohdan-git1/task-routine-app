import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles, Colors, Fonts } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  scrollView: {
    paddingBottom: Metrics.baseMargin
  },
  title: {
    fontSize: Fonts.size.h4,
    color: Colors.themeColor,
    flex: 1,
    textAlign: 'center'
  }
})
