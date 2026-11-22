import React, { useContext } from "react";
import "./Vendors.scss";
import { FaArrowRightLong } from "react-icons/fa6";
import { UserContext } from "../../Context";
import { Link } from "react-router-dom";
import femaleIcon from "../../assets/women_empowirng.png";
import maleIcon from "../../assets/farmer_icon.png";

function Vendors() {
  const { sellerList } = useContext(UserContext);

  return (
    <>
      <div className="parent vendors-parent ">
        <div className="vendors-overlay bg-img-cover"></div>
        <div className="label"></div>

        <div className="cont vendors-cont">
          <div className="wrapper-vendors">
            <div className="vendors-heading">
              <h2>Featured Makers</h2>
              <Link to="/vendors" className="top-vendors-view">
                <span>View All</span>
                <span>
                  <FaArrowRightLong />
                </span>
              </Link>
            </div>

            <div className="bottom-vendors">
              {sellerList &&
                sellerList?.slice(0, 12).map((item, index) => (
                  <Link
                    to={`/Vendor_profile?sellerId=${item.sellerId}`}
                    className="vendors-card"
                  >
                    <div class="image">
                      {item?.profileImage ? (
                        <img src={item.profileImage} alt="" />
                      ) : (
                        <img
                          src={
                            item?.gender === "Female" ? femaleIcon : maleIcon
                          }
                          alt=""
                        />
                      )}
                    </div>
                    <div class="content">
                      <h4>{item.businessOwnerName}</h4>
                      {/* <p>{item.sellerTag}</p> */}
                      <p>
                        {item.state}, {item.city}
                      </p>
                      <div className="know_more_btn">
                        <span>
                          {" "}
                          <FaArrowRightLong />
                        </span>
                        Know more
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Vendors;
