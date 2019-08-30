import React, { Component } from "react";
import { Image } from "react-native";
import GradientView from "../../Components/GradientView";
import { Images } from "../../Themes";
import styles from "./styles";
import Input from "../../Components/Input";
import RoundedButton from "../../Components/RoundedButton";
import strings from "../../Constants/strings";
import {connect} from "react-redux";


class UserProfile extends Component {
  constructor(props) {
    super(props);
    const {user: {name = '', username = ''} = {}} = props
    this.state = {
      name,
      username,
      familyName: ''
    }
  }

  render() {
    const { name, username, familyName } = this.state;
    const {user: {picUrl = ''} = {}} = this.props
    return (
      <GradientView>
        <Image
          source={{uri: picUrl}}
          defaultSource={Images.avatar}
          style={styles.userImage}
        />
        <Input
          value={name}
          label={strings.firstName}
          labelStyle={styles.inputLabel}
          styleOverride={styles.inputContainerMain}
          containerStyle={styles.inputContainer}
          onSubmitEditing={() => Keyboard.dismiss()}
          onChangeText={name => {
            this.setState({ name });
          }}
        />
        <Input
          value={username}
          label={strings.userName}
          labelStyle={styles.inputLabel}
          styleOverride={styles.inputContainerMain}
          containerStyle={styles.inputContainer}
          onSubmitEditing={() => Keyboard.dismiss()}
          onChangeText={username => {
            this.setState({ username });
          }}
        />
        <Input
          value={familyName}
          label={strings.familyName}
          labelStyle={styles.inputLabel}
          styleOverride={styles.inputContainerMain}
          containerStyle={styles.inputContainer}
          onSubmitEditing={() => Keyboard.dismiss()}
          onChangeText={familyName => {
            this.setState({ familyName });
          }}
        />
        <RoundedButton text={strings.edit}/>
      </GradientView>
    );
  }
}

const mapStateToProps = ({user: { user } = {}}) => {
  console.tron.warn(user)
  return {
      user
  }
}

export default connect(mapStateToProps, null)(UserProfile)
