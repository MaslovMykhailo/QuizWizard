import downloadCSV from 'download-csv'
import {useTranslation} from 'react-i18next'
import Button from '@material-ui/core/Button'
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt'

export interface DownloadReportButtonProps {
  filename: string
  data: unknown[]
  columns: Record<string, string>
}

export function DownloadReportButton({
  filename,
  data,
  columns
}: DownloadReportButtonProps) {
  const [t] = useTranslation()
  const onClick = () => {
    downloadCSV(data, columns, filename)
  }

  return (
    <Button
      color="secondary"
      variant="contained"
      onClick={onClick}
      startIcon={<SystemUpdateAltIcon />}
    >
      {t('DOWNLOAD_REPORT')}
    </Button>
  )
}
