export const keyExtractor = <T extends {id: string}>(data: T) => data.id
