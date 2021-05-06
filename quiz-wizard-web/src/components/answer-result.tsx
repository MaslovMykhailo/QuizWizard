import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'

export interface AnswerResultProps {
  result: number
}

export function AnswerResult({
  result
}: AnswerResultProps) {
  const classes = useStyles()
  const className = useResultClassName(result * 100)
  return (
    <>
      <Typography
        variant="h5"
        className={classes.caption}
      >
        Result:
      </Typography>
      <Typography
        variant="h4"
        className={className}
      >
        {`${Math.round(result * 100)}%`}
      </Typography>
    </>
  )
}

const useResultClassName = (result: number) => {
  const classes = useStyles()

  if (between(result, [80, 100])) {
    return classes.perfect
  }

  if (between(result, [60, 80])) {
    return classes.good
  }

  if (between(result, [40, 60])) {
    return classes.normal
  }

  return classes.bad
}

const useStyles = makeStyles((theme) => ({
  caption: {
    marginRight: theme.spacing(1)
  },
  perfect: {
    color: theme.palette.success.main
  },
  good: {
    color: theme.palette.info.main
  },
  normal: {
    color: theme.palette.warning.main
  },
  bad: {
    color: theme.palette.error.main
  }
}))

const between = (
  n: number,
  [min, max]: [number, number]
) => n >= min && n <= max
