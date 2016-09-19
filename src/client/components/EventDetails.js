import React from 'react';
import TakeMoney from './Payment';

export default class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.promotersUpdated = false;
    this.bitlyKey = "d1ce0c8eb8e23feb1a75a702d9c4148e522215f7";

    this.state = {
      id: props.event._id,
      shortenedUrl: '',
      promoters: []
    }
  }

  componentWillMount() {
    $.ajax({
      url: `/events/${this.state.id}/promoters`,
      contentType: 'application/json',
      type: 'GET',
      success: (data) => {
        var promoters = data.map(function (promoter) {
          promoter.score = 0;
          return promoter;
        });
        this.setState({
          promoters: promoters
        });
        this.updateLeaderboard();
      },
      error: (err,data) => {
        console.error(err.toString());
      }
    });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    $('.card-text').append(this.props.event.eventbrite.description.html)
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.promotersUpdated) {
      this.promotersUpdated = false;
      this.updateLeaderboard();
      $.ajax({
        url: '/add/promoter',
        contentType: 'application/json',
        type: 'POST',
        data: JSON.stringify({
          userEmail: localStorage.username,
          eventId: this.state.id,
          bitlyLink: nextState.shortenedUrl,
          eventbrite: this.props.event.eventbrite,
          bPoint: this.props.event.bPoint,
          bReward: this.props.event.bReward,
          sPoint: this.props.event.sPoint,
          sReward: this.props.event.sReward,
          gPoint: this.props.event.gPoint,
          gReward: this.props.event.gReward,
          name: this.props.event.name
       }),
        success: (conf) => {
          console.log(conf);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
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
                <input className="inputId" placeholder='subscribe above to generate a link!' value={this.state.shortenedUrl}/>
                <hr />
                <h4 className="card-title">Donate to support this event</h4>
                <TakeMoney eventId={this.state.id} email={localStorage.username}/>
              </div>
              <div className="card card-block">
                <h4 className="card-title">Decription</h4>
                <hr />
                <p className="card-text"> </p>
              </div>

            </div>
            <div className="col-md-5">

              <div className="card card-block">
                <h4 className="card-title"
                    style={{"display":"inline"}}>Leaderboard</h4>
                <div className="fa fa-refresh"
                        style={{"display":"inline", "color":"#000", "marginLeft":"2em"}}
                        onClick={() => {this.updateLeaderboard()}}>
                        <img className="img-responsive img-fluid"/>
                </div>

                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>&nbsp;</th>
                        <th>Promoter</th>
                        <th>Clicks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.promoters.map(promoter =>
                        <tr key={promoter._id}>
                          <td style={{"textAlign":"center"}}><img style={{"display":"inline"}} src={promoter.prize}/></td>
                          <td>{promoter.userEmail}</td>
                          <td>{promoter.score}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card card-block">
                <h4 className="card-title">Earn Incentives</h4>
                <div className="table-responsive">
                  <table className="table table-hover">
                    <tbody>
                        <tr>
                          <td style={{"textAlign":"center"}}><img style={{"display":"inline"}} src="http://ssl.gstatic.com/onebox/sports/olympics/2016/medals2/ic_medal-small-gold_2x.png"/></td>
                          <td style={{"verticalAlign":"middle"}}>{this.props.event.gPoint} clicks:</td>
                          <td style={{"verticalAlign":"middle"}}>{this.props.event.gReward}</td>
                        </tr>
                        <tr>
                          <td style={{"textAlign":"center"}}><img style={{"display":"inline"}} src="http://ssl.gstatic.com/onebox/sports/olympics/2016/medals2/ic_medal-small-silver_2x.png"/></td>
                          <td style={{"verticalAlign":"middle"}}>{this.props.event.sPoint} clicks:</td>
                          <td style={{"verticalAlign":"middle"}}>{this.props.event.sReward}</td>
                        </tr>
                        <tr>
                          <td style={{"textAlign":"center"}}><img style={{"display":"inline"}} src="http://ssl.gstatic.com/onebox/sports/olympics/2016/medals2/ic_medal-small-bronze_2x.png"/></td>
                          <td style={{"verticalAlign":"middle"}}>{this.props.event.bPoint} clicks:</td>
                          <td style={{"verticalAlign":"middle"}}>{this.props.event.bReward}</td>
                        </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div> donations board</div>
      </div>
    )
  }

  signupToPromote() {
    var url = this.props.event.eventbrite.url.replace('?aff=ebapi','/#') + localStorage.username;
    this.bitlyShortenLink(url);
  }

  bitlyShortenLink(url) {
    var promoters = this.state.promoters;
    var thisPromoter = promoters.filter((record) => {
      return record.userEmail === localStorage.username;
    });
    if (!thisPromoter[0]) {
      $.ajax({
        url: `https://api-ssl.bitly.com/v3/shorten?access_token=${this.bitlyKey}&longUrl=${url}&format=txt`,
        type: 'GET',
        success: (data) => {
          this.promotersUpdated = true;
          promoters.push({
            userEmail: localStorage.username,
            bitlyLink: data.data.url
          });
          this.setState({
            promoters: promoters,
            shortenedUrl: data.data.url
          });
        },
        error: (data) => {
          console.error('Failed to get shortened URL. Error: ', data);
        }
      });
    } else {
      this.setState({
        shortenedUrl: thisPromoter[0].bitlyLink
      });
    }
  }

  updateLeaderboard() {
    var promoters = this.state.promoters.slice();
    var _this = this;
    this.state.promoters.forEach((promoter, count) => {
      $.ajax({
        url: `https://api-ssl.bitly.com/v3/link/clicks?access_token=${this.bitlyKey}&link=${promoter.bitlyLink}`,
        type: 'GET',
        success: (data) => {
          var score = data.data.link_clicks;
          var prize = '';
          if (score === _this.props.event.gPoint) {
            prize = 'http://ssl.gstatic.com/onebox/sports/olympics/2016/medals2/ic_medal-small-gold_1x.png';
          } else if (score === _this.props.event.sPoint) {
            prize = 'http://ssl.gstatic.com/onebox/sports/olympics/2016/medals2/ic_medal-small-silver_1x.png'
          } else if (score === _this.props.event.bPoint) {
            prize = 'http://ssl.gstatic.com/onebox/sports/olympics/2016/medals2/ic_medal-small-bronze_1x.png'
          }
          promoters[count].score = score;
          promoters[count].prize = prize;
          if (count === promoters.length - 1) {
            _this.setState({
              promoters: promoters
            });
          }
        },
        error: (data) => {
          console.error('Failed to get link clicks. Error: ', data);
        }
      });
    });
  }
}