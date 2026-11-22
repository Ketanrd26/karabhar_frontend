import React, { useEffect, useState } from "react";
import "./Register.scss";
import { FiPhone } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { RiUserLine } from "react-icons/ri";
import logo from "../../assets/small_logo_jungle.png";
import { CiMobile3 } from "react-icons/ci";
import UseForm from "../../UseForm";
import ValidateRegister from "../../validate/ValidateRegister";
import { buyerApi } from "../../utils/Api";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import Input from "../../components/inputs/Input";
import { toast } from "react-toastify";
function Register() {
  const formObj = {
    Name: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  // const MobileNumber = searchParams.get("mobileNumber");

  // useEffect(() => {
  //   const secretKey = process.env.REACT_APP_SECRET_KEY;

  //   if (MobileNumber && secretKey) {
  //     const bytes = CryptoJS.AES.decrypt(
  //       decodeURIComponent(MobileNumber),
  //       secretKey
  //     );
  //     const decryptedEmail = bytes.toString(CryptoJS.enc.Utf8);
  //     console.log(decryptedEmail, "decryptedEmail");
  //     setValues({ ...values, mobileNumber: decryptedEmail });
  //   }
  // }, [MobileNumber]);

  

  const handleRegister = async () => {
    try {
      const response = await buyerApi.post("buyer/registerBuyer", values);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);


      if(error?.response?.data?.message === "Number already exists"){
        toast.error("User Already Registerd")
      }

      if(error?.response?.data?.message === "mobile number not be verified"){
        setErrors({
          email : "Mobile number not be verified"
        })
      }
    }
  };

  const { handleChange, handleSubmit, values, setValues, errors, setErrors } =
    UseForm(formObj, ValidateRegister, handleRegister);


    

  return (
    <>
      <div className="parent regis-parent">
        <div className="cont regis-cont">
          <div className="regis-wrapper">
            <div className="regis-left">
              <div className="reg-label-top bg-img-cover"></div>
              <img src={logo} alt="" />
              <div className="reg-label-bottom bg-img-cover"></div>
            </div>
            <div className="regis-right">
              <Link to="/login"    className="cross">
                <span>
                  <IoClose />
                </span>
              </Link>
              <form className="content-wrap" onSubmit={handleSubmit}>
                <h3>Welcome to Jungle Boosh</h3>
                <p>Enter your details and start your journey with us</p>
                <div className="input-wrapper">
                  <Input
                    type="text"
                    placeholder="Name"
                    name="Name"
                    error={errors.Name}
                    label="Profile Name"
                    value={values.Name}
                    onChange={handleChange}
                  />
                  <span className="icon">
                    <RiUserLine />
                  </span>
                </div>
                <div className="input-wrapper">
                  <Input
                    type="tel"
                    placeholder="Name"
                    name="mobileNumber"
                    error={errors.mobileNumber}
                    label="Enter Mobile Number"
                    value={values.mobileNumber}
                    onChange={handleChange}
                  />
                  <span className="icon">
                    <CiMobile3 />
                  </span>
                </div>

                <div className="input-wrapper">
                  <Input
                    type="text"
                    placeholder="Email"
                    error={errors.email}
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <span className="icon">
                    <HiOutlineMail />
                  </span>
                </div>

                <div className="input-wrapper">
                  <Input
                    type="password"
                    password={true}
                    error={errors.password}
                    placeholder="Password"
                    label="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-wrapper">
                  <Input
                    type="password"
                    password={true}
                    error={errors.confirmPassword}
                    placeholder="Confirm-Password"
                    name="confirmPassword"
                    label="Confirm Password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="buttons-otp">
                  <button type="submit" className="btn">
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
