import  React from 'react';
import { Link } from 'react-router';
import {LogoutLink, NotAuthenticated, Authenticated } from 'react-stormpath';

export default class NavBar extends React.Component {
  render () {
    return (
      <div className='nav-bar'>
        <nav className="navbar navbar-dark navbar-fixed-top scrolling-navbar navbar-flat">
          <button className="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#collapseEx">
            <i className="fa fa-bars"></i>
          </button>
          <div className="wide">
            <div className="collapse navbar-toggleable-xs" id="collapseEx">
              <a className="navbar-brand" href="#" target="_blank">
                <img src="img/Logo.svg" style={{"width":"50px"}} />
              </a>
              <ul className="nav navbar-nav pull-right" style={{"marginTop":"3px"}}>
                <li className="nav-item">
                  <button className="btn-flat waves-effect waves-light btn-light"><Link to ="/">Home</Link></button>
                </li>
                <Authenticated>
                <li className="nav-item">
                  <button className="btn-flat waves-effect waves-light btn-light">
                    <a href="/profile"> Profile </a>
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn-flat waves-effect waves-light btn-light"><Link to ="/create">Create Event</Link></button>
                </li>
                 <li className="nav-item">
                  <button className="btn-flat waves-effect waves-light btn-light">
                    <LogoutLink />
                  </button>
                </li>
                </Authenticated>
                <NotAuthenticated>
                <li className="nav-item">
                  <button className="btn-flat waves-effect waves-light btn-light">
                    <a href="/clientlogin"> Sign In </a>
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn-flat waves-effect waves-light btn-light">
                    <a href="/register"> Sign Up </a>
                  </button>
                </li>
                </NotAuthenticated>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}