// This is the top-most component in the app.
import * as React from "react"
import { useStrict } from "mobx"
import { Provider } from "mobx-react"
import { Router } from "react-router"
import { SynchronizedHistory } from "mobx-react-router"
//import { styles, colors } from "./views/theme"
import Reboot from "material-ui/Reboot"
import AppFrame from "./views/AppFrame"
import Routes from "./routes"
import { MuiThemeProvider, createMuiTheme, Theme } from "material-ui/styles"
import { palette } from "./views/theme/palette"

const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: palette.myriad.primary,
    },
    secondary: {
      main: palette.myriad.secondary,
    },
  },
})

// enable MobX strict mode
useStrict(true)

interface IRootType {
  store: any
  history: SynchronizedHistory
}

export function RootComponent({ store, history }: IRootType) {
  return (
    <Provider {...store}>
      <MuiThemeProvider theme={theme}>
        <Reboot />
        <AppFrame>
          <Router history={history}>
            <Routes />
          </Router>
        </AppFrame>
      </MuiThemeProvider>
    </Provider>
  )
}
