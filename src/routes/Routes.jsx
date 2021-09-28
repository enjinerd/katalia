import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '@/pages/Home';
import Login from '@/pages/Login';

import Snip from '@/routes/Snip';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/snippet' component={Snip} />
      </Switch>
    </Router>
  );
}
