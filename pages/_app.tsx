// add bootstrap css
import type {AppProps} from 'next/app'
import '../components/global.css'
import {Dialog} from "@headlessui/react";

function MyApp({Component, pageProps}: AppProps) {

    return (
        <>
            <Dialog as="div" open={true} className="fixed z-10 inset-0 overflow-y-auto" onClose={() => null}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    {/* This element is to trick the browser into centering the modal contents. */}
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4
                    text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                    <Component {...pageProps} />
                </div>
                </div>
            </Dialog>
        </>

    )
}

export default MyApp
