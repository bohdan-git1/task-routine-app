import React, {Component} from 'react'
import {ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View} from 'react-native'
import PropTypes from 'prop-types'
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from './styles'
import strings from "../../Constants/strings";
import IconButton from "../IconButton";
import Metrics from "../../Themes/Metrics";
import Colors from "../../Themes/Colors";
import Input from "../Input";
import RoundedButton from "../RoundedButton";
import VectorIcon from "../VectorIcon";

export default class FoldersComponent extends Component {

    static propTypes = {
        containerStyles: PropTypes.object,
        onAddFolder: PropTypes.func,
        folders: PropTypes.array,
        onPressFolder: PropTypes.func,
        uploadingFolderImage: PropTypes.bool,
        updatingFolder: PropTypes.bool,
        selectedFolderId: PropTypes.number
    }

    static defaultProps = {
        onPressFolder: () => {
        }
    }

    addNewFolder = () => {
        const {folderState: {folderName, picUrl}, onEditFolderName, addFolderImage, onAddFolder, onSaveFolder} = this.props
        return (
            <View style={styles.newFolderContainer}>
                <VectorIcon name={'closecircleo'} type={'AntDesign'} onPress={onAddFolder} style={styles.closeIcon}/>
                <Input
                    value={folderName}
                    onChangeText={onEditFolderName}
                    placeholder={'Enter folder name'}
                />
                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={addFolderImage}>
                        <Text style={styles.uploadImageText}>Upload Image</Text>
                    </TouchableOpacity>
                    <Image source={{uri: picUrl}} style={styles.folderIcon}/>
                </View>
                <RoundedButton
                    text={'Create Folder'}
                    onPress={onSaveFolder}
                />
            </View>
        )
    }

    renderItem = ({item, index}) => {
        const {onPressFolder, selectedFolderId, uploadingFolderImage, updatingFolder} = this.props
        const {id, name, imgUrl, noOfTask, noOfTaskCompleted} = item
        return (
            <TouchableOpacity activeOpacity={0.8} disabled={uploadingFolderImage}
                              onPress={() => onPressFolder(id)}
                              style={styles.folderItemContainer}>
                <View style={styles.folderHeader}>
                    <Image source={{uri: imgUrl}} style={styles.folderImage}/>
                    <Text style={styles.folderName}>{name}</Text>
                </View>
                <Text style={styles.tasksStatusText}>{noOfTaskCompleted} Tasks Completed</Text>
                <Text style={styles.tasksStatusText}>{noOfTask} Total Tasks</Text>
                {(updatingFolder || uploadingFolderImage) && selectedFolderId === id && <View style={{
                    zIndex: 100,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator size={'large'} color={Colors.snow}/>
                </View>}
            </TouchableOpacity>
        )
    }

    _keyExtractor = (item, index) => String(item.id || index)

    render() {
        const {containerStyles, onAddFolder, folders = [], folderState: {addFolder, folderName}} = this.props
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
                                iconColor={'#d6d5d0'}/>
                </View>
                {addFolder && this.addNewFolder()}
                <FlatList data={folders}
                          extraData={{folders, props: this.props}}
                          renderItem={this.renderItem}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          keyExtractor={this._keyExtractor}
                />
            </View>
        )
    }
}
