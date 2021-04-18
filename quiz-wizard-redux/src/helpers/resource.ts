export type PendingResource = {
  status: 'pending'
}

export type FulfilledResource<D> = {
  data?: D
  status: 'fulfilled'
}

export type RejectedResource<E> = {
  error?: E
  status: 'rejected'
}

export type Resource<D, E = Error> =
  | PendingResource
  | FulfilledResource<D>
  | RejectedResource<E>

export const pending = <D, E, R extends Resource<D, E>>(
  resource: R
): R => ({
  ...resource,
  status: 'pending'
})

export const fulfilled = <D, E, R extends Resource<D, E>>(
  resource: R,
  data?: D
): R => ({
  ...resource,
  status: 'fulfilled',
  data
})

export const rejected = <D, E, R extends Resource<D, E>>(
  resource: R,
  error?: D
): R => ({
  ...resource,
  status: 'rejected',
  error
})

export const isPending = <D, E>(
  resource: Resource<D, E>
): resource is PendingResource =>
  resource.status === 'pending'

export const isFulfilled = <D, E>(
  resource: Resource<D, E>
): resource is FulfilledResource<D> =>
  resource.status === 'fulfilled'

export const isRejected = <D, E>(
  resource: Resource<D, E>
): resource is RejectedResource<E> =>
  resource.status === 'rejected'
