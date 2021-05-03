import {ChangeEvent, useState} from 'react'
import {QuestionSchema} from 'quiz-wizard-schema'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import DeleteIcon from '@material-ui/icons/Delete'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import {makeStyles} from '@material-ui/core/styles'

import {PictureControl} from './picture-control'
import {AnswerOptionsForm} from './answer-options-form'

export interface QuestionFormProps {
  readOnly?: boolean
  index: number
  question?: QuestionSchema
  onChange?: (question: QuestionSchema) => void
  onDelete?: () => void
  className?: string
}

export function QuestionForm({
  index,
  readOnly,
  question,
  onChange,
  onDelete,
  className
}: QuestionFormProps) {
  const classes = useStyles()

  const onChangeText = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.({
      ...question!,
      text: event.target.value!
    })
  }
  const onChangeCost = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.({
      ...question!,
      cost: parseInt(event.target.value)
    })
  }
  const onTogglePartialAnswer = () => {
    onChange?.({
      ...question!,
      partialAnswer: !question?.partialAnswer
    })
  }
  const onChangeAnswers = (answers: QuestionSchema['answers']) => {
    onChange?.({
      ...question!,
      answers
    })
  }
  const onChangePicture = (picture: string | Blob) => {
    onChange?.({
      ...question!,
      picture
    })
  }
  const onDeletePicture = () => {
    onChange?.({
      ...question!,
      picture: undefined
    })
  }

  const [answersExpanded, setAnswersExpanded] = useState(false)

  return (
    <Card className={className}>
      <CardHeader
        avatar={<Avatar children={index} />}
        title={(
          <Box className={classes.headerBox}>
            <Typography
              variant="h5"
              className={classes.title}
              children={`Question ${index}`}
            />
            <Typography
              className={classes.headerControl}
              children="Partial answer:"
            />
            <Checkbox
              className={classes.headerControl}
              color="primary"
              checked={question?.partialAnswer}
              onChange={onTogglePartialAnswer}
              readOnly={readOnly}
            />
            <Typography
              className={classes.headerControl}
              children="Question cost:"
            />
            <TextField
              color="primary"
              type="number"
              value={question?.cost ?? 1}
              error={!question?.cost || question.cost < 1}
              onChange={onChangeCost}
              inputProps={{min: 1}}
              className={classes.costInput}
              InputProps={{readOnly}}
            />
          </Box>
        )}
        action={!readOnly && (
          <IconButton
            color="secondary"
            onClick={onDelete}
          >
            <DeleteIcon />
          </IconButton>
        )}
      />
      <CardContent className={classes.content}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Question text"
          variant="outlined"
          value={question?.text}
          onChange={onChangeText}
          className={classes.text}
          InputProps={{readOnly}}
        />
        <PictureControl
          readOnly={readOnly}
          onChange={onChangePicture}
          onDelete={onDeletePicture}
          className={classes.picture}
          picture={question?.picture}
        />
      </CardContent>
      <CardActions className={classes.actions}>
        <Typography
          variant="h6"
          children="Answer options"
        />
        <IconButton onClick={() => setAnswersExpanded(!answersExpanded)}>
          {answersExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </CardActions>
      <Collapse
        in={answersExpanded}
        timeout="auto"
      >
        <CardContent>
          <AnswerOptionsForm
            readOnly={readOnly}
            answers={question?.answers ?? {}}
            onChange={onChangeAnswers}
          />
        </CardContent>
      </Collapse>
    </Card>
  )
}

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex'
  },
  text: {
    marginRight: theme.spacing(2)
  },
  picture: {
    width: theme.spacing(32),
    height: theme.spacing(14)
  },
  headerBox: {
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    marginRight: 'auto'
  },
  headerControl: {
    marginRight: theme.spacing(2)
  },
  costInput: {
    width: theme.spacing(6),
    marginRight: theme.spacing(2)
  },
  actions: {
    paddingLeft: theme.spacing(4)
  }
}))
