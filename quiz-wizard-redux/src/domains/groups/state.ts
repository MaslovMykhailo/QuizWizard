import {GroupId, GroupSchema} from 'quiz-wizard-schema'

import {Resource} from '../../helpers'

export interface GroupsState {
  ids: Resource<GroupId[]>
  data: Record<GroupId, Resource<GroupSchema> | undefined>
}
