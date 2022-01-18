/* This example requires Tailwind CSS v2.0+ */
import * as React from 'react'
import {useState} from 'react'
import {Dialog} from '@headlessui/react'
import ClipLoader from "react-spinners/ClipLoader";
import {css} from "@emotion/react";
import getStripe from '../utils/get-stripejs'
import axios from 'axios';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: mediumspringgreen;
`;


const IndexPage = () => {
    const [cartTotal, setCartTotal] = useState(10)
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
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
        <Dialog as="div" open={true} className="fixed z-10 inset-0 overflow-y-auto" onClose={() => null}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                {/* This element is to trick the browser into centering the modal contents. */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
                <div
                    className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                    <div className={'block text-center '}>
                        <div className="mt-3 text-center sm:mt-5">
                            <h1 className={'text-xl leading-6 font-medium text-gray-700'}>Cart total € {cartTotal}</h1>
                            <div className="mt-5">
                                {loading
                                    ? <ClipLoader loading={loading} css={override} size={100}/>
                                    : (
                                        <button
                                            type="submit"
                                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            disabled={loading}
                                        >
                                            Make Payment
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default IndexPage
