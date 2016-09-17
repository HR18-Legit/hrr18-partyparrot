<form action="/api/payment" method="POST">
<script
  src="https://checkout.stripe.com/checkout.js" class="stripe-button"
  data-key="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
  data-amount="1000"
  data-name="Cam.io"
  data-description="Sponsor the above event"
  data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
  data-locale="auto"
  data-zip-code="true">
</script>
</form>


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