// This is the entry point for the renderer process.
//
// Here we disable a few electron settings and mount the root component.
import * as React from "react"
import * as ReactDOM from "react-dom"
import { createBrowserHistory } from "history"
import { RouterStore, syncHistoryWithStore } from "mobx-react-router"
import { App } from "./app"
import { webFrame } from "electron"
import { Provider } from "mobx-react"
import { StoreRoot } from "./stores/storeRoot"
const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()

const store = new StoreRoot()

const history = syncHistoryWithStore(browserHistory, routingStore)

webFrame.setVisualZoomLevelLimits(1, 1)
webFrame.setLayoutZoomLevelLimits(0, 0)

document.addEventListener("dragover", event => event.preventDefault())
document.addEventListener("drop", event => event.preventDefault())

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById("root"),
)
