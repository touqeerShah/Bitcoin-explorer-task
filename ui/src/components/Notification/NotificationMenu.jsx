import React from "react";
import { Link } from "react-router-dom";
import { ellipseAddress } from "../../lib/utilities"

// core components
export default function NotificationMenu(props) {

  return (
    <div className="bg-white relative w-full   inset-y10 left-0 z-10    left-0 z-30 justify-center "
    >
      {props.notificationMenuOpen && <div x-show="dropdownOpen" className="absolute top-8  right-0   bg-white rounded-md shadow-lg overflow-hidden z-20 w-80	">
        <div className="py-2">
          {props.notifications && props.notifications &&
            props.notifications.map((item, i) => (
              <Link to={`search/${item.notify}`}
                onClick={() => {
                  localStorage.setItem("isView", item.notify)
                }}
                key={i}
                className="flex items-center px-4 py-3 border-b hover:bg-gray-100 -mx-2">
                <img className="h-8 w-8 rounded-full object-cover mx-1" src="/bitcoin.svg" alt="avatar" />
                <p className="text-gray-600 text-sm mx-2">
                  <span className="font-bold" href="#">#Hash {ellipseAddress(item.notify)} </span>
                </p>
              </Link>
            ))}

        </div>
        <Link href="#" className="block bg-gray-800 text-white text-center font-bold py-2">See all notifications</Link>
      </div>}
    </div>);
}
