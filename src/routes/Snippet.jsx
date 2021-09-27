import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';
import Snippet from 'pages/Snippet';

const Snippet = () => {
  const { snip } = useParams();

  return (
    <Switch>
      <Route exact path='/snippet'>
        <Redirect to='/' />
      </Route>
      <Route path='/snippet/:snip'>
        <Snippet params={snip} />
      </Route>
    </Switch>
  );
};

export default Snippet;
