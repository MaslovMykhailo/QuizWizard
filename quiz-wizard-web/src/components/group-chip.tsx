import {useTranslation} from 'react-i18next'
import Chip, {ChipProps} from '@material-ui/core/Chip'

export interface GroupChipProps extends Pick<
  ChipProps,
  'onClick' | 'onDelete' | 'className'
> {
  groupName?: string
}

export function GroupChip({
  groupName,
  ...props
}: GroupChipProps) {
  const [t] = useTranslation()
  return (
    <Chip
      {...props}
      label={groupName || t('UNKNOWN_GROUP')}
      color={groupName ? 'primary' : 'secondary'}
      variant={groupName ? 'default' : 'outlined'}
    />
  )
}
