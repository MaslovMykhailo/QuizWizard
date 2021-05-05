import {RecognitionError} from './errors'
import {RecognitionLayer, RecognitionPayload} from './types'

export const isRecognitionPayload = (
  payload: unknown
): payload is RecognitionPayload =>
  typeof payload === 'object' && payload !== null &&
  'student' in payload && 'answers' in payload &&
  Array.isArray((payload as Record<'student', number[]>).student) &&
  Array.isArray((payload as Record<'answers', number[]>).answers)

export const createRecognitionLayer = (
  baseUrl = 'http://localhost:5000'
): RecognitionLayer => {
  const recognize = (sheet: string) => {
    const query = `sheet=${sheet}`
    return fetch(`${baseUrl}/recognize?${query}`)
      .then((response) => response.json())
      .then((payload) => {
        if (!isRecognitionPayload(payload)) {
          throw new RecognitionError()
        }
        return payload
      })
  }

  return {recognize}
}
