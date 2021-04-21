import {useSelector} from 'react-redux'
import {ThemeType} from 'quiz-wizard-schema'
import {selectThemeType} from 'quiz-wizard-redux'
import {
  ThemeProvider as MuiThemeProvider,
  ThemeProviderProps as MuiThemeProviderProps,
  createMuiTheme
} from '@material-ui/core/styles'
import type {PaletteOptions} from '@material-ui/core/styles/createPalette'
import deepPurple from '@material-ui/core/colors/deepPurple'
import lightGreen from '@material-ui/core/colors/lightGreen'
import lightBlue from '@material-ui/core/colors/lightBlue'
import orange from '@material-ui/core/colors/orange'
import pink from '@material-ui/core/colors/pink'
import red from '@material-ui/core/colors/red'

const palettes: Record<ThemeType, PaletteOptions> = {
  light: {
    type: 'light',
    primary: deepPurple,
    secondary: pink,
    error: red,
    warning: orange,
    info: lightBlue,
    success: lightGreen
  },
  dark: {
    type: 'dark',
    primary: pink,
    secondary: deepPurple,
    error: red,
    warning: orange,
    info: lightBlue,
    success: lightGreen
  }
}

const createTheme = (
  type: ThemeType
) => createMuiTheme({
  palette: palettes[type]
})

export type ThemeProviderProps = Omit<MuiThemeProviderProps, 'theme'>

export function ThemeProvider(props: ThemeProviderProps) {
  const themeType = useSelector(selectThemeType)
  return (
    <MuiThemeProvider
      theme={createTheme(themeType)}
      {...props}
    />
  )
}
