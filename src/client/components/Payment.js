import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

export default class TakeMoney extends React.Component {
  constructor(props) {
  super(props);
  console.log(this.props);

    this.state = { email: this.props.email,
                  eventId: this.props.eventId,
                  eventinfo: ''
                  };
  }

  onToken(token) {
    var that = this;
    console.log(that.state);
    axios.post('/api/payment', {
      token: token, email: that.state.email, eventId: that.state.eventId
    })
    .then(token => {
      console.log('I got your money!!!', token.email);
      // axios.get('/events/' + that.state.eventId)
      // .then(eventInfo => {
      //   console.log('getting your events', eventInfo);
      //   localStorage.setItem('donors', eventInfo.data);
      //   console.log(localStorage.getItem('donors'), 2888);
      // });
    });
  }

  render() {
    return (

      <div>
      <StripeCheckout
        token={this.onToken.bind(this)}
        stripeKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
        email=''
       />
      </div>
    );
  }
}






  // onToken (token) {
  //   fetch('/api/payment', {
  //     method: 'POST',
  //     body: JSON.stringify({token: token, email: 'john@john.com', eventId: '57df283f49aee2355b243e7d'})
  //   }).then(token => {
  //     console.log(`I got your money!!!, ${token.email}`);
  //   });
  // }
        // eventId='57df283f49aee2355b243e7d'

// var PaymentForm = React.createClass({
//   mixins: [  ],

//   getInitialState: function() {
//     return {
//       stripeLoading: true,
//       stripeLoadingError: false,
//       submitDisabled: false,
//       paymentError: null,
//       paymentComplete: false,
//       token: null
//     };
//   },

//   getScriptURL: function() {
//     return 'https://js.stripe.com/v2/';
//   },

//   onScriptLoaded: function() {
//     if (!PaymentForm.getStripeToken) {
//       // Put your publishable key here
//       Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

//       this.setState({ stripeLoading: false, stripeLoadingError: false });
//     }
//   },

//   onScriptError: function() {
//     this.setState({ stripeLoading: false, stripeLoadingError: true });
//   },

//   onSubmit: function(event) {
//     var self = this;
//     event.preventDefault();
//     this.setState({ submitDisabled: true, paymentError: null });
//     // send form here
//     Stripe.createToken(event.target, function(status, response) {
//       if (response.error) {
//         self.setState({ paymentError: response.error.message, submitDisabled: false });
//       }
//       else {
//         self.setState({ paymentComplete: true, submitDisabled: false, token: response.id });
//         // make request to your server here!
//       }
//     });
//   },

//   render: function() {
//     if (this.state.stripeLoading) {
//       return <div>Loading</div>;
//     }
//     else if (this.state.stripeLoadingError) {
//       return <div>Error</div>;
//     }
//     else if (this.state.paymentComplete) {
//       return <div>Payment Complete!</div>;
//     }
//     else {
//       return (<form onSubmit={this.onSubmit} >
//         <span>{ this.state.paymentError }</span><br />
//         <input type='text' data-stripe='number' placeholder='credit card number' /><br />
//         <input type='text' data-stripe='exp-month' placeholder='expiration month' /><br />
//         <input type='text' data-stripe='exp-year' placeholder='expiration year' /><br />
//         <input type='text' data-stripe='cvc' placeholder='cvc' /><br />
//         <input disabled={this.state.submitDisabled} type='submit' value='Purchase' />
//       </form>);
//     }
//   }
// });

// module.exports = PaymentForm;




// export default Payment extends Component {
//   constructor(props) {
//     super(props);

//     this.state = { payment:'1000' }
//   }

//   render(){
//     return (
//     <form action="/api/payment" method="POST">
//     <script
//   src="https://checkout.stripe.com/checkout.js" class="stripe-button"
//   data-key="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
//   data-amount="1000"
//   data-name="Cam.io"
//   data-description="Sponsor the above event"
//   data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
//   data-locale="auto"
//   data-zip-code="true">
//     </script>
//     </form>
//     )
//   }
// }


// npm install --save stripe
//server side
// var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

// app.post('/api/payment', function(req, res, next) {
// // Get the credit card details submitted by the form
// var token = req.body.stripeToken;

// // Create a charge: this will charge the user's card
// var charge = stripe.charges.create({
//   amount: 1000,
//   currency: "usd",
//   source: token,
//   description: "Example charge"
// }, function(err, charge) {
//   if (err && err.type === 'StripeCardError') {

//   }
// });

// });