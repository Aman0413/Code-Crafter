import React, { useEffect, useState } from "react";
import { RxCountdownTimer } from "react-icons/rx";
import { BiArrowBack } from "react-icons/bi";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/utils/Loader";
import axios from "../utils/axiosclient";
import { toast } from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";

function VerifyEmail() {
  const { signupData } = useSelector((state) => state.signupData);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setProgress(50);
      console.log("OTP", otp);
      const res = await axios.post("auth/signup", {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        otp: otp,
      });

      setProgress(100);
      if (res.data.success) {
        toast.success("Signup successfull");
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setProgress(100);
      setLoading(false);
    }
  };
  const sendOtp = async () => {
    try {
      setLoading(true);
      setProgress(50);

      const res = await axios.post("auth/sendOtp", {
        email: signupData.email,
      });
      setProgress(100);
      setLoading(false);
      if (res.data.success) {
        toast.success("OTP sent successfully");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setProgress(100);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);
  return (
    <div className="h-screen grid place-items-center bg-dark-1 text-white">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="max-w-[500px] p-4 lg:p-8">
        <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
          Verify Email
        </h1>
        <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
          A verification code has been sent to you. Enter the code below
        </p>
        <form>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[48px] lg:w-[60px] border-0rounded-[0.5rem] bg-dark-4 text-richblack-5 aspect-square text-center  border-2 border-light-3 focus:border-0 focus:outline-2 focus:outline-primary-500 rounded-md"
              />
            )}
            containerStyle={{
              justifyContent: "space-between",
              gap: "0 6px",
            }}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 py-[12px] px-[12px] rounded-[8px] mt-6 font-bold text-white bg-primary-500 flex items-center justify-center "
            onClick={handleSubmit}
          >
            {loading ? <Loader /> : "Verify Email"}
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between">
          <Link to="/signup">
            <p className="text-richblack-5 flex items-center gap-x-2">
              <BiArrowBack /> Back To Signup
            </p>
          </Link>
          <button
            className="flex items-center text-blue-500 gap-x-2 text-primary-500"
            onClick={sendOtp}
            disabled={loading}
          >
            <RxCountdownTimer />
            Resend it
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
