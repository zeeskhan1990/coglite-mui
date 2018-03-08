import { palette } from "./views/theme/palette"
import { createMuiTheme } from "material-ui/styles"
import mobx, { observable, computed, action } from "mobx"

class UiStore {
  @observable theme = "myriad"

  constructor() {
    mobx.autorun(() => console.log(this.report))
  }

  @computed
  get getMuiTheme() {
    return createMuiTheme({
      palette: {
        primary: {
          main: palette.myriad.primary,
        },
        secondary: {
          main: palette.myriad.secondary,
        },
      },
    })
  }

  @computed
  get getRmwcPath() {
    return `assets/theme-${this.theme}.css`
  }

  report() {
    console.log("Current theme is " + this.theme)
  }

  @action
  updateTheme(theme) {
    this.theme = theme
  }
}

export const uiStore = new UiStore()
