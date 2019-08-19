import { Platform } from 'react-native'
import {Colors, Fonts} from '../../Themes'
import Metrics from "../../Themes/Metrics";

export default {
  customTextInputProps: {
    underlineColorAndroid: 'rgba(0,0,0,0)',
    style: {
      backgroundColor: Colors.transparent,
      fontSize: Fonts.size.regular,
      fontFamily: Fonts.type.regular,
    }
  },
  customTextProps: {
    style: {
      fontSize: Fonts.size.regular,
      fontFamily: Fonts.type.regular,
      color: Colors.black,
        ...Platform.select({
            paddingTop: Metrics.smallMargin
        })
    }
  }
}
