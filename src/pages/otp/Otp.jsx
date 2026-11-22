import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import logo from "../../assets/small_logo_jungle.png";
import "./Otp.scss";
import OTPInput from "react-otp-input";
import UseForm from "../../UseForm";
import { buyerApi } from "../../utils/Api";
import verifiedOtpValidate from "../../validate/verifiedOtp";
import CryptoJS from "crypto-js";
import Loader from "../../components/loader/Loader";

function Otp() {
  const [searchParams] = useSearchParams();
  const [loader, setLoader] = useState(false);
  const formObj = {
    email: "",
    otp: "",
  };
  const navigate = useNavigate();
  const [originalEmail, setOriginalEmail] = useState("");
  const encryptedEmail = searchParams.get("email");
  const encryptedContact = searchParams.get("mobile");
  useEffect(() => {
    const secretKey = process.env.REACT_APP_SECRET_KEY;

    if ((encryptedEmail || encryptedContact) && secretKey) {
      try {
        const bytes = CryptoJS.AES.decrypt(
          decodeURIComponent(encryptedEmail || encryptedContact),
          secretKey
        );
        const decryptedEmail = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedEmail) {
          setOriginalEmail(decryptedEmail);
          setValues({ ...values, email: decryptedEmail });
        } else {
          setOriginalEmail("Invalid or corrupted data");
        }
      } catch (error) {
        console.error("Decryption failed:", error);
        setOriginalEmail("Error decrypting email");
      }
    }
  }, []);

  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const timestamp = localStorage.getItem("otptimestamp");

    if (timestamp) {
      const startTime = parseInt(timestamp, 10);
      const currentTime = Math.floor(Date.now() / 1000);
      const elapsed = currentTime - startTime;
      const remaining = 60 - elapsed;

      if (remaining <= 0) {
        setTimer(0);
        return;
      }

      setTimer(remaining);

      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setTimer(60); // fallback if no timestamp found
    }
  }, []);

  const verifiedOtp = async () => {
    try {
      setLoader(true);
      let response;
      if (encryptedContact) {
        const payload = {
          mobileNumber: originalEmail,
          otp: values.otp,
        };
        response = await buyerApi.post("/buyer/verifiedOtp", payload);

        if (response.status === 200) {
          const encremail = CryptoJS.AES.encrypt(
            originalEmail,
            process.env.REACT_APP_SECRET_KEY
          ).toString();
          setTimer(null);
          navigate(`/register?mobileNumber=${encodeURIComponent(encremail)}`);
          localStorage.removeItem("otptimestamp");
        }
      } else {
        response = await buyerApi.post("/buyer/otpVerifiedOnEmail", values);

        if (response.status === 200) {
          const encremail = CryptoJS.AES.encrypt(
            originalEmail,
            process.env.REACT_APP_SECRET_KEY
          ).toString();
          setTimer(null);
          navigate(`/ChangePassword?email=${encodeURIComponent(encremail)}`);
          localStorage.removeItem("otptimestamp");

        }
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "otp do not match" || "otp does not matched") {
        setErrors({
          otp: "Otp do not match",
        });
      }
    } finally {
      setLoader(false);
    }
  };

  const { handleChange, handleSubmit, values, errors, setValues, setErrors } =
    UseForm(formObj, verifiedOtpValidate, verifiedOtp);

  useEffect(() => {
    if (originalEmail) {
      setValues((prev) => ({
        ...prev,
        email: originalEmail,
      }));
    }
  }, []);

  return (
    <>
      {loader && <Loader />}
      <div className="parent otp-parent">
        <div className="cont otp-cont">
          <div className="otp-wrapper">
            <div className="otp-left">
              <div className="otp-label-top bg-img-cover"></div>
              <img src={logo} alt="" />
              <div className="otp-label-bottom bg-img-cover"></div>
            </div>

            <div className="otp-right">
              <div className="cross">
                <span>
                  <IoClose />
                </span>
              </div>

              <form className="content-wrap" onSubmit={handleSubmit}>
                <div className="otp-text">
                  <h3>OTP Verification</h3>
                  <p className="otp-para">
                    Please enter the OTP sent to {originalEmail}.{" "}
                 {
                  encryptedEmail ? 
                  <Link to="/forgotpassemail">Change?</Link>
                  :
                  <Link to="/SendOtp">Change?</Link>

                 }
                    
                  </p>
                </div>

                <div className="box-wrapper">
                  <OTPInput
                    numInputs={6}
                    value={values.otp}
                    onChange={(otp) => setValues({ ...values, otp })}
                    renderInput={(props) => (
                      <input className="input" {...props} />
                    )}
                  />
                  {errors.otp && (
                    <small style={{ color: "red" }}> {errors.otp} </small>
                  )}
                  {errors.email && (
                    <small style={{ color: "red" }}> {errors.email} </small>
                  )}
                </div>

                {timer === 0 ? (
                  <p style={{ color: "var(--accent)", cursor: "pointer" }}>
                    Resend Otp
                  </p>
                ) : (
                  <p>
                    Resend code in:{" "}
                    {timer !== null ? (
                      <strong>{timer} sec</strong>
                    ) : (
                      <span>Loading...</span>
                    )}
                  </p>
                )}

                <div className="buttons-otp">
                  <button type="submit" className="btn">
                    Verify
                  </button>
                </div>
              </form>

              <div className="last-line">
                <p>
                  New to Company Name? <Link>Create an Account</Link>
                </p>
              </div>

              <div className="responsive-design-label bg-img-cover"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Otp;
