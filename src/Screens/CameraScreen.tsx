import React, {Component} from 'react'
import {
  AppRegistry,
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity
} from 'react-native'
import {RNCamera as Camera} from 'react-native-camera'
import Toast from 'react-native-easy-toast'

import styles from '../Styles/Screens/CameraScreen'
import {OpenCV} from '../../native-modules'
import CircleWithinCircle from '../assets/svg/CircleWithinCircle'

export default class CameraScreen extends Component {
  constructor(props: any) {
    super(props)

    this.takePicture = this.takePicture.bind(this)
    this.checkForBlurryImage = this.checkForBlurryImage.bind(this)
    this.proceedWithCheckingBlurryImage = this.proceedWithCheckingBlurryImage.bind(
      this
    )
    this.repeatPhoto = this.repeatPhoto.bind(this)
    this.usePhoto = this.usePhoto.bind(this)
  }

  camera: any

  state = {
    cameraPermission: false,
    photoAsBase64: {
      content: '',
      isPhotoPreview: false,
      photoPath: ''
    }
  }

  checkForBlurryImage(imageAsBase64: any) {
    return new Promise(resolve => {
      if (Platform.OS === 'android') {
        OpenCV.checkForBlurryImage(
          imageAsBase64,
          () => {
            // error handling
          },
          (msg: any) => {
            resolve(msg)
          }
        )
      } else {
        OpenCV.checkForBlurryImage(
          imageAsBase64,
          (error: any, dataArray: any) => {
            resolve(dataArray[0])
          }
        )
      }
    })
  }

  proceedWithCheckingBlurryImage() {
    const {content, photoPath} = this.state.photoAsBase64

    this.checkForBlurryImage(content)
      .then(blurryPhoto => {
        if (blurryPhoto) {
          (this.refs.toast as any).show('Photo is blurred!', 10e10)

          return this.repeatPhoto()
        }
        (this.refs.toast as any).show('Photo is clear!', 10e10)

        this.setState({
          photoAsBase64: {
            ...this.state.photoAsBase64,
            isPhotoPreview: true,
            photoPath
          }
        })
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  async takePicture() {
    if (this.camera) {
      const options = {quality: 0.5, base64: true}
      const data = await this.camera.takePictureAsync(options)
      this.setState({
        ...this.state,
        photoAsBase64: {
          content: data.base64,
          isPhotoPreview: false,
          photoPath: data.uri
        }
      })
      this.proceedWithCheckingBlurryImage()
    }
  }

  repeatPhoto() {
    this.setState({
      ...this.state,
      photoAsBase64: {
        content: '',
        isPhotoPreview: false,
        photoPath: ''
      }
    })
  }

  usePhoto() {
    // do something, e.g. navigate
  }

  render() {
    if (this.state.photoAsBase64.isPhotoPreview) {
      return (
        <View style={styles.container}>
          //@ts-ignore
          <Toast ref="toast" position="center" />
          <Image
            source={{
              uri: `data:image/png;base64,${this.state.photoAsBase64.content}`
            }}
            style={styles.imagePreview}
          />
          <View style={styles.repeatPhotoContainer}>
            <TouchableOpacity onPress={this.repeatPhoto}>
              <Text style={styles.photoPreviewRepeatPhotoText}>
                Repeat photo
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.usePhotoContainer}>
            <TouchableOpacity onPress={this.usePhoto}>
              <Text style={styles.photoPreviewUsePhotoText}>Use photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Camera
          ref={cam => {
            this.camera = cam
          }}
          style={styles.preview}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }>
          <View style={styles.takePictureContainer}>
            <TouchableOpacity onPress={this.takePicture}>
              <View>
                <CircleWithinCircle />
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
        //@ts-ignore
        <Toast ref="toast" position="center" />
      </View>
    )
  }
}

AppRegistry.registerComponent('CameraScreen', () => CameraScreen)
