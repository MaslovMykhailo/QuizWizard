import {SerializedError} from '@reduxjs/toolkit'

export const newResourceId = '$new'

export type Resource<D, E = SerializedError> = {
  data?: D
  error?: E
  status:
  | 'pending'
  | 'creating'
  | 'deleting'
  | 'fulfilled'
  | 'rejected'
}

export const pending = <D, E>(
  resource?: Resource<D, E>
): Resource<D, E> => ({
  ...resource,
  status: 'pending'
})

export const creating = <D, E>(
  resource?: Partial<Resource<D, E>>
): Resource<D, E> => ({
  ...resource,
  status: 'creating'
})

export const deleting = <D, E>(
  resource?: Resource<D, E>
): Resource<D, E> => ({
  ...resource,
  status: 'deleting'
})

export const fulfilled = <D, E>(
  resource?: Resource<D, E>,
  data?: D
): Resource<D, E> => ({
  ...resource,
  status: 'fulfilled',
  data
})

export const rejected = <D, E>(
  resource?: Resource<D, E>,
  error?: E
): Resource<D, E> => ({
  ...resource,
  status: 'rejected',
  error
})

export const isPending = <D, E>(
  resource?: Resource<D, E>
) => Boolean(resource && resource.status === 'pending')

export const isCreating = <D, E>(
  resource?: Resource<D, E>
) => Boolean(resource && resource.status === 'creating')

export const isDeleting = <D, E>(
  resource?: Resource<D, E>
) => Boolean(resource && resource.status === 'deleting')

export const isFulfilled = <D, E>(
  resource?: Resource<D, E>
) => Boolean(resource && resource.status === 'fulfilled')

export const isRejected = <D, E>(
  resource?: Resource<D, E>
) => Boolean(resource && resource.status === 'rejected')

export const getData = <D>(
  resource?: Resource<D, unknown>
) => resource?.data

export const getError = <E>(
  resource?: Resource<unknown, E>
) => resource?.error
