import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import FooterDiv from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Context from "./context";
import { useDispatch } from "react-redux";
import {setUserDetails} from "./redux//slice/userSlice.js"


const App = () => {
  const dispatch = useDispatch();
  const fetchUserDetails = async () => {
    const response = await fetch("http://localhost:3000/user-details", {
      method: "GET",
      credentials: "include",
    });
    const dataApi = await response.json();
    if (dataApi.success) {
     
      dispatch(setUserDetails(dataApi.data))
    }
    //console.log("data",response)
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <Context.Provider value={{ fetchUserDetails }}>
        <ToastContainer />
        <Navbar />
        <div className="h-screen pt-[110px]">
          <Outlet />
        </div>
      </Context.Provider>
    </>
  );
};

export default App;
