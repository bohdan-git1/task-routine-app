import React from 'react'
import PropTypes from 'prop-types'
import VectorIcon from './../VectorIcon'
import Metrics from '../../Themes/Metrics'
import { View, Text } from 'react-native'
import styles from './styles'
import * as Animatable from 'react-native-animatable'
import Colors from '../../Themes/Colors'

export default class AnimatedAlert extends React.Component {
  static propTypes = {
    show: PropTypes.boolean,
    title: PropTypes.string,
    color: PropTypes.string
  }

  static defaultProps= {
    color: Colors.frost,
    show: true
  }

  render () {
    let messageComponent = null
    if (this.props.show) {
      const { title, color } = this.props
      return (
        <Animatable.View
          style={[styles.scrollContainer, this.props.style]}
          delay={800}
          animation='bounceIn'
        >
          <View style={styles.contentContainer}>
            <VectorIcon
              name={this.props.icon || 'ios-alert'}
              type='Ionicons'
              size={Metrics.icons.large}
              color={color}
            />
            <Text allowFontScaling={false} style={[styles.message, {color}]}>{title && title.toUpperCase()}</Text>
          </View>
        </Animatable.View>
      )
    }

    return messageComponent
  }
}
