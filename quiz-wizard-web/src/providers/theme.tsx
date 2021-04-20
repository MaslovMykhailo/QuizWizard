// import {createMuiTheme, , Switch, Theme, ThemeProvider as MiuThemProvider, useTheme} from '@material-ui/core'

import {useSelector} from 'react-redux'
import {ThemeType} from 'quiz-wizard-schema'
import {selectThemeType} from 'quiz-wizard-redux'
import {
  ThemeProvider as MuiThemeProvider,
  ThemeProviderProps as MuiThemeProviderProps,
  createMuiTheme
} from '@material-ui/core/styles'

const createTheme = (
  type: ThemeType
) => createMuiTheme({
  palette: {
    type
  }
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
