import React from "react";
import "./Contact.scss";
import Pagetop from "../../components/pageTop/Pagetop";
import Footer from "../../components/footer/Footer";
import { FaLocationDot } from "react-icons/fa6";
import { IoMailSharp } from "react-icons/io5";
import { Helmet } from "react-helmet";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>
          Contact JungleBoosh | Get in Touch for Organic & Natural Products
        </title>

        <meta
          name="description"
          content="Contact Jungle Boosh for queries about organic foods, natural soaps, groceries and eco-friendly products. Reach out to our team for support, orders and collaborations."
        />

        <meta name="robots" content="index, follow" />

        {/* Open Graph (Facebook & WhatsApp) */}
        <meta property="og:title" content="Contact JungleBoosh" />
        <meta
          property="og:description"
          content="Get in touch with JungleBoosh for organic and natural products inquiries."
        />
        <meta property="og:type" content="website" />

        <meta
          name="keywords"
          content="Contact JungleBoosh, organic store contact, natural products India, JungleBoosh support, eco friendly products"
        />
      </Helmet>

      <Pagetop
        heading="Contact JungleBoosh"
        para="Have a question or need help? Contact JungleBoosh for product inquiries, order support, or business collaborations. Our team is here to help you every step of the way."
      />
      <div class="contact_page_parent parent">
        <div class="contact_page_cont cont">
          <div class="ct_left">
            <h2>Send us a message</h2>
            <p>
              Do you have a question ? A complaint ? or need any help to choose
              the right product from jungleboosh . feel free to contact us
            </p>
            <form action="">
              <div class="form_row">
                <div class="input">
                  <label for=""> First Name </label>
                  <input type="text" placeholder="Enter Fist Name" />
                </div>
                <div class="input">
                  <label for=""> Last Name </label>
                  <input type="text" placeholder="Enter Last Name" />
                </div>
              </div>
              <div class="form_row">
                <div class="input">
                  <label for=""> Email </label>
                  <input type="email" placeholder="Enter Email" />
                </div>
                <div class="input">
                  <label for=""> Contact </label>
                  <input type="tel" placeholder="Enter Contact Number" />
                </div>
              </div>
              <div class="meesage_row">
                <label for="">Message</label>
                <textarea placeholder="Enter Your Message" />
              </div>
              <button className="btn">Send a Message</button>
            </form>
          </div>
          <div class="ct_right">
            <h3>Hi! We are always here to help you</h3>
            <a href="https://maps.app.goo.gl/b7nBET8JyV45GL1W9" class="address">
              <span class="icon">
                <FaLocationDot />
              </span>
              <div class="right_Add">
                <h4>Adress :</h4>
                <p>
                  S. No. 161, besides Ayodhya veg and Shanti honda showroom,
                  Vaibhav bungalow, plot no. 39, Vishrantwadi Airport Rd, Tingre
                  Nagar, Pune, Maharashtra 411015
                </p>
              </div>
            </a>
            <a href="mailto:junglebooshpvtltd@gmail.com" class="address">
              <span class="icon">
                <IoMailSharp />
              </span>
              <div class="right_Add">
                <h4>Mail to :</h4>
                <p>junglebooshpvtltd@gmail.com</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
