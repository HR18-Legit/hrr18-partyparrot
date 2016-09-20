import React from 'react';
import EventList from './EventList';
import ImageUpload from './ImageUpload';

export default class UserDetails extends React.Component {
  constructor() {
    super();
    this.state  = {
      userEvents: []
      }
    }
  render () {

    return (
        <div className="wide">
    <div className="row margin-top">
      <div className="col-md-5">
        <div className="author-box">
          <div className="row">
            <h3 className="h3-responsive text-xs-center">About Event Organizer</h3>
            <hr />
            <div className="col-xs-12" style={{"text-align":"center"}}>
              <img src="http://2.gravatar.com/avatar/e9de252843e9ff541060127dac7126ed?s=150&d=mm&r=g" alt="" className=" img-circle z-depth-2" style={{"max-width":"200px"}} />
            </div>
            <div className="col-xs-12">
              <p className="text-xs-center margin-top"><strong>COACHELLA</strong></p>
              <p>Stare at the wall, play with food and get confused by dust. Lounge in doorway cats secretly make all the worlds muffins but hide from vacuum cleaner so intently sniff hand bathe private parts with tongue then lick owner's face jump off balcony, onto stranger's head. If it smells like fish eat as much as you wish where is my slave? I'm getting hungry walk on car leaving trail of paw prints on hood and windshield so leave hair everywhere, but curl into a furry donut so lick butt. </p>
              <p className="hidden-md-down">Jump off balcony, onto stranger's head knock over christmas tree or lick plastic bags. Get video posted to internet for chasing red dot drink water out of the faucet. Sleep nap play time has closed eyes but still sees you chase dog then run away. Caticus cuteicus has closed eyes but still sees you and human give me attention meow, slap owner's face at 5am until human fills food dish yet sun bathe pee in the shoe. Burrow under covers slap owner's face at 5am until human fills food dish, immediately regret falling into bathtub and unwrap toilet paper so dream about hunting birds and leave fur on owners clothes so scratch the furniture. </p>
              <ImageUpload/>
            </div>
          </div>
        </div>
      </div>
      <EventList events = {this.state.userEvents}/>
    </div>
  </div>
    )
  }

 getUserData() {
    $.ajax({
      url: `/user/${localStorage.username}/events`,
      dataType: 'json',
      type: 'GET',
      success: (data) => {
        console.log('Hey I have the data ', data);
        this.setState({userEvents: data});
      },
      error: (err,data) => {
        console.error(err.toString());
      }
    });
  }
  componentDidMount(){
    this.getUserData();
  }

}



