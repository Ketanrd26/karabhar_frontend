import React, { useState } from 'react'
import "./PersonalnfoMobile.scss"
import { HiOutlineArrowLeft } from "react-icons/hi";

const PersonalnfoMobile = () => {



  const [formData, setFormData] = useState({
    fullName: "Akhilesh Agrwal",
    email: "vivekdaharwal@outlook.com",
    mobile: "+919595567684",
    dob: "",
    gender: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
  };



  return (
    <>
      <div className="top-section">
        <span><HiOutlineArrowLeft /></span>
        <h3>Personal Information</h3>
      </div>


      <div className="profile-form">
        {/* Upload Photo */}
        <div className="photo-section">
          <div className="photo-circle">
            {formData.photo ? (
              <img src={URL.createObjectURL(formData.photo)} alt="Profile" />
            ) : (
              <span>📷</span>
            )}
          </div>
         <div className="upload-photo-wrap">
           <label className="upload-btn">
            Upload Photo
            <input type="file" accept="image/*" onChange={handleChange} name="photo" hidden />
           
          </label>
           <p>JPG or PNG allowed. Image size should be max 2mb.</p>
         </div>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <h3>Basic Information</h3>

          <label>Full Name*</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />

          <label>Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Mobile Number</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />

          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />

          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <h4>Deactivate Account</h4>

          <div className="delete-section">
            <button type="button" className="delete-btn">Delete Account</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default PersonalnfoMobile
