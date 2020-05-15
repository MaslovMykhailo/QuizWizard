import {action, computed} from 'mobx'
import {ObservableResource, sortByDate} from '@utils'
import {Quiz, UUID} from '@types'
import {QuizzesApi} from '@api'

export class QuizzesStore {
  private api: QuizzesApi

  constructor(api: QuizzesApi) {
    this.api = api
  }

  quizzes = new ObservableResource<Quiz[]>()

  @action load = () => {
    this.quizzes.fetch()
    this.api
      .getQuizzes()
      .then((quizzes) => {
        this.quizzes.success(quizzes)
      })
      .catch((error) => {
        this.quizzes.fail(error)
      })
  }

  @action add = (quiz: Quiz) => {
    this.quizzes.success([...(this.quizzes.data ?? []), quiz], false)
    this.api.createQuiz(quiz).catch((error) => this.quizzes.fail(error))
  }

  @action remove = (quizId: UUID) => {
    this.quizzes.success(
      [...(this.quizzes.data?.filter(({id}) => id !== quizId) ?? [])],
      false
    )
    this.api.deleteQuiz(quizId).catch((error) => this.quizzes.fail(error))
  }

  getQuizById = (quizId: UUID) =>
    computed(() => {
      if (!this.quizzes.data) {
        return null
      }

      return this.quizzes.data.find(({id}) => id === quizId) ?? null
    })

  @computed get quizzesList() {
    if (!this.quizzes.data) {
      return []
    }

    return sortByDate(this.quizzes.data, 'creationDate')
  }
}
