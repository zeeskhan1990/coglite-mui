// This is the top-most component in the app.
import * as React from "react"
import { useStrict } from "mobx"
import { Provider, observer } from "mobx-react"
import { Router } from "react-router"
import { SynchronizedHistory } from "mobx-react-router"
import Reboot from "material-ui/Reboot"
import AppFrame from "./views/AppFrame"
import Routes from "./routes"
import { MuiThemeProvider } from "material-ui/styles"
import { StoreRoot } from "./stores/storeRoot"

// enable MobX strict mode
useStrict(true)

interface IRootType {
  store: StoreRoot
  history: SynchronizedHistory
}

@observer
export class RootComponent extends React.Component<IRootType, {}> {
  render() {
    const theme = this.props.store.uiStore.muiTheme
    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider theme={theme}>
          <Reboot />
          <AppFrame>
            <Router history={this.props.history}>
              <Routes />
            </Router>
          </AppFrame>
        </MuiThemeProvider>
      </Provider>
    )
  }
}
