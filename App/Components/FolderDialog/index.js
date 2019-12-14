import styles from './styles'
import PropTypes from 'prop-types'
import React, {Component} from 'react'
import Picker from 'react-native-wheel-picker'
import {Text, TouchableOpacity, View} from 'react-native'
import {Folders} from '../../Lib/AppConstants'

const PickerItem = Picker.Item

export default class FolderDialog extends Component {
    static propTypes = {
        onDone: PropTypes.function,
        onCancel: PropTypes.function
    }

    static defaultProps = {
        onDone: () => {
        },
        onCancel: () => {
        }
    }


    constructor(props) {
        super(props);
        this.state = {
            selectedFolder: 1
        };
    }

    onPickerSelect(index) {
        const {onSelectFolder} = this.props
        this.setState({
            selectedFolder: index,
        })
        onSelectFolder(index)
    }

    renderHeader = () => {
        const {onDone, onCancel} = this.props
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={onCancel}>
                    <Text style={styles.whiteText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.heading}>Folder</Text>
                <TouchableOpacity onPress={onDone}>
                    <Text style={styles.whiteText}>Done</Text>
                </TouchableOpacity>
            </View>
        )
    }


    render() {
        const {folders} = this.props
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.mainContainer}>
                <TouchableOpacity activeOpacity={1} style={[styles.innerContainer]}>
                    {this.renderHeader()}
                    <Picker style={styles.pickerContainer}
                            selectedValue={this.state.selectedFolder}
                            itemStyle={styles.pickerItemStyle}
                            onValueChange={(index) => this.onPickerSelect(index)}>
                        {folders.map(({name, id}) => (
                            <PickerItem label={name} value={id} key={String(id)}/>
                        ))}
                    </Picker>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
}
