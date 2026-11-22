import React from "react";
import "./PersonalInformation.scss";
import { Link } from "react-router-dom";
import { CiCamera } from "react-icons/ci";
import { MenuItem, TextField } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function PersonalInformation() {
  const gender = [
    {
      value: "USD",
      label: "Male",
    },
    {
      value: "EUR",
      label: "Female",
    },
    {
      value: "BTC",
      label: "Transgender",
    },
    
  ];

  return (
    <>
      <div className="parent personal-parent">
        <div className="cont personal-cont">
          <div className="top-personal">
            <h3>Personal Information</h3>
          </div>
          <div className="basic-info">
            <div className="upload-photo">
              <div className="photo">
                <div className="camera">
                  <span>
                    <CiCamera />
                  </span>
                </div>
                <div className="up-photo">
                  <Link className="link-photo">Upload Photo</Link>
                  <p>JPG or PNG allowed. Image size should be max 2mb.</p>
                </div>
              </div>
              <div className="edit">Edit</div>
            </div>

            <h4>Basic Information</h4>
            <div className="input-section">
              <TextField className="text" label="Full Name" />
              <TextField className="text" label="Email" />
            </div>
            <div className="input-section">
              <TextField className="text" label="Mobile Number" />

              <div className="date-gender">
                

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="text"
                  label="Date of Birth"
                
                 
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
                <TextField
                  id="outlined-select-currency"
                  className="text"
                  select
                  label="Gender"
                  defaultValue="EUR"
                  helperText="Please select your gender"
                >
                  {gender.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
          </div>

          <span>Deactivate Account</span>
          <a href="">Delete Account</a>
        </div>
      </div>
    </>
  );
}

export default PersonalInformation;
