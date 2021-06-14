import {observable, action, runInAction, makeObservable} from 'mobx'
import {persist} from 'mobx-persist'
import {I18n, Language, getDeviceLanguage} from '@localization'
import {Theme} from '@types'

import {PersistedStore} from './types'

export class UserPreferencesStore implements PersistedStore {
  private i18next: I18n

  @observable initializing: boolean

  constructor(i18next: I18n) {
    makeObservable(this)
    this.i18next = i18next
    this.initializing = true
  }

  @persist @observable theme: Theme = 'light'
  @action setTheme = (theme: Theme) => {
    this.theme = theme
  }

  @persist @observable language: Language = getDeviceLanguage()
  @action setLanguage = (lng: Language) => {
    this.i18next.changeLanguage(lng).then(() => runInAction(() => (this.language = lng)))
  }

  onHydrate = () => {
    const lng = this.language || getDeviceLanguage()
    this.i18next.changeLanguage(lng).then(() => {
      runInAction(() => {
        this.language = lng
        this.initializing = false
      })
    })
  }
}
