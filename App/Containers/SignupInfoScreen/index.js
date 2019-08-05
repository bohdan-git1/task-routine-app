import {isEmpty} from 'ramda'
import React, {Component} from 'react'
import ActionSheet from "react-native-actionsheet";
import ImagePicker from "react-native-image-crop-picker";
import {Image, Keyboard, Text, TouchableOpacity, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {init, UploadImage} from 'react-native-cloudinary-x'
import * as _ from 'lodash'

import i18n from 'i18n-js'
import styles from "./styles";
import I18n from "../../I18n";
import {Images} from "../../Themes";
import Input from "../../Components/Input";
import CheckBox from "../../Components/CheckBox";
import GradientView from "../../Components/GradientView";
import RoundedButton from '../../Components/RoundedButton'
import {handlePermissionError, isValidPassword, showMessage} from "../../Lib/Utilities";
import {CloudinaryCred, imageOptions, photosPermissionTypes} from "../../Lib/AppConstants";
import UserActions from "../../Redux/UserRedux";
import {connect} from "react-redux";
import {ProgressDialog} from "../../Components/ProgressDialog";

class SingupInfoScreen extends Component {
    constructor(props) {
        super(props)
        const { currentLocation: {latitude = 0, longitude = 0} = {} } = props || {}
        console.tron.warn('inside constructor: ' + latitude + ': ' + longitude)
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            picUrl: '',
            uploadingImage: false,
            locationCoordinates: [latitude, longitude],
            acceptedTerms: false
        }
        init(CloudinaryCred.apiKey, CloudinaryCred.secret, CloudinaryCred.name)
    }

    componentWillReceiveProps({currentLocation: newCurrentLocation, error: newError, fetchingLocation}){
        console.tron.warn('inside will REceivePRps')
        const { fetchingLocation: oldFetching, currentLocation, error } = this.props
        console.tron.warn({
            inReceiveProps: true,
            locConditioN: String(!fetchingLocation && !_.isEmpty(newCurrentLocation) && !_.isEqual(currentLocation, newCurrentLocation)),
            errCond: String(!fetchingLocation && fetchingLocation !== oldFetching && newError && newError !== error),
            newLoc: newCurrentLocation
        })
        if (!fetchingLocation && fetchingLocation !== oldFetching && newError && newError !== error) {
            // todo: case while fetching location got an error
            return
        }

        if(!fetchingLocation && !_.isEmpty(newCurrentLocation) && !_.isEqual(currentLocation, newCurrentLocation)) {
            this.setState({locationCoordinates: [newCurrentLocation.latitude, newCurrentLocation.longitude]})
        }
    }

    componentDidMount () {
        console.tron.warn('inside Did Mount')
        UserActions.getCurrentLocation()
    }

    uploadImage = (path) => {
        this.setState({uploadingImage: true})
        UploadImage(path).then((picUrl) => {
            this.setState({picUrl, uploadingImage: false})
        }).catch(err => {
            //  console.tron.warn({err})
            this.setState({uploadingImage: false})
        })
    }

    onImageActionPressed = (index) => {
        switch (index) {
            case 0:
                ImagePicker.openCamera(imageOptions).then(image => {
                    this.uploadImage(image.path || '')
                }).catch(err => {
                    handlePermissionError(photosPermissionTypes.CAMERA)
                })
                break
            case 1:
                ImagePicker.openPicker(imageOptions).then(image => {
                    this.uploadImage(image.path || '')
                }).catch(err => {
                    handlePermissionError(photosPermissionTypes.PHOTOS)
                })
                break
        }
    }

    showActionSheet = () => {
        Keyboard.dismiss()
        this.ImageSheet.show()
    }

    saveProfile = () => {
        const {firstName, lastName, userName, password, picUrl, locationCoordinates, acceptedTerms} = this.state
        const {addProfile, user: {id: userId} = {}} = this.props
        const userInfo = {
            name: `${firstName} ${lastName}`,
            username: userName,
            picUrl,
            password,
            locationCoordinates
        }
        Keyboard.dismiss()
        if (isEmpty(firstName)) {
            showMessage('Please enter first name')
        } else if (isEmpty(lastName)) {
            showMessage('Please enter last name')
        } else if (isEmpty(userName)) {
            showMessage('Please enter username')
        } else if (isEmpty(password)) {
            showMessage('Please enter password')
        } else if (!isValidPassword(password)) {
            showMessage(i18n.t('passwordLength'))
        } else if (!acceptedTerms) {
            showMessage('Please accept terms and conditions')
        } else {
            addProfile(userId, userInfo)
        }
    }

    render() {
        const {firstName, lastName, userName, password, picUrl, uploadingImage, acceptedTerms} = this.state
        const image = isEmpty(picUrl) ? Images.avatar : {uri: picUrl}
        const {fetching} = this.props
        return (
            <GradientView>
                <KeyboardAwareScrollView keyboardShouldPersistTaps='handled' style={styles.mainContainer}
                                         showsVerticalScrollIndicator={false}>
                    <TouchableOpacity style={styles.profileImageContainer} onPress={this.showActionSheet}>
                        <Image source={image} style={styles.profileImage} key={'image'}/>
                        <ActionSheet
                            ref={o => this.ImageSheet = o}
                            options={[I18n.t('captureImage'), I18n.t('selectFromGallery'), I18n.t('cancel')]}
                            cancelButtonIndex={2}
                            onPress={this.onImageActionPressed}
                        />
                    </TouchableOpacity>
                    <Input
                        value={firstName}
                        returnKeyType={'next'}
                        label={I18n.t('firstName')}
                        placeholder={I18n.t('firstName')}
                        onChangeText={(firstName) => this.setState({firstName})}
                        onSubmitEditing={() => this.lastName.focus()}
                    />
                    <Input
                        value={lastName}
                        returnKeyType={'next'}
                        label={I18n.t('lastName')}
                        placeholder={I18n.t('lastName')}
                        ref={ref => this.lastName = ref}
                        onChangeText={(lastName) => this.setState({lastName})}
                        onSubmitEditing={() => this.userName.focus()}
                    />
                    <Input
                        value={userName}
                        returnKeyType={'next'}
                        label={I18n.t('userName')}
                        placeholder={I18n.t('userName')}
                        ref={ref => this.userName = ref}
                        onChangeText={(userName) => this.setState({userName})}
                        onSubmitEditing={() => this.passwordRef.focus()}
                    />
                    <Input
                        password
                        value={password}
                        returnKeyType={'done'}
                        onSubmitEditing={Keyboard.dismiss}
                        label={I18n.t('password')}
                        ref={ref => this.passwordRef = ref}
                        placeholder={I18n.t('password')}
                        onChangeText={(password) => this.setState({password})}
                    />
                    <Text style={styles.passwordInfo}>{i18n.t('passwordLength')}</Text>
                    <View style={styles.termsConditionsContainer}>
                        <CheckBox
                            checked={acceptedTerms}
                            onChange={(acceptedTerms) => this.setState({acceptedTerms})}
                        />
                        <Text style={styles.acceptTermsConditions}>{i18n.t('acceptTermsConditions')}</Text>
                    </View>
                    <RoundedButton
                        text={i18n.t('signUp')}
                        buttonContainer={styles.buttonContainer}
                        onPress={this.saveProfile}
                    />
                </KeyboardAwareScrollView>
                <ProgressDialog hide={!uploadingImage && !fetching}/>
            </GradientView>
        )
    }
}

const mapStateToProps = ({user: {fetching, user, currentLocation, error}}) => {
    return { fetching, user, currentLocation, error }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProfile: (userId, info, isSignup = true) => dispatch(UserActions.addProfile(userId, info, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingupInfoScreen)

