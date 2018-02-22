// This is the entry point for the renderer process.
//
// Here we disable a few electron settings and mount the root component.
import * as React from "react"
import * as ReactDOM from "react-dom"
import { createBrowserHistory } from "history"
import { RouterStore, syncHistoryWithStore } from "mobx-react-router"
import { RootComponent } from "./app"
import { webFrame } from "electron"
import { cssRaw } from "typestyle";

cssRaw(`
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
`);

cssRaw(`
.material-icons.md-18 { font-size: 18px; }
.material-icons.md-24 { font-size: 24px; }
.material-icons.md-36 { font-size: 36px; }
.material-icons.md-48 { font-size: 48px; }

.material-icons.md-dark { color: rgba(0, 0, 0, 0.54); }
.material-icons.md-dark.md-inactive { color: rgba(0, 0, 0, 0.26); }

.material-icons.md-light { color: rgba(255, 255, 255, 1); }
.material-icons.md-light.md-inactive { color: rgba(255, 255, 255, 0.3); }
`);

const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()

const stores = {
  // Key can be whatever you want
  routing: routingStore,
  // ...other stores
}

const history = syncHistoryWithStore(browserHistory, routingStore)


webFrame.setVisualZoomLevelLimits(1, 1)
webFrame.setLayoutZoomLevelLimits(0, 0)


document.addEventListener("dragover", event => event.preventDefault())
document.addEventListener("drop", event => event.preventDefault())


ReactDOM.render(<RootComponent store={stores} history={history}/>, document.getElementById("root"))
