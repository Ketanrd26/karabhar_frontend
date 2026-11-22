import React, { useContext, useEffect, useState } from "react";
import "./BuyerProfile.scss";
import order_history from "../../assets/buyer-profile/order_his.png";
import profile from "../../assets/buyer-profile/profile.png";
import wishlistimg from "../../assets/buyer-profile/wishlist.png";
import { CiSearch } from "react-icons/ci";
import { Helmet } from "react-helmet";
import { UserContext } from "../../Context";
import { LuCamera } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { MdModeEditOutline } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import UseForm from "../../UseForm";
import { adminApi, buyerApi } from "../../utils/Api";
import { Tooltip } from "react-tooltip";
import SelectInput from "../../components/selectInput/SelectInput";
import Input from "../../components/inputs/Input";
import { MenuItem } from "@mui/material";
import profile_outline from "../../assets/buyer-profile/profile_outline.png";
import location_outline from "../../assets/buyer-profile/location_outline.png";
import logout_otline from "../../assets/buyer-profile/logout_otline.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { trucateAmt } from "../../components/truncateAmt/TruncateAmt";
import { toast } from "react-toastify";
import femaleIcon from "../../assets/women_empowirng.png";
import maleIcon from "../../assets/farmer_icon.png";

function BuyerProfile() {
  const {
    buyerData,
    getBuyerData,
    addressdetails,
    orderDetails,
    wishlist,
    buyerCartItems,
    setBuyerData,
    saveVendors,
  } = useContext(UserContext);
  const formObj = {
    email: "",
    mobileNumber: "",
    Name: "",
    dateofBirth: "",
    gender: "",
  };

  const [popup, setPopUp] = useState(false);
  const [imageDisplay, setImageDisplay] = useState();
  const [image, setImage] = useState(null);
  const [editAccess, setEditAccess] = useState(false);
  const navigate = useNavigate();
  const [active, setActive] = useState("orderHistory");
  const [activeMobile, setActiveMobile] = useState("");
  const [searchParams] = useSearchParams();
  const [touched, setTouched] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  // logout

  const handleLogout = async () => {
    try {
      const confirm = window.confirm("Are you sure logout account");

      if (!confirm) {
        return;
      }
      const response = await buyerApi.post("buyer/logout");
      if (response.status === 200) {
        toast.success("Logout Successfully");
        getBuyerData();
        setBuyerData();
        navigate("/");
        localStorage.removeItem("isLoggin");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const mobile_data = [
    {
      img_mobile: profile_outline,
      title: "Personal Informations",
      click: () => setActiveMobile("personalInfo"),
    },
    {
      img_mobile: location_outline,
      title: "Manage Address",
      click: () => setActiveMobile("manageAddress"),
    },
    {
      img_mobile: logout_otline,
      title: "Sign Out",
      click: () => handleLogout(),
    },
  ];

  const handleEditProfile = async () => {
    try {
      const formData = new FormData();

      formData.append("buyerData", JSON.stringify(values));
      if (image) {
        formData.append("profilePhoto", image);
      }

      const response = await buyerApi.put(
        `buyer/editProfile?buyerId=${buyerData?.id}`,
        formData,
      );

      if (response.status === 200) {
        setEditAccess(false);
        setImageDisplay(response.data.profilePhoto.split("images/")[1]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { handleChange, handleSubmit, values, errors, setValues, setErrors } =
    UseForm(formObj, () => ({}), handleEditProfile);

  useEffect(() => {
    if (buyerData) {
      setValues((prev) => ({
        ...prev,
        email: buyerData?.email,
        mobileNumber: buyerData?.mobileNumber,
        Name: buyerData?.Name,
        dateofBirth: buyerData?.dateofBirth?.split("T")[0],
        gender: buyerData?.gender,
      }));
      setImageDisplay(buyerData?.profilePhoto?.split("images/")[1]);
    }
  }, [buyerData]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setEditAccess(true);
  };

  const [buyerAddress, setBuyerAddress] = useState({
    addressType: "",
    country: "",
    state: "",
    city: "",
    landmark: "",
    pincode: "",
    address: "",
  });
  const addressId = searchParams.get("addressId");
  // get all country
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const getAllCountry = async () => {
    try {
      const response = await adminApi.get("api/countryList");

      setCountryList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCountryById = async (id) => {
    try {
      const country = countryList.find((item) => item.id === id);
      if (country) {
        setBuyerAddress((prev) => ({
          ...prev,
          country: country.countryName,
        }));
      }

      const stateList = await adminApi.get(
        `api/getStateByCountryId?countryId=${id}`,
      );
      setStateList(stateList?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCityBystateId = async (id) => {
    try {
      const state = stateList.find((item) => item.id === id);
      setBuyerAddress((prev) => ({
        ...prev,
        state: state.stateName,
      }));
      const cityList = await adminApi.get(`api/getCityByState?stateId=${id}`);

      setCityList(cityList.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;
    setBuyerAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    getAllCountry();
  }, []);

  const handleAddAdress = async (e) => {
    try {
      e.preventDefault();
       if (validateForm()) {
    let response;
      if (addressId) {
        response = await buyerApi.put(
          `buyer/editAddress?buyerId=${buyerData?.id}&addressId=${addressId}`,
          buyerAddress,
        );
      } else {
        response = await buyerApi.post(
          `buyer/addAddress?buyerId=${buyerData?.id}`,
          buyerAddress,
        );
      }

      if (response.status === 200) {
        getBuyerData();
        setPopUp(false);
        setBuyerAddress({
          addressType: "",
          country: "",
          state: "",
          city: "",
          landmark: "",
          pincode: "",
          address: "",
        });
        setActive("manageAddress");
        navigate("/buyer-profile");
        toast.success("Address Added Successfully");
      }
      }
      
    } catch (error) {
      if (
        error?.response?.data?.message === "you will add minimum 3 address "
      ) {
        toast.error("you will add minimum 3 address ");
      }
      console.log(error);
    }
  };

  // get address by id

  const getAddressById = async (id) => {
    try {
      const response = await buyerApi.get(
        `buyer/getAddressById?addressId=${id}`,
      );
      const data = response?.data?.data[0];

      console.log(data)

      if (response.status === 200) {
        navigate(`/buyer-profile?addressId=${id}`);
        setActive("manageAddress");
        setPopUp(true);
               let countries = countryList;
        if (!countries.length) {
          const countriesResponse = await adminApi.get("api/countryList");
          countries = countriesResponse?.data?.data || [];
          setCountryList(countries);
        }

        const country = countries.find(
          (item) =>
            item.countryName?.toLowerCase() === data?.country?.toLowerCase(),
        );
        let stateId = "";
        let cities = [];

        if (country) {
          const statesResponse = await adminApi.get(
            `api/getStateByCountryId?countryId=${country.id}`,
          );
          const states = statesResponse?.data?.data || [];
          setStateList(states);

          const state = states.find(
            (item) =>
              item.stateName?.toLowerCase() === data?.state?.toLowerCase(),
          );
          if (state) {
            stateId = state.id;
            const citiesResponse = await adminApi.get(
              `api/getCityByState?stateId=${state.id}`,
            );
            cities = citiesResponse?.data?.data || [];
            setCityList(cities);
          }
        }
        setBuyerAddress((prev) => ({
          ...prev,
          addressType: data?.addressType,
          country: country?.id || data?.country,
          state: stateId || data?.state,
          city: data?.city || data?.address?.suburb || "",
          landmark: data?.landmark,
          pincode: data?.pincode,
          address: data?.address,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (addressId) {
      setPopUp(true);
      setActive("manageAddress");
      getAddressById(addressId);
    }
  }, [addressId]);

  // remove vendor

  const removeVendor = async (vendorId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to remove this vendor?",
      );

      if (!confirm) {
        return;
      }

      const response = await buyerApi.delete(
        `buyer/removeVendor?buyerId=${buyerData?.id}&vendorId=${vendorId}`,
      );

      if (response?.status === 200) {
        toast.success("Vendor Removed Successfully");
        getBuyerData();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

// Validation function
const validateForm = () => {
  const newErrors = {};

    // Validate Address Type
    if (!buyerAddress.addressType || buyerAddress.addressType.trim() === "") {
      newErrors.addressType = "Address type is required";
    }

    // Validate Country
    if (!selectedCountry) {
      newErrors.country = "Country is required";
    }

    // Validate State
    if (!selectedState) {
      newErrors.state = "State is required";
    }

    // Validate City
    if (!buyerAddress.city || buyerAddress.city.trim() === "") {
      newErrors.city = "City is required";
    }

    // Validate Landmark
    if (!buyerAddress.landmark || buyerAddress.landmark.trim() === "") {
      newErrors.landmark = "Landmark is required";
    }

    // Validate Pincode
    if (!buyerAddress.pincode || buyerAddress.pincode.trim() === "") {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{5,6}$/.test(buyerAddress.pincode)) {
      newErrors.pincode = "Pincode must be 5-6 digits";
    }

    // Validate Address
    if (!buyerAddress.address || buyerAddress.address.trim() === "") {
      newErrors.address = "Address is required";
    } else if (buyerAddress.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle field blur to mark as touched
  const handleFieldBlur = (fieldName) => {
    setTouched({ ...touched, [fieldName]: true });
  };
  // delete address

  const deleteAddress = async (id) =>{
    try {
      const confirm = window.confirm("Are You Sure Want to delete");

      if(!confirm) return;

      const response = await buyerApi.delete(`/buyer/deletAddress?addressId=${id}`);

      if(response.status === 200){
        toast.success("Deleted Successfully");
        getBuyerData();
      }
    } catch (error) {
      console.log(error);
      const errorResponse = error?.response;

      if(errorResponse?.data?.message){
        toast.error(errorResponse?.data?.message)
      }
    }
  }
console.log(errors);

console.log(buyerAddress)
  return (
    <>
      {/* ADD ADDRESS POPUP */}

      <Helmet>
        <title>My Profile | JungleBoosh</title>

        <meta
          name="description"
          content="Manage your JungleBoosh account details, orders, addresses and personal information securely."
        />

        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {popup && (
        <div class="popup">
          <div
            class="overlay"
            onClick={() => {
              navigate("/buyer-profile");
              setPopUp(false);
            }}
          ></div>
          <form action="" onSubmit={handleAddAdress}>
            <div class="form-row-row">
              <div class="half_row">
                <SelectInput
                  label="Select Address Type"
                  onChange={handleChangeAddress}
                  onBlur={() => handleFieldBlur('addressType')}
                  value={buyerAddress.addressType}
                  name="addressType"
                  error={touched.addressType && !!errors.addressType}
                  helperText={touched.addressType && errors.addressType}
                >
                  <MenuItem value="Home">Home</MenuItem>
                  <MenuItem value="Office">Office</MenuItem>
                </SelectInput>
              </div>
              <div class="half_row">
                <SelectInput
                  label="Select Country"
                  onChange={(e) => {
                    getCountryById(e.target.value);
                    setTouched({ ...touched, country: true });
                  }}
                  onBlur={() => handleFieldBlur('country')}
                  error={touched.country && !!errors.country}
                  helperText={touched.country && errors.country}
                >
                  {countryList.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.countryName}
                    </MenuItem>
                  ))}
                </SelectInput>
              </div>
            </div>

            <div class="form-row-row">
              <div class="half_row">
                <SelectInput
                  label="Select State"
                  onChange={(e) => {
                    getCityBystateId(e.target.value);
                    setTouched({ ...touched, state: true });
                  }}
                  onBlur={() => handleFieldBlur('state')}
                  error={touched.state && !!errors.state}
                  helperText={touched.state && errors.state}
                >
                  {stateList.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.stateName}
                    </MenuItem>
                  ))}
                </SelectInput>
              </div>
              <div class="half_row">
                <SelectInput
                  label="Select City"
                  onChange={handleChangeAddress}
                  onBlur={() => handleFieldBlur('city')}
                  value={buyerAddress.city}
                  name="city"
                  error={touched.city && !!errors.city}
                  helperText={touched.city && errors.city}
                >
                  {cityList.map((item, index) => (
                    <MenuItem key={index} value={item.cityName}>
                      {item.cityName}
                    </MenuItem>
                  ))}
                </SelectInput>
              </div>
            </div>

            <div class="form-row-row">
              <Input
                label="Landmark"
                onChange={handleChangeAddress}
                onBlur={() => handleFieldBlur('landmark')}
                value={buyerAddress.landmark}
                name="landmark"
                error={touched.landmark && !!errors.landmark}
                helperText={touched.landmark && errors.landmark}
              />
              <Input
                label="Pincode"
                onChange={handleChangeAddress}
                onBlur={() => handleFieldBlur('pincode')}
                value={buyerAddress.pincode}
                name="pincode"
                error={touched.pincode && !!errors.pincode}
                helperText={touched.pincode && errors.pincode}
                placeholder="Enter 5-6 digit pincode"
              />
            </div>

            <div class="form-row-row">
              <Input
                label="Address"
                onChange={handleChangeAddress}
                onBlur={() => handleFieldBlur('address')}
                value={buyerAddress.address}
                name="address"
                error={touched.address && !!errors.address}
                helperText={touched.address && errors.address}
                multiline
                rows={3}
              />
            </div>

            <div class="form-row-row">
              <button className="btn" type="submit">
                {addressId ? "Update Address" : "Add Address"}
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="parent profile-parent">
        <div className="cont profile-cont">
          <div className="sidebar">
            <div className="top">
              <div class="top_left">
                <div className="fullname">
                  {imageDisplay && (
                    <div class="profile-initial">
                      <img
                        src={`https://images.jungleboosh.com/${imageDisplay}`}
                        alt=""
                      />
                    </div>
                  )}
                  <div className="name">
                    <p>Hey there,</p>
                    <h4> {buyerData?.Name} </h4>
                  </div>
                </div>
                <div class="lg_btn" onClick={handleLogout}>
                  Logout
                </div>
              </div>

              <div className="quantity">
                <div className="orders">
                  <span> {orderDetails?.length || 0} </span>
                  <p>Orders</p>
                </div>
                <div className="orders">
                  <span> {buyerCartItems?.length || 0} </span>
                  <p>Incart</p>
                </div>
                <div className="orders">
                  <span> {wishlist?.length || 0} </span>
                  <p>Wishlist</p>
                </div>
              </div>
            </div>
            <div className="bottom">
              <div
                className={
                  active === "orderHistory"
                    ? "order-history active-list"
                    : "order-history"
                }
                onClick={() => setActive("orderHistory")}
              >
                <img src={order_history} />
                <h4>Order History</h4>
              </div>

              <div className="my-profile">
                <div className="profile">
                  <img src={profile} />
                  <h4>My Profile</h4>
                </div>

                <div className="info-list">
                  <div
                    className={
                      active === "personalInformation" ? "list active" : "list"
                    }
                    onClick={() => setActive("personalInformation")}
                  >
                    <span></span>
                    <p>Personal Information</p>
                  </div>
                  <div
                    className={
                      active === "manageAddress" ? "list active" : "list"
                    }
                    onClick={() => setActive("manageAddress")}
                  >
                    <span></span>
                    <p>Manage Address</p>
                  </div>
                </div>
              </div>

              {/* <div
                className={
                  active === "wishlist" ? "wishlist active-list" : "wishlist"
                }
                onClick={() => setActive("wishlist")}
              >
                <img src={wishlistimg} alt="" />
                <h4>Wishlist</h4>
              </div> */}

              {/* <div className="notification">
                <img src={notification} alt="" />
                <h4>Notification</h4>
              </div> */}

              {/* <div
                className={
                  active === "vendors" ? "vendors active-list" : "vendors"
                }
                onClick={() => setActive("vendors")}
              >
                <img src={profile} alt="" />
                <h4>Makers</h4>
              </div> */}
            </div>
          </div>

          {active === "orderHistory" && (
            <div className="informations">
              <div className="top-info">
                <h3>Orders</h3>
                <div className="search-bar-info">
                  <input type="text" placeholder="Search your order here" />
                  <button className="search-btn ">
                    <CiSearch />
                    <span>Search order</span>
                  </button>
                </div>
              </div>

              <div className="orders">
                {orderDetails ? (
                  orderDetails?.map((item, index) => (
                    <div className="orderlist">
                      <div className="top">
                        <div className="left">
                          {item?.Delievery_date ? (
                            <div className="order_date">
                              <p>Delievery Date</p>
                              <p> {item?.Delievery_date.split("T")[0]} </p>
                            </div>
                          ) : (
                            <div className="order_date">
                              <p>Order Date</p>
                              <p> {item?.createdAt?.split("T")[0]} </p>
                            </div>
                          )}

                          <div className="total">
                            <p>Total</p>
                            <p>₹{trucateAmt(Number(item?.totalAmount))}</p>
                          </div>
                          <div className="ship_to">
                            <p>Ship To</p>
                            <p> {item?.buyerName} </p>
                          </div>
                        </div>
                        <div className="right">
                          <p className="order_id">Order # {item?.orderId}</p>
                          <div className="list">
                            <Link
                              to={`/order-details?orderId=${item?.orderId}`}
                            >
                              View Order Details
                            </Link>
                            {/* <a to={`https://api.invoices.jungleboosh.com/companyInvoice/${}`}>Invoice</a> */}
                          </div>
                        </div>
                      </div>
                      <div className="order_items">
                        {item?.orderItems &&
                          item?.orderItems?.map((item, index) => (
                            <div className="item_list">
                              <img
                                src={item?.productSnapshot?.image}
                                alt=""
                                className="image"
                              />
                              <div className="right">
                                <p className="name">
                                  {item?.productSnapshot?.name}
                                </p>
                                <Link
                                  className="view_item"
                                  to={`/Product-details?productName=${item?.productSnapshot?.name}`}
                                >
                                  View Your Item
                                </Link>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No order found</p>
                )}
              </div>
            </div>
          )}

          {active === "personalInformation" && (
            <div class="personal_information">
              <h2>Personal Information</h2>
              <form class="form" onSubmit={handleSubmit}>
                <div class="top_section">
                  <div class="left">
                    <div class="upload">
                      {imageDisplay !== null ? (
                        <img
                          src={`https://images.jungleboosh.com/${imageDisplay}`}
                          alt=""
                        />
                      ) : (
                        <LuCamera />
                      )}
                    </div>
                    {editAccess && (
                      <div class="upload_right_side">
                        <div class="upload_button">
                          {" "}
                          <input
                            onChange={handleImageChange}
                            className="image_input"
                            type="file"
                          />
                          Upload Photo{" "}
                        </div>
                        <p>JPG or PNG allowed. Image size should be max 2mb.</p>
                      </div>
                    )}
                  </div>

                  {editAccess ? (
                    <div class="right">
                      <button class="button">Submit</button>
                    </div>
                  ) : (
                    <div class="right">
                      <Tooltip id="my-tooltip" />
                      <div
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Click To Edit Profile"
                        class="button"
                        onClick={() => setEditAccess(true)}
                      >
                        Edit
                      </div>
                    </div>
                  )}
                </div>
                <div class="bottom_section">
                  <h2>Basic Information</h2>
                  <div class="input_section">
                    <div class="label">
                      <p>Full Name*</p>
                      <input
                        type="text"
                        onChange={handleChange}
                        name="Name"
                        value={values.Name}
                        disabled={!editAccess}
                      />
                    </div>
                    <div class="label">
                      <p>Email*</p>
                      <input
                        type="text"
                        onChange={handleChange}
                        name="email"
                        value={values.email}
                        disabled={!editAccess}
                      />
                    </div>
                    <div class="label">
                      <p>Phone Number*</p>
                      <input
                        type="text"
                        onChange={handleChange}
                        name="mobileNumber"
                        value={values.mobileNumber}
                        disabled={!editAccess}
                      />
                    </div>
                    <div class="two_grid_section">
                      <div class="label">
                        <p>Birth Date</p>
                        <input
                          type="date"
                          onChange={handleChange}
                          name="dateofBirth"
                          value={values.dateofBirth}
                          disabled={!editAccess}
                        />
                      </div>
                      <div class="label">
                        <p>Gender</p>
                        <select
                          id=""
                          onChange={handleChange}
                          name="gender"
                          value={values.gender}
                          disabled={!editAccess}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              {/* <p className="delete_account">Delete Account</p> */}
            </div>
          )}

          {active === "manageAddress" && (
            <div class="manage_address">
              <div class="top_section">
                <h2>Manage Address</h2>
                <div class="addnew_btn" onClick={() => setPopUp(true)}>
                  <span>
                    <GoPlus />
                  </span>
                  Add New Address
                </div>
              </div>
              <div class="address_section">
                {addressdetails &&
                  addressdetails.map((item, index) => (
                    <div class="address">
                      <div class="top_add_section">
                        <p>{item?.addressType}</p>
                        <div class="action_buttons">
                          <span onClick={() => getAddressById(item?.id)}>
                            <MdModeEditOutline />
                          </span>
                          <span onClick={()=>deleteAddress(item?.id)}>
                            <MdDeleteOutline />
                          </span>
                        </div>
                      </div>
                      <h3> {buyerData?.Name} </h3>
                      <h5>{buyerData?.mobileNumber}</h5>
                      <p>{item?.address}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {active === "wishlist" && (
            <div className="vendor-informations">
              {wishlist.map((item, index) => (
                <div className="vendor-bottom-info" key={index}>
                  <div className="seller-info">
                    <img src={item?.product?.image} alt="" />
                    <div className="information-seller">
                      <h4>{item?.product?.name}</h4>
                      <div className="vendor-add">
                        <span>Vendor:</span>
                        <Link to={`/Vendor_profile?sellerId=${item?.sellerId}`}>
                          {item?.sellerName}
                        </Link>
                      </div>
                      <h3>Price: {item?.product?.discount_price}</h3>
                    </div>
                  </div>

                  <div className="btn">Add To Cart</div>
                </div>
              ))}
            </div>
          )}

          {active === "vendors" && (
            <div className="vendor-informations">
              {saveVendors.length > 0 ? (
                saveVendors.map((item, index) => (
                  <div className="vendor-bottom-info" key={index}>
                    <div className="seller-info">
                      {item?.gender === "Male" ? (
                        <img src={maleIcon} alt="" />
                      ) : (
                        <img src={femaleIcon} alt="" />
                      )}

                      <div className="information-seller">
                        <h4>{item.name}</h4>
                        <div className="vendor-add">
                          <span>City:</span>
                          <a href="">{item.state}</a>
                        </div>
                        <p>{item?.biography.slice(0, 100)}</p>
                        <div
                          class="remove_btn"
                          onClick={() => removeVendor(item?.id)}
                        >
                          Remove Vendor
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Makers Saved</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* mobile 786 */}

      {buyerData ? (
        <div className="mobile-view-wrap">
          <div className="top">
            <div className="fullname">
              {imageDisplay && (
                <div class="profile-initial">
                  <img
                    src={`https://images.jungleboosh.com/${imageDisplay}`}
                    alt=""
                  />
                </div>
              )}
              <div className="name">
                <p>Hey there,</p>
                <h4> {buyerData?.Name} </h4>
              </div>
            </div>

            <div className="quantity">
              <div className="orders">
                <span> {orderDetails?.length || 0} </span>
                <p>Orders</p>
              </div>
              <div className="orders">
                <span> {buyerCartItems?.length || 0} </span>
                <p>Incart</p>
              </div>
              <div className="orders">
                <span> {wishlist?.length || 0} </span>
                <p>Wishlist</p>
              </div>
            </div>
          </div>

          <div className="btn-section">
            <Link to="/order-history" className="order-his order-btn">
              <img src={order_history} alt="" />
              <p>Order History</p>
            </Link>
            <Link to="/wishlist" className="wish-list order-btn">
              <img src={wishlistimg} alt="" />
              <p>Wishlist</p>
            </Link>
          </div>

          {activeMobile === "" ? (
            <div className="pro-setting-wrap">
              <h3>Profile Setting</h3>
              <div className="sub-points">
                {mobile_data.map((item, index) => (
                  <div className="wrap" onClick={item.click}>
                    <img src={item.img_mobile} alt="" />
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mobile_data">
              {activeMobile === "personalInfo" && (
                <div class="personal_information">
                  <div className="top">
                    <h2>Personal Information</h2>
                    <div
                      className="back_button"
                      onClick={() => setActiveMobile("")}
                    >
                      <IoMdArrowRoundBack />
                    </div>
                  </div>
                  <form class="form" onSubmit={handleSubmit}>
                    <div class="top_section">
                      <div class="left">
                        <div class="upload">
                          {imageDisplay !== null ? (
                            <img
                              src={`https://images.jungleboosh.com/${imageDisplay}`}
                              alt=""
                            />
                          ) : (
                            <LuCamera />
                          )}
                        </div>
                        <div class="upload_right_side">
                          <div class="upload_button">
                            {" "}
                            <input
                              onChange={handleImageChange}
                              className="image_input"
                              type="file"
                            />
                            Upload Photo{" "}
                          </div>
                          <p>
                            JPG or PNG allowed. Image size should be max 2mb.
                          </p>
                        </div>
                      </div>

                      {editAccess ? (
                        <div class="right">
                          <button class="button">upload_right_side</button>
                        </div>
                      ) : (
                        <div class="right">
                          <Tooltip id="my-tooltip" />
                          <div
                            data-tooltip-id="my-tooltip"
                            data-tooltip-content="Click To Edit Profile"
                            class="button"
                            onClick={() => setEditAccess(true)}
                          >
                            Edit
                          </div>
                        </div>
                      )}
                    </div>
                    <div class="bottom_section">
                      <h2>Basic Information</h2>
                      <div class="input_section">
                        <div class="label">
                          <p>Full Name*</p>
                          <input
                            type="text"
                            onChange={handleChange}
                            name="Name"
                            value={values.Name}
                            disabled={!editAccess}
                          />
                        </div>
                        <div class="label">
                          <p>Email*</p>
                          <input
                            type="text"
                            onChange={handleChange}
                            name="email"
                            value={values.email}
                            disabled={!editAccess}
                          />
                        </div>
                        <div class="label">
                          <p>Phone Number*</p>
                          <input
                            type="text"
                            onChange={handleChange}
                            name="mobileNumber"
                            value={values.mobileNumber}
                            disabled={!editAccess}
                          />
                        </div>
                        <div class="two_grid_section">
                          <div class="label">
                            <p>Birth Date</p>
                            <input
                              type="date"
                              onChange={handleChange}
                              name="dateofBirth"
                              value={values.dateofBirth}
                              disabled={!editAccess}
                            />
                          </div>
                          <div class="label">
                            <p>Gender</p>
                            <select
                              id=""
                              onChange={handleChange}
                              name="gender"
                              value={values.gender}
                              disabled={!editAccess}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  {/* <p className="delete_account">Delete Account</p> */}
                </div>
              )}

              {activeMobile === "manageAddress" && (
                <div class="manage_address">
                  <div class="top_section">
                    <div
                      className="back_button"
                      onClick={() => setActiveMobile("")}
                    >
                      <IoMdArrowRoundBack />
                    </div>
                    <h2>Manage Address</h2>
                    <div class="addnew_btn" onClick={() => setPopUp(true)}>
                      <span>
                        <GoPlus />
                      </span>
                      Add New Address
                    </div>
                  </div>
                  <div class="address_section">
                    {addressdetails &&
                      addressdetails.map((item, index) => (
                        <div class="address">
                          <div class="top_add_section">
                            <p>{item?.addressType}</p>
                            <div class="action_buttons">
                              <span onClick={() => getAddressById(item?.id)}>
                                <MdModeEditOutline />
                              </span>
                              <span onClick={()=>deleteAddress(item.id)}>
                                <MdDeleteOutline />
                              </span>
                            </div>
                          </div>
                          <h3> {buyerData?.Name} </h3>
                          <h5>{buyerData?.mobileNumber}</h5>
                          <p>{item?.address}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="bp_error">
          <p>You are not login</p>
          <Link className="btn" to="/login">
            {" "}
            Login{" "}
          </Link>
        </div>
      )}
    </>
  );
}

export default BuyerProfile;
