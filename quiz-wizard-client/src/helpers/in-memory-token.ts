export type TokenPayload = {
  email: string
}

export const createToken = (payload: TokenPayload) => Object.entries(payload)
    .map(([key, value]) => `${key}:${value}`)
    .join('|')

export const parseToken = (token: string): TokenPayload => token
      .split('|')
      .reduce(
        (payload, pair) => {
          const [key, value] = pair.split(':')
          payload[key as keyof TokenPayload] = value
          return payload
        },
        {} as TokenPayload
      )