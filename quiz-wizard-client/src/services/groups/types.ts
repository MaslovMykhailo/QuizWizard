import type {GroupId, GroupSchema, NewGroupSchema} from 'quiz-wizard-schema'

export interface GroupsService {
  getGroup: (groupId: GroupId) => Promise<GroupSchema | undefined>
  updateGroup: (groupId: GroupId, group: Partial<GroupSchema>) => Promise<GroupSchema>
  createGroup: (group: NewGroupSchema) => Promise<GroupSchema>
  deleteGroup: (groupId: GroupId) => Promise<void>
  getGroups: () => Promise<GroupSchema[]>
}
