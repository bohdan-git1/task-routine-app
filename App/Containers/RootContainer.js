import React, {Component} from 'react'
import {StatusBar, Platform} from 'react-native'
import {connect} from 'react-redux'
import ReduxRouter, {ReduxNavigator} from '../Navigation/NavigationRouter'
import { Actions } from 'react-native-router-flux'
import { checkConnected } from '../Lib/Utilities'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
// Styles
import { Colors } from '../Themes'

class RootContainer extends Component {
  componentDidMount () {
    StatusBar.setBarStyle('light-content')
    Platform.OS === 'android' && StatusBar.setBackgroundColor(Colors.themeColor)
    checkConnected()
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  backHandler = () => {
    const prevScene = Actions.currentScene
    Actions.pop()
    return Actions.currentScene !== prevScene
  }

  render () {
    return (
      <ReduxRouter
        navigator={ReduxNavigator}
        backAndroidHandler={this.backHandler} />
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
