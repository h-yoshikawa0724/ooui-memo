import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Login from './containers/pages/Login';
import Memo from './containers/pages/Memo';
import { User } from './models/User';
import useUser from './hooks/useUser';

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */
require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
// require('./components/Example');

const client = new QueryClient();

type Props = {
  exact?: boolean;
  path: string;
  children: React.ReactNode;
};

const UnAuthRoute: React.FC<Props> = ({ exact = false, path, children }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user') as User;
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (user ? <Redirect to={{ pathname: '/' }} /> : children)}
    />
  );
};

const AuthRoute: React.FC<Props> = ({ exact = false, path, children }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user') as User;
  return (
    <Route
      exact={exact}
      path={path}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
};

const App: React.FC = () => {
  useUser();
  return (
    <Switch>
      <UnAuthRoute exact path="/login">
        <Login />
      </UnAuthRoute>
      <AuthRoute exact path="/">
        <Memo />
      </AuthRoute>
    </Switch>
  );
};

if (document.getElementById('app')) {
  ReactDOM.render(
    <Router>
      <QueryClientProvider client={client}>
        <App />
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </Router>,
    document.getElementById('app')
  );
}
