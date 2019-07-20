import React from 'react'
import PropTypes from 'prop-types'
import IonIcon from 'react-native-vector-icons/Ionicons'

import {Colors, Metrics} from '../Themes'
import {Text, View} from 'react-native'
import styles from './Styles/TabIconStyle'
import {connect} from 'react-redux'

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
  IconClass: PropTypes.func
}

class TabIcon extends React.Component {
  static defaultProps = {
    IconClass: IonIcon
  }
  render () {
    const {IconClass, iconName, iconSize, focused, title, label} = this.props
    const titleStyle = focused ? Colors.themeColor : Colors.offWhiteI
    return (
      <View style={styles.container}>
        <IconClass name={iconName}
          size={iconSize || Metrics.icons.tabIcon}
          color={titleStyle} />
        <Text style={[styles.tabText, {color: titleStyle}]}>{title}</Text>
      </View>
    )
  }
}

TabIcon.propTypes = propTypes
export default connect(null, null)(TabIcon)
