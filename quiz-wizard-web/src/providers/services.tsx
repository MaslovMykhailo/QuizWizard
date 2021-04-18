import {createContext, useContext} from 'react'
import {Services} from 'quiz-wizard-client'

const services: Array<keyof Services> = [
  'auth'
]

export const ServicesContext = createContext<Services>(
  services.reduce(
    (emptyServices, serviceName) => {
      Object.defineProperty(emptyServices, serviceName, {
        get: () => {
          throw new Error('Services are not initialized')
        }
      })
      return emptyServices
    },
    {} as Services
  )
)

export const {
  Provider: ServicesProvider,
  Consumer: ServicesConsumer
} = ServicesContext

export const useServices = () => useContext(ServicesContext)

const createUseService = (service: keyof Services) =>
  () => useServices()[service]

export const [
  useAuthService
] = services.map(createUseService)
