import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/templates/Login';
import Memo from './components/templates/Memo';

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

const App: React.FC = () => (
  <Switch>
    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/">
      <Memo />
    </Route>
  </Switch>
);

if (document.getElementById('app')) {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById('app')
  );
}
