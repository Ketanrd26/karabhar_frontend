import { TextField } from "@mui/material";
import React, { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import "./Input.scss";
const Input = ({
  label,
  value,
  onChange,
  error,
  password,
  name,
  disabled,
  extra_label,
  maxLength,
  type = "text",
}) => {
  const [passwordType, setPasswordType] = useState(true);
  return (
    <>
      <div className="input">
        <div class="input_feild">
          {extra_label && <div class="extra_label">{extra_label}</div>}
          <input
            // type="text"
            placeholder={label}
            name={name}
            disabled={disabled}
            value={value}
            variant="outlined"
            onChange={onChange}
            type={password ? (passwordType ? "password" : "text") : type}
            error={error}
            helperText={error ? "This field is required" : ""}
            maxLength={maxLength}
          />
          {password && (
            <span
              className="password-icon"
              onClick={() => setPasswordType(!passwordType)}
            >
              {!passwordType ? <IoEye /> : <IoMdEyeOff />}
            </span>
          )}
        </div>

        {error && <small style={{ color: "orangered" }}>{error}</small>}
      </div>
    </>
  );
};

export default Input;
