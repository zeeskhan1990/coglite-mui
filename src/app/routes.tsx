import * as React from "react"
import { Switch, Route } from "react-router"
import Dashboard from "./views/pages/Dashboard"

export default () => (
  <Switch>
    <Route path="/second" component={Dashboard} />
    <Route path="/" component={Dashboard} />
  </Switch>
)
