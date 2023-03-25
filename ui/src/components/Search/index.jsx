import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import TransactionResult from "./TransactionResult"
import AddressResult from "./AddressResult"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getTransactionDetails, getAccountDetails, post } from "../../utils";
import { toast } from "react-toastify";
export default function Search() {
    console.log("Search");
    const navigate = useNavigate();

    let { hash } = useParams();
    const [transactionResult, setTransactionResult] = useState({});
    const [addressResult, setAddressResult] = useState({});
    const [isRequest, setIsRequest] = useState(false);

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

        const fetchData = async () => {
            if (hash.length >= 64) {
                console.log("args = >", hash, hash.length >= 64);
                let response = await getTransactionDetails(hash, "USD")
                if (response.status != 200) {
                    setIsRequest(true)
                    toast.error("Error in data Fetch")
                    navigate("/")
                    return;
                }
                setTransactionResult(response)

            } else {
                let response = await getAccountDetails(hash, "USD")
                if (response.status != 200) {
                    setIsRequest(true)
                    toast.error(response.message)
                    navigate("/")
                    return;
                }

                setAddressResult(response)
            }
            // console.log("getMachineId()", getMachineId());
            if (localStorage.getItem("email")) {
                console.log("hash", hash);
                await post("api/history/addAndUpdateHistory", { deviceId: localStorage.getItem("email"), searchValue: hash })
            }
        }
        if (hash && !isRequest) {
            setTransactionResult({})
            setAddressResult({})
            fetchData()
        }
    }, [hash])

    return (
        <div className=''>
            {/* <ToastContainer /> */}

            {transactionResult.data && < TransactionResult color="light" transactionResult={transactionResult.data} hash={hash} />}
            {addressResult.data && <AddressResult color="light" addressResult={addressResult.data} hash={hash} />}
        </div>
    )
}
