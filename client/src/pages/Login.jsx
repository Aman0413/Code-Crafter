import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axiosclient";
import { toast } from "react-hot-toast";
import Loader from "../components/utils/Loader";
import { getMyProfile } from "../redux/slices/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("/auth/login", loginData);

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        toast.success("Login successfull");
        setLoading(false);
        navigate("/");
        dispatch(getMyProfile());
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-4 flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-light-1">
          Login in to your account
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-blue-500 max-w text-primary-500">
          Or
          <Link
            to={"/signup"}
            className="font-medium text-blue-500 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            {" "}
            create a new acccount
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-dark-1 py-8 px-4 shadow rounded-xl sm:px-10">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 text-white"
          >
            <div>
              <label
                for="email"
                className="block text-sm font-medium leading-5  text-gray-1"
              >
                Email address
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <input
                  id="email"
                  name="email"
                  placeholder="user@example.com"
                  type="email"
                  required
                  onChange={(e) => {
                    setLoginData({ ...loginData, email: e.target.value });
                  }}
                  className="appearance-none bg-dark-3 block w-full px-3 py-4  rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 focus:border-2 border-light-3 placeholder:text-light-4"
                />
                <div className="hidden absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label
                for="password"
                className="block text-sm font-medium leading-5 text-gray-1"
              >
                Password
              </label>
              <div className="mt-2 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => {
                    setLoginData({ ...loginData, password: e.target.value });
                  }}
                  className="appearance-none bg-dark-3 block w-full px-3 py-4  rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 focus:border-2 border-light-3 placeholder:text-light-4 "
                />
              </div>
            </div>

            <Link to={"/forgetPasswordLink"}>
              <p className=" text-sm font-medium leading-5 text-primary-500">
                Forget Password ?
              </p>
            </Link>

            <div className="mt-7">
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-blue-700 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-[#877EFF] transition duration-150 ease-in-out"
                >
                  {loading ? <Loader /> : "Login"}
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
