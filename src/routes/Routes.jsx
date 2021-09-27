import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '@/pages/Home';
import Login from '@/pages/Login';

import Snippet from '@/pages/Snippet';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/snippet' component={Snippet} />
      </Switch>
    </Router>
  );
}
