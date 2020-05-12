import React, {FC} from 'react'
import {
  Layout,
  LayoutProps,
  StyleService,
  useStyleSheet
} from '@ui-kitten/components'

export const Screen: FC<LayoutProps> = (props) => {
  const styles = useStyleSheet(themedStyles)
  return <Layout style={[styles.root, props.style]} {...props} />
}

const themedStyles = StyleService.create({
  root: {
    flex: 1,
    display: 'flex',
    padding: 12
  }
})
