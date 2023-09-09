const router = require('express').Router();
const stripe = require('stripe')

router.post('/',  async (req,res) => {
    const {email} = req.body
    try {
        const paymentIntent = await stripe.paymentIntent.create({
            amount: 500,
            currency: 'usd',
            metadata: {integration_check: 'accept_a_payment'},
            recepient_email : email,
        });

        res.json({'client_secret' : paymentIntent['client_secret']})

    } catch (error){
        console.error(error)
    }
})

module.exports = router;