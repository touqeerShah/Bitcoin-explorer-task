
// import './globals.css'
import React, { useState } from "react";
import { Outlet } from "react-router-dom"
// components

import Navbar from "../Navbars/IndexNavbar";
import Footer from "../Footers/Footer";

export default function Layout() {
  // const navigate = useNavigate();
  const [currency, setCurrency] = useState("BTC");


  return (
    <>
      {/* here check which currency is selected for conversion */}
      <Navbar setCurrency={setCurrency} />
      <main>
        <section className="absolute inset-y-40 left-0 z-10  items-center  w-full  h-auto		 ">
          <Outlet context={[currency]} />
        </section>
      </main>
      <Footer />

    </>
  );
}

