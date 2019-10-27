import { StyleSheet } from "react-native";
import { ApplicationStyles, Colors, Metrics } from "../../Themes";

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.snow,
    padding: Metrics.marginFifteen,
  },
  buttonContainer: {
    marginTop: Metrics.baseMargin,
    borderRadius: Metrics.smallMargin,
    backgroundColor: Colors.themeColor
  },
  buttonText: {
    textAlign: "center",
    color: Colors.snow,
    padding: Metrics.baseMargin
  }
});
