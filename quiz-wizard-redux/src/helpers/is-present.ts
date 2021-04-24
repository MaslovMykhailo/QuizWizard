export const isPresent = <T>(value: T): value is Exclude<T, undefined | null | ''> =>
  (value as unknown as string) !== '' && value !== undefined && value !== null
