import PropTypes from 'prop-types'
import {View} from 'react-native'
import React, {Component} from 'react'

import styles from './styles'
import SwitchButton from "../SwitchButton";

export default class SwitchButtonGroup extends Component {
    static propTypes = {
        groupSettingsLabel: PropTypes.strings,
        groupSettings: PropTypes.array
    }

    static defaultProps = {
        groupSettingsLabel: '',
        groupSettings: []
    }

    constructor(props) {
        super(props)
        this.state = {
            settingsStatus: false,
            settings: {}
        }
    }

    onChangeSettings = (setting) => {
      const {settings} = this.state
        settings[setting] = !settings[setting]
        this.setState({settings})
    }

    render() {
        const {groupSettings, groupSettingsLabel} = this.props
        const {settingsStatus, settings} = this.state
        return (
            <View style={styles.mainContainer}>
                <SwitchButton label={groupSettingsLabel} isHeading checked={settingsStatus} onChangeSetting={() => {
                    this.setState({settingsStatus: !settingsStatus})
                }}/>
                {settingsStatus && groupSettings.map((setting)=> {
                    const currentSetting = settings[setting] || false
                    return <SwitchButton label={setting} checked={currentSetting} onChangeSetting={() => this.onChangeSettings(setting)}/>
                })}
            </View>
        )
    }
}
