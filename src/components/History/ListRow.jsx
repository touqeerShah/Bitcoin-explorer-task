import React from "react";

export default function HistoryRow({
    hash,
    time,
}) {
    return (
        <>
            <tr>
                <td className="border-t-0 ml-3 font-bold uppercase py-3 pl-3 pr-20 pt-4 pb-4 align-middle border-l-0 border-r-0 text-sm  whitespace-nowrap">
                    {hash}
                </td>
                <td className="border-t-0 py-3  pt-4 pb-4  font-bold align-middle border-l-0 border-r-0 text-sm  whitespace-nowrap ">
                    {time}
                </td>
                <td className="border-t-0 py-3  pt-4 pb-4  font-bold align-middle border-l-0 border-r-0 text-sm  underline hover:text-blue-500		 whitespace-nowrap ">
                    View
                </td>
            </tr>

        </>
    );
}
