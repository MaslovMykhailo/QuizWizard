import React from 'react'
import {ImageProps, ImageStyle, StyleSheet} from 'react-native'
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text
} from '@ui-kitten/components'
import {EvaIconsPack} from '@ui-kitten/eva-icons'
import {mapping, light as theme} from '@eva-design/eva'

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
const HeartIcon = (style: ImageStyle): React.ReactElement<ImageProps> => (
  <Icon {...style} name="heart" />
)

interface HomeProps {
  navigateToCamera(): void
  navigateToBlurRecognitionCamera(): void
}

const Home: React.FC<HomeProps> = ({
  navigateToCamera,
  navigateToBlurRecognitionCamera
}) => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider mapping={mapping} theme={theme}>
      <Layout style={styles.container}>
        <Text style={styles.text} category="h1">
          Welcome to UI Kitten 😻
        </Text>
        <Text style={styles.text} category="s1">
          Start with editing App.js to configure your App
        </Text>
        <Text style={styles.text} appearance="hint">
          For example, try changing theme to Dark by simply changing an import
        </Text>
        <Button style={styles.button} icon={HeartIcon}>
          LIKE
        </Button>
        <Button style={styles.button} onPress={navigateToCamera}>
          Go to Camera
        </Button>
        <Button style={styles.button} onPress={navigateToBlurRecognitionCamera}>
          Go to blur recognition Camera
        </Button>
      </Layout>
    </ApplicationProvider>
  </>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center'
  },
  button: {
    marginVertical: 16
  }
})

export default Home
