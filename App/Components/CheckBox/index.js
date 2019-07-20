import PropTypes from 'prop-types'
import Colors from '../../Themes/Colors'
import Metrics from '../../Themes/Metrics'
import React, { Component } from 'react'
import styles from './styles'
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class CheckBox extends Component {
  static propTypes = {
    style: PropTypes.object,
    checked: PropTypes.bool.isRequired,
    borderColor: PropTypes.string,
    tickSize: PropTypes.number,
    tickColor: PropTypes.string,
    editAble: PropTypes.boolean
  }

  static defaultProps = {
    checked: false,
    borderColor: Colors.snow,
    tickSize: Metrics.icons.small,
    tickColor: Colors.snow,
    editAble: true
  }

  constructor (props) {
    super(props)
    const {checked} = props
    this.state = {
      checked
    }
  }

  componentWillReceiveProps (nextProps) {
    this.props = nextProps
    this.setState({checked: nextProps.checked})
  }

  render () {
    const {style, borderColor, tickColor, editAble} = this.props
    const {checked} = this.state
    return (
      <TouchableOpacity
        disabled={!editAble}
        activeOpacity={0.8}
        onPress={this._toggleCheck}
        style={[styles.checkBoxContainer, style, {borderColor: borderColor}]}>
        {
          checked &&
          <Ionicons name='md-checkmark' size={18} color={tickColor || Colors.snow} />
        }
      </TouchableOpacity>
    )
  }

  _toggleCheck = () => {
    const {checked = false} = this.state || {}
    this.setState({checked: !checked})
    this.props.onChange && this.props.onChange(!checked)
  }
}

CheckBox.propTypes = {
  checked: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.number,
  style: PropTypes.object
}
