import History from "./components/History/ListHistory";
import Search from "./components/Search";
import Layout from "./components/layout/Index"

import {
    createBrowserRouter, 
    createRoutesFromElements,
    Route, 
    RouterProvider
  } from 'react-router-dom'

 export  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<History color="light" pageTitle="Search History"  />} />
        <Route path="/search/:hash" element={<Search />} />
      </Route>
    )
  )