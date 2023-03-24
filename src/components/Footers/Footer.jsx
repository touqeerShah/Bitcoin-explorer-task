import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="absolute bottom-0  left-0 w-full z-10  md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 bg-blueGray-200 pt-8 pb-6">

        <div className="container mx-auto px-4">

          <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © {new Date().getFullYear()}


              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
