import React from "react";
import "./ProductCard.scss";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import rice from "../../assets/trending-product/rice.png";

function ProductCard() {
  const data = [
    {
      name: "Price",
      number: "6,084",
    },
    {
      name: "Discount",
      number: "-1,141",
    },
    {
      name: "Price",
      number: "483",
    },
    {
      name: "Price",
      number: "6,084",
    },
  ];

  const info = [
    {
      name: "Ramji Patil Shree Ram Wheat",
      vendor: "Ramji Patil (Nashik)",
      category: "Vegetables",
      cut_price: "₹60/kg",
      price: "₹54/kg",
      discount: "20% Off",
      delivery: "Delivery by Fri Apr 11 ",
      subtotal: "540",
    },
    {
      name: "Ramji Patil Shree Ram Wheat",
      vendor: "Ramji Patil (Nashik)",
      category: "Vegetables",
      cut_price: "₹60/kg",
      price: "₹54/kg",
      discount: "20% Off",
      delivery: "Delivery by Fri Apr 11 ",
      subtotal: "540",
    },
  ];

  return (
    <>
      <div className="parent product-card-parent">
        <div className="cont product-card-cont">
          <div className="left-product-card">
            <div className="main-pincode">
              <div className="pincode">
                <p>Enter Delivery Pincode : </p>
                <h4>440070</h4>
              </div>
              <span>Saved Address</span>
            </div>
            <div class="product-main-list">
              {info.map((item, index) => (
                <div className="product-list">
                  <div className="seller-name">
                    <img src={rice} alt="" />
                    <div className="seller-info">
                      <h3>{item.name}</h3>
                      <div className="vendor-category">
                        <div className="vendor">
                          <h4>Maker :</h4>
                          <span>{item.vendor} </span>
                        </div>
                        <div className="category">
                          <h4>Category :</h4>
                          <span>{item.category}</span>
                        </div>
                      </div>

                      <div className="rupees">
                        <span style={{ textDecoration: "line-through" }}>
                          {item.cut_price}
                        </span>
                        <h4>{item.price}</h4>
                        <span>{item.discount}</span>
                      </div>

                      <div className="counting-date">
                        <div className="counter">
                          <span className="minus">-</span>
                          <span>10</span>
                          <span className="minus">+</span>
                        </div>
                        <div className="date">
                          <span>
                            {item.delivery} |
                            <span style={{ color: "var(--accent)" }}>
                               Free
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="total">
                    <h4>Subtotal :</h4>
                    <h4> Rs.{item.subtotal}</h4>
                  </div>
                  <div className="delete-btn">
                    <span>
                      <RiDeleteBinLine />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="right-product-card">
            <div className="price-details-wrapper">
              <h4>Price Details</h4>
              <div className="applied-cost">
                {data.map((item, index) => (
                  <div className="price" key={index}>
                    <p>{item.name} (2 Items)</p>
                    <h4>
                      <span>rs</span>
                      {item.number}
                    </h4>
                  </div>
                ))}
              </div>
              <div className="total-amnt">
                <h5>Total Amount</h5>
                <h5>
                  <span>rs</span>4,388
                </h5>
              </div>
              <span>You will save ₹1,696 on this order</span>
            </div>
            <div className="btn">Proceed to checkout</div>

            <div className="tip">
              <span>
                <AiFillSafetyCertificate />
              </span>
              <p>
                Safe and Secure Payments. Easy returns.100% Authentic products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

<div className="btn">Proceed to checkout</div>;

export default ProductCard;
