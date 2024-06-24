import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import imageTobase64 from "../helpers/imageTobase64";
import { toast } from "react-toastify";

const SignUp = () => {
  const [eyePassword, setEyePassword] = useState(false);
  const [eyeConfirmPassword, setEyeConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImg: "",
  });

  const navigate = useNavigate();
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setFormData({ ...formData, profileImg: imagePic });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password != formData.confirmPassword) {
      toast.error("Password and Confirm Password Does not match");
    }
    try {
      const res = await fetch("http://localhost:3000/sign-up", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //console.log(data);
      if (data.success) {
        toast.success(data.message);
        navigate("/sign-in");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="shadow-custom p-8 rounded-lg bg-white w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <div className="flex justify-center mb-4">
              <label htmlFor="profileImg" className="relative cursor-pointer">
                <img
                  src={
                    formData.profileImg ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt="Profile"
                  className="rounded-full w-32 h-32 object-cover border-2 border-gray-300"
                />
                <input
                  type="file"
                  id="profileImg"
                  name="profileImg"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </div>

            <div className="mb-4">
              <label
                htmlFor="fullName"
                className="block text-gray-700 font-bold mb-2"
              >
                <b>Enter Your Name</b>
              </label>
              <input
                type="text"
                placeholder="John Sena"
                name="fullName"
                value={formData.fullName}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>
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
                <b>Your Password</b>
              </label>
              <div className="relative">
                <input
                  type={eyePassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  placeholder="*************"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                  onChange={handleChange}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 cursor-pointer"
                  onClick={() => setEyePassword((prev) => !prev)}
                >
                  {eyePassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                <b>Confirm Password</b>
              </label>
              <div className="relative">
                <input
                  type={eyeConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.cofirmPassword}
                  placeholder="*************"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
                  onChange={handleChange}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 cursor-pointer"
                  onClick={() => setEyeConfirmPassword((prev) => !prev)}
                >
                  {eyeConfirmPassword ? <FaEye /> : <FaEyeSlash />}
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
            </div>
          </form>
          <div className="text-center">
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Already have an Account? Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
