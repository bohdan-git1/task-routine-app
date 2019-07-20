import styles from './styles'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React, {Component} from 'react'

import VectorIcon from '../VectorIcon'
import Colors from '../../Themes/Colors'
import {TouchableOpacity} from 'react-native'
import {Actions} from 'react-native-router-flux'

class BackButton extends Component {
  static propTypes = {
    containerStyle: PropTypes.object,
    iconColor: PropTypes.string
  }
  static defaultProps = {
    containerStyle: {},
    iconColor: Colors.snow
  }

  render() {
    const {onLeft, iconColor, language} = this.props
    return (
      <TouchableOpacity style={styles.backButtonContainer} onPress={onLeft || Actions.pop}>
        <VectorIcon type={'Entypo'} name={'chevron-thin-left'} size={20} style={styles.backIcon} color={iconColor}/>
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = ({config: {language}}) => {
  return {language}
}

export default connect(mapStateToProps, null)(BackButton)
