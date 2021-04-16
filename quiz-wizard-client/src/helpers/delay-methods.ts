import {delay} from "./delay"

export const delayMethods = <T>(
  methods: T,
  latency = 250
): T => Object.entries(methods)
  .reduce(
    (methodMap, [methodName, method]) => {
      methodMap[methodName as keyof T] = (
        (...args: unknown[]) => delay(latency)
          .then(() => method(...args))
      ) as unknown as T[keyof T]
      return methodMap
    },
    methods
  )
