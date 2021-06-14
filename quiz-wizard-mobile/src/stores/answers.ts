import {action, observable, computed, makeObservable, runInAction} from 'mobx'
import {AnswersApi} from '@api'
import {
  ResourceStatus,
  ObservableResource,
  exist,
  sortByDate,
  checkQuiz
} from '@utils'
import {Answer, Quiz, UUID} from '@types'

import {QuizzesStore} from './quizzes'
import {RespondersStore} from './responders'

export class AnswersStore {
  private api: AnswersApi

  private quizzesStore: QuizzesStore
  private respondersStore: RespondersStore

  @observable answers: ObservableResource<Answer>[] = []
  @observable pendingAnswers: ObservableResource<Answer>[] = []

  constructor(
    api: AnswersApi,
    {quizzes, responders}: {quizzes: QuizzesStore; responders: RespondersStore}
  ) {
    makeObservable(this)
    this.api = api

    this.quizzesStore = quizzes
    this.respondersStore = responders
  }

  @observable status: ResourceStatus = ResourceStatus.Unknown

  @action load = () => {
    this.status = ResourceStatus.Loading

    this.api
      .getAnswers()
      .then((answers) => {
        runInAction(() => {
          this.status = ResourceStatus.Success
          this.answers = answers.map(
            (answer) => new ObservableResource({data: answer})
          )

          this.quizzesStore.load()
          this.respondersStore.load()
        })
      })
      .catch(() => {
        runInAction(() => {
          this.status = ResourceStatus.Error
        })
      })
  }

  @action add = (answer: Answer) => {
    if (
      this.respondersStore.responderList.every(
        (responder) => responder.id !== answer.responderId
      )
    ) {
      delete answer.responderId
    }

    const answerResource = new ObservableResource({data: answer})
    this.answers.push(answerResource)

    answerResource.fetch()
    this.api
      .createAnswer(answer)
      .then(() => {
        runInAction(() => {
          answerResource.success(answer)
        })
      })
      .catch((error) => {
        runInAction(() => {
          answerResource.fail(error)
        })
      })
  }

  @action remove = (answerId: UUID) => {
    const index = this.answers.findIndex(
      (resource) => resource.data?.id === answerId
    )
    const [answerResource] = this.answers.splice(index, 1)
    this.pendingAnswers.push(answerResource)

    answerResource.fetch()
    this.api
      .deleteAnswer(answerId)
      .then(() => {
        runInAction(() => {
          this.pendingAnswers = this.pendingAnswers.filter(
            (resource) => resource !== answerResource
          )
        })
      })
      .catch((error) => {
        runInAction(() => {
          answerResource.fail(error)
        })
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

  getCheckedAnswers = (answerId: UUID) =>
    computed(() => {
      const answer = this.getAnswerById(answerId)
      if (!answer) {
        return
      }

      const quiz = this.quizzesStore.getQuizById(answer.quizId)
      if (!quiz) {
        return
      }

      return checkQuiz(quiz.answers.slice(), answer.answers.slice())
    }).get()

  @computed get answersList(): AnswersList {
    return this.quizzesStore.quizzesList
      .map((quiz) => ({
        quiz,
        data: this.getAnswersByQuiz(quiz)
      }))
      .filter((answers) => answers.data.length)
  }

  @computed get someAnswerLoading() {
    return (
      this.answers.some(resourceLoading) ||
      this.pendingAnswers.some(resourceLoading)
    )
  }
}

const resourceLoading = (resource: ObservableResource<Answer>) =>
  resource.loading

export type AnswersList = Array<{quiz: Quiz; data: Answer[]}>
