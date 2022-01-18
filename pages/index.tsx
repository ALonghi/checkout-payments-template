import {useState} from 'react'
import {css} from "@emotion/react";
import getStripe from '../utils/get-stripejs'
import axios from 'axios';
import Spinner from "../components/Spinner";


const IndexPage = () => {
    const [cartTotal, setCartTotal] = useState(10)
    const [loading, setLoading] = useState<boolean>(false)

    const makePayment = async () => {
        setLoading(true)
        // Create a Checkout Session.
        const response = await axios.post('/api/checkout_sessions', {
            amount: cartTotal,
        })
            .then(res => res.data)

        if (response.statusCode === 500) {
            console.error(response.message)
            return
        }

        // Redirect to Checkout.
        const stripe = await getStripe()
        const {error} = await stripe!.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: response.id,
        })
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
        console.warn(error.message)
        setLoading(false)
    }

    return (
        <div className={'block text-center '}>
            <div className="mt-3 text-center sm:mt-5">
                <h1 className={'text-xl leading-6 font-medium text-gray-700'}>Cart total € {cartTotal}</h1>
                <div className="mt-5">
                    {loading
                        ? <Spinner isLoading={loading}/>
                        : (
                            <button
                                type="button"
                                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-normal rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                disabled={loading}
                                onClick={() => makePayment()}
                            >
                                Pay with Stripe
                            </button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default IndexPage
