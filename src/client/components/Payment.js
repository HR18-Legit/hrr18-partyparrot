import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


export default class TakeMoney extends React.Component {

  onToken  (token) {
    fetch('/api/payment', {
      method: 'POST',
      body: JSON.stringify(token), eventId:'57df283f49aee2355b243e7d', email:'john@john.com',
    }).then(token => {
      alert(`I got your money!!!, ${token.email}`);
    });
  }



  render() {
    return (

      <div>
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
      />
      </div>
    );
  }
}

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