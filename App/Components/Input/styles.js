import {StyleSheet} from 'react-native'
import {Colors, Fonts, Metrics} from '../../Themes/'
import * as _ from "lodash";

export default StyleSheet.create({
  containerStyle: {
    width: '100%',
    marginVertical: 5,
  },
  label: {
    color: Colors.snow,
    fontSize: Fonts.size.regular,
    padding: Metrics.smallMargin
  },
  inputStyle: {
    height: 50,
    color: Colors.black,
    fontSize: Fonts.size.input,
    backgroundColor: Colors.snow,
    paddingHorizontal: Metrics.baseMargin
  }
})
