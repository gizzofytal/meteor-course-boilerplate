import { Meteor } from  'meteor/meteor';
import React from 'react';
import {Router as Router, Switch, Route, Redirect} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

// Custom React Components
import Signup from '../ui/Signup'
import Dashboard from '../ui/Dashboard'
import NotFound from '../ui/NotFound'
import Login from '../ui/Login'

const history = createBrowserHistory();

const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/dashboard'];

//exportamos esta const para luego recuperarla desde main.js
export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={() => {
        return Meteor.userId() ? <Redirect to="/dashboard" /> : <Login/>
      }} />
      <Route exact path="/signup" render={() => {
        return Meteor.userId() ? <Redirect to="/dashboard" /> : <Signup/>
      }} />
      <Route exact path="/dashboard" render={() => {
        return !Meteor.userId() ? <Redirect to="/"/> : <Dashboard/>
      }} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

//exportamos esta const para luego recuperarla desde main.js
export const onAuthChange = (isAuthenticated) =>{

  const pathName = this.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);

  if(isUnauthenticatedPage && isAuthenticated){
    history.push('/dashboard');
  }
  else if(isAuthenticatedPage && !isAuthenticated){
    history.push('/');
  }


}

Tracker.autorun(() => {

    const isAuthenticated = !!Meteor.userId();
    const pathName = this.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
    const isAuthenticatedPage = authenticatedPages.includes(pathName);

    if(isUnauthenticatedPage && isAuthenticated){
      history.push('/dashboard');
    }
    else if(isAuthenticatedPage && !isAuthenticated){
      history.push('/');
    }


});
