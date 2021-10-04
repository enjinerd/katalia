import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '@/contexts/Auth';
import { nanoid } from 'nanoid';
export function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        // Renders the page only if `user` is present (user is authenticated)
        // Otherwise, redirect to the login page
        return user ? (
          <Component key={nanoid(3)} keyProp={nanoid(3)} {...props} />
        ) : (
          <Redirect to='/login' />
        );
      }}
    ></Route>
  );
}
