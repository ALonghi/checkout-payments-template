import {NextPage} from 'next'
import {useRouter} from 'next/router'
import axios from "axios";
import {useEffect, useState} from "react";


const ResultPage: NextPage = () => {
    const router = useRouter()
    const [response, setResponse] = useState<string>(``)

    useEffect(() => {
        router.query.session_id
            ? axios.get(`/api/checkout_sessions/${router.query.session_id}`).then(res => setResponse(res.data))
            : setResponse(`No session Id provided.`)
    }, [router.query.session_id])


    return (
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <h1>Checkout Payment Result</h1>
            <h3>CheckoutSession response: {JSON.stringify(response)}</h3>
        </div>
    )
}

export default ResultPage
