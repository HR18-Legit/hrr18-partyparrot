import React from 'react';
import App from './components/App';
import CreateEvent from './components/CreateEvent';
import EventDetails from './components/EventDetails';
import UserDetails from './components/UserDetails';
import Index from './components/Index';
import PartyParrot from './components/PartyParrot';
import { Route, IndexRoute } from 'react-router';
import ReactStormpath, { LogoutRoute, Router, AuthenticatedRoute, LoginLink } from 'react-stormpath';
import LoginPage from './components/authentication/Login';
import Promoters from './components/promoterDashboard/promoterMain'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path='/clientlogin' component={LoginPage} />
    <AuthenticatedRoute>
      <LogoutRoute path="/logout" />
      <Route path ="/create" component={CreateEvent} />
      <Route path ="/eventDetails" component={EventDetails} />
      <Route path ="/profile" component={UserDetails} />
      <Route path ="/promoter" component={Promoters} />
    </AuthenticatedRoute>
  </Route>
);