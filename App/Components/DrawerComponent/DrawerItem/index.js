import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import {drawerWidth} from "../DrawerHeader/styles";
import Colors from "../../../Themes/Colors";
import Metrics from "../../../Themes/Metrics";
import Fonts from "../../../Themes/Fonts";
import AntDesign from "react-native-vector-icons/AntDesign";

export default class DrawerItem extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        IconClass: PropTypes.func,
        iconName: PropTypes.string,
        iconColor: PropTypes.string,
        iconSize: PropTypes.number,
        onPress: PropTypes.func
    }

    static defaultProps = {
        IconClass: AntDesign,
        iconName: 'setting',
        iconColor: Colors.grayII,
        iconSize: Metrics.icons.medium
    }

    render(){
        const { IconClass, iconName, iconColor, iconSize, title, onPress } = this.props
        return (
            <TouchableOpacity activeOpacity={0.8}
                              onPress={onPress}
                              style={styles.itemContainer}>
                <View style={styles.iconContainer}>
                    <IconClass name={iconName} color={iconColor} size={iconSize} />
                </View>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        width: drawerWidth,
        backgroundColor: Colors.snow,
        height: 65,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Metrics.doubleBaseMargin,
        borderBottomWidth: 1, //StyleSheet.hairlineWidth,
        borderBottomColor: Colors.veryLightGrey
    },
    title: {
        color: Colors.black,
        fontSize: Fonts.size.medium,
        fontFamily: Fonts.type.bold,
        marginLeft: Metrics.baseMargin
    },
    iconContainer: {
        width: 40,
        alignItems: 'center'
    }
})
