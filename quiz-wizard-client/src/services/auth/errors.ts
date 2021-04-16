export enum AuthServiceErrorReason {
  UNKNOWN = 'UNKNOWN',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS'
}

export class AuthServiceError extends Error {

  constructor(public reason = AuthServiceErrorReason.UNKNOWN) {
    super(`[AuthServiceError]:reason=${reason}`)
  }

}

export const isAuthServiceError = (
  error: unknown,
  reason?: AuthServiceErrorReason
) =>  
  error instanceof AuthServiceError && 
  (!reason || error.reason === reason)

export const createUserAlreadyExistsError = () => 
  new AuthServiceError(AuthServiceErrorReason.USER_ALREADY_EXISTS)

export const isUserAlreadyExistsError = (error: unknown) => 
  isAuthServiceError(error, AuthServiceErrorReason.USER_ALREADY_EXISTS)

export const createInvalidCredentialsError = () => 
  new AuthServiceError(AuthServiceErrorReason.INVALID_CREDENTIALS)

export const isInvalidCredentialsError = (error: unknown) => 
  isAuthServiceError(error, AuthServiceErrorReason.INVALID_CREDENTIALS)