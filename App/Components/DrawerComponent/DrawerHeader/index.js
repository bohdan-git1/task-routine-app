import React, {Component} from 'react'
import {ImageBackground, Image, View, Text} from 'react-native'
import PropTypes from 'prop-types'

import images from "../../../Themes/Images";
import styles from './styles'

export default class DrawerHeader extends Component {

    static propTypes = {
        user: PropTypes.object
    }

    render() {
        const {user: {name, picUrl} = {}} = this.props
        return (
            <ImageBackground source={images.mountainsPurpleBg}
                             style={styles.headerContainer}>
                <Image source={{uri: picUrl}} style={styles.userImg} defaultSource={images.avatar}/>
                <Text style={styles.userName}>{name}</Text>
            </ImageBackground>
        )
    }
}
