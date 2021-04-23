import FormControl, {FormControlProps} from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import {useLanguageChange} from '../hooks'
import {getLanguageName, getLanguages} from '../helpers'

export interface LanguageSelectProps {
  className?: string
}

export function LanguageSelect(
  props: FormControlProps
) {
  const {language, onLanguageChange} = useLanguageChange()
  return (
    <FormControl {...props} >
      <InputLabel id="language-select-label">
        Language
      </InputLabel>
      <Select
        id="language-select"
        labelId="language-select-label"
        label="Language"
        value={language}
        onChange={onLanguageChange}
      >
        {getLanguages().map((lng) => (
          <MenuItem
            key={lng}
            value={lng}
          >
            {getLanguageName(lng)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
