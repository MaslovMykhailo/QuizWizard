import {AnswerId} from 'quiz-wizard-schema'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import {AnswersByQuiz, AnswersByQuizList} from './answers-by-quiz-list'

export interface AnswersListProps {
  answersByQuizList: AnswersByQuiz[]
  onAnswerClick?: (answerId: AnswerId) => void
}

export function AnswersList({
  answersByQuizList,
  onAnswerClick
}: AnswersListProps) {
  return (
    <>
      {answersByQuizList.map((answersByQuiz) => (
        <Accordion key={answersByQuiz.quiz.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{answersByQuiz.quiz.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AnswersByQuizList
              onAnswerClick={onAnswerClick}
              answersByQuiz={answersByQuiz}
            />
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  )
}
