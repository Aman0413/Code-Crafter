import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axiosclient";
import { BiArrowBack } from "react-icons/bi";

function ForgetPassoword() {
  const { token } = useParams();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  if (!token) {
    navigate("/login");
  }

  const handleResetPassword = async () => {
    try {
      setButtonDisabled(true);
      if (password !== confirmPassword) {
        toast.error("Password and Confirm Password Should be same");
        setButtonDisabled(false);
        return;
      }
      const res = axios.post(`auth/resetPassword/${token}`, {
        password: password,
      });

      toast.promise(res, {
        loading: "Resetting Password...",
        success: (data) => {
          setTimeout(() => {
            navigate("/login");
          }, 2000);
          return data.data.message;
        },
        error: (err) => {
          return err.response.data.message;
        },
      });

      setButtonDisabled(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setButtonDisabled(false);
    }
  };

  return (
    <div className="text-white flex flex-col items-center justify-center w-full h-screen ">
      <div className=" flex flex-col gap-5">
        <h1 className="font-bold text-2xl">Make New Password</h1>

        <input
          type="password"
          placeholder="New Password"
          className="p-4 bg-dark-3 rounded-md outline-none focus:outline-gray-1"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Confirm Password"
          className="p-4 bg-dark-3 rounded-md outline-none focus:outline-gray-1"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="bg-primary-500 p-2 rounded-md font-bold"
          disabled={buttonDisabled}
          onClick={handleResetPassword}
        >
          Save
        </button>
        <div className="mt-6 flex items-center justify-between">
          <Link to="/login">
            <p className="text-richblack-5 flex items-center gap-x-2">
              <BiArrowBack /> Back To Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassoword;
