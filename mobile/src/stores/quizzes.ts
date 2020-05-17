import {action, computed, observable} from 'mobx'
import {ObservableResource, sortByDate, ResourceStatus, exist} from '@utils'
import {Quiz, UUID} from '@types'
import {QuizzesApi} from '@api'

export class QuizzesStore {
  private api: QuizzesApi

  constructor(api: QuizzesApi) {
    this.api = api
  }

  @observable status: ResourceStatus = ResourceStatus.Unknown

  @observable quizzes: ObservableResource<Quiz>[] = []

  @observable pendingQuizzes: ObservableResource<Quiz>[] = []

  @action load = () => {
    this.status = ResourceStatus.Loading
    this.api
      .getQuizzes()
      .then((quizzes) => {
        this.status = ResourceStatus.Success
        this.quizzes = quizzes.map((data) => new ObservableResource({data}))
      })
      .catch(() => {
        this.status = ResourceStatus.Error
      })
  }

  @action add = (quiz: Quiz) => {
    const quizResource = new ObservableResource({data: quiz})
    this.quizzes.push(quizResource)

    quizResource.fetch()
    this.api
      .createQuiz(quiz)
      .then(() => {
        quizResource.success(quiz)
      })
      .catch((error) => {
        quizResource.fail(error)
      })
  }

  @action remove = (quizId: UUID) => {
    const index = this.quizzes.findIndex(
      (resource) => resource.data?.id === quizId
    )
    const [quizResource] = this.quizzes.splice(index, 1)
    this.pendingQuizzes.push(quizResource)

    quizResource.fetch()
    this.api
      .deleteQuiz(quizId)
      .then(() => {
        this.pendingQuizzes = this.pendingQuizzes.filter(
          (resource) => resource !== quizResource
        )
      })
      .catch((error) => {
        quizResource.fail(error)
      })
  }

  getQuizById = (quizId: UUID) =>
    computed(
      () => this.quizzes.find((resource) => resource.data?.id === quizId)?.data
    ).get()

  @computed get quizzesList() {
    return sortByDate(
      this.quizzes.map((resource) => resource.data).filter(exist),
      'creationDate'
    ).reverse()
  }

  @computed get loaded() {
    return this.status === ResourceStatus.Success
  }

  @computed get someQuizLoading() {
    return (
      this.quizzes.some(isQuizLoading) ||
      this.pendingQuizzes.some(isQuizLoading)
    )
  }
}

const isQuizLoading = (resource: ObservableResource<Quiz>) => resource.loading
