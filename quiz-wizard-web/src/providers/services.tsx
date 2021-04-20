import {createContext, useContext} from 'react'
import {Services} from 'quiz-wizard-client'

const services: Array<keyof Services> = [
  'auth',
  'preferences'
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

const createUseService = <K extends keyof Services>(service: K) =>
  () => useServices()[service]

export const useAuthService = createUseService('auth')
export const usePreferencesService = createUseService('preferences')
