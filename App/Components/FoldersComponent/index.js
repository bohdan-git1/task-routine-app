import React, { Component } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from './styles'
import strings from "../../Constants/strings";
import IconButton from "../IconButton";
import Metrics from "../../Themes/Metrics";
export default class FoldersComponent extends Component {

    static propTypes = {
        containerStyles: PropTypes.object,
        onAddFolder: PropTypes.func,
        folders: PropTypes.array,
        onPressFolder: PropTypes.func
    }

    static defaultProps = {
        onPressFolder: () => {}
    }

    renderItem = ({item, index}) => {
        const {onPressFolder} = this.props
        const {id, name, imgUrl, noOfTask, noOfTaskCompleted} = item
        return (
            <TouchableOpacity onPress={onPressFolder} style={styles.folderItemContainer}>
                <View style={styles.folderHeader}>
                    <Image source={{uri: imgUrl}} style={styles.folderImage}/>
                    <Text style={styles.folderName}>{name}</Text>
                </View>
                <Text style={styles.tasksStatusText}>{noOfTaskCompleted} Tasks Completed</Text>
                <Text  style={styles.tasksStatusText}>{noOfTask} Total Tasks</Text>
            </TouchableOpacity>
        )
    }

    _keyExtractor = (item, index) => String(item.id || index)

    render(){
        const { containerStyles, onAddFolder, folders = [] } = this.props
        return (
            <View style={[styles.mainContainer, containerStyles]}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerLeftContainer}>
                        <Text style={styles.folderHeading}>{strings.folder}</Text>
                        <Text style={styles.folderSubHeading}>{strings.browseTasksInFolders}</Text>
                    </View>
                    <IconButton IconClass={Ionicons}
                                iconSize={Metrics.icons.large}
                                iconName={'ios-add-circle-outline'}
                                onPress={onAddFolder}
                                iconColor={'#d6d5d0'} />
                </View>
                <FlatList data={folders}
                          extraData={folders}
                          renderItem={this.renderItem}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          keyExtractor={this._keyExtractor}
                />
            </View>
        )
    }
}
