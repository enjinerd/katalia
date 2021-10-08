import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import Snippet from '@/pages/Snippet';

const Snip = () => {

  return (
    <Switch>
      <Route path='/snippet/:snip'>
        <Snippet />
      </Route>
    </Switch>
  );
};

export default Snip;
