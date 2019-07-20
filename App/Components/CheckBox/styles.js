import {StyleSheet} from 'react-native'
import Colors from '../../Themes/Colors'
import Metrics from '../../Themes/Metrics'
export default StyleSheet.create({
  checkBoxContainer: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderRadius: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.snow,
    marginRight: Metrics.smallMargin,
    backgroundColor: Colors.transparent
  }
})
