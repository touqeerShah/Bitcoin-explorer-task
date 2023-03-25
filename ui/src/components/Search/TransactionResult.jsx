import React from "react";

import { ellipseAddress } from "../../lib/utilities"
import { post, get } from "../../utils";
import { toast } from "react-toastify";
import { useEffect, useState } from 'react'
import UserEmail from "../Model/UserEmail";

// components



export default function TransactionResult(props) {
    const [isSubExist, setIsSubExist] = useState(false);
    const [showModal, setShowModal] = React.useState(false);

    const notifyConformations = async () => {
        if (localStorage.getItem("email")) {
            console.log("hash", props.hash);
            let res = await post("api/subscription/addAndUpdateSubscription", { deviceId: localStorage.getItem("email"), hash: props.hash })
            if (res.status === 200) {
                toast.success("Successfully subscription")
                setIsSubExist(false)
            } else {
                toast.error("Some Technical Issue Please Try Later")

            }
        } else {

        }
    }
    useEffect(() => {

        const fetchData = async () => {
            let checkSubExist = await get("api/subscription/getSubscriptionExist", { deviceId: localStorage.getItem("email"), hash: props.hash })
            console.log("checkSubExist", checkSubExist);
            setIsSubExist(checkSubExist.data.length === 0 ? true : false)
        }
        if (props.hash) {

            fetchData()
        }
    }, [props.hash])
    return (
        <>
            <div className="flex  w-full flex-wrap">
                <div className="w-1/5"></div>

                <div
                    className={
                        "relative flex flex-col min-w-0 break-words  w-3/5 	 mb-6  rounded bg-blueGray-700 text-white"
                    }
                >
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3
                                    className={
                                        "font-semibold text-lg " +
                                        (props.color === "light" ? "text-white" : "text-white")
                                    }
                                >
                                    Transactions Details
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="block w-full overflow-x-auto">
                        {/* Projects table */}
                        <table className="items-center w-full bg-transparent border-collapse">

                            <tbody>
                                <tr>

                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                                        (props.color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        Transaction Hash :{ellipseAddress(props?.hash, 15)}
                                    </td>
                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                                        (props.color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        Timestamp  : {(props.transactionResult?.timestamp)}
                                    </td>

                                </tr>

                                <tr>

                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                                        (props.color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        Transaction Size : {props.transactionResult?.size}
                                    </td>
                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                                        (props.color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        No Confirmation  : {props.transactionResult?.confirmations}
                                    </td>

                                </tr>
                                <tr>

                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                                        (props.color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        Total Input BTC  : {props.transactionResult?.totalInputBTC}
                                    </td>
                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left  font-bold " +
                                        (props.color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        Total Output BTC : {props.transactionResult?.totalOutputBTC}
                                    </td>

                                </tr>

                                <tr>

                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                                        (props.color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        totalFeesBTC : {props.transactionResult?.totalFeesBTC}
                                    </td>
                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                                        (props.color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        { }
                                    </td>

                                </tr>

                                <tr>

                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left   font-bold " +
                                        (props.color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        Transaction status : {props.transactionResult?.status}
                                    </td>
                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left    font-bold"
                                        + "light bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                    }>
                                        {(isSubExist && props.transactionResult?.status == "Pending") ? <button className=" w-1/2 placeholder-blueGray-300 text-blueGray-600 bg-white rounded border-2 text-sm shadow focus:outline-none "
                                            type="button"
                                            onClick={() => {
                                                notifyConformations()
                                            }}>
                                            Nofity Conformations
                                        </button> : <span></span>}
                                    </td>
                                </tr>

                            </tbody>
                        </table>



                    </div>
                </div>
                <div className="w-1/5"></div>

            </div>
            <UserEmail setShowModal={setShowModal} showModal={showModal} title={"Please Enter you email"} message={"Subscription Email is required"} />

        </>
    );
}
