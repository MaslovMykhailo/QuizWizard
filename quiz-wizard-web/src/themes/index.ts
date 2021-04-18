export const a = ''
// import {createContext, FC, useContext, useMemo, useState} from 'react'
// import {Provider, useDispatch, useSelector} from 'react-redux'
// import {createQuizWizardStore, decrement, increment} from 'quiz-wizard-redux'
// import {Button, createMuiTheme, Switch, Theme, ThemeProvider, useTheme} from '@material-ui/core'
// import {red, brown} from '@material-ui/core/colors'

// type ThemeType = 'light' | 'dark'

// type Themes<T> = Record<ThemeType, T>;
// interface ThemeContext<T> {
//   themes: Themes<T>
//   themeType: ThemeType
//   setThemeType?: (themeType: ThemeType) => void
// }

// const themes = {
//   light: createMuiTheme({
//     palette: {
//       type: 'light',
//       primary: red
//     }
//   }),
//   dark: createMuiTheme({
//     palette: {
//       type: 'dark',
//       primary: brown
//     }
//   })
// }

// const MuiThemeContext = createContext<ThemeContext<Theme>>({
//   themes,
//   themeType: 'light'
// })

// const ThemedApp: FC = ({children}) => {
//   const [themeType, setThemeType] = useState<ThemeType>('light')

//   const themeContext = useMemo<ThemeContext<Theme>>(
//     () => ({
//       themes,
//       themeType,
//       setThemeType
//     }),
//     [themeType]
//   )

//   return (
//     <ThemeProvider
//       theme={createMuiTheme({
//         palette: {
//           type: themeType,
//           primary: themeType === 'dark' ? brown : red
//         }
//       })}
//     >
//       <MuiThemeContext.Provider
//         value={themeContext}
//         children={children}
//       />
//     </ThemeProvider>
//   )
// }

// export const App: FC = () => {
//   return (
//     <Store>
//       <ThemedApp>
//         <h2 children="QuizWizard" />
//         <Counter />
//       </ThemedApp>
//     </Store>
//   )
// }

// const store = createQuizWizardStore()

// const Store: FC = (props) => {
//   return (
//     <Provider
//       store={store}
//       {...props}
//     />
//   )
// }

// const Counter: FC = () => {
//   const value = useSelector(state => (state as {value: number}).value)

//   const dispatch = useDispatch()

//   const onIncrement = () => dispatch(increment())
//   const onDecrement = () => dispatch(decrement())

//   const themeContext = useContext(MuiThemeContext)
//   const onSwitch = () => {
//     if (themeContext.themeType === 'light') {
//       themeContext.setThemeType?.('dark')
//     } else {
//       themeContext.setThemeType?.('light')
//     }
//   }

//   console.log(themeContext.themeType)

//   const theme = useTheme()

//   return (
//     <div>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={onIncrement}
//         children="Increment"
//       />
//       <br />
//       {value}
//       <br />
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={onDecrement}
//         children="Decrement"
//       />
//       <Switch
//         color="primary"
//         value={themeContext.themeType === 'light'}
//         onChange={onSwitch}
//       />
//     </div>
//   )
// }
