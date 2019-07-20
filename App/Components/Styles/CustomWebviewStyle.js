import {StyleSheet} from 'react-native'
import {Metrics} from '../../Themes/'
import Colors from '../../Themes/Colors'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.transparent,
    paddingLeft: 5,
    paddingTop: 5
  },
  webView: {
    flex: 1
  },
  backButton: {
    position: 'absolute',
    top: Metrics.doubleBaseMargin,
    left: Metrics.baseMargin,
    padding: Metrics.smallMargin
  }
})
