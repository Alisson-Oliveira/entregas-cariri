import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import panelUser from './pages/PanelUser';
import CreateUser from './pages/CreateUser';
import CreatePurchase from './pages/CreatePurchase';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/panel" component={panelUser} />
        <Route path="/create/user" component={CreateUser} />
        <Route path="/create/purchase" component={CreatePurchase} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;