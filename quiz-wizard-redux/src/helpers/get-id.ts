export const getId = <T extends {id: unknown}>(
  target: T
): T['id'] => target.id
