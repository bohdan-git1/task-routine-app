import PropTypes from "prop-types";
import React, { Component } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Dropdown } from "react-native-material-dropdown";

import styles from "./styles";

export default class FamilyMemberItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.function
  };
  static defaultProps = {
    item: {},
    onPress: () => {}
  };

  render() {
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.mainContainer}>
        <View style={styles.userNameContainer}>
          <Text style={styles.userName}>User Name</Text>
          <View style={styles.greenLine} />
        </View>
        <Dropdown
          containerStyle={{ width: 100, padding: 10 }}
          value={"Admin"}
          onChangeText={() => {}}
          dropdownOffset={{top: 5}}
          data={[{ value: "Admin" }, { value: "User" }]}
        />
      </TouchableOpacity>
    );
  }
}
