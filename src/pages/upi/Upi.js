import React from "react";
import "./Upi.scss";
import { Link } from "react-router-dom";
import { RiDeleteBin4Line } from "react-icons/ri";
import pay from "../../assets/buyer-profile/phonepay.png";

function Upi() {
  return (
    <>
      <div className="parent upi-parent">
        <div className="cont upi-cont">
          <div className="top-upi">
            <h3>Manage Saved UPI </h3>
          </div>
          <div className="bottom-upi">
            <div className="phone-pay">
              <Link class="home-btn">Phone pay</Link>
              <span>
                <RiDeleteBin4Line />
              </span>
            </div>
            <div className="phone-pay-no">
              <img src={pay} alt="" />
              9595567684@ybl
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Upi;
