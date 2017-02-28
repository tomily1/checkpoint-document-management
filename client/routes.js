import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/Homepage';
import AboutPage from './components/about/About';
import DocumentPage from './components/documents/documentpage';
import LoginPage from './components/entry/LoginPage';
import SignupPage from './components/entry/SignUpPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="documents" component={DocumentPage} />
    <Route path="about" component={AboutPage} />
    <Route path="login" component={LoginPage} />
    <Route path="signup" component={SignupPage} />
  </Route>
);
