import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'
import Colors from "../../Themes/Colors";
import Fonts from "../../Themes/Fonts";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  scrollView: {
    paddingBottom: Metrics.baseMargin
  },
  title: {
    fontSize: Fonts.size.h4,
    color: Colors.themeColor,
    flex: 1,
    textAlign: 'center',
  }
})
