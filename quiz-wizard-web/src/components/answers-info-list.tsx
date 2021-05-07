import {useTranslation} from 'react-i18next'
import {AnswerId, AnswerSchema, StudentSchema} from 'quiz-wizard-schema'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Typography from '@material-ui/core/Typography'

import {StudentAvatar} from './student-avatar'

export interface AnswerInfo {
  student?: StudentSchema
  answer: AnswerSchema
}

export interface AnswerInfoListProps {
  answersInfo: AnswerInfo[]
  onAnswerClick?: (answerId: AnswerId) => void
  listClassName?: string
  itemClassName?: string
}

export function AnswerInfoList({
  answersInfo,
  itemClassName,
  listClassName,
  onAnswerClick
}: AnswerInfoListProps) {
  const [t] = useTranslation()
  return (
    <List
      component="div"
      disablePadding
      className={listClassName}
    >
      {answersInfo.map(({answer, student}) => (
        <ListItem
          key={`${answer.id}-${student?.id ?? 'anonym'}`}
          button={Boolean(onAnswerClick) as true}
          onClick={onAnswerClick && (() => onAnswerClick?.(answer.id))}
          className={itemClassName}
        >
          <ListItemIcon>
            <StudentAvatar
              firstName={student?.firstName}
              lastName={student?.lastName}
            />
          </ListItemIcon>
          <ListItemText
            primary={student ? `${student.firstName} ${student.lastName}` : t('ANONYM_STUDENT')}
            secondary={`${t('CHECK_DATE')} ${new Date(answer.creationDate).toLocaleDateString()}`}
          />
          <ListItemSecondaryAction>
            <Typography >
              {`${t('ANSWER_RESULT')} ${Math.round(answer.result * 100)}%`}
            </Typography>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}
