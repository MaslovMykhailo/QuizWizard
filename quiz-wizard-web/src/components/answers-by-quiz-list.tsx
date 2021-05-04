import {useState} from 'react'
import {AnswerId, GroupSchema, QuizSchema} from 'quiz-wizard-schema'
import ListSubheader from '@material-ui/core/ListSubheader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import GroupIcon from '@material-ui/icons/Group'
import {makeStyles} from '@material-ui/core/styles'

import {AnswerInfo, AnswerInfoList} from './answers-info-list'

export interface AnswersByQuiz {
  quiz: QuizSchema
  answersByGroup: AnswersByGroup[]
}

export interface AnswersByQuizListProps {
  answersByQuiz: AnswersByQuiz
  onAnswerClick?: (answerId: AnswerId) => void
}

export function AnswersByQuizList({
  answersByQuiz,
  onAnswerClick
}: AnswersByQuizListProps) {
  const classes = useStyles()
  return (
    <List
      component="nav"
      className={classes.list}
      subheader={
        <ListSubheader className={classes.subheader}>
          {
            answersByQuiz.answersByGroup.length ?
              `Answers by quiz: ${answersByQuiz.quiz.name}` :
              'No answers'
          }
          {
            answersByQuiz.answersByGroup.length > 0 && (
              <Typography
                variant="subtitle2"
                className={classes.totalCount}
                children={`Answers count: ${answersByQuiz.answersByGroup.length}`}
              />
            )
          }
        </ListSubheader>
      }
    >
      {answersByQuiz.answersByGroup.map((answersByGroup) => (
        <AnswerByGroupListItem
          key={answersByGroup.group?.id ?? 'no-group'}
          answersByGroup={answersByGroup}
          onAnswerClick={onAnswerClick}
        />
      ))}
    </List>
  )
}

export interface AnswersByGroup {
  group?: GroupSchema
  answers: AnswerInfo[]
}

interface AnswerByGroupListItemProps {
  answersByGroup: AnswersByGroup
  onAnswerClick?: (answerId: AnswerId) => void
}

function AnswerByGroupListItem({
  answersByGroup,
  onAnswerClick
}: AnswerByGroupListItemProps) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  return (
    <>
      <ListItem
        button
        onClick={() => setOpen(!open)}
      >
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary={answersByGroup.group ? answersByGroup.group.name : 'No group'} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
      >
        <AnswerInfoList
          answersInfo={answersByGroup.answers}
          listClassName={classes.list}
          itemClassName={classes.nestedItem}
          onAnswerClick={onAnswerClick}
        />
      </Collapse>
    </>
  )
}

const useStyles = makeStyles((theme) =>({
  list: {
    width: '100%'
  },
  nestedItem: {
    paddingLeft: theme.spacing(4)
  },
  subheader: {
    display: 'flex',
    alignItems: 'center'
  },
  totalCount: {
    marginLeft: 'auto'
  }
}))
