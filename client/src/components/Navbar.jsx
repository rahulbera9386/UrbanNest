import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import {useDispatch, useSelector} from "react-redux"
import { PiShoppingCartSimpleThin, PiUserCircleThin } from "react-icons/pi";
import {toast} from "react-toastify"
import { setUserDetails } from "../redux/slice/userSlice";
const Navbar = () => {
const [scroll,setScroll]=useState(false);

const user=useSelector(state=>state.user.user);
const dispatch=useDispatch();
const navigate=useNavigate();
//console.log("userdetaderils",user)
useEffect(()=>{
const handleScroll=()=>{
  if(window.scrollY>0)
    {
      setScroll(true);
    }
    else{
      setScroll(false);
    }
}
window.addEventListener("scroll",handleScroll);
return()=>{
  window.removeEventListener("scroll",handleScroll)
}
},[])


const handleLogout=async()=>{
const response=await fetch("http://localhost:3000/user-logout",{
  method:"GET",
  credentials:"include"
});
const dataApi=await response.json();
if(dataApi.success)
  {
    toast.success(dataApi.message)
dispatch(setUserDetails(null));
navigate("/")
  }
  if(dataApi.error)
    {
      toast.error(dataApi.error)
    }
}


  return (
    <>
      <header className={`w-full h-[70px] ${scroll ?"shadow-lg ":""} bg-white z-40 fixed transition duration-500`}>
        <div className="flex justify-between items-center p-4 h-full">
          {/* Logo Section */}
          <div>
            <Link to="/">
              <p className="font-bold font-dosis text-[40px]">UrbanNest</p>
            </Link>
          </div>
          {/* Searchbar section */}
          <div className="flex items-center rounded-full w-full max-w-sm hover:shadow-md px-4 py-2 border-2 border-gray-300">
            <input
              type="text"
              placeholder="Serach Products here..."
              className="outline-none w-full text-gray-700 text-bold text-[16px]"
            />
            <div className="rounded-r-full w-[30px] text-lg  min-w[50px]">
              <IoSearch />
            </div>
          </div>
          {/* Right side icons */}
          <div className="flex gap-8 items-center">
            <div className="text-3xl cursor-pointer">
              {
                user?.profileImg?(<img src={user?.profileImg} alt={user?.fullName} className="w-10 h-10 rounded-full"/>):(<PiUserCircleThin />)
              }
            </div>

            <div className="text-3xl cursor-pointer">
              <PiShoppingCartSimpleThin />
            </div>
            <div className="">
              {
                user?._id?(<button className="bg-[#0066ff] text-white px-6 py-2 font-semibold text-xl px-2 rounded-lg transition ease-in-out delay-50 hover:-translate-x-1 hover:scale-110" onClick={handleLogout}>Log Out</button>):(<Link to="/sign-in">
                  <button className="bg-[#0066ff] text-white px-6 py-2 font-semibold text-xl px-2 rounded-lg transition ease-in-out delay-50 hover:-translate-x-1 hover:scale-110 ">
                    Login
                  </button>
                  </Link>)
              }
              
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
