import React from 'react';

export default class Event extends React.Component {

   componentDidMount() {
    $('.card-txt').append(this.props.event.eventbrite.description.html)
  }

  render(){
    return (
      <div>
        <hr />
          <div className="row">
            <div className="col-md-12">
              <img src={this.props.event.eventbrite.logo ? this.props.event.eventbrite.logo.url : "http://130.211.52.161/tradeo-content/themes/nucleare-pro/images/no-image-box.png"}  alt="" />
            </div>

            <div className="col-md-12" style={{"margin-top":"20px"}}>
              <p className="card-txt"></p>
            </div>
          </div>
          <hr />
        </div>)
  }
}
