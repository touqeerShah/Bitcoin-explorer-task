"use client"
import React from "react";
import Select, { components } from "react-select";
import { useCallback, useEffect, useState } from 'react'
import NotificationMenu from "../Notification/NotificationMenu"
import { Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {

  const navigate = useNavigate();

  const [hash, setHash] = useState("false");
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(false);
  const options = [
    { value: "BTC", label: "BTC", icon: "bitcoin.svg" },
    { value: "USD", label: "Dollar", icon: "dollar.svg" },
    { value: "EUR", label: "Euro", icon: "euro.svg" }

  ];

  const { Option } = components;
  const IconOption = props => (
    <Option {...props} className="w-2">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-sm">{props.data.label}</span>
        </div>
        <div className="w-12">
          <img
            src={"/" + props.data.icon}
            style={{ width: 20 }}
            alt={props.data.label}
          />
        </div>
      </div>

    </Option>
  );

  let _handleKeyDown = (event) => {


    if (event.key === 'Enter') {
      console.log('do validate', hash);
      navigate(`/search/${hash}`);

    }
  };
  useEffect(() => {

  }, [])





  return (
    <>
      {/* absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 */}
      {/* absolute top-0 left-0 w-full z-10 bg-black md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 */}




      <nav className=" top-0 relative fixed pb-40 z-0 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg nav-colour shadow">

        <div className="container px-10 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            {/* <Link href="/"> */}
            {/* <div className="container flex flex-wrap items-center justify-between mx-auto"> */}
            <a className=" flex items-center"
              href="/">
              <img src="/logo.png" className="mt-10 md:mt-1  h-5 w-30 md:h-20 md:w-30 " alt="Logo" />
            </a>
            {/* </div> */}
            {/* </Link> */}

          </div>
          <div className="w-full lg:w-6/12 px-4   lg:flex flex-grow items-center">
            <div className="relative w-full mb-3">
              <input
                type="text"
                className="border-0 px-3 py-3 md:mt-5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                defaultValue=""
                onKeyDown={(e) => { _handleKeyDown(e) }}

                placeholder="Transaction Hash / Address"
                onChange={(e) => {
                  setHash(e.currentTarget.value)
                }}
              />
            </div>
          </div>
          <div
            className={
              "lg:flex relative w-fll flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none"
            }
            id="example-navbar-warning"
          >

            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">

              <li className="flex items-center mr-2">

                <button onClick={() => { setNotificationMenuOpen(!notificationMenuOpen) }} className="relative z-10 block rounded-md bg-white p-2 focus:outline-none">
                  <svg className="h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  <div className="absolute top-0 text-white h-5  w-5 font-bold flex justify-center items-center right-0 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 text-xs bg-red-600 rounded-full ">   12      </div>

                </button>


              </li>
              <li className="flex items-center mr-2">


              </li>


            </ul>
          </div>
        </div >
      </nav >
      <div className="top-9  right-44 absolute w-32 ">
        <Select
          defaultValue={options[0]}
          options={options}
          components={{ Option: IconOption }}
          isSearchable={false}

        />

      </div>
      <div className="top-12 right-8 absolute w-full ">
        <NotificationMenu
          notificationMenuOpen={notificationMenuOpen}
          setNotificationMenuOpen={setNotificationMenuOpen}
        />
      </div>
    </>
  );
}

