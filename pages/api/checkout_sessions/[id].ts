import {NextApiRequest, NextApiResponse} from 'next'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2020-08-27',
})

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const id: string = req.query.id as string
    try {
        if (!id.startsWith('cs_')) {
            throw Error('Incorrect CheckoutSession ID.')
        }
        const checkout_session: Stripe.Checkout.Session =
            await stripe.checkout.sessions.retrieve(id, {
                expand: ['payment_intent'],
            })

        const checkSessionResult = (tentatives: number = 1) => {
            if (tentatives <= 3) {
                if (checkout_session.status === `complete` && checkout_session.payment_status === `paid`) {
                    // Update payment completed
                    //TODO:  await payments.update({ sessionsId: id }, { status: `PAID` } )
                    return res.status(200).json({result: `Payment completed`})
                } else {
                    setTimeout(async () => {
                        checkSessionResult(tentatives = tentatives++)
                    }, 1000)
                }
            } else
                return res.status(412).json({result: `Payment not completed`})
        }
        return checkSessionResult()

    } catch (err) {
        res.status(500).json({statusCode: 500, message: err.message})
    }
}
