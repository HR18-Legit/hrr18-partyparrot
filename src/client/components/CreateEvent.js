import React from 'react';
import Request from 'superagent';
import Event from './Event';

export default class CreateEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
      event: [],
      selectedEvent: {}
    }
  }

  render () {
    // console.log(this.props)
    var events = this.state.events.map(eventEntry => {
        return (
          <li style={{"marginTop":"20px"}} onClick={ () => this.selectEvent(eventEntry) }>
            <img src={eventEntry.logo ? eventEntry.logo.url : "http://130.211.52.161/tradeo-content/themes/nucleare-pro/images/no-image-box.png"} style={{"width":"100px", 'marginRight':'10px', "borderRadius":'5px'}} alt="" />
            <a>{eventEntry.name.html}</a>
          </li>
        )
    });

    return (
      <div className='create-event'>
        <div className="view hm-black-light">
          <img src="img/pattern.png" alt="" />
          <div className="mask flex-center">
            <h1 className="white-text h1-responsive">Promote Your Events</h1>
          </div>
        </div>

        <div className="wide text-md-center" style={{"marginTop":"70px"}}>

          <h2 className="h3-responsive">Search Event Titles and Locations</h2>

          <form className="col-xs-12"
                onChange={ () => this.search(this.refs.keyword.value, this.refs.location.value) }>

            <input  className="inputEventInfo"
                    placeholder="Event Keyword..."
                    ref="keyword" />

            <input  className="inputEventInfo"
                    placeholder="Event City..."
                    style={{ 'borderLeft':'none' }}
                    ref="location" />
          </form>

          <div className="row margin-top">

            <div className="col-xs-12">
              <hr />
              <h3 className="h3-responsive">Selected Event:</h3>
              <input className="inputId" style={{ 'width':'75%' }} value={this.state.selectedEvent.name ? this.state.selectedEvent.name.html : ""} readOnly="true" ref="eventName"/>
              <div className="scrollBox margin-top text-xs-left">
                <ul>
                  {events}
                </ul>
              </div>
            </div>

            <h2 className="h2-responsive">Prizes</h2>
            <p className="p-responsive">Tap into crowdsourced promotions! CAM.IO adds incentives to <a href="https://www.eventbrite.com/">Eventbrite</a>, using <a href="https://bitly.com/">Bitly</a> to track your promoters' link totals.</p>

            <table  style={{"width":"75%","margin":"0 auto"}}>
              <tbody>
                <tr>
                  <td><img style={{ "width":"90px", 'borderRight':'1px solid rgba(0,0,0,.1)', 'padding':'20px' }} src="http://ssl.gstatic.com/onebox/sports/olympics/2016/medals2/ic_medal-large-gold_2x.png"/></td>
                  <td><input type="number" min="0" step="1" placeholder="Clicks" required style={{"textAlign":"center"}} ref ={ (input) => this.gPoint = input }/></td>
                  <td><input type="text" placeholder="Reward" required style={{"textAlign":"center"}} ref ={ (input) => this.gReward = input }/></td>
                </tr>
                <tr>
                  <td><img style={{ "width":"90px", 'borderRight':'1px solid rgba(0,0,0,.1)', 'padding':'20px' }} src="http://ssl.gstatic.com/onebox/sports/olympics/2016/medals2/ic_medal-large-silver_2x.png" alt="" /></td>
                  <td><input type="number" min="0" step="1" placeholder="Clicks" required style={{"textAlign":"center"}} ref ={ (input) => this.sPoint = input }/></td>
                  <td><input type="text" placeholder="Reward" required style={{"textAlign":"center"}} ref ={ (input) => this.sReward = input }/></td>
                </tr>
                <tr>
                  <td><img style={{ "width":"90px", 'borderRight':'1px solid rgba(0,0,0,.1)', 'padding':'20px' }} src="http://ssl.gstatic.com/onebox/sports/olympics/2016/medals2/ic_medal-large-bronze_2x.png"/></td>
                  <td><input type="number" min="0" step="1" placeholder="Clicks" required style={{"textAlign":"center"}} ref ={ (input) => this.bPoint = input }/></td>
                  <td><input type="text" placeholder="Reward" required style={{"textAlign":"center"}} ref ={ (input) => this.bReward = input }/></td>
                </tr>
              </tbody>
            </table>

            <button className="btn btn-lg btn-default waves-effect waves-light" onClick={() => this.handleSubmit({
              userEmail: localStorage.username,
              name: this.state.selectedEvent.name.html,
              gPoint: this.gPoint.value,
              gReward: this.gReward.value,
              sPoint: this.sPoint.value,
              sReward: this.sReward.value,
              bPoint: this.bPoint.value,
              bReward: this.bReward.value,
              eventbrite: this.state.selectedEvent
            })}>Submit</button>
          </div>
        </div>
      </div>
    );
  }

  clearForm() {
    this.gPoint.value = "";
    this.gReward.value = "";
    this.sPoint.value = "";
    this.sReward.value = "";
    this.bPoint.value = "";
    this.bReward.value = "";
    this.state.selectedEvent = {};
  }

  handleSubmit(eventObj) {
    $.ajax({
      url: '/add/event',
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(eventObj),
      success: (data) => {
        console.log(data);
        this.props.handler(eventObj);
      },
      error: (xhr, status, err) => {
        this.clearForm();
      }
    });
  }

  search(keyword, location){
    var url = `https://www.eventbriteapi.com/v3/events/search/?q=${keyword}&sort_by=best&location.address=${location}&token=USM5NKFFO63WSZI3WVBX`;
    Request.get(url).then((response) => {
      this.setState({
        events: response.body.events
      });
    });
  }

  searchId(id){
    var url = `https://www.eventbriteapi.com/v3/events/${id}/?token=USM5NKFFO63WSZI3WVBX`;
    Request.get(url).then((response) => {
      this.setState({
        event: response.body
      });
    });
  }

  selectEvent(eventEntry) {
    this.setState({
      selectedEvent: eventEntry
    });
  }
}
