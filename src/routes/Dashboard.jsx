import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
  useParams,
} from 'react-router-dom';
import { Dashboard as DashboardPage, Add, UserSettings } from '@/pages';
import { nanoid } from 'nanoid';

const Dashboard = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route
        exact
        path={path}
        render={(routeProps) => (
          <DashboardPage {...routeProps} key={nanoid(3)} />
        )}
      />

      <Route path={`${path}/add`}>
        <Add />
      </Route>
      <Route path={`${path}/settings`}>
        <UserSettings />
      </Route>
    </Switch>
  );
};

export default Dashboard;
