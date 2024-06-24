import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [eye, setEye] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
const {fetchUserDetails}=useContext(Context);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/sign-in", {
        method: "POST",
        credentials:"include",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
     // console.log(data);
      if (data.success) {
        toast.success(data.message);
        navigate("/");
        fetchUserDetails();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

 // console.log(formData);
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="shadow-custom p-8 rounded-lg bg-white w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                <b>Enter Your Email</b>
              </label>
              <input
                type="email"
                placeholder="abc@gmail.com"
                name="email"
                value={formData.email}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                <b>Enter Your Password</b>
              </label>
              <div className="relative">
                <input
                  type={eye ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  placeholder="*************"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                  onChange={handleChange}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 cursor-pointer"
                  onClick={() => setEye((prev) => !prev)}
                >
                  {eye ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
              <Link to="forgot-password" className="hover:underline">
                Forgot Password?
              </Link>
            </div>
          </form>
          <div className="text-center">
            <Link to="/sign-up" className="text-blue-500 hover:underline">
              New to UrbanNest? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
