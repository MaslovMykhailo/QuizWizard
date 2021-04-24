import Chip from '@material-ui/core/Chip'

export interface GroupChipProps {
  groupName: string
  onClick?: () => void
  onDelete?: () => void
}

export function GroupChip({
  groupName,
  ...props
}: GroupChipProps) {
  return (
    <Chip
      color="primary"
      label={groupName}
      {...props}
    />
  )
}
