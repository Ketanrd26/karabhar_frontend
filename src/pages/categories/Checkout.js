import React, { useContext, useEffect, useState } from "react";

import "./checkout.scss";
import { MdModeEdit, MdCheck } from "react-icons/md";
import { ImTarget } from "react-icons/im";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { UserContext } from "../../Context";
import { paymentApi, orderApi, adminApi, buyerApi } from "../../utils/Api";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useSearchParams } from "react-router-dom";
import upi from "../../assets/upi.png";
import card from "../../assets/Mastercard-logo.png";
import net_bank from "../../assets/net_bank.png";
import cod from "../../assets/cod.png";
import { Helmet } from "react-helmet";
import SelectInput from "../../components/selectInput/SelectInput";
import { MenuItem } from "@mui/material";
import { trucateAmt } from "../../components/truncateAmt/TruncateAmt";
import Loader from "../../components/loader/Loader";

const Checkout = () => {
  const [activeAddressIndex, setActiveAddressIndex] = useState(0);
  const editAddress = localStorage.getItem("editAddress");
  const {
    addressdetails,
    buyerData,
    buyerCartItems,
    cartSummary,
    getBuyerCartItems,
    getBuyerData,
  } = useContext(UserContext);
  const [activeStep, setActiveStep] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const [searchparams] = useSearchParams();
  const prdId = searchparams.get("prdId");
  const count = searchparams.get("count");
  const vid = searchparams.get("vid");
  const [summary, setSummary] = useState();
  const [prdData, setPrdData] = useState();
  const [values, setValues] = useState({
    buyer: "",
    paymentMethod: "",
    address: {
      line1: "",
      pincode: "",
    },
  });
  const [buyerAddress, setBuyerAddress] = useState({
    addressType: "home",
    country: "",
    state: "",
    city: "",
    landmark: "",
    pincode: "",
    address: "",
  });

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

  useEffect(() => {
    getAllCountry();
  }, []);

  const handleChangeAddress = (e) => {
    const { name, value } = e.target;
    setBuyerAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAdress = async (e) => {
    try {
      e.preventDefault();

      const response = await buyerApi.post(
        `buyer/addAddress?buyerId=${buyerData?.id}`,
        buyerAddress,
      );

      if (response.status === 200) {
        getBuyerData();
        setIsPopupOpen(false);
        setBuyerAddress({
          addressType: "",
          country: "",
          state: "",
          city: "",
          landmark: "",
          pincode: "",
          address: "",
        });
      }
    } catch (error) {
      console.log(error);
      const errorresponse = error.response;

      if (errorresponse?.data?.message) {
        toast.error(errorresponse?.data?.message);
      }
    }
  };

  const [guestForm, setGuestForm] = useState({
    guest: {
      name: "",
      phone: "",
      email: "",
    },
    address: {
      line1: "",
      pincode: "",
    },
  });

  const [sessionAddress, setSessionAddress] = useState(null);

  const sessionData = sessionStorage.getItem("guestAddress");
  const parseSessiondata = sessionData ? JSON.parse(sessionData) : null;

  useEffect(() => {
    const seessionData = sessionStorage.getItem("guestAddress");
    const data = JSON.parse(seessionData);

    setSessionAddress(data);
  }, []);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setLoader(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );

          const data = await res.json();

          // Find country from countryList
          const country = countryList.find(
            (item) =>
              item.countryName.toLowerCase() ===
              data.address.country.toLowerCase(),
          );

          if (country) {
            // Get states for the selected country
            const statesResponse = await adminApi.get(
              `api/getStateByCountryId?countryId=${country.id}`,
            );
            const states = statesResponse?.data?.data || [];
            setStateList(states); // Update state list

            // Find matching state
            const state = states.find(
              (s) =>
                s.stateName.toLowerCase() === data.address.state.toLowerCase(),
            );

            if (state) {
              // Get cities for the selected state
              const citiesResponse = await adminApi.get(
                `api/getCityByState?stateId=${state.id}`,
              );
              const cities = citiesResponse?.data?.data || [];
              setCityList(cities); // Update city list

              // Find matching city
              const city = cities.find(
                (c) =>
                  c.cityName.toLowerCase() ===
                  data.address.county.toLowerCase(),
              );

              if (buyerData) {
                setBuyerAddress((prev) => ({
                  ...prev,
                  address: data?.display_name || "",
                  pincode: data?.address?.postcode || "",
                  country: country.id,
                  state: state.id,
                  city: city?.cityName || "",
                }));
              }
            } else {
              // If state not found, just update the country and stateList
              if (buyerData) {
                setBuyerAddress((prev) => ({
                  ...prev,
                  address: data?.display_name || "",
                  pincode: data?.address?.postcode || "",
                  country: country.id,
                  state: "",
                  city: "",
                }));
              }
            }
          }

          setGuestForm((prev) => ({
            ...prev,
            address: {
              ...prev.address,
              line1: data?.display_name || "",
              pincode: data?.address?.postcode || "",
            },
          }));
        } catch (error) {
          console.error(error);
        } finally {
          setLoader(false);
        }
      },
      (error) => {
        console.log(error);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Location permission denied");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location unavailable");
            break;
          case error.TIMEOUT:
            alert("Location request timed out");
            break;
          default:
            alert("Unable to fetch location");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  useEffect(() => {
    if (buyerData) {
      setValues((prev) => ({
        ...prev,
        buyer: buyerData?.id,
      }));
    }
  }, [buyerData]);
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const clearCartItem = async () => {
    try {
      if (buyerData) {
        await buyerApi.delete(`/buyer/clearCart?buyerId=${buyerData?.id}`);
      } else {
        await buyerApi.delete("/buyer/clearCart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkOut = async () => {
    try {
      setLoader(true);
      let response;

      if (prdId && count && vid && buyerData) {
        response = await buyerApi.post(
          "/buyer/noncartcheckout",
          {
            productId: Number(prdId),
            varientId: vid ? Number(vid) : null,
            quantity: Number(count),

            ...(buyerData
              ? {
                  buyer: buyerData.id,
                  address: {
                    line1: values?.address?.line1 || "",
                    pincode: values?.address?.pincode || "",
                  },
                }
              : {
                  guest: {
                    name: sessionAddress?.guest?.name || "",
                    phone: sessionAddress?.guest?.phone || "",
                    email: sessionAddress?.guest?.email || "",
                  },
                  address: {
                    line1: sessionAddress?.address?.line1 || "",
                    pincode: sessionAddress?.address?.pincode || "",
                  },
                }),

            paymentMethod: values.paymentMethod,
            currency: "INR",
          },
          {
            headers: {
              "idempotency-key": uuidv4(),
            },
          },
        );
      } else if (prdId && count && vid) {
        response = await buyerApi.post(
          "/buyer/noncartcheckout",
          {
            productId: Number(prdId),
            varientId: vid ? Number(vid) : null,
            quantity: Number(count),

            ...(buyerData
              ? {
                  buyer: buyerData.id,
                  address: {
                    line1: values?.address?.line1 || "",
                    pincode: values?.address?.pincode || "",
                  },
                }
              : {
                  guest: {
                    name: sessionAddress?.guest?.name || "",
                    phone: sessionAddress?.guest?.phone || "",
                    email: sessionAddress?.guest?.email || "",
                  },
                  address: {
                    line1: sessionAddress?.address?.line1 || "",
                    pincode: sessionAddress?.address?.pincode || "",
                  },
                }),

            paymentMethod: values.paymentMethod,
            currency: "INR",
          },
          {
            headers: {
              "idempotency-key": uuidv4(),
            },
          },
        );
      } else if (buyerData) {
        response = await buyerApi.post("/buyer/checkout", values, {
          headers: {
            "idempotency-key": uuidv4(),
          },
        });
      } else {
        response = await buyerApi.post(
          "/buyer/checkout",
          {
            guest: {
              name: sessionAddress?.guest?.name || "",
              phone: sessionAddress?.guest?.phone || "",
              email: sessionAddress?.guest?.email || "",
            },
            address: {
              line1: sessionAddress?.address?.line1 || "",
              pincode: sessionAddress?.address?.pincode || "",
            },
            paymentMethod: values.paymentMethod,
            currency: "INR",
          },
          {
            headers: {
              "idempotency-key": uuidv4(),
            },
          },
        );
      }

      // LOAD RAZORPAY SCRIPT
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        return;
      }

      const { razorpayOrderId, orderId, amount, currency } = response.data;

      if (values.paymentMethod === "COD") {
        toast.success("Order placed successfully");
        getBuyerCartItems();
        navigate(`/successPage?order_id=${orderId}`);
  



        if (!prdId && !count && !vid) {
          clearCartItem();
        }
        return;
      }

      const options = {
        key: "rzp_live_RyAHDpKiVShNkK",
        amount: Number(amount) * 100,
        // amount: 1,
        currency,
        name: "jungle Boosh",
        description: "Order Payment",
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            setLoader(true);
            const verifyRes = await paymentApi.post("/api/razorpay/verify", {
              providerOrderId: response.razorpay_order_id,
              providerPaymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              orderId,
              buyerId: values.buyer,
              address: values.address,
            });

            if (verifyRes.status === 200) {
              toast.success("Payment Success and Order Placed!");
              navigate(`/successPage?order_id=${orderId}`);
              getBuyerCartItems();
              clearCartItem();
            }
          } catch (err) {
            toast.error("Payment verification failed.");
          } finally {
            setLoader(false);
          }
        },
        prefill: {
          name: buyerData?.name,
          email: buyerData?.email,
        },
        theme: {
          color: "#b14b34",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("FULL ERROR:", error);

      if (error.response) {
        console.log("BACKEND ERROR:", error.response);

        toast.error(error.response.data.message || "Checkout failed");
      } else {
        toast.error("Network error or server not reachable");
      }
    } finally {
      setLoader(false);
    }
  };

  const addnewGuestAddress = (e) => {
    try {
      e.preventDefault();

      const phone = guestForm?.guest?.phone?.trim();
      const email = guestForm?.guest?.email?.trim();

      // 1️⃣ Phone required
      if (!phone) {
        toast.error("Phone number is required");
        return;
      }

      // 2️⃣ Phone must be exactly 10 digits
      if (!/^\d{10}$/.test(phone)) {
        toast.error("Phone number must be exactly 10 digits");
        return;
      }

      // 3️⃣ Email required
      if (!email) {
        toast.error("Email is required");
        return;
      }
      if (guestForm?.address?.line1 === "" && guestForm?.address?.pincode === "") {
        toast.error("Address and Pincode are required");
        return;
      }

      // 4️⃣ Email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        toast.error("Enter a valid email address");
        return;
      }

      sessionStorage.setItem("guestAddress", JSON.stringify(guestForm));

      setSessionAddress((prev) => ({
        ...prev,
        guest: guestForm.guest,
        address: guestForm.address,
      }));
      setIsPopupOpen(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (buyerData) {
      sessionStorage.removeItem("guestAddress");
    }
  }, [buyerData]);

  const orderSummaryStep = () => {
    if (buyerCartItems.length === 0 && prdData.length === 0) {
      toast.info("items are not selected to proceed");
      return false;
    } else {
      setActiveStep(3);
      return true;
    }
  };

  const addrssloginStep = () => {
    if (values?.address?.line1 === "") {
      toast.info("Please select or add delivery address to proceed");
      return false;
    }

    setActiveStep(2);
    return true;
  };
  const addrssnonloginStep = () => {
    if (sessionAddress === null) {
      toast.info("Please select or add delivery address to proceed");
      return false;
    }

    setActiveStep(2);
    return true;
  };

  const getGuestAddress = () => {
    setIsPopupOpen("guest");
    localStorage.setItem("editAddress", true);
    const stored = JSON.parse(sessionStorage.getItem("guestAddress"));

    if (stored) {
      setGuestForm({
        guest: stored.guest,
        address: stored.address,
      });
    }
  };

  const editGuestAddress = (e) => {
    try {
      e.preventDefault();

      const updatedAddress = {
        guest: guestForm.guest,
        address: guestForm.address,
      };

      const phone = guestForm?.guest?.phone?.trim();
      const email = guestForm?.guest?.email?.trim();

      // 1️⃣ Phone required
      if (!phone) {
        toast.error("Phone number is required");
        return;
      }

      // 2️⃣ Phone must be exactly 10 digits
      if (!/^\d{10}$/.test(phone)) {
        toast.error("Phone number must be exactly 10 digits");
        return;
      }

      // 3️⃣ Email required
      if (!email) {
        toast.error("Email is required");
        return;
      }

      if (guestForm?.address?.line1 === "" && guestForm?.address?.pincode === "") {
        toast.error("Address and Pincode are required");
        return;
      }

      // 4️⃣ Email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        toast.error("Enter a valid email address");
        return;
      }

      sessionStorage.setItem("guestAddress", JSON.stringify(updatedAddress));

      setSessionAddress(updatedAddress);
      setIsPopupOpen(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const addressType = (type) => {
    setBuyerAddress((prev) => ({
      ...prev,
      addressType: type,
    }));
  };



  // get summary
  const getSummary = async (prdId, count, vid = null, pincode) => {
    try {
      const response = await orderApi.get(
        `/api/order/getOrderSummary?prdId=${prdId}&varId=${vid}&count=${count}&pincode=${pincode}`,
      );

      setSummary(response?.data?.summary);
      setPrdData(response?.data?.prdResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const pincode = values?.address?.pincode
    ? values?.address?.pincode
    : parseSessiondata?.address?.pincode;

  useEffect(() => {
    if (prdId && count) {
      getSummary(prdId, count, vid ?? null, pincode);
    } else if (pincode) {
      getBuyerCartItems(pincode);
    }
  }, [prdId, count, vid, pincode]);

  useEffect(() => {
    if (addressdetails?.length > 0) {
      setActiveAddressIndex(0);

      setValues((prev) => ({
        ...prev,
        address: {
          line1: addressdetails[0].address,
          pincode: addressdetails[0].pincode,
        },
      }));
    }
  }, [addressdetails]);

  return (
    <>
      {/* <HeaderTop />
      <Header /> */}

      <Helmet>
        <title>Secure Checkout | JungleBoosh</title>

        <meta
          name="description"
          content="Complete your purchase securely at JungleBoosh. Enter shipping details and proceed with safe online payment."
        />

        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {loader && <Loader />}
      <div className="checkout-parent parent">
        <div className="checkout-cont cont">
          <div className="left">
            {/* //---------------Check List ------------// */}
            <div className="top-list">
              <div className="left-box">
                <div className={`number ${activeStep >= 1 ? "completed" : ""}`}>
                  {activeStep >= 1 ? <MdCheck /> : "01"}
                </div>
                <div className="text">Delivery Address</div>
              </div>
              <div className="right-box">
                <div className="line"></div>
              </div>
              <div className="left-box">
                <div className={`number ${activeStep >= 2 ? "completed" : ""}`}>
                  {activeStep >= 2 ? <MdCheck /> : "02"}
                </div>
                <div className="text">Order Summary</div>
              </div>
              <div className="right-box">
                <div className="line"></div>
              </div>
              <div className="left-box">
                <div className={`number ${activeStep >= 3 ? "completed" : ""}`}>
                  {activeStep >= 3 ? <MdCheck /> : "03"}
                </div>
                <div className="text">Payment Option</div>
              </div>
            </div>

            {/* //---------------Start Address Section -----------// */}
            {activeStep === 1 && (
              <>
                {(addressdetails?.length > 0 || sessionAddress !== null) && (
                  <div class="address">
                    {addressdetails?.length > 0 ? (
                      addressdetails?.map((item, index) => (
                        <div
                          className={`address-box ${
                            activeAddressIndex === index ? "active" : "inactive"
                          }`}
                          onClick={() => {
                            setActiveAddressIndex(index);
                            setValues((prevValues) => ({
                              ...prevValues,
                              address: {
                                ...prevValues.address,
                                line1: item?.address,
                                pincode: item?.pincode,
                              },
                            }));
                          }}
                        >
                          <div className="address-f">
                            <div className="circle">
                              <div className="circle2"></div>
                            </div>
                          </div>

                          <div className="address-m">
                            <div className="user-details">
                              <div className="username">
                                {" "}
                                {buyerData?.Name}{" "}
                              </div>
                              <div className="address-loc">
                                {" "}
                                {item?.addressType}{" "}
                              </div>
                              {item?.pincode && (
                                <div className="contact-num">
                                  {" "}
                                  Pincode : {item?.pincode}{" "}
                                </div>
                              )}
                            </div>
                            <div className="address">{item?.address}</div>
                            <div className="btn" onClick={addrssloginStep}>
                              Procced to Next
                            </div>
                          </div>
                          {/* 
                          <div className="address-l">
                            <MdModeEdit />
                          </div> */}
                        </div>
                      ))
                    ) : (
                      <div className={`address-box `}>
                        <div className="address-m">
                          <div className="user-details">
                            <div className="username">
                              {" "}
                              {sessionAddress?.guest?.name}{" "}
                            </div>
                            <div className="username">
                              {" "}
                              {sessionAddress?.guest?.phone}{" "}
                            </div>

                            {sessionAddress?.address?.pincode && (
                              <div className="contact-num">
                                {" "}
                                Pincode :{" "}
                                {sessionAddress?.address?.pincode}{" "}
                              </div>
                            )}
                          </div>
                          <div className="address">
                            {sessionAddress?.address?.line1}
                          </div>
                          <div className="btn" onClick={addrssnonloginStep}>
                            Procced to Next
                          </div>
                        </div>

                        <div className="address-l" onClick={getGuestAddress}>
                          <MdModeEdit />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="btn-box">
                  <div
                    className="btn"
                    onClick={() => setIsPopupOpen(buyerData ? "user" : "guest")}
                  >
                    Add a New Address
                  </div>
                </div>
              </>
            )}

            {/* //-------------Order Summary Section----------------// */}
            {activeStep === 2 && (
              <>
                {!prdId
                  ? buyerCartItems.map((item, index) => (
                      <div className="order-summary" key={index}>
                        <img
                          src={item?.product?.image}
                          alt={item?.product?.image}
                        />
                        <div className="img-content-box">
                          <div className="content-box">
                            <h2>{item?.product?.name.slice(0, 50)}</h2>

                            <div className="vendor-category-box">
                              <p>
                                Maker:{" "}
                                <span className="vendor">
                                  {item?.sellerName}
                                </span>
                              </p>
                              <p>
                                Category: <span>{item?.product?.category}</span>
                              </p>
                            </div>

                            <div className="price-box">
                              <p className="org-price">₹{item?.price}</p>
                            </div>

                            <div className="qantity">
                              <p>
                                Quantity:{" "}
                                <span className="quantity">
                                  {item?.quantity}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="total-box">
                            Subtotal : ₹{item?.price * item?.quantity || 0}
                            <div className="delete-icon">
                              <RiDeleteBin6Line />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  : prdData?.map((item, index) => (
                      <div className="order-summary" key={index}>
                        <div className="img-content-box">
                          <img src={item?.Heroimage} alt={item?.product_name} />
                          <div className="content-box">
                            <h2>{item?.product_name.slice(0, 50)}</h2>

                            <div className="vendor-category-box">
                              <p>
                                Category: <span>{item?.Sub_category}</span>
                              </p>
                            </div>

                            <div className="price-box">
                              <p className="org-price">₹{item?.price}</p>
                            </div>

                            <div className="qantity">
                              <p>
                                Quantity:{" "}
                                <span className="quantity">
                                  {summary?.totalItems}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* <div className="total-box">
                          Subtotal : ₹
                          {item?.product?.discount_price * item?.quantity || 0}
                          <div className="delete-icon">
                            <RiDeleteBin6Line />
                          </div>
                        </div> */}
                      </div>
                    ))}
              </>
            )}

            {/* //-------------Payment Section------------// */}
            {activeStep === 3 && (
              <>
                <div className="payment-options">
                  <h2>Payment Option</h2>
                  <div className="check-list">
                    <div className="first-col">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="UPI"
                        checked={values.paymentMethod === "UPI"}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            paymentMethod: e.target.value,
                          })
                        }
                      />
                      <img src={upi} alt="" />
                      <p>UPI Payment</p>
                    </div>

                    <div className="first-col">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Debit/Credit Card"
                        checked={values.paymentMethod === "Debit/Credit Card"}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            paymentMethod: e.target.value,
                          })
                        }
                      />
                      <img src={card} alt="" />
                      <p>Debit/Credit Card</p>
                    </div>

                    <div className="first-col">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Net Banking"
                        checked={values.paymentMethod === "Net Banking"}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            paymentMethod: e.target.value,
                          })
                        }
                      />
                      <img src={net_bank} alt="" />
                      <p>Net Banking</p>
                    </div>

                    <div className="first-col">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="COD"
                        checked={values.paymentMethod === "COD"}
                        onChange={(e) =>
                          setValues({
                            ...values,
                            paymentMethod: e.target.value,
                          })
                        }
                      />
                      <img src={cod} alt="" />
                      <p>Cash on Delivery</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* //---------------------Popup Box-------------------// */}
          {isPopupOpen === "user" && (
            <>
              <div className="overlay"></div>
              <div className="popupbox">
                <h2>Add New Address</h2>
                {loader && <p>loading....</p>}
                <span
                  className="cross-icon"
                  onClick={() => setIsPopupOpen(false)}
                >
                  <RxCross2 />
                </span>
                <div
                  className="location-btn"
                  style={{ cursor: "pointer" }}
                  onClick={handleGetLocation}
                >
                  <div className="icon">
                    <ImTarget />
                    <span>Use Current location </span>
                  </div>
                </div>
                <form onSubmit={handleAddAdress}>
                  <div className="group-one">
                    <div className="group">
                      <label for="fullname">Full Name*</label>
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={buyerData?.name}
                        required
                      />
                    </div>

                    <div className="group">
                      <label for="mobile">Mobile Number*</label>
                      <input
                        value={buyerData?.contact}
                        type="text"
                        id="mobile"
                        name="mobile"
                      />
                    </div>
                  </div>

                  <div className="address-group">
                    <label for="address">Address*</label>
                    <textarea
                      onChange={handleChangeAddress}
                      value={buyerAddress?.address}
                      rows="2"
                      id="address"
                      name="address"
                    ></textarea>
                  </div>

                  <div className="group-one">
                    <div className="group">
                      {" "}
                      <label for="landmark">Landmark</label>
                      <input
                        onChange={handleChangeAddress}
                        value={buyerAddress?.landmark}
                        type="text"
                        id="landmark"
                        name="landmark"
                      />
                    </div>

                    <div className="group">
                      <label for="pincode">Pincode</label>
                      <input
                        onChange={handleChangeAddress}
                        value={buyerAddress?.pincode}
                        type="text"
                        id="pincode"
                        name="pincode"
                      />
                    </div>
                    {/* <div className="group">
                      <label for="locality">Locality</label>
                      <input onChange={handleChangeAddress} value={buyerAddress?.landmark}  type="text" id="locality" name="locality" />
                    </div> */}
                  </div>

                  <div className="group-one">
                    <div className="group">
                      <label for="state">Country</label>

                      <SelectInput
                        label="Select Country"
                        value={buyerAddress?.country}
                        onChange={(e) => getCountryById(e.target.value)}
                      >
                        {countryList.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.countryName}
                          </MenuItem>
                        ))}
                      </SelectInput>
                    </div>

                    <div className="group">
                      <label for="state">State</label>
                      <SelectInput
                        label="Select State"
                        value={buyerAddress?.state}
                        onChange={(e) => getCityBystateId(e.target.value)}
                      >
                        {stateList.map((item, index) => (
                          <MenuItem key={index} value={item.id}>
                            {item.stateName}
                          </MenuItem>
                        ))}
                      </SelectInput>
                    </div>
                  </div>

                  <div className="group-one">
                    <div className="group">
                      {" "}
                      <label for="city">City</label>
                      <SelectInput
                        label="Select City"
                        onChange={handleChangeAddress}
                        value={buyerAddress.city}
                        name="city"
                      >
                        {cityList.map((item, index) => (
                          <MenuItem key={index} value={item.cityName}>
                            {item.cityName}
                          </MenuItem>
                        ))}
                      </SelectInput>
                    </div>
                  </div>

                  <div className="btns">
                    <label>Address Type</label>
                    <div className="btn-group">
                      <div
                        className={`btn1 ${buyerAddress?.addressType === "home" ? "btn1 active" : "btn1"}`}
                        onClick={() => addressType("home")}
                      >
                        Home
                      </div>
                      <div
                        className={`btn2 ${buyerAddress?.addressType === "work" ? "btn1 active" : ""}`}
                        onClick={() => addressType("work")}
                      >
                        Work
                      </div>
                    </div>
                  </div>

                  <div className="submit-btn-group">
                    <button className="btn1" type="submit">
                      Save
                    </button>
                    <button
                      className="btn2"
                      type="button"
                      onClick={() => setIsPopupOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
          {isPopupOpen === "guest" && (
            <>
              <div className="overlay"></div>
              <div className="popupbox">
                <h2>Add New Address</h2>
                {loader && <p>loading....</p>}
                <span
                  className="cross-icon"
                  onClick={() => setIsPopupOpen(false)}
                >
                  <RxCross2 />
                </span>
                <div
                  className="location-btn"
                  style={{ cursor: "pointer" }}
                  onClick={handleGetLocation}
                >
                  <div className="icon">
                    <ImTarget />
                    <span>Use Current location </span>
                  </div>
                </div>
                <form
                  onSubmit={editAddress ? editGuestAddress : addnewGuestAddress}
                >
                  <div className="group-one">
                    <div className="group">
                      <label for="fullname">Full Name*</label>
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={guestForm.guest.name}
                        onChange={(e) =>
                          setGuestForm({
                            ...guestForm,
                            guest: {
                              ...guestForm.guest,
                              name: e.target.value,
                            },
                          })
                        }
                        required
                      />
                    </div>

                    <div className="group">
                      <label for="mobile">Mobile Number*</label>
                      <input
                        type="tel"
                        required
                        value={guestForm.guest.phone}
                        onChange={(e) =>
                          setGuestForm({
                            ...guestForm,
                            guest: {
                              ...guestForm.guest,
                              phone: e.target.value,
                            },
                          })
                        }
                        id="mobile"
                        name="mobile"
                      />
                    </div>
                  </div>
                  <div className="group-one">
                    <div className="group">
                      <label for="mobile">Email*</label>
                      <input
                        type="email"
                        required
                        value={guestForm.guest.email}
                        onChange={(e) =>
                          setGuestForm({
                            ...guestForm,
                            guest: {
                              ...guestForm.guest,
                              email: e.target.value,
                            },
                          })
                        }
                        id="email"
                        name="email"
                      />
                    </div>
                    <div className="group">
                      <label for="pincode">Pincode</label>
                      <input
                        type="text"
                        value={guestForm.address.pincode}
                        onChange={(e) =>
                          setGuestForm({
                            ...guestForm,
                            address: {
                              ...guestForm.address,
                              pincode: e.target.value,
                            },
                          })
                        }
                        id="pincode"
                        name="pincode"
                      />
                    </div>
                  </div>
                  <div className="address-group">
                    <label for="address">Address</label>
                    <textarea
                      rows="2"
                      value={guestForm.address.line1}
                      onChange={(e) =>
                        setGuestForm({
                          ...guestForm,
                          address: {
                            ...guestForm.address,
                            line1: e.target.value,
                          },
                        })
                      }
                      id="address"
                      name="address"
                    ></textarea>
                  </div>
                  <div className="submit-btn-group">
                    <button className="btn1" type="submit">
                      Save
                    </button>

                    <button
                      className="btn2"
                      type="button"
                      onClick={() => setIsPopupOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
          {activeStep !== 1 && (
            <div className="right">
              {prdId ? (
                <div className="main-box">
                  <h4>Price Details</h4>

                  <div className="list">
                    <p>
                      Price ({summary?.totalItems} Items){" "}
                      {summary?.total && (
                        <span>₹ {trucateAmt(summary?.total)}</span>
                      )}
                    </p>
                    {/* <p>
                  Discount{" "}
                  <span className="negative-price">
                    -₹ {cartSummary?.launchingDiscount}{" "}
                  </span>
                </p> */}

                    {/* <p>
                  Platform Fee <span>₹ {cartSummary?.platformFee} </span>
                </p> */}
                    {summary?.deliveryCharges ? (
                      <p>
                        Delivery Charges
                        <span>₹ {trucateAmt(summary?.deliveryCharges)}</span>
                      </p>
                    ) : (
                      <p>
                        Delivery Charges <span> "Free Delivery"</span>
                      </p>
                    )}

                    {/* <p>
                  Gst (18%) <span> {cartSummary?.gst || "Free"}</span>
                </p> */}
                    {summary?.totalPrice && (
                      <p>
                        Total Amount{" "}
                        <span>₹ {trucateAmt(summary?.totalPrice)} </span>
                      </p>
                    )}
                    {/* <p className="last-line">You will save ₹1,696 on this order</p> */}
                  </div>
                </div>
              ) : (
                <div className="main-box">
                  <h4>Price Details</h4>

                  <div className="list">
                    <p>
                      Price ({cartSummary?.totalItems} Items){" "}
                      {cartSummary?.totalPrice && (
                        <span>₹ {trucateAmt(cartSummary?.totalPrice)}</span>
                      )}
                    </p>
                    {/* <p>
                  Discount{" "}
                  <span className="negative-price">
                    -₹ {cartSummary?.launchingDiscount}{" "}
                  </span>
                </p> */}

                    {/* <p>
                  Platform Fee <span>₹ {cartSummary?.platformFee} </span>
                </p> */}
                    {cartSummary?.deliveryCharges ? (
                      <p>
                        Delivery Charges{" "}
                        <span>
                          ₹ {trucateAmt(cartSummary?.deliveryCharges)}
                        </span>
                      </p>
                    ) : (
                      <p>
                        Delivery Charges <span>"Free Delivery"</span>
                      </p>
                    )}

                    {/* <p>
                  Gst (18%) <span> {cartSummary?.gst || "Free"}</span>
                </p> */}
                    {cartSummary?.grandTotal && (
                      <p>
                        Total Amount{" "}
                        <span>₹ {trucateAmt(cartSummary?.grandTotal)} </span>
                      </p>
                    )}
                    {/* <p className="last-line">You will save ₹1,696 on this order</p> */}
                  </div>
                </div>
              )}
            </div>
          )}
          {activeStep === 2 && (
            <div className="bottom-data">
              <div className="left-b">
                <div className="text">
                  Please select “Continue” to proceed with the payment.
                </div>
                <div className="right-b">
                  <div
                    className="border-btn"
                    onClick={() => setActiveStep((prev) => prev - 1)}
                  >
                    Back
                  </div>
                  <div className="btn" onClick={orderSummaryStep}>
                    Continue
                  </div>
                </div>
              </div>

              <div className="secure">
                <div className="icon">
                  <AiFillSafetyCertificate />
                </div>
                <p>
                  Safe and Secure Payments. Easy returns.100% Authentic
                  products.
                </p>
              </div>
            </div>
          )}
          {activeStep === 3 && (
            <div class="btn-wrap">
              <div className="text" style={{ textAlign: "center" }}>
                Order Confirmation will be sent to your email address.
              </div>
              <div className="btnss">
                <div
                  className="border-btn btn-back"
                  onClick={() => setActiveStep((prev) => prev - 1)}
                >
                  Back
                </div>
                <div className="btn" onClick={checkOut}>
                  Confirm Order
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
