// This is the entry point for the renderer process.
//
// Here we disable a few electron settings and mount the root component.
import * as React from "react"
import * as ReactDOM from "react-dom"
import { createBrowserHistory } from "history"
import { RouterStore, syncHistoryWithStore } from "mobx-react-router"
import { RootComponent } from "./app"
import { webFrame } from "electron"
import { css } from "glamor"

``

import "glamor/reset" // CSS reset

const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()

const stores = {
  // Key can be whatever you want
  routing: routingStore,
  // ...other stores
}

const history = syncHistoryWithStore(browserHistory, routingStore)

css.global("html, body", {
  userSelect: "none",  // turn off text highlighting
  cursor: "default",  // reset the cursor pointer
  font: "caption",
  WebkitFontSmoothing: "subpixel-antialiased",
  textRendering: "optimizeLegibility",
})


webFrame.setVisualZoomLevelLimits(1, 1)
webFrame.setLayoutZoomLevelLimits(0, 0)


document.addEventListener("dragover", event => event.preventDefault())
document.addEventListener("drop", event => event.preventDefault())


ReactDOM.render(<RootComponent store={stores} history={history}/>, document.getElementById("root"))
