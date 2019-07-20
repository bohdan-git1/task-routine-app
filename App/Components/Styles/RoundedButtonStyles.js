import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  button: {
    height: 50,
    borderWidth: 2,
    justifyContent: 'center',
    borderColor: Colors.snow,
    borderRadius: Metrics.baseMargin,
    backgroundColor: Colors.transparent,
    marginTop: Metrics.doubleBaseMargin
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Fonts.size.regular,
  }
})
