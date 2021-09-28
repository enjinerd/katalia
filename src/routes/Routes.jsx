import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Login, SignUp } from '@/pages/';
import Snip from '@/routes/Snip';
import { AuthProvider } from '@/contexts/Auth';
import { PrivateRoute } from './PrivateRoute';
import Dashboard from '@/pages/Dashboard';

export default function Routes() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/snippet' component={Snip} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}
