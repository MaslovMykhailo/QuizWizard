export const createPublisher = <P>() => {
  type L = (payload: P) => void
  const listeners = new Set<L>()
  return {
    listen: (listener: L) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    publish: (payload: P) => {
      Array.from(listeners)
        .forEach(listener => listener(payload))
    }
  }
}
