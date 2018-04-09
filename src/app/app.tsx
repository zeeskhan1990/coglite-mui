// This is the top-most component in the app.
import * as React from "react"
import { useStrict } from "mobx"
import { observer, inject } from "mobx-react"
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
  store?: StoreRoot
  history: SynchronizedHistory
}

@inject("store")
@observer
export class App extends React.Component<IRootType, {}> {
  render() {
    const { store } = this.props as IRootType
    //const theme = store.uiStore.muiTheme
    const rmwcPath = store.uiStore.rmwcPath
    return (
      <ThemeProvider theme={store.uiStore.muiTheme}>
        <div id="rootBlock">
          <Reboot />
          <AppFrame>
            <Router history={this.props.history}>
              <Routes />
            </Router>
          </AppFrame>
          <link rel="stylesheet" type="text/css" href={rmwcPath} />
        </div>
      </ThemeProvider>
    )
  }
}
