import React from 'react';
import TakeMoney from './Payment';

export default class EventDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.event.eventbrite.id,
      shortenedUrl: 'subscribe above to generate a link!',
      promoters: {}, // {username:bitlink}
      promotersUpdated: false
    }

    // this.state = {
    //   shortenedUrl: 'Promotion URL',
    //   linkclickscount: 0,
    //   username: 'username'
    // }
  }

  componentWillMount() {

    // var id = this.props.location.pathname.split('/')[1];
    console.log(this.state.id);
    $.ajax({
      url: `/events/${this.props.id}/promoters`,
      dataType: 'json',
      type: 'GET',
      success: (data) => {
        console.log(data)
        this.setState({
          promoters: data
        });
      },
      error: (err,data) => {
        console.error(err.toString());
      }
    });

    /*

    Trigger an API request to GET all users who have subscribed to be promoters for this event,
    then populate the leaderboard with their usernames and associated bitly links

    */

    //this.bitlyShortenLink(this.props.event.eventbrite.url);
    //this.bitlyGetUsername();
  }

  componentDidMount() {
    $('.card-text').append(this.props.event.eventbrite.description.html) // OK
  }

  componentWillUpdate(nextProps, nextState) {
    // update the event if promoters have signed up
    if (this.state.promotersUpdated) {

      console.log(this.state);

      this.setState({
        promotersUpdated: false
      })
    }

    // trigger a re-count of all links whenever the component updates
    this.bitlyLinkClicks(nextState.shortenedUrl);
  }

  render () {
    $('.modal-backdrop').remove() // Quickfix to remove the modal
    return (
      <div>
        <div className="view hm-black-light">
          <img className="img-fluid" style={{"width":"100%"}} src={this.props.event.eventbrite ? this.props.event.eventbrite.logo.url : ''} alt="" />
          <div className="mask flex-center">
            <h1 className="white-text h1-responsive">{this.props.event.name}</h1>
          </div>
        </div>

        <div className="wide">
          <div className="row margin-top">
            <div className="col-md-7">
              <div className="card card-block">
                <h4 className="card-title">Start Promoting Now!</h4>
                <hr />

                <button className="btn btn-lg waves-effect waves-light"
                        style={{"backgroundColor":"#ff5a00"}}
                        onClick={() => {this.signupToPromote()}}>
                        Promote with <img src="img/BitlyLogo.png"
                                          className="img-responsive img-fluid"
                                          style={{"width":"60px", "display":"inline"}} />
                </button>


                <hr />
                <textarea className="inputId" value={this.state.shortenedUrl} />

                <TakeMoney />
                <button className="btn btn-lg waves-effect waves-light" style={{"backgroundColor":"#ff5a00"}}>Promote with <img src="img/BitlyLogo.png" className="img-responsive img-fluid" style={{"width":"60px", "display":"inline"}} /></button>

                {/*<hr />
                <input className="inputId" value={this.state.shortenedUrl} />*/}

              </div>
              <div className="card card-block">
                <h4 className="card-title">Decription</h4>
                <hr />
                <p className="card-text"> </p>
              </div>
              <div className="card card-block">
                <h4 className="card-title">Prizes</h4>
                <hr />
                <div className="row">
                  <div className="col-xs-3 col-md-2">
                    <img style={{"width":"50px"}} src="http://ssl.gstatic.com/onebox/sports/olympics/2016/medals2/ic_medal-large-gold_2x.png" alt="" />
                  </div>
                  <div className="col-md-4" style={{"marginTop":"20px"}}>
                    <h2 className="h2-responsive">{this.props.event.gPoint}</h2>
                  </div>
                  <div className="col-md-6" style={{"marginTop":"20px"}}>
                    <h4 className="h4-responsive">{this.props.event.gReward}</h4>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-xs-2">
                    <img style={{"width":"50px"}} src="http://ssl.gstatic.com/onebox/sports/olympics/2016/medals2/ic_medal-large-silver_2x.png" alt="" />
                  </div>
                  <div className="col-md-4" style={{"marginTop":"20px"}}>
                    <h2 className="h2-responsive">{this.props.event.sPoint}</h2>
                  </div>
                  <div className="col-md-6" style={{"marginTop":"20px"}}>
                    <h4 className="h4-responsive">{this.props.event.sReward}</h4>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-xs-2">
                    <img style={{"width":"50px"}} src="http://ssl.gstatic.com/onebox/sports/olympics/2016/medals2/ic_medal-large-bronze_2x.png" alt="" />
                  </div>
                  <div className="col-md-4" style={{"marginTop":"20px"}}>
                    <h2 className="h2-responsive">{this.props.event.bPoint}</h2>
                  </div>
                  <div className="col-md-6" style={{"marginTop":"20px"}}>
                    <h4 className="h4-responsive">{this.props.event.bReward}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="card card-block">
                <h4 className="card-title">Leaderboard</h4>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    <tbody>

                      {/*

                        generate dynamic rows with usernames + link counts (need to modify that function as well) for all promoters

                      */}

                      <tr>
                        <td>Max Doe</td>
                        <td>{this.state.linkclickscount}</td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
              <div className="author-box">
                <div className="row">
                  <h3 className="h3-responsive text-xs-center">About Event Organizer</h3>
                  <hr />
                  <div className="col-xs-12" style={{"textAlign":"center"}}>
                    <img src={this.props.event.eventbrite ? this.props.event.eventbrite.logo.url : ''} alt="" className=" img-circle z-depth-2" style={{"maxWidth":"200px"}} />
                  </div>
                  <div className="col-xs-12">
                    <p className="text-xs-center margin-top"><strong>{this.props.event.name}</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  signupToPromote() {
    var url = this.props.event.eventbrite.url + '#' + localStorage.username;
    this.bitlyShortenLink(url);
  }

  bitlyShortenLink(url) {

    var ACCESS_TOKEN = "d1ce0c8eb8e23feb1a75a702d9c4148e522215f7";

    $.ajax({
      url: "https://api-ssl.bitly.com/v3/shorten?access_token=" + ACCESS_TOKEN + "&longUrl=" + url + "&format=txt",
      type: 'GET',
      success: (data) => {
        console.log(data);
        var promoters = this.state.promoters;
        promoters[localStorage.username] = data.data.url;
        this.setState({
          promoters: promoters,
          shortenedUrl: data.data.url,
          promotersUpdated: true
        })
      },
      error: (data) => {
        console.error('Failed to get shortened URL. Error: ', data);
      }
    });
  }

  bitlyLinkClicks(linkclicksurl) {

    // required to get link counts for each promoter's link; will be displayed in leaderboard

    var ACCESS_TOKEN = "d1ce0c8eb8e23feb1a75a702d9c4148e522215f7";

    $.ajax({
      url: "https://api-ssl.bitly.com/v3/link/clicks?access_token=" + ACCESS_TOKEN + "&link=" + linkclicksurl,
      type: 'GET',

      success: (data) => {
        this.setState({linkclickscount: data.data.link_clicks});
      },
      error: (data) => {
        console.error('Failed to get link clicks. Error: ', data);
      }
    });
  }

}