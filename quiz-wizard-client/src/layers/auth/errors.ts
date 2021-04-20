export const NOT_AUTHORIZED_ERROR_REASON = 'NotAuthorized'

export class NotAuthorizedError extends Error {

  reason = NOT_AUTHORIZED_ERROR_REASON

  constructor(message = `AuthLayer: ${NOT_AUTHORIZED_ERROR_REASON}`) {
    super(message)
  }

}

export const isNotAuthorizedError = (error?: unknown) =>
  error instanceof NotAuthorizedError || (
    error && typeof error === 'object' &&
    (error as Record<string, unknown>).reason === NOT_AUTHORIZED_ERROR_REASON
  )
