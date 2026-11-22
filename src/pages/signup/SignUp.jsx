import React from "react";
import "./SignUp.scss";
import { Link } from "react-router-dom";
import { FiPhone } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import logo from "../../assets/small_logo_jungle.png";
import UseForm from "../../UseForm";
import { buyerApi } from "../../utils/Api";
import ValidateSignUp from "../../validate/ValidateSignUp";
import Input from "../../components/inputs/Input";

function SignUp() {
  const formObj = {
    mobileNumber: "",
  };

  const handleSignUp = async () => {
    try {
      const payload = {
        ...values,
        mobileNumber: `+91${values.mobileNumber}`,
      };
      const response = await buyerApi.post("buyer/sendotp", payload);

      console.log(response, "response");
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      setErrors({
        mobileNumber: error.response?.data?.message,
      });
    }
  };
  
  const { handleChange, handleSubmit, values, errors, setErrors } = UseForm(
    formObj,
    ValidateSignUp,
    handleSignUp
  );

  return (
    <>
      <div className="parent login-parent">
        <div className="cont login-cont">
          <div className="login-wrapper">
            <div className="login-left">
              <div className="login-label-top bg-img-cover"></div>
              <img src={logo} alt="" />
              <div className="login-label-bottom bg-img-cover"></div>
            </div>
            <div className="login-right">
              <div className="cross">
                <span>
                  <IoClose />
                </span>
              </div>
              <form className="content-wrap" onSubmit={handleSubmit}>
                <div className="top-text">
                  <h3>Look’s like your are new here</h3>
                  <p>Sign up with your mobile number to get started</p>
                </div>
                <div className="input-wrapper">
                  <div className="phone-wrap">
                    
                    <Input
                      type="text"
                      extra_label="+91"
                      label="Mobile no"
                      name="mobileNumber"
                      value={values.mobileNumber}
                      onChange={handleChange}
                      maxLength={10}
                      error={errors.mobileNumber}
                    />
                  </div>

                 
                
                </div>

                <p>
                  Continuing means you agree to Jungle Boosh’s 
                  <a href="">Terms </a>and <a href="">Policy</a>.
                </p>
                <div className="buttons-otp">
                  <button className="btn" type="submit">
                    Continue
                  </button>
                </div>
              </form>
              <div className="last-line">
               
              </div>
              <div className="responsive-design-label bg-img-cover"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
