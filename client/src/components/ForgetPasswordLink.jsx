import React, { useState } from "react";
import axios from "../utils/axiosclient";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";

function ForgetPasswordLink() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [email, setEmail] = useState("");

  const handleSendLink = async () => {
    setButtonDisabled(true);
    try {
      const res = axios.post("auth/sendForgetPasswordLink", {
        email: email,
      });

      toast.promise(res, {
        loading: "Sending Email...",
        success: (data) => {
          return data.data.message;
        },
        error: (err) => {
          return err.response.data.message;
        },
      });

      setButtonDisabled(false);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setButtonDisabled(false);
    }
    setButtonDisabled(false);
  };

  return (
    <div className="text-white flex flex-col items-center justify-center w-full h-screen ">
      <div className=" flex flex-col gap-5">
        <h1 className="font-bold text-2xl">Forget Password</h1>
        <p className="text-gray-1">
          Write email for generate reset password link
        </p>
        <input
          type="text"
          placeholder="Your Email"
          className="p-4 bg-dark-3 rounded-md outline-none focus:outline-gray-1"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="bg-primary-500 p-2 rounded-md font-bold"
          disabled={buttonDisabled}
          onClick={handleSendLink}
        >
          Send Link
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

export default ForgetPasswordLink;
