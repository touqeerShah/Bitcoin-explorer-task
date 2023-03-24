import React from "react";

import { ellipseAddress } from "./../../lib/utilities"
// components



export default function TransactionResult({ color, transactionResult }) {

    return (
        <>
            <div className="flex  w-full flex-wrap">
                <div className="w-1/5"></div>

                <div
                    className={
                        "relative flex flex-col min-w-0 break-words  w-3/5 	 mb-6  rounded " +
                        (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
                    }
                >
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3
                                    className={
                                        "font-semibold text-lg " +
                                        (color === "light" ? "text-blueGray-700" : "text-white")
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
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        Transaction Hash :{ellipseAddress(transactionResult?.hash, 15)}
                                    </td>
                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        Timestamp  : {(transactionResult?.timestamp)}
                                    </td>

                                </tr>

                                <tr>

                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        Transaction Size : {transactionResult?.size}
                                    </td>
                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        No Confirmation  : {transactionResult?.confirmations}
                                    </td>

                                </tr>
                                <tr>

                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        Total Input BTC  : {transactionResult?.totalInputBTC}
                                    </td>
                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left  font-bold " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        Total Output BTC : {transactionResult?.totalOutputBTC}
                                    </td>

                                </tr>

                                <tr>

                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        totalFeesBTC : {transactionResult?.totalFeesBTC}
                                    </td>
                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        &nbsp
                                    </td>

                                </tr>

                                <tr>

                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left   font-bold " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        Transaction status : {transactionResult?.status}
                                    </td>
                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left    font-bold" +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        {(transactionResult?.status == "Pending") ? <button className="border-0 px-3 px-2-5 my-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded border-2 text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => {
                                                // RequestForVerification()
                                            }}>
                                            Nofity Conformations
                                        </button> : ""}
                                    </td>

                                </tr>

                            </tbody>
                        </table>



                    </div>
                </div>
                <div className="w-1/5"></div>

            </div>
        </>
    );
}
