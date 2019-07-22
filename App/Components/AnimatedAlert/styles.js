import { StyleSheet } from 'react-native'
import {Metrics, Fonts, Colors} from '../../Themes/index'

export default StyleSheet.create({
  scrollContainer: {
    justifyContent: 'center',
    marginVertical: Metrics.section
  },
  contentContainer: {
    alignSelf: 'center',
    alignItems: 'center'
  },
  message: {
    textAlign: 'center',
    color: Colors.silver,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.regular,
    marginTop: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin
  }
})
