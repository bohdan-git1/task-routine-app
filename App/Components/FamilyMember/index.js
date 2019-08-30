import React, {Component} from 'react'
import {TouchableOpacity, Image, View, Text} from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'
import {ADD_FAMILY_MEMBER_BUTTON_ID} from "../../Lib/AppConstants";
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from "../../Themes/Colors";
import ApplicationStyles from "../../Themes/ApplicationStyles";

export default class FamilyMember extends Component {
    static propTypes = {
        item: PropTypes.object,
        onAddFamilyMember: PropTypes.func.isRequired
    }

    static defaultProps = {
        item: {}
    }

    onItemPress(itemId) {
        if (itemId !== ADD_FAMILY_MEMBER_BUTTON_ID) {
            return
        }
        const {onAddFamilyMember} = this.props
        onAddFamilyMember()
    }


    render() {
        const {item} = this.props
        const {id, picUrl, name = ''} = item
        let itemToRender = <Image source={{uri: picUrl}} style={styles.userImg}/>
        if (id === ADD_FAMILY_MEMBER_BUTTON_ID) {
            itemToRender = (
                <AntDesign name={'pluscircleo'}
                           size={40}
                           color={Colors.snow}
                           style={styles.addIcon}/>
            )
        } else if (!picUrl) {
            itemToRender = (
                <View style={ApplicationStyles.imageInitialsContainer}>
                    <Text style={ApplicationStyles.imageInitials}>{name.substring(0, 2).toUpperCase()}</Text>
                </View>
            )

        }

        return (
            <TouchableOpacity key={String(id)}
                              onPress={this.onItemPress.bind(this, id)}
                              disabled={id !== ADD_FAMILY_MEMBER_BUTTON_ID}
                              style={styles.container}>
                {itemToRender}
            </TouchableOpacity>
        )
    }
}
