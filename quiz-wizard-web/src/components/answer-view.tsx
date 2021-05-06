import {AnswerSchema, QuizSchema, StudentSchema} from 'quiz-wizard-schema'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import {BackButton} from './back-button'

export interface AnswerViewProps {
  answer: AnswerSchema
  quiz: QuizSchema
  student?: StudentSchema
}

export function AnswerView({
  answer,
  quiz,
  student
}: AnswerViewProps) {
  return (
    <Grid
      container
      direction="column"
      component="form"
      spacing={4}
    >
      <Grid
        item
        container
        spacing={2}
        alignItems="center"
      >
        <Grid item>
          <BackButton />
        </Grid>
        <Grid item>
          <Typography
            variant="h3"
            children="Answer info"
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
