
// import './globals.css'
import React from "react";
import { NavLink, Outlet } from "react-router-dom"

// components

import Navbar from "../Navbars/IndexNavbar";
import Footer from "../Footers/Footer";

export default function Layout() {
  // const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main>
        <section className="absolute inset-y-40 left-0 z-10  items-center  w-full  h-auto		 ">

          <Outlet />
        </section>

      </main>
      <Footer />

    </>
  );
}

