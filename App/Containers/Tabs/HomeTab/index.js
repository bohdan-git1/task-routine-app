import React, {Component} from 'react'
import {ImageBackground, Text, View, FlatList, TextInput, TouchableOpacity} from 'react-native'
import * as _ from 'lodash'

import styles from './styles'
import {ProgressDialog} from "../../../Components/ProgressDialog";
import images from "../../../Themes/Images";
import FamilyActions from "../../../Redux/FamilyRedux";
import {connect} from "react-redux";
import FamilyMember from "../../../Components/FamilyMember";
import { ADD_FAMILY_MEMBER_BUTTON_ID } from "../../../Lib/AppConstants";
import Colors from "../../../Themes/Colors";
import AddContacts from "../../../Components/AddContacts";

class HomeTab extends Component {

    static propTypes = {}

    constructor(props) {
        super(props)
        this.state = {
            showFamilyMembers: false
        }
    }

    componentWillMount() {
        const {fetchFamilyReq, user} = this.props
        fetchFamilyReq(user.familyId || -1)
    }

    renderFamilyMember = ({item, index}) => {
        return (
            <FamilyMember item={item} />
        )
    }

    render() {
        const { familyName } = this.state
        const { isSignup, family = {}, fetching } = this.props
        const { name, users = [] } = family
        console.tron.warn({ users })
        if (fetching) {
            return (
                <View style={styles.mainContainer}>
                    <ProgressDialog hasTabs/>
                </View>
            )
        }
        return (
            <View style={styles.mainContainer}>
                {
                    !_.isEmpty(family) ? <>
                        <ImageBackground style={styles.topHeaderImage}
                                         source={images.bg}>
                            <View style={styles.familyTitleContainer}>
                                <View style={styles.userNameContainer}>
                                    <Text style={styles.familyName}>{name}</Text>
                                </View>
                            </View>
                            <View style={styles.familyMembersContainer}>
                                <FlatList data={[{id: ADD_FAMILY_MEMBER_BUTTON_ID}, ...users]}
                                          renderItem={this.renderFamilyMember} horizontal
                                          extraData={this.props.family}/>
                            </View>
                        </ImageBackground>
                    </> : <>
                        <ImageBackground style={[styles.topHeaderImage, styles.contentFlexEnd]}
                                         source={images.addFamily}>
                            <Text style={styles.enterFamilyName}>Enter Your Family Name</Text>
                            <View style={styles.familyNameInputContainer}>
                                <TextInput value={familyName}
                                           style={styles.familyNameInput}
                                           placeholder={`Your's family`}
                                           placeholderTextColor={Colors.snow}
                                           onChangeText={familyName => this.setState({familyName})}/>
                                <TouchableOpacity style={styles.goBtnContainer}>
                                    <Text style={styles.goTxt}>GO</Text>
                                </TouchableOpacity>
                            </View>
                            <AddContacts />
                        </ImageBackground>
                    </>
                }
            </View>
        )
    }
}

const mapStateToProps = ({user: {user, isSignup}, family: {fetching, family}}) => {
    return {
        user, isSignup, fetching, family
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFamilyReq: (familyId) => dispatch(FamilyActions.fetchFamily(familyId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeTab)
