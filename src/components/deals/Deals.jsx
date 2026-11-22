import React from 'react'
import "./Deals.scss"
import star from "../../assets/trending-product/Star.png";
import star_grey from "../../assets/trending-product/star_grey.png";
import rice from "../../assets/rice.png";
import Bannar from "../../assets/Bannar.png";


function Deals() {



  const first_hotdeals = [
    {
      img: rice,
      name: "Cinease Cabbage",
      price: 200,
    },
    {
      img: rice,
      name: "Cinease Cabbage",
      price: 200,
    },
    {
      img: rice,
      name: "Cinease Cabbage",
      price: 200,
    },
  ]

  const second_hotdeals = [
    {
      img: rice,
      name: "Cinease Cabbage",
      price: 200,
    },
    {
      img: rice,
      name: "Cinease Cabbage",
      price: 200,
    },
    {
      img: rice,
      name: "Cinease Cabbage",
      price: 200,
    },
  ]


  const most_rated = [
    {
      img: rice,
      name: "Cinease Cabbage",
      price: 200,
    },
    {
      img: rice,
      name: "Cinease Cabbage",
      price: 200,
    },
    {
      img: rice,
      name: "Cinease Cabbage",
      price: 200,
    },
  ]



  return (
    <>
      <div className="parent deals-parent bg-img-cover">
        <div className="deals-overlay"></div>
        <div className='label'></div>
        <div className="cont deals-cont">
          <div className="cont-wrapper">
            <div className="box ">
              <div className="top-sec">
                <h3>Hot Deals</h3>
              </div>
              {
                first_hotdeals.map((item, index) => (
                  <div className="bottom-sec">
                    <div className="hot-deals-list">
                      <img src={item.img} alt="" />
                      <div className="content">
                        <span>{item.name}</span>
                        <h4>Rs. {item.price}</h4>
                        <div className="card-rating">
                          <img src={star} alt="" />
                          <img src={star} alt="" />
                          <img src={star} alt="" />
                          <img src={star} alt="" />
                          <img src={star_grey} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }


            </div>

            <div className="box">
              <div className="top-sec">
                <h3>Hot Deals</h3>
              </div>
              {
                second_hotdeals.map((item, index) => (
                  <div className="bottom-sec">
                    <div className="hot-deals-list">
                      <img src={item.img} alt="" />
                      <div className="content">
                        <span>{item.name}</span>
                        <h4>Rs. {item.price}</h4>
                        <div className="card-rating">
                          <img src={star} alt="" />
                          <img src={star} alt="" />
                          <img src={star} alt="" />
                          <img src={star} alt="" />
                          <img src={star_grey} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>

            <div className="box">
              <div className="top-sec">
                <h3>Most Rated</h3>
              </div>
              {
                most_rated.map((item, index) => (
                  <div className="bottom-sec">
                    <div className="hot-deals-list">
                      <img src={item.img} alt="" />
                      <div className="content">
                        <span>{item.name}</span>
                        <h4>Rs. {item.price}</h4>
                        <div className="card-rating">
                          <img src={star} alt="" />
                          <img src={star} alt="" />
                          <img src={star} alt="" />
                          <img src={star} alt="" />
                          <img src={star_grey} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>

            <div className="bannerimg ">
              <div className="top-sec"></div>
              <div className="bannerimg-bottom-sec">
                <img src={Bannar} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Deals
