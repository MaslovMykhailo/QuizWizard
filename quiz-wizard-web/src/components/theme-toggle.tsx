import IconButton from '@material-ui/core/IconButton'
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium'

import {useThemeToggle} from '../hooks'

export function ThemeToggle() {
  const {onToggle} = useThemeToggle()
  return (
    <IconButton
      color="inherit"
      onClick={onToggle}
    >
      <BrightnessMediumIcon />
    </IconButton>
  )
}
