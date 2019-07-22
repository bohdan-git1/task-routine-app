import {isEmpty} from 'ramda'
import React, {Component} from 'react'
import Permissions from 'react-native-permissions'
import ActionSheet from "react-native-actionsheet";
import ImagePicker from "react-native-image-crop-picker";
import Geolocation from 'react-native-geolocation-service'
import {Image, Keyboard, Text, TouchableOpacity, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {init, UploadImage} from 'react-native-cloudinary-x'

import i18n from 'i18n-js'
import styles from "./styles";
import I18n from "../../I18n";
import {Images} from "../../Themes";
import Input from "../../Components/Input";
import CheckBox from "../../Components/CheckBox";
import GradientView from "../../Components/GradientView";
import RoundedButton from '../../Components/RoundedButton'
import {handlePermissionError, showMessage, showSettingsDialog} from "../../Lib/Utilities";
import {CloudinaryCred, imageOptions, photosPermissionTypes} from "../../Lib/AppConstants";
import UserActions from "../../Redux/UserRedux";
import {connect} from "react-redux";
import {ProgressDialog} from "../../Components/ProgressDialog";

class SingupInfoScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            picUrl: '',
            uploadingImage: false,
            locationCoordinates: [],
            acceptedTerms: false
        }
        init(CloudinaryCred.apiKey, CloudinaryCred.secret, CloudinaryCred.name)
    }

    componentDidMount() {
        Permissions.request('location', {type: 'always'}).then((res) => {
            if (res === 'authorized') {
                Geolocation.getCurrentPosition(
                    (position) => {
                        const {coords: {latitude, longitude}} = position
                        let locationCoordinates = []
                        locationCoordinates.push(latitude)
                        locationCoordinates.push(longitude)
                        this.setState({locationCoordinates})
                    },
                    (error) => {
                        console.tron.warn({code: error.code, message: error.message})
                    },
                    {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
                )
            } else if (res === 'restricted') {
                showSettingsDialog(
                    'Location Permission',
                    'Allow Ziloo to access this device\'s location?'
                )
            }
        })
    }

    uploadImage = (path) => {
        this.setState({uploadingImage: true})
        UploadImage(path).then((picUrl) => {
            this.setState({picUrl, uploadingImage: false})
        }).catch(err => {
            console.tron.warn({err})
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
        const userInfo = {name: `${firstName} ${lastName}`, username: userName, picUrl, password, locationCoordinates}
        if (isEmpty(firstName)) {
            showMessage('Please enter first name')
        } else if (isEmpty(lastName)) {
            showMessage('Please enter last name')
        } else if (isEmpty(userName)) {
            showMessage('Please enter username')
        } else if (isEmpty(password)) {
            showMessage('Please enter password')
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
                        <Image source={image} style={styles.profileImage}/>
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
                        onSubmitEditing={() => {
                        }}
                        label={I18n.t('password')}
                        ref={ref => this.passwordRef = ref}
                        placeholder={I18n.t('password')}
                        onChangeText={(password) => this.setState({password})}
                    />
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

const mapStateToProps = ({user: {fetching, user}}) => {
    return {fetching, user}
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProfile: (userId, info) => dispatch(UserActions.addProfile(userId, info))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingupInfoScreen)

