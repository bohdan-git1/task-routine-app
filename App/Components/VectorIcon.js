import PropTypes from 'prop-types'
import React, {Component} from 'react'
import Feather from 'react-native-vector-icons/Feather'
import EntypoIcons from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import IoniconsIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome'
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default class VectorIcon extends Component {
  static propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    size: PropTypes.string,
    style: PropTypes.object
  }
  static defaultProps = {
    name: '',
    type: '',
    size: '',
    style: {}
  }

  render () {
    const {name, type, size, color, style} = this.props
    switch (type) {
      case 'AntDesign':
        return (<AntDesign style={style} name={name} size={size} color={color} />)
      case 'Ionicons':
        return (<IoniconsIcons style={style} name={name} size={size} color={color} />)
      case 'FontAwesome':
        return (<FontAwesomeIcons style={style} name={name} size={size} color={color} />)
      case 'Feather':
        return (<Feather style={style} name={name} size={size} color={color} />)
      case 'FontAwesome5':
        return (<FontAwesome5Icons style={style} name={name} size={size} color={color} />)
      case 'SimpleLineIcons':
        return (<SimpleLineIcons style={style} name={name} size={size} color={color} />)
      case 'MaterialIcons':
        return (<MaterialIcons style={style} name={name} size={size} color={color} />)
      case 'MaterialCommunityIcons':
        return (<MaterialCommunityIcons style={style} name={name} size={size} color={color} />)
      case 'Entypo':
        return (<EntypoIcons style={style} name={name} size={size} color={color} />)
      case 'EvilIcons':
        return (<EvilIcons style={style} name={name} size={size} color={color} />)
      default:
        return (<EntypoIcons style={style} name={name} size={size} color={color} />)
    }
  }
}
