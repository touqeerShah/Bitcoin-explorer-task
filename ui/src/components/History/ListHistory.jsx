import React, { useState, useEffect } from "react";
import HistoryRow from "./ListRow";
import UserEmail from "../Model/UserEmail";
import { get } from "../../utils";
export default function History(props) {
    console.log("History", props);
    const [searchHistory, setSearchHistory] = useState();
    const [showModal, setShowModal] = React.useState(false);

    useEffect(() => {
        const fetchData = async () => {
            // check user didn't provide by user then ask for it 
            if (!localStorage.getItem("email")) {
                console.log("process.env", localStorage.getItem("email"));

                setShowModal(true)
            } else {
                // add search item into DB
                let _searchHistory = await get("api/history/getSearchHistory", { email: localStorage.getItem("email") })
                console.log(_searchHistory);
                if (_searchHistory.status === 200)
                    setSearchHistory(_searchHistory.data)
            }
        }
        fetchData()
    }, [localStorage.getItem("email")]);

    return (
        <>
            {" "}
            <div className="flex  w-full flex-wrap">
                <div className="w-1/5"></div>
                <div
                    className={
                        "  justify-between flex-col min-w-0 break-words  w-3/5 shadow-xl rounded " +
                        (props.color === "light"
                            ? "bg-white"
                            : "bg-blueGray-700 text-white")
                    }
                >
                    <div className="rounded-t mb-0 px-4 w-full  py-3 border-0">
                        <div className="flex float-left w-9/12	 flex-wrap items-center">
                            <div className="relative px-2 mb-3  max-w-full flex-grow flex-1">
                                <h3
                                    data-testid="history-title"
                                    className={
                                        "font-semibold text-lg " +
                                        (props.color === "light"
                                            ? "text-blueGray-700"
                                            : "text-white")
                                    }
                                >
                                    {props.pageTitle}
                                </h3>
                            </div>
                        </div>
                        <div className="relative float-left	 w-3/12  flex-grow flex-1"></div>
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
                                {searchHistory && searchHistory?.searchResults &&
                                    searchHistory?.searchResults.map((item, i) => (
                                        <HistoryRow
                                            key={i}
                                            hash={item.search}
                                            time={item.timestamps}
                                            color={""}
                                        />
                                    ))}
                                {!searchHistory &&
                                    <HistoryRow
                                        key={"i"}
                                        hash={""}
                                        time={""}
                                        color={""}
                                    />
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="w-1/5"></div>
            </div>
            <UserEmail setShowModal={setShowModal} showModal={showModal} title={"Please Enter you email"} message={"This just for give you better user experience"} />
        </>
    );
}
