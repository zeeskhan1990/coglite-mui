import { palette } from "./../views/theme/palette"
import { createMuiTheme } from "material-ui/styles"
import * as mobx from "mobx"
import { observable, computed, action } from "mobx"

class UiStore {
  @observable themeId = "myriad"

  constructor() {
    mobx.autorun(() => console.log(this.report))
  }

  @computed
  get muiTheme() {
    return createMuiTheme({
      palette: {
        primary: {
          main: palette[this.themeId].primary,
        },
        secondary: {
          main: palette[this.themeId].secondary,
        },
      },
    })
  }

  @computed
  get rmwcPath() {
    return `assets/theme-${this.themeId}.css`
  }

  report() {
    console.log("Current theme is " + this.themeId)
  }

  @action
  updateTheme(themeId) {
    this.themeId = themeId
  }
}

export { UiStore }
