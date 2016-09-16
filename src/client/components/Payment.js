<form action="/api/payment" method="POST">
<script
  src="https://checkout.stripe.com/checkout.js" class="stripe-button"
  data-key="pk_test_6pRNASCoBOKtIshFeQd4XMUh"
  data-amount="2000"
  data-name="Cam.io"
  data-description="Sponsor the above event"
  data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
  data-locale="auto"
  data-zip-code="true">
</script>
</form>


// npm install --save stripe
//server side
var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

// Get the credit card details submitted by the form
var token = request.body.stripeToken; // Using Express

// Create a charge: this will charge the user's card
var charge = stripe.charges.create({
  amount: 1000, // Amount in cents
  currency: "usd",
  source: token,
  description: "Example charge"
}, function(err, charge) {
  if (err && err.type === 'StripeCardError') {
    // The card has been declined
  }
});