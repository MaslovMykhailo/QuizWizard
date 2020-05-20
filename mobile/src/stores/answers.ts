import {action, observable, computed} from 'mobx'
import {AnswersApi} from '@api'
import {ResourceStatus, ObservableResource, exist, sortByDate} from '@utils'
import {Answer, Quiz, UUID} from '@types'

import {QuizzesStore} from './quizzes'
import {RespondersStore} from './responders'

export class AnswersStore {
  private api: AnswersApi

  private quizzesStore: QuizzesStore
  private respondersStore: RespondersStore

  private answers: ObservableResource<Answer>[] = []

  constructor(
    api: AnswersApi,
    {quizzes, responders}: {quizzes: QuizzesStore; responders: RespondersStore}
  ) {
    this.api = api

    this.quizzesStore = quizzes
    this.respondersStore = responders
  }

  @observable status: ResourceStatus = ResourceStatus.Unknown

  @action load = () => {
    this.status = ResourceStatus.Loading

    this.quizzesStore.load()
    this.respondersStore.load()

    this.api
      .getAnswers()
      .then((answers) => {
        this.status = ResourceStatus.Success
        this.answers = answers.map(
          (answer) => new ObservableResource({data: answer})
        )
      })
      .catch(() => {
        this.status = ResourceStatus.Error
      })
  }

  @computed get loaded() {
    return (
      this.status === ResourceStatus.Success &&
      this.quizzesStore.loaded &&
      this.respondersStore.loaded
    )
  }

  getAnswerById = (answerId: UUID) =>
    computed(
      () =>
        this.answers.find((resource) => resource.data?.id === answerId)?.data
    ).get()

  getAnswersByQuiz = (quiz: Quiz) =>
    computed(() =>
      sortByDate(
        this.answers
          .map((resource) => resource.data)
          .filter(
            (answer): answer is Answer =>
              exist(answer) && answer.quizId === quiz.id
          ),
        'creationDate'
      ).reverse()
    ).get()

  @computed get answersList(): AnswersList {
    return this.quizzesStore.quizzesList.map((quiz) => ({
      quiz,
      data: this.getAnswersByQuiz(quiz)
    }))
  }

  @computed get someAnswerLoading() {
    return this.answers.some((resource) => resource.loading)
  }
}

export type AnswersList = Array<{quiz: Quiz; data: Answer[]}>
