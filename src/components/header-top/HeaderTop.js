import React, { useContext, useEffect, useState } from "react";
import "./HeaderTop.scss";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { LuUser } from "react-icons/lu";
import { GiHut } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";
import { UserContext } from "../../Context";
import jb_logo from "../../assets/1x/Asset 3.png";
import cart from "../../assets/home-footer/cart.png";
import { MdMicNone } from "react-icons/md";
// import home from "../../assets/home-footer/home.png";
// import vendor from "../../assets/home-footer/vendor.png";
// import category from "../../assets/home-footer/category.png";
// import account from "../../assets/home-footer/account.png";
// import cart from "../../assets/home-footer/cart.png";
import { productApi } from "../../utils/Api";
import { FaHeart } from "react-icons/fa";


function HeaderTop() {
  const { buyerData, buyerCartItems,wishlist } = useContext(UserContext);
  const [suggestion, setSuggestions] = useState();
  const location = useLocation();
  const placeholders = [
    "cheese",
    "apple juice",
    "orange",
    "pineapple",
    "kurkure",
    "amul butter",
    "milk",
    "bread",
    "egg",
    "chocolate",
    "chips",
    "sweets",
    "biscuit",
    "fruits",
    "amul butter",
  ];

  const searchOptions = async (e) => {
    try {
      const value = e.target.value;

      const response = await productApi.get(
        `api/product/productOptions?search=${value}`
      );
      setSuggestions(response.data.suggestions);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateSearch = (suggestions) => {
    const url = `/search?suggestions=${suggestions}`;
    window.open(url);
  };



  return (
    <>
      <div className="parent header-top-parent">
        <div className="cont header-top-cont">
          <Link to="/" className="h-top-icon">
            <img src={jb_logo} alt="Jungle boosh" />

            
          </Link>

          <div className="wrapper">
            {location.pathname === "/search" ? (
              <div class="input">
                <input
                  type="text"
                  placeholder="Search Products"
                  onChange={searchOptions}
                />
                <span className="search-icon">
                  <IoSearchOutline />
                </span>

                {suggestion && (
                  <div
                    class="listing"
                    onMouseLeave={() => setSuggestions(null)}
                  >
                    {suggestion &&
                      suggestion?.map((item, index) => (
                        <Link onClick={() => navigateSearch(item)} key={index}>
                          {" "}
                          {item}{" "}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                className="search-bar"
                href="/search"
               
                rel="noopener noreferrer"
              >
                <span className="search-icon">
                  <IoSearchOutline />
                </span>

                <div className="placeholder-wrapper">
                  <div className="placeholder-text">Search</div>
                </div>
              </a>
            )}

            <div className="h-top-three-btn">
              <Link to="/cart" className="border-btn cart-btn cart_btn2">
                {buyerCartItems?.length > 0 && (
                  <div class="counter">{buyerCartItems?.length}</div>
                )}
                <span className="icons">
                  <AiOutlineShoppingCart />
                </span>
               
              </Link>
              <Link to="/wishlist" className="border-btn cart-btn cart_btn2">
                {wishlist?.length > 0 && (
                  <div class="counter">{wishlist?.length}</div>
                )}
                <span className="icons"  >
                  <FaHeart />
                </span>
               
              </Link>
              <a
                href="https://supplier.jungleboosh.com"
                target="blank"
                className="border-btn cart-btn"
              >
                <span className="icons">
                  <GiHut />
                </span>
                <p>Become a Seller </p>
              </a>
              {buyerData ? (
                <Link className="user_label" to="/buyer-profile">
                  <BiSolidUser /> {buyerData?.Name}

                  <div  className="logout">
                    
                  </div>
                </Link>
              ) : (
                <a href="/login" className="border-btn cart-btn">
                  <span className="icons">
                    <LuUser />
                  </span>
                  <p>Login</p>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* mobile device */}

      <div className="parent header-top-mobile-parent">
        <div className="cont header-top-mobile-cont">
          <div class="top_section">
            <Link to="/" className="h-top-icon">
              <img src={jb_logo} alt="Jungle boosh" />
            </Link>
            <a href="https://supplier.jungleboosh.com/">Become a seller</a>
            { location.pathname === "/search" && <Link  to="/cart" class="cart">
                <img src={cart} alt=""/>
               {buyerCartItems?.length > 0 && <span class="count">
                  {buyerCartItems?.length}
                </span>}
              </Link>}
          </div>

          <div className="wrapper">
           {location.pathname === "/search" ? (
              <div class="input">
                <input
                  type="text"
                  placeholder="Search Products"
                  onChange={searchOptions}
                />
                <span className="search-icon">
                  <IoSearchOutline />
                </span>

                {suggestion && (
                  <div
                    class="listing"
                    onMouseLeave={() => setSuggestions(null)}
                  >
                    {suggestion &&
                      suggestion?.map((item, index) => (
                        <Link onClick={() => navigateSearch(item)} key={index}>
                          {" "}
                          {item}{" "}
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                className="search-bar"
                href="/search"
             
                rel="noopener noreferrer"
              >
                <span className="search-icon">
                  <IoSearchOutline />
                </span>

                <div className="placeholder-wrapper">
                  <div className="placeholder-text">Search</div>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderTop;
