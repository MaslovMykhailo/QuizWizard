# Quiz Wizard

## Main idea

Quiz Wizard is an application which allow people check paper quiz using the camera of their mobile devices. It helps teachers, psychologists and analytics to decrease their time spent for manual checking of paper tests.

### How does answers sheet look like?

![Answers blank](https://github.com/maslovmichail20/QuizWizard/blob/master/mobile/images/answers-sheet.png "Answers sheet")

### How does answers sheet recognition algorithm work?

#### Step 1: Barcode detection

First of all it is good to understand is it a valid sheet of paper in camera. 

 - For this purpose is used barcode detection mechanism https://react-native-community.github.io/react-native-camera/docs/rncamera#onbarcoderead

#### Step 2: Answers sheet extraction

The next step allows to isolate rectangle sheet and separate background. For this purpose is used: 

- converting an image to gray https://docs.opencv.org/2.4/modules/imgproc/doc/miscellaneous_transformations.html#cvtcolor

- canny egde detection https://docs.opencv.org/2.4/doc/tutorials/imgproc/imgtrans/canny_detector/canny_detector.html#canny-detector

- four point transform https://www.pyimagesearch.com/2014/08/25/4-point-opencv-getperspective-transform-example/

#### Step 3: Answers section extraction

This step allows to prepare answers section to recognition of concrete options. For this purpose is used: 

- canny egde detection https://docs.opencv.org/2.4/doc/tutorials/imgproc/imgtrans/canny_detector/canny_detector.html#canny-detector

- four point transform https://www.pyimagesearch.com/2014/08/25/4-point-opencv-getperspective-transform-example/

#### Step 4: Answer options recognition

And now concrete answer options can be recognized. For this purpose is used:

- image thresholding https://docs.opencv.org/2.4/doc/tutorials/imgproc/threshold/threshold.html#basic-threshold

- finding contours of each answer option https://docs.opencv.org/2.4/doc/tutorials/imgproc/shapedescriptors/find_contours/find_contours.html#find-contours

- counting the number of non-zero pixels https://docs.opencv.org/2.4/modules/core/doc/operations_on_arrays.html#countnonzero

#### Step 5: Responder section recognition 

Basically, this step combines the third and forth steps, but implements described operations for responder section 


## Technologies

- React Native
- OpenCV

## Permissions

- Internet
- Camera
- File storage
