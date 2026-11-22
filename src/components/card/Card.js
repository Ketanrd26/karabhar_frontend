import React from "react";
import "./Card.scss";
import addtocart from "../../assets/trending-product/add_to_cart.png";
import star from "../../assets/trending-product/Star.png";
import star_grey from "../../assets/trending-product/star_grey.png";

function Card({ data }) {
  return (
    <>
      <div className="card ">
        {data.map((item, index) => (
          <div className="card-wrapper">
            {item.tag && (
              <div
                className={
                  item.tag === "New"
                    ? "card-top-label yellow"
                    : item.tag === "Save 50%"
                    ? "card-top-label orange"
                    : "card-top-label"
                }
              >
                <span>{item.tag}</span>
              </div>
            )}
            <img src={item.product_image} alt="" />
            <div className="card-bottom-content">
              <div className="card-left-section">
                <div className="card-name-price">
                  <p>{item.product_name}</p>
                  <h4>{item.product_price}</h4>
                </div>
                <div className="card-rating">
                  <img src={star} alt="" /> 
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star} alt="" />
                  <img src={star_grey} alt="" />
                  <img src={star_grey} alt="" />
        
                </div>
              </div>
              <div className="right-section">
                <img src={addtocart} alt="" />
                <span>Add to cart</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Card;
