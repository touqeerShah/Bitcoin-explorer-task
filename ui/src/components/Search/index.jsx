import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router-dom";
import TransactionResult from "./TransactionResult"
import AddressResult from "./AddressResult"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getTransactionDetails, getAccountDetails } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
export default function Search() {
    const navigate = useNavigate();

    let { hash } = useParams();
    const [transactionResult, setTransactionResult] = useState({});
    const [addressResult, setAddressResult] = useState({});
    const [isRequest, setIsRequest] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (hash.length >= 64) {
                console.log("args = >", hash, hash.length >= 64);
                let response = await getTransactionDetails(hash, "USD")
                if (response.status != 200) {
                    console.log("response", response);

                    toast.error("Error in data Fetch")
                    navigate("/")
                    return;
                }
                setTransactionResult(response)
            } else {
                let response = await getAccountDetails(hash, "USD")
                if (response.status != 200) {
                    console.log("response", response);

                    toast.error("Error in data Fetch")
                    navigate("/")
                    return;
                }
                setAddressResult(response)
            }

        }
        if (hash && !isRequest) {
            setIsRequest(true)
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
