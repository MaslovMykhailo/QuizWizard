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
  return (
    <Chip
      {...props}
      label={groupName || 'Unknown group'}
      color={groupName ? 'primary' : 'secondary'}
      variant={groupName ? 'default' : 'outlined'}
    />
  )
}
