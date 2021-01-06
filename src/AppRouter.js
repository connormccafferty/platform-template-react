import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home';
import PlatformWindow from './components/PlatformWindow';
import PlatformProvider from './components/PlatformProvider';
import ExampleView from './components/ExampleView';

const AppRouter = ({ fin }) => {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          component={Home}
          exact
        />
        <Route
          path="/window"
          component={PlatformWindow}
          exact
        />
        <Route
          path="/provider"
          component={PlatformProvider}
          exact
        />
        <Route
          path="/example-view"
          component={ExampleView}
          exact
        />
      </Switch>
    </Router>)
}

export default AppRouter;