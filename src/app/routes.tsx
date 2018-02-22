import * as React from "react"
import { Switch, Route } from "react-router"
import {DogTab} from './views/pages/DogPage';
import {LongTab} from './views/pages/ParagraphPage';

export default () => (
    <Switch>
      <Route path="/second" component={LongTab} />
      <Route path="/" component={DogTab} /> 
    </Switch>
);
