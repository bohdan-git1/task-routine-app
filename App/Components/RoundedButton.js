import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Text, TouchableOpacity} from 'react-native'
import styles from './Styles/RoundedButtonStyles'


export default class RoundedButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string,
    buttonContainer: PropTypes.object
  }

  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText
  }

  render () {
    const {buttonContainer} = this.props
    return (
      <TouchableOpacity activeOpacity={0.8} style={[styles.button, buttonContainer]} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.getText()}</Text>
      </TouchableOpacity>
    )
  }
}
