import React from "react";
import { createBrowserRouter, RouterProvider ,Outlet } from "react-router-dom";
import Uses from "./Use";
import Count from "./Count";
import Items from "./Items";
import FetchData from "./Api";
import Toogle from './Toogle';
import ErrorPage from "./Error";
import NotFound from "./NotFound";
import OptionChain from "./Option";
import BookingForm from "./booking";
import RestaurantsList from "./swiggy";
import "./App.css"; // For styling


const router = createBrowserRouter([
  {
    path: '/',
    element: <Items />,
    errorElement: <ErrorPage />, // For handling errors on this route
  },
  {
    path: '/use',
    element: <Uses />,
  },
  {
    path: '/fetchdata',
    element: <FetchData />,
  },
  {
    path: '/o',
    element:<OptionChain/>,
  },
  {
    path: '/book',
    element:<BookingForm/>,
  },
  {
    path: '*',
    element:<NotFound/>,
  },
  {
    path: '/m',
    element:<Uses/>,
  },
  {
    path: '/swiggy',
    element:<RestaurantsList/>,
  },

]);


const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
