import styles from './styles'
import PropTypes from 'prop-types'
import React, {Component} from 'react'

import VectorIcon from '../VectorIcon'
import {TouchableOpacity} from 'react-native'

export default class NavigationButton extends Component {
  static propTypes = {
    iconStyle: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    iconType: PropTypes.string.isRequired,
    onPress: PropTypes.function,
  }
  static defaultProps = {
    iconStyle: {},
    iconName: '',
    iconType: '',
    onPress: () => {}
  }

  render() {
    const {iconName, iconType, iconStyle, onPress} = this.props
    return (
      <TouchableOpacity style={styles.backButtonContainer} onPress={onPress}>
        <VectorIcon type={iconType} name={iconName} style={[styles.icon, iconStyle]}/>
      </TouchableOpacity>
    )
  }
}
