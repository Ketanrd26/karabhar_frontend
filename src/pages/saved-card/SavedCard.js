import React from "react";
import "./SavedCard.scss";
import { Link } from "react-router-dom";
import { RiDeleteBin4Line } from "react-icons/ri";

function SavedCard() {
  return (
    <>
      <div className="parent upi-parent">
        <div className="cont upi-cont">
          <div className="top-upi">
            <h3>Manage Saved Cards</h3>
          </div>
          <div className="bottom-upi">
            <div className="phone-pay">
              <Link class="home-btn">Axis Bank Credit Card</Link>
              <span>
                <RiDeleteBin4Line />
              </span>
            </div>
            <div className="phone-pay-no">**** **** **** 9584</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SavedCard;
