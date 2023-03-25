import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

import Result from "./Result"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getTransactionDetails, getAccountDetails, post } from "../../utils";
import { toast } from "react-toastify";
export default function Search() {
    const navigate = useNavigate();
    const [currency] = useOutletContext();

    let { hash } = useParams();
    const [result, setResult] = useState({});
    const [resultType, setResultType] = useState({});
    const [isRequest, setIsRequest] = useState(false);
    const [isUpdateCurrency, setIsUpdateCurrency] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            console.log("hash", hash);
            let response = await post("api/notifications/updateNotification", { deviceId: localStorage.getItem("email"), notify: hash, isView: true })
            if (response.status === 200) {
                localStorage.removeItem("isView")
            }
        }
        if (localStorage.getItem("isView")) {
            fetchData()
        }
    }, [])

    useEffect(() => {
        setIsRequest(false)
        setIsUpdateCurrency(!isUpdateCurrency)
    }, [currency])

    useEffect(() => {

        const fetchData = async () => {
            if (hash.length >= 64) {
                console.log("args = >", hash, hash.length >= 64);
                let response = await getTransactionDetails(hash, currency)
                if (response.status !== 200) {
                    setIsRequest(true)
                    toast.error("Error in data Fetch")
                    navigate("/")
                    return;
                }
                setResult(response)
                setResultType("transaction")


            } else {
                let response = await getAccountDetails(hash, currency)
                if (response.status !== 200) {
                    setIsRequest(true)
                    toast.error("Error in data Fetch")
                    navigate("/")
                    return;
                }
                setResult(response)
                setResultType("account")
            }
            // console.log("getMachineId()", getMachineId());
            if (localStorage.getItem("email")) {
                console.log("hash", hash);
                await post("api/history/addAndUpdateHistory", { deviceId: localStorage.getItem("email"), searchValue: hash })
            }
        }
        if (hash && !isRequest) {
            setResult({})
            fetchData()
        }

    }, [hash, isUpdateCurrency])

    return (
        <div className=''>
            {/* <ToastContainer /> */}

            {result.data && < Result color="light" result={result.data} hash={hash} resultType={resultType} currency={currency} />}
        </div>
    )
}
