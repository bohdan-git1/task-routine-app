import React, { Component } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'
import {ADD_FAMILY_MEMBER_BUTTON_ID} from "../../Lib/AppConstants";
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from "../../Themes/Colors";

export default class FamilyMember extends Component {
    static propTypes = {
        item: PropTypes.object,

    }

    static defaultProps = {
        item: {}
    }

    render () {
        const { item } = this.props
        const { id, picUrl } = item
        return (
            <TouchableOpacity key={String(id)}
                              style={styles.container}>
                {
                    id === ADD_FAMILY_MEMBER_BUTTON_ID ? <AntDesign name={'pluscircleo'}
                                                                    size={65}
                                                                    color={Colors.snow}
                                                                    style={styles.addIcon}/>
                        : <Image source={{uri: picUrl}} style={styles.userImg}/>
                }
            </TouchableOpacity>
        )
    }
}
