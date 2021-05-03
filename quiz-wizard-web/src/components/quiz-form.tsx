import {v4 as uuid} from 'uuid'
import isEqual from 'lodash/isEqual'
import {useCallback, useState} from 'react'
import {DragDropContext, Droppable, Draggable, DropResult} from 'react-beautiful-dnd'
import {NewQuizSchema, QuestionId, QuestionSchema, QuizSchema} from 'quiz-wizard-schema'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import AddIcon from '@material-ui/icons/Add'
import {makeStyles} from '@material-ui/core/styles'

import {useInputState} from '../hooks'
import {reorder} from '../helpers'

import {BackButton} from './back-button'
import {FormControls} from './form-controls'
import {QuestionForm} from './question-form'

export interface QuizFormProps {
  readOnly?: boolean
  quiz?: QuizSchema
  onSave?: (quiz: QuizSchema) => void
  onCreate?: (quiz: NewQuizSchema) => void
  onCancel?: () => void
  onDelete?: () => void
}

export function QuizForm({
  readOnly,
  quiz,
  onSave,
  onCreate,
  onCancel,
  onDelete
}: QuizFormProps) {
  const [quizName, onChangeQuizName] = useInputState(quiz?.name)
  const [quizDescription, onChangeQuizDescription] = useInputState(quiz?.description)
  const [questionsOrder, onChangeQuestionsOrder] = useState(quiz?.questionsOrder)
  const [questions, onChangeQuestions] = useState(quiz?.questions ?? {})

  const onAddQuestion = () => {
    const questionId = uuid()
    onChangeQuestionsOrder([...(questionsOrder ?? []), questionId])
    onChangeQuestions({
      ...questions,
      [questionId]: {
        id: questionId,
        text: '',
        cost: 1,
        answers: {}
      }
    })
  }

  const onDeleteQuestion = (questionId: QuestionId) => {
    const changedQuestions = {...questions}
    delete changedQuestions[questionId]
    onChangeQuestionsOrder(questionsOrder?.filter((id) => id !== questionId))
    onChangeQuestions(changedQuestions)
  }

  const hasChanges =
    quizName !== quiz?.name ||
    quizDescription !== quiz?.description ||
    !isEqual(questionsOrder, quiz?.questionsOrder) ||
    !isEqual(questions, quiz?.questions)

  const isValid =
    quizName &&
    questionsOrder &&
    questionsOrder?.length > 0

  const handleOnSave = () => quiz && onSave?.({
    ...quiz,
    name: quizName!,
    description: quizDescription
  })

  const handleOnCreate = () => onCreate?.({
    id: uuid(),
    name: quizName!,
    description: quizDescription,
    questionsOrder: questionsOrder ?? [],
    questions: questions ?? {}
  })

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
            children={quiz ? 'Quiz info' : 'New quiz'}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        direction="column"
        spacing={4}
      >
        <Grid item>
          <TextField
            variant="outlined"
            label="Quiz name"
            fullWidth
            value={quizName}
            error={!quizName}
            onChange={onChangeQuizName}
            required
            InputProps={{readOnly}}
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            label="Quiz description"
            fullWidth
            multiline
            value={quizDescription}
            onChange={onChangeQuizDescription}
            InputProps={{readOnly}}
          />
        </Grid>
        <Grid item>
          <QuestionList
            readOnly={readOnly}
            order={questionsOrder}
            onChangeOrder={onChangeQuestionsOrder}
            questions={questions}
            onChangeQuestions={onChangeQuestions}
            onAddQuestion={onAddQuestion}
            onDeleteQuestion={onDeleteQuestion}
          />
        </Grid>
        <FormControls
          onSave={!readOnly ? onSave && handleOnSave : undefined}
          saveDisabled={!hasChanges || !isValid}
          onCreate={!readOnly ? onCreate && handleOnCreate : undefined}
          createDisabled={!hasChanges || !isValid}
          onCancel={onCancel}
          onDelete={onDelete}
        />
      </Grid>
    </Grid>
  )
}

interface QuestionListProps {
  readOnly?: boolean
  order?: QuestionId[]
  onChangeOrder?: (order: QuestionId[]) => void
  questions: Record<QuestionId, QuestionSchema>
  onChangeQuestions?: (questions: Record<QuestionId, QuestionSchema>) => void
  onAddQuestion?: () => void
  onDeleteQuestion?: (questionId: QuestionId) => void
}

function QuestionList({
  readOnly,
  order = [],
  onChangeOrder,
  questions,
  onChangeQuestions,
  onAddQuestion,
  onDeleteQuestion
}: QuestionListProps) {
  const classes = useStyles()

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return
      }

      onChangeOrder?.(
        reorder(
          order,
          result.source.index,
          result.destination.index
        )
      )
    },
    [order, onChangeOrder]
  )

  const createOnChangeQuestion = (questionId: string) =>
    (question: QuestionSchema) => onChangeQuestions?.({
      ...questions,
      [questionId]: {
        ...questions[questionId],
        ...question
      }
    })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box>
        <Typography
          variant="h4"
          children="Quiz questions"
        />
        <Droppable droppableId="droppable">
          {(droppableProvided) => (
            <div
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
            >
              {order?.map((questionId, index) => (
                <Draggable
                  key={questionId}
                  draggableId={questionId}
                  index={index}
                >
                  {(draggableProvided) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <QuestionForm
                        readOnly={readOnly}
                        className={classes.question}
                        question={questions[questionId]}
                        onChange={createOnChangeQuestion(questionId)}
                        onDelete={() => onDeleteQuestion?.(questionId)}
                        index={index + 1}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
        {(order && order?.length < 30 && !readOnly) && (
          <Paper>
            <ListItem
              button
              className={classes.addQuestion}
              onClick={onAddQuestion}
              children={<AddIcon fontSize="large" />}
            />
          </Paper>
        )}
      </Box>
    </DragDropContext>
  )
}

const useStyles = makeStyles((theme) => ({
  question: {
    marginTop: theme.spacing(2)
  },
  addQuestion: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  }
}))

