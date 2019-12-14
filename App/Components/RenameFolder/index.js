import React, {Component, Fragment} from 'react'
import {StyleSheet, SafeAreaView, View, Text, TextInput, Platform} from 'react-native'
import PropTypes from 'prop-types'

import ModalComponent from "../ModalComponent";
import Colors from "../../Themes/Colors";
import strings from "../../Constants/strings";
import Fonts from "../../Themes/Fonts";
import FullButton from "../FullButton";
import {showErrorMessage} from "../../Lib/Utilities";

export default class RenameFolder extends Component {
    constructor (props) {
        super(props)
        this.state = {
            folderName: ''
        }
    }
    static propTypes = {
        onChangeName: PropTypes.func,
        isModalVisible: PropTypes.bool,
        onCloseModal: PropTypes.func,
    }

    static defaultProps = {
        onChangeName: () => {},
        isModalVisible: false,
        onCloseModal: () => {}
    }

    onChange = () => {
        const { onChangeName } = this.props
        const { folderName } = this.state
        if (!folderName) {
            showErrorMessage(strings.folderNameMandatory)
            return
        }
        onChangeName(folderName)
    }

    render() {
        const {isModalVisible, onCloseModal} = this.props
        const { folderName } = this.state
        return (
            <Fragment>
                <ModalComponent isModalVisible={isModalVisible}
                                onBackdropPress={() => onCloseModal()}
                                closeModal={() => onCloseModal()}>
                    <SafeAreaView style={styles.container}>
                        <View style={styles.contentContainer}>
                            <View style={styles.titleBar}>
                                <Text style={styles.modalTitle}>{strings.enterFolderName}</Text>
                            </View>
                            <TextInput value={folderName}
                                       placeholder={strings.enterFolderName}
                                       style={styles.textInput}
                                       onChangeText={(folderName) => {this.setState({folderName})}} />
                            <FullButton text={'Change'}
                                        textStyles={styles.btnText}
                                        styles={styles.submitButton}
                                        onPress={this.onChange}/>

                        </View>
                    </SafeAreaView>
                </ModalComponent>
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
    },
    contentContainer: {
        width: 300,
        minHeight: 140,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: Colors.snow,
        justifyContent: 'space-between'
    },
    titleBar: {
        width: 300,
        alignItems: 'center',
        backgroundColor: Colors.themeColor,
    },
    modalTitle: {
        color: Colors.snow,
        fontSize: Fonts.size.h5,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 5
    },
    textInput: {
        paddingHorizontal: 5,
        width: 280,
        alignSelf: 'center',
        backgroundColor: Colors.veryLightGrey,
        minHeight: 40,
    },
    submitButton: {
        width: 150,
        height: 40,
        backgroundColor: Colors.themeColor,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.transparent
    },
    btnText: {
        margin: 0,
        paddingTop: Platform.OS === 'ios' ? 5 : 0
    }
})
