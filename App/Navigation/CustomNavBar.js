import React from 'react'
import { Header } from 'react-navigation'
import navStyles from './Styles/NavigationContainerStyle'

export default (props) => (
  <Header {...props} headerTitleStyle={navStyles.title} />
)
