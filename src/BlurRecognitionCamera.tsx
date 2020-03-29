import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { RNCamera as Camera, RNCamera } from 'react-native-camera';
import Toast from 'react-native-easy-toast';
import { NativeModules } from 'react-native';
const OpenCV = NativeModules.RNOpenCvLibrary;

interface BlurRecognitionCameraProps {
    navigateToHome(): void;
}

 class BlurRecognitionCamera extends Component<BlurRecognitionCameraProps> {
  constructor(props: BlurRecognitionCameraProps) {
    super(props);

    this.takePicture = this.takePicture.bind(this);
    this.checkForBlurryImage = this.checkForBlurryImage.bind(this);
    this.proceedWithCheckingBlurryImage = this.proceedWithCheckingBlurryImage.bind(this);
    this.repeatPhoto = this.repeatPhoto.bind(this);
    this.usePhoto = this.usePhoto.bind(this);
  }

  private camera: RNCamera | null = null; 

  private toast: Toast | null = null; 

  public state = {
    cameraPermission: false,
    photoAsBase64: {
      content: '',
      isPhotoPreview: false,
      photoPath: '',
    },
  };

  componentDidMount() {
    this.toast?.show('I works');
  }


  checkForBlurryImage(imageAsBase64: any) {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        OpenCV.checkForBlurryImage(imageAsBase64,
          (error: any) => {
            // error handling
            console.log('CheckForBlurryImageError', error);
          },
          (msg: any) => {
            console.log('CheckForBlurryImageSuccess', msg)
            resolve(msg);
          }
        );
      } else {
        resolve(Math.random() > 0.5);
        // OpenCV.checkForBlurryImage(imageAsBase64, (error, dataArray) => {
        //   resolve(dataArray[0]);
        // });
      }
    });
  }

  proceedWithCheckingBlurryImage() {
    const { content, photoPath } = this.state.photoAsBase64;

    this.checkForBlurryImage(content).then(blurryPhoto => {
      if (blurryPhoto) {
        console.log('Photo is blurred!');
        this.toast?.show('Photo is blurred!');
        return this.repeatPhoto();
      }
      console.log('Photo is clear!');
      this.toast?.show('Photo is clear!');
      this.setState({ photoAsBase64: { ...this.state.photoAsBase64, isPhotoPreview: true, photoPath } });
    }).catch(err => {
      console.log('err', err)
    });
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log('picture taken', data.uri);
      this.setState({
        ...this.state,
        photoAsBase64: { content: data.base64, isPhotoPreview: false, photoPath: data.uri },
      }, () => {
        this.proceedWithCheckingBlurryImage();
      });
    }
  }


  repeatPhoto() {
    this.setState({
      ...this.state,
      photoAsBase64: {
        content: '',
        isPhotoPreview: false,
        photoPath: '',
      },
    });
  }

  usePhoto() {
    // do something, e.g. navigate
  }


  render() {
    if (this.state.photoAsBase64.isPhotoPreview) {
      return (
        <View style={styles.container}>
          <Toast ref={t => this.toast = t} />
          <Image
            source={{ uri: `data:image/png;base64,${this.state.photoAsBase64.content}` }}
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
              <Text style={styles.photoPreviewUsePhotoText}>
                Use photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Camera
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
          captureAudio={false}
        >
          <View style={styles.takePictureContainer}>
            <TouchableOpacity onPress={this.takePicture}>
              <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.navigateToHome}>
              <Text style={{ fontSize: 14 }}> GO HOME </Text>
            </TouchableOpacity>
          </View>
        </Camera>
        <Toast ref={t => this.toast = t} />
      </View>
    );
  }
}
  
const styles = StyleSheet.create({
    imagePreview: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 60,
    },
    container: {
      flex: 1,
      flexDirection: 'row',
    },
    repeatPhotoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '50%',
      height: 120,
      backgroundColor: '#000',
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    topButtonsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      padding: 10,
      justifyContent: 'space-between',
    },
    focusFrameContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
    },
    focusFrame: {
      height: 90,
      width: 90,
      borderWidth: 1,
      borderColor: '#fff',
      borderStyle: 'dotted',
      borderRadius: 5,
    },
    photoPreviewRepeatPhotoText: {
      color: '#abcfff',
      fontSize: 15,
      marginLeft: 10,
    },
    usePhotoContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: '50%',
      height: 120,
      backgroundColor: '#000',
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    photoPreviewUsePhotoText: {
      color: '#abcfff',
      fontSize: 15,
      marginRight: 10,
    },
    preview: {
      position: 'relative',
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    takePictureContainer: {
      position: 'absolute',
      paddingVertical: 20,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
});

export default BlurRecognitionCamera;