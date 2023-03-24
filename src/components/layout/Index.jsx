
// import './globals.css'
import React from "react";

// components

import Navbar from "../Navbars/IndexNavbar";
import Footer from "../Footers/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        <section className="absolute inset-y-40 left-0 z-10  items-center  w-full  h-auto		 ">

          {children}
        </section>

      </main>
      <Footer />

    </>
  );
}

