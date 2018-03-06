// This is the entry point for the renderer process.
//
// Here we disable a few electron settings and mount the root component.
import * as React from "react"
import * as ReactDOM from "react-dom"
import { createBrowserHistory } from "history"
import { RouterStore, syncHistoryWithStore } from "mobx-react-router"
import { RootComponent } from "./app"
import { webFrame } from "electron"
import { observable } from "mobx"
import { customCss } from "./assets/*.scss"

//@import url('node_modules/@material/button/dist/mdc.button.min.css')

let uiState = observable({
  theme: "velocity",
})

const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()

const stores = {
  // Key can be whatever you want
  routing: routingStore,
  uiState: uiState,
  // ...other stores
}

const history = syncHistoryWithStore(browserHistory, routingStore)

webFrame.setVisualZoomLevelLimits(1, 1)
webFrame.setLayoutZoomLevelLimits(0, 0)

document.addEventListener("dragover", event => event.preventDefault())
document.addEventListener("drop", event => event.preventDefault())

ReactDOM.render(<RootComponent store={stores} history={history} />, document.getElementById("root"))
