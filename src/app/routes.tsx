import * as React from "react"
import { Switch, Route } from "react-router"
import Canvas from "./views/pages/Diagram/Canvas"

export default () => (
  <Switch>
    <Route path="/second" component={Canvas} />
    <Route path="/" component={Canvas} />
  </Switch>
)
