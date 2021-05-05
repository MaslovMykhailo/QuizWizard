export const RECOGNITION_ERROR_REASON = 'IncorrectRecognitionPayload'

export class RecognitionError extends Error {

  reason = RECOGNITION_ERROR_REASON

  constructor(message = `RecognitionLayer: ${RECOGNITION_ERROR_REASON}`) {
    super(message)
  }

}

export const isRecognitionError = (error?: unknown) =>
  error instanceof RecognitionError || (
    error && typeof error === 'object' &&
    (error as Record<string, unknown>).reason === RECOGNITION_ERROR_REASON
  )
