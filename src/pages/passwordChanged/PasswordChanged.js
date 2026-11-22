import React, { useEffect, useState } from "react";
import "./PasswordChanges.scss";
import Input from "../../components/inputs/Input";
import { buyerApi } from "../../utils/Api";
import UseForm from "../../UseForm";
import passwordChanges from "../../validate/ChangePassword";
import { useNavigate, useSearchParams } from "react-router-dom";
import CryptoJS from "crypto-js";
import Loader from "../../components/loader/Loader";
const PasswordChanged = () => {
  const formobj = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const [searchPara] = useSearchParams();

  useEffect(() => {
    const email = searchPara.get("email");

    if (email) {
      const decrEmail = CryptoJS.AES.decrypt(
        decodeURIComponent(email),
        process.env.REACT_APP_SECRET_KEY
      );

      if (decrEmail) {
        const bytes = decrEmail.toString(CryptoJS.enc.Utf8);

        setValues((prev) => ({
          ...prev,
          email: bytes,
        }));
      }
    }
  }, []);

  const handlePasswordChange = async () => {
    try {
      setLoader(true);
      const response = await buyerApi.post("buyer/changePassword", values);

      if (response.status === 200) {
        navigate("/login");
        setValues({
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const { handleChange, handleSubmit, values, setValues, errors, setErrors } =
    UseForm(formobj, passwordChanges, handlePasswordChange);

  return (
    <>
      {loader && <Loader />}
      <div class="password_changed_parent parent">
        <div class="left bg-img-cover"></div>
        <div class="right">
          <form action="" onSubmit={handleSubmit}>
            <h2>Change Your Password</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              provident doloremque voluptates ipsa numquam! Autem?
            </p>
            <Input
              value={values.password}
              error={errors.password}
              name="password"
              onChange={handleChange}
              label="New Password"
              type="password"
              password={true}
            />
            <Input
              value={values.confirmPassword}
              error={errors.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              password={true}
            />
            <button type="submit" class="btn">
              {" "}
              Change Password{" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordChanged;
