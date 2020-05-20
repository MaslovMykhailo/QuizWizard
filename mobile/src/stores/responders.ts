import {observable, computed, action} from 'mobx'
import {RespondersApi} from '@api'
import {ResourceStatus, ObservableResource, exist} from '@utils'
import {Responder, ResponderId} from '@types'

export class RespondersStore {
  private api: RespondersApi

  constructor(api: RespondersApi) {
    this.api = api
  }

  @observable status: ResourceStatus = ResourceStatus.Unknown

  @observable responders: ObservableResource<Responder>[] = []

  @action load = () => {
    this.status = ResourceStatus.Loading
    this.api
      .getResponders()
      .then((responders) => {
        this.status = ResourceStatus.Success
        this.responders = responders.map(
          (data) => new ObservableResource({data})
        )
      })
      .catch(() => {
        this.status = ResourceStatus.Error
      })
  }

  @action add = (responder: Responder) => {
    const responderResource = new ObservableResource({data: responder})
    this.responders.push(responderResource)

    responderResource.fetch()
    this.api
      .createResponder(responder)
      .then(() => {
        responderResource.success(responder)
      })
      .catch((error) => {
        responderResource.fail(error)
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
