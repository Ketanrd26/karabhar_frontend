import React, { useEffect, useState } from "react";
import "./Orderdetails.scss";
import { Link, useSearchParams } from "react-router-dom";
import { orderApi, paymentApi } from "../../utils/Api";
// import { trucateAmt } from "../../components/truncateAmt/TruncateAmt";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";

const Order_detail = () => {
  const [orderdata, setOrderData] = useState();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [active, setActive] = useState(false);
  const [cancelledMessage, setCancelledMessage] = useState("");
  const [loader, setLoader] = useState(false);
  // const [activeIndex, setActiveIndex] = useState();
  // const [activeSpan, setActiveSpan] = useState();
  // const location = useLocation();

  const getOrderDetails = async () => {
    try {
      const response = await orderApi.get(
        `api/order/getOrderDataByOrderId?orderId=${orderId}`,
      );
      setOrderData(response?.data?.orderDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  const trackStatus = [
    { key: "pending", label: "Pending" },
    { key: "confirmed", label: "Confirmed By Seller" },
    { key: "shipped", label: "Out Of Delivery" },
    { key: "delivered", label: "Delivered" },
  ];
  const finaltrackStatus = [
    { key: "pending", label: "Pending" },
    { key: "shipped", label: "Out Of Delivery" },
    { key: "delivered", label: "Delivered" },
  ];

  // retry payment

  const retryPayment = async () => {
    try {
      const response = await paymentApi.post("/api/razorpay/retry", {
        orderId: orderdata?.orderId,
      });

      if (response.status === 200) {
        const { providerOrderId, amount, orderId, currency } = response?.data;

        const options = {
          key: "rzp_live_RyAHDpKiVShNkK",
          amount: Number(amount) * 100,
          currency: currency,
          name: "Jungleboosh",
          description: "Order Payment",
          order_id: providerOrderId,
          handler: async function (response) {
            try {
              const verifyRes = await paymentApi.post("/api/razorpay/verify", {
                providerOrderId: response.razorpay_order_id,
                providerPaymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                orderId,
                buyerId: orderdata?.buyerName,
                address: orderdata?.address,
              });

              if (verifyRes.status === 200) {
                toast.success("Payment Success and Order Placed!");
              }
            } catch (error) {
              toast.error("Payment verification failed.");
            }
          },
          prefill: {
            name: orderdata?.buyerName,
            email: orderdata?.email,
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (error) {
      toast.error("Something went wrong during checkout");
    }
  };

  // // ❌ Manual URL access
  // if (!location.state?.fromApp) {
  //   return <Navigate to="/404" replace />;
  // }

  // cancelled order

  const cancelOrderfunc = async () => {
    try {
      setLoader(true);
      if (cancelledMessage === "") {
        toast.error("Please enter cancel reason");
        return;
      }

      const response = await orderApi.post(
        `api/order/cancelledOrder?orderId=${orderId}`,
        {
          message: cancelledMessage,
        },
      );

      if (response.status === 200) {
        toast.success("Order cancelled successfully");
        setActive(false);
        setCancelledMessage("");
        localStorage.removeItem("cancelOrder");
        getOrderDetails();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  const cancelOrder = localStorage.getItem("cancelOrder");
  useEffect(() => {
    if (cancelOrder) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [cancelOrder]);



  return (
    <>
      {loader && <Loader />}
      {active && (
        <div class="cancelled_message">
          <div
            class="overlay"
            onClick={() => {
              setActive(false);
              localStorage.removeItem("cancelOrder");
            }}
          ></div>
          <div class="message">
            <p>Are you sure you want to cancel this order ?</p>
            <textarea
              value={cancelledMessage}
              onChange={(e) => setCancelledMessage(e.target.value)}
              name=""
              id=""
            ></textarea>
            <div class="btn_list">
              <button className="yes_btn" onClick={cancelOrderfunc}>
                Yes
              </button>
              <button
                className="no_btn"
                onClick={() => {
                  setActive(false);
                  localStorage.removeItem("cancelOrder");
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="order_details_parent parent">
        <div className="order_details_cont cont">
          <h1>Order Details</h1>
          <div className="middle_line">
            <div className="left">
              {orderdata?.Delievery_date ? (
                <>
                  <p>
                    Order Placed - {orderdata?.Delievery_date?.split("T")[0]}
                  </p>
                  <p>Order number - {orderdata?.orderId}</p>
                </>
              ) : (
                <>
                  <p>Order Created - {orderdata?.createdAt?.split("T")[0]}</p>
                  <p>Order number - {orderdata?.orderId}</p>
                </>
              )}
            </div>
            {!["delivered", "cancelled"].includes(orderdata?.status) && (
              <div
                className="cancelled"
                onClick={() => {
                  setActive(true);
                  localStorage.setItem("cancelOrder", true);
                }}
              >
                Cancel Order
              </div>
            )}
            {/* <Link to="https://api.invoices.jungleboosh.com/companyinvoices">
              Invoice
            </Link> */}
          </div>
          <div className="order_detail_amount">
            <div className="leftt">
              <div className="left_left">
                <h5>Ship to</h5>
                <p>{orderdata?.buyerName} </p>
                <p>{orderdata?.address}</p>
              </div>

              <div className="left_right">
                <div className="stp">
                  <h5>Payment method</h5>
                  <p> {orderdata?.paymentMethod} </p>
                </div>
                <div className="stp">
                  <h5>Payment Status</h5>
                  <p> {orderdata?.paymentStatus} </p>
                  {((orderdata?.paymentStatus === "Failed" &&
                    orderdata?.paymentMethod !== "COD") ||
                    (orderdata?.paymentStatus === "Pending" &&
                      orderdata?.paymentMethod !== "COD")) && (
                    <p
                      style={{ color: "red", cursor: "pointer" }}
                      onClick={retryPayment}
                    >
                      Retry Payment
                    </p>
                  )}
                </div>
                <div className="stp">
                  <h5>Order Status</h5>
                  <p> {orderdata?.status} </p>
                </div>
              </div>
            </div>

            <div className="rightt">
              <h5>Order Summary</h5>

              <div className="items_wrapper">
                <div className="round_wrap">
                  <p>Item({orderdata?.orderItems?.length}s) Subtotal:</p>
                  <p>₹ {orderdata?.orderSummary?.totalAmount} </p>
                </div>

                {/* <div className="round_wrap">
                  <p>platformFee:</p>
                  <p>₹ {orderdata?.orderSummary?.platformFee}</p>
                </div> */}

                {/* <div className="round_wrap">
                  <p>Discount:</p>
                  <p>₹ - {orderdata?.orderSummary?.discount}</p>
                </div> */}
                <div className="round_wrap">
                  <p>Delivery Charges:</p>
                  <p>Free Delivery</p>
                </div>
                <div className="round_wrap">
                  <p style={{ color: "black" }}>Grand Total:</p>
                  <p style={{ color: "black" }}>
                    ₹ {orderdata?.orderSummary?.payableAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order_details_wrap">
            {orderdata &&
              orderdata?.orderItems?.map((orderItem, index) => {
                const activeIndex = trackStatus.findIndex(
                  (status) => status.key === orderItem?.status,
                );

                return (
                  <div className="orderdata" key={index}>
                    <img src={orderItem?.productSnapshot?.image} alt="" />

                    <div className="details_text">
                      <h5>{orderItem?.productSnapshot?.name}</h5>
                      <p>Rs.{orderItem?.productSnapshot?.priceAtPurchase}</p>

                      <p>
                        Quantity: {orderItem?.quantity} Unit (
                        {orderItem?.productSnapshot?.unit})
                      </p>

                      <h5>Total : Rs. {orderItem?.lineTotal}</h5>
                      <h5>Order Status. {orderItem?.status}</h5>

                      <div className="order_btn">
                        <Link
                          to={`/Product-details?productName=${orderItem?.productSnapshot?.name}`}
                          className="buttonn"
                        >
                          View your item
                        </Link>
                      </div>

                      {orderdata?.Delievery_date === null && (
                        <div className="order_status">
                          {trackStatus.map((statusItem, i) => (
                            <div
                              className={`step ${
                                i <= activeIndex ? "active" : ""
                              }`}
                              key={i}
                            >
                              <span
                                className={i <= activeIndex ? "activespan" : ""}
                              ></span>
                              <p>{statusItem.label}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
          {orderdata?.Delievery_date !== null &&
            (() => {
              const activeIndex = trackStatus.findIndex(
                (status) => status.key === orderdata?.status,
              );

              return (
                <div className="order_status">
                  {finaltrackStatus.map((statusItem, i) => (
                    <div
                      className={`step ${i <= activeIndex ? "active" : ""}`}
                      key={i}
                    >
                      <span
                        className={i <= activeIndex ? "activespan" : ""}
                      ></span>
                      <p>{statusItem.label}</p>
                    </div>
                  ))}
                </div>
              );
            })()}
        </div>
      </div>
    </>
  );
};

export default Order_detail;
