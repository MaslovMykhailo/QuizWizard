import React, {FC} from 'react'
import {
  Layout,
  LayoutProps,
  StyleService,
  useStyleSheet
} from '@ui-kitten/components'

export const Screen: FC<LayoutProps> = ({style, ...props}) => {
  const styles = useStyleSheet(themedStyles)
  return <Layout {...props} style={[styles.root, style]} />
}

const themedStyles = StyleService.create({
  root: {
    flex: 1,
    display: 'flex',
    padding: 12
  }
})
