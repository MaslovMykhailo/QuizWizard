import {useParams} from 'react-router'
import Typography from '@material-ui/core/Typography'

export function StudentPage() {
  const {studentId} = useParams<{studentId: string}>()

  return (
    <Typography children={'Student ' + studentId} />
  )
}
