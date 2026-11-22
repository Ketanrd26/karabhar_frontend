import React, { useState } from "react";
import "./ForgotPassEmail.scss";
import logo from "../../assets/small_logo_jungle.png";
import Input from "../../components/inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import UseForm from "../../UseForm";
import { forgotPassEmail } from "../../validate/forgotPassEmail";
import axios from "axios";
import { buyerApi } from "../../utils/Api";
import CryptoJS from "crypto-js";
import Loader from "../../components/loader/Loader";
const ForgotPassEmail = () => {
  const navigate = useNavigate();
  const formObj = {
    email: "",
  };

  const [loader, setLoader] = useState(false);

  const sendOtp = async () => {
    try {
      setLoader(true);
      const response = await buyerApi.post("buyer/sendOtpOnEmail", values);

      if (response.status === 200) {
        const encryptedEmail = CryptoJS.AES.encrypt(
          values.email,
          process.env.REACT_APP_SECRET_KEY
        ).toString();
        navigate(`/otp?email=${encodeURIComponent(encryptedEmail)}`);
        const startTime = Math.floor(
          new Date(response.data.timestamp).getTime() / 1000
        );
        localStorage.setItem("otptimestamp", startTime);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Email not found") {
        setErrors({
          email: "Email not found",
        });
      }

      if (error.status === 500) {
        setErrors({
          email: "Server Error",
        });
      }
    } finally {
      setLoader(false);
    }
  };

  const { handleChange, handleSubmit, values, errors, setErrors } = UseForm(
    formObj,
    forgotPassEmail,
    sendOtp
  );

  return (
    <>
      {loader && <Loader />}
      <div class="forgotpassemail parent">
        <div class="left_image bg-img-cover">
          <div class="border_top bg-img-cover"></div>
          <div class="border_bottom bg-img-cover"></div>
          <img src={logo} alt="" />
        </div>
        <div class="right_panel">
          <form action="" onSubmit={handleSubmit}>
            <div class="top_content">
              <h1>Send Otp</h1>
              <p>
                Submit your email address below to get an OTP and complete your
                secure verification process.
              </p>
            </div>
            <Input
              label="Email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              name="email"
              type="email"
            />
            <button class="btn btn-pri">Send Otp</button>
            <Link to="/login" className="navigatelogin">
              {" "}
              Back To Login{" "}
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassEmail;
