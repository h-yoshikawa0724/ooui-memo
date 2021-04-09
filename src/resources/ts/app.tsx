import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import CssBaseline from '@material-ui/core/CssBaseline';

import Login from './containers/pages/Login';
import Memo from './containers/pages/Memo';
import Loding from './components/pages/Loding';
import { useGetUserQuery, useCurrentUser } from './hooks/user';

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

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
});

type Props = {
  exact?: boolean;
  path: string;
  children: React.ReactNode;
};

const UnAuthRoute: FC<Props> = ({ exact = false, path, children }) => {
  const user = useCurrentUser();
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (user ? <Redirect to={{ pathname: '/' }} /> : children)}
    />
  );
};

const AuthRoute: FC<Props> = ({ exact = false, path, children }) => {
  const user = useCurrentUser();
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

const App: FC = () => {
  const queryClient = useQueryClient();
  const { isLoading } = useGetUserQuery({
    retry: 0,
    initialData: undefined,
    onError: () => {
      queryClient.setQueryData('user', null);
    },
  });

  if (isLoading) {
    return <Loding />;
  }

  return (
    <Switch>
      <UnAuthRoute exact path="/login">
        <Login />
      </UnAuthRoute>
      <AuthRoute path="/:memoId?">
        <Memo />
      </AuthRoute>
    </Switch>
  );
};

if (document.getElementById('app')) {
  ReactDOM.render(
    <Router>
      <QueryClientProvider client={client}>
        <CssBaseline />
        <App />
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </QueryClientProvider>
    </Router>,
    document.getElementById('app')
  );
}
