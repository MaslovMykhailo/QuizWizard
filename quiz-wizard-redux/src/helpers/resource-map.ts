
import {fulfilled, Resource} from './resource'

export const fulfilledResourceMap = <T extends {id: string}>(
  resourceMap: Record<string, Resource<T> | undefined>,
  data: T[]
) => data.reduce(
  (map, item) => {
    map[item.id] = fulfilled(map[item.id], item)
    return map
  },
  resourceMap
)

