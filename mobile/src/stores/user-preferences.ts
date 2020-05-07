import {observable, action} from 'mobx'
import {persist} from 'mobx-persist'
import {I18n, Language, getDeviceLanguage} from '@localization'
import {Theme} from '@types'

import {PersistedStore} from './types'

export class UserPreferences implements PersistedStore {
  private i18next: I18n

  constructor(i18next: I18n) {
    this.i18next = i18next
  }

  @persist @observable theme: Theme = 'light'
  @action setTheme = (theme: Theme) => {
    this.theme = theme
  }

  @persist @observable language: Language = getDeviceLanguage()
  @action setLanguage = (lng: Language) => {
    this.i18next.changeLanguage(lng).then(() => (this.language = lng))
  }

  onHydrate = () => {
    this.i18next.changeLanguage(this.language || getDeviceLanguage())
  }
}
