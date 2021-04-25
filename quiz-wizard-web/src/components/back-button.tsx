import {useHistory} from 'react-router'
import IconButton from '@material-ui/core/IconButton'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'

export function BackButton() {
  const history = useHistory()
  return (
    <IconButton onClick={history.goBack}>
      <NavigateBeforeIcon />
    </IconButton>
  )
}
