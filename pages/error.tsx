import {NextPage} from 'next'
import {useRouter} from 'next/router'
import axios from "axios";
import {useEffect, useState} from "react";
import Spinner from "../components/Spinner";
import Link from 'next/link';

const ErrorPage: NextPage = () => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(true)
    const [response, setResponse] = useState<string>(``)

    useEffect(() => {
        router.query.session_id
            ? axios.get(`/api/checkout_sessions/${router.query.session_id}`)
                .then(res => {
                    setResponse(res.data.result)
                    setLoading(false)
                })
            : setResponse(`No session Id provided.`)
    }, [router.query.session_id])


    return (
        loading
            ? (<Spinner isLoading={loading}/>)
            : (<>
                    <div className="flex items-end justify-center p-4  text-center sm:block sm:p-0">
                        <h1 className={'text-xl leading-6 font-medium text-gray-700'}>Checkout Payment Result</h1>
                        <div className={`flex justify-evenly items-center  mt-4 w-60 p-2 mx-auto `}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" color='red' viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <h3 className={'text-lg text-gray-700'}>Payment Error: ${response}</h3>
                        </div>
                        <Link href={`/`} replace={true}>
                            <p className={'text-gray-400 mt-4 underline cursor-pointer'}>Return to homepage</p>
                        </Link>
                    </div>
                </>
            )
    )
}

export default ErrorPage
