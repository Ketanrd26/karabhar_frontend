import React, { useContext, useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import logo from "../../assets/small_logo_jungle.png";
import { buyerApi } from "../../utils/Api";
import UseForm from "../../UseForm";
import ValidateLogin from "../../validate/Login";
import Input from "../../components/inputs/Input";
import Loader from "../../components/loader/Loader";
import { UserContext } from "../../Context";
import { Helmet } from "react-helmet";

function Login() {
  const [selectedOption, setSelectedOption] = useState("email");
  const [loader, setLoader] = useState(false);
  const { getBuyerData } = useContext(UserContext);
  const navigate = useNavigate();
  const formObj = [
    {
      credential: "",
      password: "",
    },
  ];

  const handleSignIn = async () => {
    try {
      setLoader(true);
      let finalCredential = values.credential;

      if (selectedOption === "phone") {
        // Ensure it starts with +91
        if (!finalCredential.startsWith("+91")) {
          finalCredential = `+91${finalCredential}`;
        }
      }

      const payload = {
        credential: finalCredential,
        password: values.password,
      };
      const response = await buyerApi.post("buyer/login", payload);

      if (response.status === 200) {
        navigate("/");
        localStorage.setItem("isLoggin", true);
        getBuyerData();
      }
    } catch (error) {
      console.log(error);
      if (error.status === 404) {
        setErrors({
          password: "Invalid Credentials",
        });
      }
    } finally {
      setLoader(false);
    }
  };

  const { handleChange, handleSubmit, values, setValues, errors, setErrors } =
    UseForm(formObj, ValidateLogin, handleSignIn);

  return (
    <>
      <Helmet>
        <title>Login | JungleBoosh</title>

        <meta
          name="description"
          content="Login to your JungleBoosh account to manage orders, track purchases and access your profile securely."
        />

        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {loader && <Loader />}
      <div className="parent login-parent">
        <div className="cont login-cont">
          <div className="login-wrapper">
            <div className="login-left">
              <div className="login-label-top bg-img-cover"></div>
              <img src={logo} alt="" />
              <div className="login-label-bottom bg-img-cover"></div>
            </div>
            <div className="login-right">
              <Link to="/" className="cross">
                <span>
                  <IoClose />
                </span>
              </Link>
              <div className="content-wrap">
                <div className="top-text">
                  <h3>Sign In</h3>
                  <p>Get access to your Orders, Wishlist and Recommendations</p>
                </div>
                <form action="" onSubmit={handleSubmit}>
                  <div className="input-wrapper">
                    <div className="radio">
                      <input
                        type="radio"
                        name="contact"
                        value="email"
                        checked={selectedOption === "email"}
                        onChange={() => setSelectedOption("email")}
                      />
                      Email
                      <input
                        type="radio"
                        name="contact"
                        value="phone"
                        checked={selectedOption === "phone"}
                        onChange={() => setSelectedOption("phone")}
                      />
                      Phone no.
                    </div>
                    {selectedOption === "email" && (
                      <Input
                        type="email"
                        placeholder="email"
                        label="Email"
                        onChange={handleChange}
                        value={values.credential}
                        name="credential"
                        error={errors.credential}
                      />
                    )}
                    {selectedOption === "phone" && (
                      <div class="phone-wrap">
                        <div className="no-box">+ 91</div>
                        <Input
                          type="number"
                          label="Phone Number"
                          placeholder="phone no."
                          onChange={handleChange}
                          name="credential"
                          value={`${values.credential}`}
                          error={errors.credential}
                        />
                      </div>
                    )}
                  </div>

                  <div className="input-wrapper">
                    <Input
                      password={true}
                      placeholder="password"
                      label="Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      error={errors.password}
                    />
                  </div>
                  <Link className="forgot_text" to="/forgotpassemail">
                    Forgot Password
                  </Link>

                  {/* <p>
                    By continuing, you agree to Jungle boosh 
                    <br />
                    <a href="">terms of use </a>and 
                    <a href="">privacy policy</a>.
                  </p> */}
                  <div className="buttons-otp">
                    <button type="submit" className="btn">
                      Login
                    </button>
                  </div>
                </form>
                <div className="last-line">
                  <p>
                    New to Register?{" "}
                    <Link className="anchor" to="/register">
                      Create an Account
                    </Link>
                  </p>
                </div>
              </div>

              <div className="responsive-design-label bg-img-cover"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
