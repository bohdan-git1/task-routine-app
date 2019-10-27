import PropTypes from 'prop-types'
import {View} from 'react-native'
import React, {Component} from 'react'

import styles from './styles'
import SwitchButton from "../SwitchButton";

export default class SwitchButtonGroup extends Component {
    static propTypes = {
        groupSettingsLabel: PropTypes.strings,
        groupSettings: PropTypes.array,
        type: PropTypes.strings,
        onChangeSetting: PropTypes.function
    }

    static defaultProps = {
        groupSettingsLabel: '',
        groupSettings: [],
        type: '',
        onChangeSetting: () => {}
    }

    constructor(props) {
        super(props)
        this.state = {
            settingsStatus: false,
            settings: {
                routePermission: {},
                budgetPermission: {},
                calendarPermission: {}
            }
        }
    }

    componentDidMount() {
        const {groupSettings, type} = this.props
        const {settings} = this.state
        groupSettings.forEach((item) => {
            settings[type][item.id] = item[type] || false
        })
        this.setState({settings})
    }

    onChangeSettings = (setting) => {
        const {id = ''} = setting
        const {type, onChangeSetting} = this.props
        const {settings} = this.state
        settings[type][id] = !settings[type][id]
        this.setState({settings})
        onChangeSetting({id, permissions: {[type]: settings[type][id]}})
    }

    render() {
        const {groupSettings, groupSettingsLabel, type} = this.props
        const {settingsStatus, settings} = this.state
        return (
            <View style={styles.mainContainer}>
                <SwitchButton label={groupSettingsLabel} isHeading checked={settingsStatus} onChangeSetting={() => {
                    this.setState({settingsStatus: !settingsStatus})
                }}/>
                {settingsStatus && groupSettings.map((setting) => {
                    const currentSetting = settings[type][setting.id]
                    return <SwitchButton label={setting.value} checked={currentSetting}
                                         onChangeSetting={() => this.onChangeSettings(setting)}/>
                })}
            </View>
        )
    }
}
