import React from 'react';
import {
  Route,
  Switch,
  useRouteMatch,
  Redirect,
  useParams,
} from 'react-router-dom';
import Snippet from '@/pages/Snippet';

const Snip = () => {
  const { snip } = useParams();

  return (
    <Switch>
      <Route path='/snippet/:snip'>
        <Snippet snip={snip} />
      </Route>
    </Switch>
  );
};

export default Snip;
