import React, { useState, useEffect } from "react";
import HistoryRow from "./ListRow";


export default function History(props) {


    const [myDocuments, setMyDocuments] = useState([])
    const [documentRequestType, setDocumentRequestType] = useState("Owner")
    const [tokenId, setTokenId] = useState(0)


    useEffect(() => {
        console.log("process.env", process.env);
    }, [])

    return (
        <>      <div className="flex  w-full flex-wrap">

            <div className="w-1/5"></div>
            <div
                className={
                    "  justify-between flex-col min-w-0 break-words  w-3/5 		  shadow-xl rounded " +
                    (props.color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
                }
            >
                <div className="rounded-t mb-0 px-4 w-full py-3 border-0">
                    <div className="flex float-left w-9/12	 flex-wrap items-center">
                        <div className="relative px-2 mb-3 max-w-full flex-grow flex-1">
                            <h3
                                className={
                                    "font-semibold text-lg " +
                                    (props.color === "light" ? "text-blueGray-700" : "text-white")
                                }
                            >
                                {props.pageTitle}
                            </h3>
                        </div>
                    </div>
                    <div className="relative float-left	 w-3/12  flex-grow flex-1">

                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    {/* Projects table */}
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th
                                    className={
                                        " align-middle border border-solid py-3 pl-3 pr-20 text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (props.color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                    }
                                >
                                    # Hash
                                </th>


                                <th
                                    className={
                                        " align-middle border border-solid py-3 text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (props.color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                    }
                                >
                                    Time
                                </th>
                                <th
                                    className={
                                        " align-middle border border-solid py-3 text-sm  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (props.color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                                    }
                                >
                                    {""}
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {/* {myDocuments &&
                                myDocuments.map((item, i) => ( */}
                            <HistoryRow
                                key={"i"}
                                hash={"thbsjbckandjkasndkjasnjkda"}
                                time={"dasdadadada"}
                                color={""} />
                            {/* )) */}
                            {/* } */}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-1/5"></div>
        </div>
        </>
    );
}
