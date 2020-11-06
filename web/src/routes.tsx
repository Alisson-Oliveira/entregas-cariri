import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import CreateUser from './pages/CreateUser';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/create/user" component={CreateUser} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;