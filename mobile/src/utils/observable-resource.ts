import {observable, action, computed} from 'mobx'

export enum ResourceStatus {
  Success = 'Success',
  Loading = 'Loading',
  Error = 'Error',
  Unknown = 'Unknown'
}

export class ObservableResource<D, E = object> {
  @observable status: ResourceStatus = ResourceStatus.Unknown

  private dataRecord = observable.box<D | null>(null)

  private errorRecord = observable.box<E | null>(null)

  constructor({data, error}: {data?: D; error?: E} = {}) {
    if (error !== undefined) {
      this.errorRecord.set(error)
      this.status = ResourceStatus.Error
    }

    if (data !== undefined) {
      this.dataRecord.set(data)
      this.status = ResourceStatus.Success
    }
  }

  @action success = (data: D) => {
    this.dataRecord.set(data)
    this.status = ResourceStatus.Success
  }

  @action notFound = () => {
    this.dataRecord.set(null)
    this.status = ResourceStatus.Success
  }

  @action fail = (error: E) => {
    this.errorRecord.set(error)
  }

  @action fetch = () => {
    this.status = ResourceStatus.Loading
  }

  @action clear = () => {
    this.status = ResourceStatus.Unknown
    this.dataRecord.set(null)
    this.errorRecord.set(null)
  }

  @computed get data() {
    return this.dataRecord.get()
  }

  @computed get error() {
    return this.errorRecord.get()
  }

  @computed get initialized() {
    return this.status !== ResourceStatus.Unknown
  }

  @computed get loading() {
    return this.status === ResourceStatus.Loading
  }

  @computed get updating() {
    return (
      this.status === ResourceStatus.Loading && this.dataRecord.get() !== null
    )
  }
}
