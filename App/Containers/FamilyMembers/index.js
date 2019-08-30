import React, { Component } from "react";
import { SafeAreaView, FlatList, Text, TouchableOpacity } from "react-native";

import styles from "./styles";
import FamilyMemberItem from "../../Components/FamilyMemberItem";

export default class FamilyMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderFamilyItem = ({ item }) => {
    return <FamilyMemberItem />;
  };

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <FlatList
          data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
          renderItem={this.renderFamilyItem}
          keyExtractor={(item, index) => String(item.id || index)}
        />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>ADD FAMILY</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
