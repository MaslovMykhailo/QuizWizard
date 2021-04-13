/**
 * @note userId could be possible to extract from facebook token
 * @header Authorization: token
 * https://graph.facebook.com/v7.0/me?token={token_from_auth_header}
 */

/**
 * @note Requests for quizzes
 *
 * @path api/quizzes/
 * @method GET
 * @response Quiz[]
 * @comment Get list of quizzes created by user
 *
 * @path api/quiz/
 * @method POST
 * @body Quiz
 * @response UUID
 * @comment Create quiz
 *
 * @path api/quiz/{quizId} @param quizId: UUID
 * @method DELETE
 * @response UUID
 * @comment Delete quiz
 */

/**
 * @note Requests for answers
 *
 * @path api/answers/
 * @method GET
 * @response Answer[]
 * @comment Get list of answers created by user
 *
 * @path api/answer/
 * @method POST
 * @body Answer
 * @response UUID
 * @comment Create answer
 *
 * @path api/answer/{answerId} @param answerId: UUID
 * @method DELETE
 * @response UUID
 * @comment Delete answer
 */

/**
 * @note Requests for responders
 *
 * @path api/responders/
 * @method GET
 * @response Responder[]
 * @comment Get list of responders by user
 *
 * @path api/responder/
 * @method POST
 * @body Responder
 * @response UUID
 * @comment Create responder
 *
 * @path api/responder/{responderId} @param responderId: UUID
 * @method DELETE
 * @response UUID
 * @comment Delete responder
 */

export type UUID = string

type AnswerOption = 'A' | 'B' | 'C' | 'D' | 'E'

type AnswerOptions = AnswerOption[]

type Quiz = {
  id: UUID
  name: string
  answers: AnswerOptions[]
  creationDate: Date
}

type Answer = {
  id: UUID
  name: string
  answers: AnswerOptions[]
  responderId?: ResponderId
  quizId: UUID
  creationDate: Date
  pictureUrl: string
}

type ResponderId = string

type Responder = {
  id: ResponderId
  name: string
}
