import React from "react";
import "./ManageAddress.scss";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin4Line } from "react-icons/ri";

function ManageAddress() {
  return (
    <>
      <div className="parent manage-add-parent">
        <div className="cont manage-add-cont">
          <div className="top-address">
            <h3>Manage Address</h3>
            <div className="new-add">
              <span className="add-icon">
                <IoAdd />
              </span>
              <span>Add New Address</span>
            </div>
          </div>

          <div className="bottom-add">
            <div className="home">
              <Link class="home-btn">Home</Link>
              <Link className="edit-dele">
                <span>
                  <MdModeEdit />
                </span>

                <span>
                  <RiDeleteBin4Line />
                </span>
              </Link>
            </div>
            <div className="name">
              <h4>Rishabh Khade</h4>
              <span>9096847365</span>
            </div>
            <div className="address">
              <p>Ambe nagar,near vidya Vijay school, pardi bus top, Pardi, nagpur,
              Pardi, Nagpur, Maharashtra - 440008</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageAddress;
