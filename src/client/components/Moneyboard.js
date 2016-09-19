import React, { Component } from 'react';

export default class MoneyBoard extends React {
  constructor(props){
    super(props);
    this.state = {id:'', event:[]}
  }
}


render(){
  return (
<div className="col-md-5">
              <div className="card card-block">
                <h4 className="card-title">Donation Board</h4>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Donation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.event.map(event =>
                        <tr key={this.state.id}>
                          <td>{event.username}</td>
                          <td>{event.amount}</td>
                        </tr>
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          }