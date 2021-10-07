import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Login, SignUp, NotFound, ForgetPass } from '@/pages/';
import Snip from '@/routes/Snip';
import Dashboard from '@/routes/Dashboard';

import { AuthProvider } from '@/contexts/Auth';
import { PrivateRoute } from './PrivateRoute';
import { nanoid } from 'nanoid';

export default function Routes() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route
            exact
            path='/'
            render={(props) => <Home {...props} key={nanoid(5)} />}
          />
          <Route path='/signup' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/snippet' component={Snip} />
          <PrivateRoute path='/dashboard' component={Dashboard} />
          <Route path='/forget-password' component={ForgetPass} />
          <Route path='/*' component={NotFound} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}
