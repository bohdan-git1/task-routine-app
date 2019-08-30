import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Metrics } from "../../Themes";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    paddingHorizontal: Metrics.marginFifteen
  },
  buttonContainer: {
    marginTop: Metrics.baseMargin,
    backgroundColor: Colors.themeColor
  },
  buttonText: {
    textAlign: "center",
    color: Colors.snow,
    padding: Metrics.baseMargin
  }
});
