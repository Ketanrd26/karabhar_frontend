import React, { useContext } from "react";
import "./BottomFix.scss";
import home from "../../assets/home-footer/home.png";
import vendor from "../../assets/home-footer/vendor.png";
import category from "../../assets/home-footer/category.png";
import account from "../../assets/home-footer/account.png";
import cart from "../../assets/home-footer/cart.png";
import { Link, useLocation } from "react-router-dom";
import activeHome from "../../assets/icons/house.png";
import activeVendor from "../../assets/icons/vendor.png";
import activeUser from "../../assets/icons/us_profile.png";
import activeCart from "../../assets/icons/trolley.png";
import { UserContext } from "../../Context";

const BottomFix = () => {
  const location = useLocation();
  const { buyerCartItems } = useContext(UserContext);
  return (
    <>
      <div className="mobile-bottom">
        <Link to="/" className="common-class">
          <img
            className="bottom-icon"
            src={location.pathname === "/" ? activeHome : home}
            alt="home"
          />
          <h5
            style={{ color: location.pathname === "/" ? "var(--accent)" : "" }}
          >
            Home
          </h5>
        </Link>

        <Link to="/vendors" className="common-class">
          <img
            className="bottom-icon"
            src={location.pathname === "/vendors" ? activeVendor : vendor}
            alt="vendor"
          />
          <h5
            style={{
              color: location.pathname === "/vendors" ? "var(--accent)" : "",
            }}
          >
            Makers
          </h5>
        </Link>

        {/* <Link className=" common-class">
          <img className="bottom-icon" src={category} alt="category" />
          <h5>Orders</h5>
        </Link> */}

        <Link to="/buyer-profile" className="common-class">
          <img
            className="bottom-icon"
            src={location.pathname === "/buyer-profile" ? activeUser : account}
            alt="account"
          />
          <h5
            style={{
              color:
                location.pathname === "/buyer-profile" ? "var(--accent)" : "",
            }}
          >
            Account
          </h5>
        </Link>

        <Link to="/cart" className="common-class">
          {buyerCartItems?.length > 0 && <h5 className="count">{buyerCartItems?.length}</h5>}
          <img
            className="bottom-icon"
            src={location.pathname === "/cart" ? activeCart : cart}
            alt="cart"
          />
          <h5
            style={{
              color: location.pathname === "/cart" ? "var(--accent)" : "",
            }}
          >
            Cart
          </h5>
        </Link>
      </div>
    </>
  );
};

export default BottomFix;
