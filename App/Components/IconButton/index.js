import React, { Component } from 'react'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import Metrics from "../../Themes/Metrics";
import Colors from "../../Themes/Colors";

export default class IconButton extends Component {

    static propTypes = {
        buttonContainer: PropTypes.object,
        IconClass: PropTypes.func,
        iconName: PropTypes.string,
        iconColor: PropTypes.string,
        iconSize: PropTypes.number,
        onPress: PropTypes.func
    }

    static defaultProps = {
        IconClass: MaterialCommunityIcons,
        iconName: 'pencil-outline',
        iconColor: Colors.gray,
        iconSize: Metrics.icons.small,
        onPress: () => {}
    }

    render () {
        const { buttonContainer, IconClass, iconName, iconColor, iconSize, onPress } = this.props
        return (
            <TouchableOpacity style={[styles.container, buttonContainer]} onPress={onPress}>
                <IconClass name={iconName} color={iconColor} size={iconSize} />
            </TouchableOpacity>
        )
    }
}


const styles = StyleSheet.create({
  container: {
      padding: Metrics.smallMargin,
      alignItems: 'center',
      justifyContent: 'center'
  }
})
