import React, { useState } from "react";
import "./SendOtp.scss";
import Input from "../../components/inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { buyerApi } from "../../utils/Api";
import UseForm from "../../UseForm";
import Loader from "../../components/loader/Loader";
import logo from "../../assets/small_logo_jungle.png";


const SendOtp = () => {
  const formObj = {
    mobileNumber: "",
  };
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const validateOtp = (value) => {
    let errors = {};

    if (!value.mobileNumber) {
      errors.mobileNumber = "Mobile number is required";
    } else if (value.mobileNumber?.length !== 10) {
      errors.mobileNumber = "Mobile number should be 10 digits";
    }

    return errors;
  };

  const handleOtp = async () => {
    try {
      setLoader(true);
      let payload = `+91${values.mobileNumber}`;
      const response = await buyerApi.post("/buyer/sendotp", {
        mobileNumber: payload,
      });

      if (response.status === 200) {
        const encryptedMobile = CryptoJS.AES.encrypt(
          payload,
          process.env.REACT_APP_SECRET_KEY
        ).toString();
        navigate(`/otp?mobile=${encodeURIComponent(encryptedMobile)}`);
        localStorage.setItem("otptimestamp", response.data.timestamp);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message === "Number already exists") {
        setErrors({
          mobileNumber: error?.response?.data?.message,
        });
      }
    } finally {
      setLoader(false);
    }
  };

  const { handleChange, handleSubmit, values, errors, setErrors } = UseForm(
    formObj,
    validateOtp,
    handleOtp
  );
  return (
    <>
      {loader && <Loader />}
      <div class="send-otp-parent parent">
        <div className="left">
          <div className="login-label-top bg-img-cover"></div>
          <img src={logo} alt="" />
          <div className="login-label-bottom bg-img-cover"></div>
        </div>
        <div class="right">
          <form action="" onSubmit={handleSubmit}>
            <h2>Look’s like your are new here</h2>
            <p>Sign up with your mobile number to get started</p>
            <Input
              label="Enter Your Mobile Number"
              extra_label="+91"
              type="number"
              name="mobileNumber"
              value={values.mobileNumber}
              onChange={handleChange}
              error={errors.mobileNumber}
            />
            <button type="submit" class="btn">
              Send Otp
            </button>
            <Link className="link" to="/login">
              {" "}
              Already have an account{" "}
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default SendOtp;
