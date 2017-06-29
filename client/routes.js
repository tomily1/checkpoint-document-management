import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/Homepage';
import AboutPage from './components/about/About';
import DocumentPage from './components/documents/documentpage';
import LoginPage from './components/entry/LoginPage';
import SignupPage from './components/entry/SignUpPage';
import DashBoard from './components/dashboard/Dashboard';
import ProfilePage from './components/profile/ProfilePage';
import Auth from './module/Auth';

const onEnter = (next, replace, cb) => {
  if (!Auth.isUserAuthenticated() && next.location.pathname.indexOf('dashboard') > -1) {
    replace('/login');
  }
  if (Auth.isUserAuthenticated() && (next.location.pathname.indexOf('login') > -1 ||
    next.location.pathname.indexOf('signup') > -1)) {
    replace('/dashboard');
  }
  cb();
};
const logout = (next, replace) => {
  Auth.deauthenticateUser();
  // change the current URL to /
  replace('/');
};
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="dashboard" component={DashBoard} onEnter={onEnter}/>
    <Route path="documents" component={DocumentPage} onEnter={onEnter}/>
    <Route path="about" component={AboutPage} />
    <Route path="profile" component={ProfilePage} onEnter={onEnter}/>
    <Route path="login" component={LoginPage} onEnter={onEnter} />
    <Route path="signup" component={SignupPage} onEnter={onEnter}/>
    <Route path="logout" onEnter={logout}/>
  </Route>
);
