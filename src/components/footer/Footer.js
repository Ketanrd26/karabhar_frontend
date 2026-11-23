import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa6";
import logo from "../../assets/1x/name_logo.png";
import mastercard from "../../assets/Mastercard-logo.png";
import visa from "../../assets/Visa_Logo.png";
import razorpay from "../../assets/razorpay-icon.webp";

function Footer() {
  return (
    <>
      <div className="footer_parent parent">
        <div className="footer_cont cont">
          <div className="left">
            <img src={logo} alt="" />
            <p>
              Karobhar connects you with products made with passion and
              businesses built with dreams. Discover unique finds, support local
              entrepreneurs, and shop with purpose.
            </p>
          </div>
          <div className="Specials spe1">
            <h4>Specials</h4>
            <div className="links">
              <a href="/search" target="_blank">
                Shop
              </a>
              <Link to="/vendors">Makers</Link>
              <Link to="/stories">Stories</Link>
            </div>
          </div>
          <div className="Specials spe2">
            <h4>Company</h4>
            <div className="links">
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div className="Specials spe3">
            <h4>Support</h4>
            <div className="links">
              <Link to="/cookies"> Cookies Policy </Link>
              <Link to="/termsCondition"> Terms & Condition</Link>
              <Link to="/refundPolicy">Refund Policy</Link>
            </div>
          </div>
          <div className="Specials spe4">
            <h4>Payment Methods</h4>
            <div className="meth">
              <img src={mastercard} alt="" />
              <img src={visa} alt="" />
              <img src={razorpay} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
