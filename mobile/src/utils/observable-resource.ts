import {observable, action, computed} from 'mobx'

export enum ResourceStatus {
  Success = 'Success',
  Loading = 'Loading',
  Error = 'Error',
  NotAsked = 'NotAsked'
}

export class ObservableResource<D, E = object> {
  @observable status: ResourceStatus = ResourceStatus.NotAsked

  data = observable.box<D | null>(null)

  error = observable.box<E | null>(null)

  constructor() {
    this.data.observe((data) => {
      if (data.newValue !== null) {
        this.error.set(null)
      }
      if (this.status !== ResourceStatus.Success) {
        this.status = ResourceStatus.Success
      }
    })
    this.error.observe((error) => {
      if (error.newValue === null) return
      if (this.status !== ResourceStatus.Error) {
        this.status = ResourceStatus.Error
      }
    })
  }

  @action fetch = () => {
    this.status = ResourceStatus.Loading
  }

  @action clear = () => {
    this.status = ResourceStatus.NotAsked
    this.data.set(null)
    this.error.set(null)
  }

  @computed get loading() {
    return this.status === ResourceStatus.Loading
  }

  @computed get updating() {
    return this.status === ResourceStatus.Loading && this.data.get() !== null
  }
}
