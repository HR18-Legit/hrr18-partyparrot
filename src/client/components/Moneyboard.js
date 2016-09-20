import React, { Component } from 'react';

export default class MoneyBoard extends Component {
  constructor(props){
    super(props);

    this.state = {};
    // console.log(this.state.donors, 888);
    // console.log(localStorage.getItem('donors'), 9999);
    // console.log("HELLO", props.events);
    // this.temp = props.event;
    
    // console.log(this.temp);
  }



  render() {

  }
}



  // if(true) {
  // return (
  //           <div className="col-md-5">
  //             <div className="card card-block">
  //               <h4 className="card-title">Donation Board</h4>
  //               <div className="table-responsive">
  //                 <table className="table table-hover">
  //                   <thead>
  //                     <tr>
  //                       <th>Username</th>
  //                       <th>Donation</th>
  //                     </tr>
  //                   </thead>
  //                   <tbody>
  //                     <tr key={'j@jonathonfritz.com'}>
  //                         <td>j@jonathonfritz.com</td>
  //                         <td>{this.temp.donors['j@jonathonfritz.com']}</td>
  //                       </tr>

  //                   </tbody>
  //                 </table>
  //               </div>
  //             </div>
  //           </div>
  //           )
  //         }
  //         else {
  //           return (
  //             <div> No donors - please make a donation </div>
  //             )
  //         }