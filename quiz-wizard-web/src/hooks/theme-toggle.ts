import {useSelector} from 'react-redux'
import {selectThemeType, toggleTheme, useDispatch} from 'quiz-wizard-redux'

export const useThemeToggle = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectThemeType)
  const onToggle = () => dispatch(toggleTheme())
  return {theme, onToggle}
}
