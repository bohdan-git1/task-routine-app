import { StyleSheet } from 'react-native'
import { Colors, Fonts, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    flex: 1
  },
  title: {
    fontSize: Fonts.size.h4,
    color: Colors.themeColor,
    flex: 1,
    textAlign: 'center'
  }
})
