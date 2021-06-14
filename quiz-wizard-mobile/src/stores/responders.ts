import {observable, computed, action, makeObservable, runInAction} from 'mobx'
import {RespondersApi} from '@api'
import {ResourceStatus, ObservableResource, exist} from '@utils'
import {Responder, ResponderId} from '@types'

export class RespondersStore {
  private api: RespondersApi

  constructor(api: RespondersApi) {
    makeObservable(this)
    this.api = api
  }

  @observable status: ResourceStatus = ResourceStatus.Unknown

  @observable responders: ObservableResource<Responder>[] = []

  @action load = () => {
    this.status = ResourceStatus.Loading
    this.api
      .getResponders()
      .then((responders) => {
        runInAction(() => {
          this.status = ResourceStatus.Success
          this.responders = responders.map(
            (data) => new ObservableResource({data})
          )
        })
      })
      .catch(() => {
        runInAction(() => {
          this.status = ResourceStatus.Error
        })
      })
  }

  @action create = (name: string, id?: ResponderId) => {
    if (id && this.responders.every((resource) => resource.data?.id !== id)) {
      this.add({id, name})
    } else {
      this.add({
        id: getResponderId(this.responderList.map((responder) => responder.id)),
        name
      })
    }
  }

  @action add = (responder: Responder) => {
    const responderResource = new ObservableResource({data: responder})
    this.responders.push(responderResource)

    responderResource.fetch()
    this.api
      .createResponder(responder)
      .then(() => {
        runInAction(() => {
          responderResource.success(responder)
        })
      })
      .catch((error) => {
        runInAction(() => {
          responderResource.fail(error)
        })
      })
  }

  getResponderById = (responderId: ResponderId) =>
    computed(
      () =>
        this.responders.find((responder) => responder.data?.id === responderId)
          ?.data
    ).get()

  @computed get responderList() {
    return this.responders
      .map((responder) => responder.data)
      .filter(exist)
      .sort((r1, r2) => r1.name.localeCompare(r2.name))
  }

  @computed get loaded() {
    return this.status === ResourceStatus.Success
  }

  @computed get someResponderLoading() {
    return this.responders.some((responder) => responder.loading)
  }
}

const getResponderId = (ids: ResponderId[]) => {
  const numIds = ids.map(Number)
  return getNextId(new Set(numIds), Math.min(0, ...numIds))
}

const getNextId = (ids: Set<number>, min = 0): ResponderId => {
  if (ids.has(min + 1)) {
    ids.delete(min)
    return getNextId(ids, Math.min(...ids))
  } else {
    return numberToResponderId(min + 1)
  }
}

const numberToResponderId = (numId: number): ResponderId => {
  const strId = String(numId)
  if (strId.length === 1) {
    return `0000${strId}`
  } else if (strId.length === 2) {
    return `000${strId}`
  } else if (strId.length === 3) {
    return `00${strId}`
  } else if (strId.length === 4) {
    return `0${strId}`
  } else {
    return strId
  }
}
