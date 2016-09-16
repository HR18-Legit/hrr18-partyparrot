import React from 'react'
import DocumentTitle from 'react-document-title';
import { LoginForm } from 'react-stormpath'

export default class LoginPage extends React.Component {
  onFormSubmit (e, next) {
    localStorage.username = e.data.username
    next()
  }
  render () {
    return (
      <DocumentTitle title={`Login`}>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
              <h3>Login</h3>
              <hr />
            </div>
          </div>
          <LoginForm onSubmit={this.onFormSubmit.bind(this)} />
        </div>
      </DocumentTitle>
    )
  }
}
