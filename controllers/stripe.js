const prisma = require("../config/prisma");
const stripe = require("stripe")('sk_test_51QD2nSBdLIg4cs9sdK9WP5fSVblLm62GE7HqRUonQOfDqsXVtZObFVHXpOEvLVRt0oa5a5xujPOicXSu5gdH2eZu00DgG53bIR');

exports.payment = async (req, res) => {
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                orderedById: req.user.id
            }
        })

        const amountTHB = cart.cartTotal * 100

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountTHB,
            currency: "thb",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Servcer error" });
    }
}