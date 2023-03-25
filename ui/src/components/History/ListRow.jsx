import React from "react";
import { Link } from "react-router-dom";

export default function HistoryRow({
    hash,
    time,
}) {
    return (
        <>
            <tr>
                <td className=" ml-3 font-bold uppercase py-3 pl-3 pr-20 pt-4 pb-4 align-middle border-l-0 border-r-0 text-sm  whitespace-nowrap">
                    {hash}
                </td>
                <td className="  pt-4 pb-4  font-bold align-middle border-l-0 border-r-0 text-sm  whitespace-nowrap ">
                    {time}
                </td>
                {hash != "" &&
                    <td className="   pt-4 pb-4  font-bold align-middle border-l-0 border-r-0 text-sm  underline hover:text-blue-500 whitespace-nowrap ">
                        <Link to={`search/${hash}`}>  View</Link>
                    </td>}
            </tr>

        </>
    );
}
