import React from "react";
import { faClockRotateLeft, faBan, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ellipseAddress } from "./../../lib/utilities"
// components



export default function AddressResult({ color, addressResult }) {

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
                                    Address Details
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
                                        Address Hash :{ellipseAddress(addressResult?.hash, 15)}
                                    </td>
                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        No Confirmed Transaction  : {(addressResult?.noConfirmedTransaction)}
                                    </td>

                                </tr>

                                <tr>

                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        Current Balance : {addressResult?.currentBalance}
                                    </td>
                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        Total Received  : {addressResult?.totalReceived}
                                    </td>

                                </tr>
                                <tr>

                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap  text-left font-bold " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        Total Spent  : {addressResult?.totalSpent}
                                    </td>
                                    <td className={
                                        "px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap  text-left  font-bold " +
                                        (color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")}>
                                        Total UnSpent : {addressResult?.totalUnspent}
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
