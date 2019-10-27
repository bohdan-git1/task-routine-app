import React, {Component} from "react";
import {Image, Keyboard} from "react-native";
import GradientView from "../../Components/GradientView";
import {Images} from "../../Themes";
import styles from "./styles";
import Input from "../../Components/Input";
import RoundedButton from "../../Components/RoundedButton";
import strings from "../../Constants/strings";
import {connect} from "react-redux";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import UserActions from "../../Redux/UserRedux";


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

    onEditProfile = () => {
        Keyboard.dismiss()
        const {name, username, familyName} = this.state
        const {editProfile, user: {id = ''} = {}} = this.props
        editProfile(id, {name})
    }

    render() {
        const {name, username, familyName} = this.state;
        const {user: {picUrl = ''} = {}} = this.props
        return (
            <GradientView>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <Image
                        source={{uri: picUrl}}
                        defaultSource={Images.avatar}
                        style={styles.userImage}
                    />
                    <Input
                        value={name}
                        returnKeyType={'next'}
                        label={strings.firstName}
                        labelStyle={styles.inputLabel}
                        styleOverride={styles.inputContainerMain}
                        containerStyle={styles.inputContainer}
                        onSubmitEditing={() => this.userName.focus()}
                        onChangeText={name => {
                            this.setState({name});
                        }}
                    />
                    <Input
                        value={username}
                        returnKeyType={'next'}
                        label={strings.userName}
                        labelStyle={styles.inputLabel}
                        styleOverride={styles.inputContainerMain}
                        containerStyle={styles.inputContainer}
                        ref={ref => this.userName = ref}
                        onSubmitEditing={() => this.familyName.focus()}
                        onChangeText={username => {
                            this.setState({username});
                        }}
                    />
                    <Input
                        value={familyName}
                        returnKeyType={'done'}
                        label={strings.familyName}
                        labelStyle={styles.inputLabel}
                        styleOverride={styles.inputContainerMain}
                        containerStyle={styles.inputContainer}
                        ref={ref => this.familyName = ref}
                        onSubmitEditing={this.onEditProfile}
                        onChangeText={familyName => {
                            this.setState({familyName});
                        }}
                    />
                    <RoundedButton onPress={this.onEditProfile} text={strings.editProfile}/>
                </KeyboardAwareScrollView>
            </GradientView>
        );
    }
}

const mapStateToProps = ({user: {user} = {}}) => {
    return {
        user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editProfile: (userId, info) => dispatch(UserActions.editProfile(userId, info))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
