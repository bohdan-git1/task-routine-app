import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Text, View} from 'react-native'
import styles from './Styles/AlertMessageStyles'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default class AlertMessage extends Component {
  static defaultProps = {
    IconClass: MaterialIcons,
    icon: 'error-outline',
    messageStyle: {}
  }

  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    IconClass: PropTypes.string,
    style: PropTypes.object,
    show: PropTypes.bool,
    messageStyle: PropTypes.object
  }

  render () {
    const {title, icon, IconClass, messageStyle} = this.props
    return (
      <View style={[styles.container, this.props.style]}>
        {IconClass && icon && <IconClass name={icon} size={30} />}
        <Text allowFontScaling={false} style={[styles.message, messageStyle]}>{title}</Text>
      </View>
    )
  }
}
