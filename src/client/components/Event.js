import React from 'react'


export default class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shortenedUrl: 'Promotion URL',
      linkclickscount: 0,
      username: 'username'
    }
  }

  componentWillMount() {
    this.bitlyShortenLink(this.props.selectedEvent.url);
    this.bitlyGetUsername();
  }

  componentDidMount() {
    $('.card-text').append(this.props.selectedEvent.description.html)
  }


  componentWillUpdate(nextProps, nextState) {
    this.bitlyLinkClicks(nextState.shortenedUrl);
  }

  render () {
    return (
      <div>
        <div className="view hm-black-light">
          <img className="img-fluid" style={{"width":"100%"}} src={this.props.selectedEvent.logo ? this.props.selectedEvent.logo.url : "http://130.211.52.161/tradeo-content/themes/nucleare-pro/images/no-image-box.png"} alt="" />
          <div className="mask flex-center">
            <h1 className="white-text h1-responsive">{this.props.selectedEvent.name.html}</h1>
          </div>
        </div>

        <div className="wide">
          <div className="row margin-top">
            <div className="col-md-7">
              <div className="card card-block">
                <h4 className="card-title">Start Promoting Now!</h4>
                <hr />
                <button className="btn btn-lg waves-effect waves-light" style={{"backgroundColor":"#ff5a00"}}>Promote with <img src="img/BitlyLogo.png" className="img-responsive img-fluid" style={{"width":"60px", "display":"inline"}} /></button>
                <hr />
                <input className="inputId" value={this.state.shortenedUrl} />
              </div>
              <div className="card card-block">
                <h4 className="card-title">Decription</h4>
                <hr />
                <p className="card-text"></p>
              </div>
              <div className="card card-block">
                <h4 className="card-title">Prizes</h4>
                <hr />
                <div className="row">
                  <div className="col-xs-3 col-md-2">
                    <img style={{"width":"50px"}} src="http://ssl.gstatic.com/onebox/sports/olympics/2016/medals2/ic_medal-large-gold_2x.png" alt="" />
                  </div>
                  <div className="col-md-4" style={{"marginTop":"20px"}}>
                    <h2 className="h2-responsive">{this.props.gPoint}</h2>
                  </div>
                  <div className="col-md-6" style={{"marginTop":"20px"}}>
                    <h4 className="h4-responsive">{this.props.gReward}</h4>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-xs-2">
                    <img style={{"width":"50px"}} src="http://ssl.gstatic.com/onebox/sports/olympics/2016/medals2/ic_medal-large-silver_2x.png" alt="" />
                  </div>
                  <div className="col-md-4" style={{"marginTop":"20px"}}>
                    <h2 className="h2-responsive">{this.props.sPoint}</h2>
                  </div>
                  <div className="col-md-6" style={{"marginTop":"20px"}}>
                    <h4 className="h4-responsive">{this.props.sReward}</h4>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-xs-2">
                    <img style={{"width":"50px"}} src="http://ssl.gstatic.com/onebox/sports/olympics/2016/medals2/ic_medal-large-bronze_2x.png" alt="" />
                  </div>
                  <div className="col-md-4" style={{"marginTop":"20px"}}>
                    <h2 className="h2-responsive">{this.props.bPoint}</h2>
                  </div>
                  <div className="col-md-6" style={{"marginTop":"20px"}}>
                    <h4 className="h4-responsive">{this.props.bReward}</h4>
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
                    <img src={this.props.selectedEvent.logo ? this.props.selectedEvent.logo.url : "http://130.211.52.161/tradeo-content/themes/nucleare-pro/images/no-image-box.png"} alt="" className=" img-circle z-depth-2" style={{"maxWidth":"200px"}} />
                  </div>
                  <div className="col-xs-12">
                    <p></p>
                    <p className="text-xs-center margin-top"><strong>{this.props.selectedEvent.name.html}</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  bitlyShortenLink(currenturl) {
    var ACCESS_TOKEN = "33edd09b64804a5a8f80eacf8e7ff583ae0b0b35";

    $.ajax({
      url: "https://api-ssl.bitly.com/v3/shorten?access_token=" + ACCESS_TOKEN + "&longUrl=" + currenturl + "&format=txt",
      type: 'GET',
      success: (data) => {
        this.setState({shortenedUrl: data});
        console.log('data bitlyShortenLink ', data);
      },
      error: (data) => {
        console.error('Failed to get shortened URL. Error: ', data);
      }
    });
  }

  bitlyLinkClicks(linkclicksurl) {
    var ACCESS_TOKEN = "33edd09b64804a5a8f80eacf8e7ff583ae0b0b35";

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

  bitlyGetUsername() {
    var ACCESS_TOKEN = "33edd09b64804a5a8f80eacf8e7ff583ae0b0b35";

    $.ajax({
      url: "https://api-ssl.bitly.com/v3/user/info?access_token=" + ACCESS_TOKEN,
      type: 'GET',

      success: (data) => {
        this.setState({username: data.data.full_name});
      },
      error: (data) => {
        console.error('Failed to get bitly username. Error: ', data);
      }
    });
  }
}


