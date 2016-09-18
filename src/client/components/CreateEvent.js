import React from 'react';
import Request from 'superagent';
import Event from './Event';

export default class CreateEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
      event: [],
      selectedEvent: {},
      submitted: ""
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

    if(!this.state.submitted){
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

          {/* begin realtime search */}

          <form style={{ 'width':'100%' }}
                onChange={ () => this.search(this.refs.keyword.value, this.refs.location.value) }>

            <input  className="inputEventInfo"
                    placeholder="Event Keyword..."
                    ref="keyword" />

            <input  className="inputEventInfo"
                    placeholder="Event City..."
                    style={{ 'borderLeft':'none' }}
                    ref="location" />

            {/* <button className="searchBtn"
                    type='button'
                    onClick = { () => this.search(this.searchByName.value, this.searchByCity.value) }>

                    <i  className="material-icons"
                        style={{"marginTop":"3px", "color":"#666"}}>search</i>
            </button> */}

          </form>

          {/* end realtime search */}

          <div className="row margin-top">

            <div className="col-xs-12">
              <hr />
              <h3 className="h2-responsive">Selected Event:</h3>
              <input className="inputId" style={{ 'width':'75%' }} value={this.state.selectedEvent.name ? this.state.selectedEvent.name.html : ""} readOnly="true" ref="eventName"/>
              <div className="scrollBox margin-top text-xs-left">
                <ul>
                  {events}
                </ul>
              </div>
            </div>
            <div className="col-xs-12">
              <hr />
              <h2 className="h2-responsive">Prizes</h2>

              <img style={{ "width":"90px", 'borderRight':'1px solid rgba(0,0,0,.1)', 'padding':'20px' }} src="http://ssl.gstatic.com/onebox/sports/olympics/2016/medals2/ic_medal-large-gold_2x.png" alt="" />
              <input className="inputEventInfo" placeholder="Points to earn.." style={{ 'margin':"25px" }} ref ={ (input) => this.gPoint = input } />
              <input className="inputEventInfo" placeholder="Reward..." style={{ 'marginTop':"25px" }} ref ={ (input) => this.gReward = input }/>
              <div />
              <img style={{ "width":"90px", 'borderRight':'1px solid rgba(0,0,0,.1)', 'padding':'20px' }} src="http://ssl.gstatic.com/onebox/sports/olympics/2016/medals2/ic_medal-large-silver_2x.png" alt="" />
              <input className="inputEventInfo" placeholder="Points to earn.." style={{ 'margin':"25px" }} ref ={ (input) => this.sPoint = input }/>
              <input className="inputEventInfo" placeholder="Reward..." style={{ 'marginTop':"25px" }} ref ={ (input) => this.sReward = input }/>
              <div />
              <img style={{ "width":"90px", 'borderRight':'1px solid rgba(0,0,0,.1)', 'padding':'20px' }} src="http://ssl.gstatic.com/onebox/sports/olympics/2016/medals2/ic_medal-large-bronze_2x.png" alt="" />
              <input className="inputEventInfo" placeholder="Points to earn.." style={{ 'margin':"25px" }} ref ={ (input) => this.bPoint = input }/>
              <input className="inputEventInfo" placeholder="Reward..." style={{ 'marginTop':"25px" }} ref ={ (input) => this.bReward = input }/>
            </div>
            <div className="col-xs-12">
              <hr />
              <h2 className="h2-responsive">Post your Event</h2>
              <button className="btn btn-lg btn-default waves-effect waves-light" onClick={() => this.handleSubmit({
                userEmail: localStorage.username,
                name: this.state.selectedEvent.name.html,
                gPoint: this.gPoint.value,
                gReward: this.gReward.value,
                sPoint: this.sPoint.value,
                sReward: this.sReward.value,
                bPoint: this.bPoint.value,
                bReward: this.bReward.value,
                event: this.state.selectedEvent
              })}>Submit</button>
            </div>
          </div>
        </div>
      </div>
      )
    } else {

    {/* what is happening here I have no idea */}

      return (
        <div>
          <Event
            selectedEvent = {this.state.selectedEvent}
            gPoint = {this.gPoint.value}
            gReward = {this.gReward.value}
            sPoint = {this.sPoint.value}
            sReward = {this.sReward.value}
            bPoint = {this.bPoint.value}
            bReward = {this.bReward.value} />
        </div>
      )
    }
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
        this.setState({data: data});
        this.setState({submitted: "submitted"});

        // don't understand what is happening once the event has been created.
        // shouldn't this redirect us to the event details page?
      },
      error: (xhr, status, err) => {
        this.clearForm();
      }
    });
  }

  search(keyword, location){
    var url = `https://www.eventbriteapi.com/v3/events/search/?q=${keyword}&sort_by=best&location.address=${location}&token=YZO3HZ5MJZYKY6QU64H2`;
    Request.get(url).then((response) => {
      this.setState({
        events: response.body.events
      });
    });
  }

  searchId(id){
    var url = `https://www.eventbriteapi.com/v3/events/${id}/?token=YZO3HZ5MJZYKY6QU64H2`;
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