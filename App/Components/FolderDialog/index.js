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
            selectedItem: 0
        };
    }

    onPickerSelect(index) {
        this.setState({
            selectedItem: index,
        })
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
        return (
            <TouchableOpacity
                activeOpacity={1}
                style={styles.mainContainer}>
                <TouchableOpacity activeOpacity={1} style={[styles.innerContainer]}>
                    {this.renderHeader()}
                    <Picker style={styles.pickerContainer}
                            selectedValue={this.state.selectedItem}
                            itemStyle={styles.pickerItemStyle}
                            onValueChange={(index) => this.onPickerSelect(index)}>
                        {Folders.map((value, i) => (
                            <PickerItem label={value} value={i} key={"money" + value}/>
                        ))}
                    </Picker>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
}
