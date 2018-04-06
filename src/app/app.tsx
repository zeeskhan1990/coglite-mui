// This is the top-most component in the app.
import * as React from "react"
import { useStrict } from "mobx"
import { Provider, observer } from "mobx-react"
import { Router } from "react-router"
import { SynchronizedHistory } from "mobx-react-router"
import Reboot from "material-ui/Reboot"
import AppFrame from "./views/AppFrame"
import Routes from "./routes"
import { StoreRoot } from "./stores/storeRoot"
import { ThemeProvider } from "react-jss"

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
        <ThemeProvider theme={theme}>
          <div id="rootBlock">
            <Reboot />
            <AppFrame>
              <Router history={this.props.history}>
                <Routes />
              </Router>
            </AppFrame>
            <link rel="stylesheet" type="text/css" href={this.props.store.uiStore.rmwcPath} />
          </div>
        </ThemeProvider>
      </Provider>
    )
  }
}
