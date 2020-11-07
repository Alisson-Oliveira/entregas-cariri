import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import panelUser from './pages/PanelUser';
import CreateUser from './pages/CreateUser';
import CreatePurchase from './pages/CreatePurchase';
import Landing from './pages/Landing';

function Routes() { 
  return (
    <BrowserRouter basename="/">
      <Switch> 
        <Route exact path="/" component={Login} />
        <Route path="/panel" component={panelUser} />
        <Route path="/create/user" component={CreateUser} />
        <Route path="/create/purchase" component={CreatePurchase} />
        <Route path="/landing/user/confirmed" render={() => <Landing type="user" />} />
        <Route path="/landing/purchase/confirmed" render={() => <Landing type="purchase" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;