import React, { useContext, useState } from "react";
import "./TopCategories.scss";
import { FaArrowRightLong } from "react-icons/fa6";
import explore_india from "../../assets/top-categories/explore_india.png";
import explore_indiamob from "../../assets/icons/explore_india.png";
import go_shala from "../../assets/icons/go_shala.png";
import handmade_mob from "../../assets/icons/handmade.png";
import goshla2 from "../../assets/top-categories/goshal2.png";
import organic_mob from "../../assets/icons/organic.png";
import farm_fresh_mob from "../../assets/icons/farm_fresh.png";
import farm_good from "../../assets/top-categories/farm_good.png";
import organic from "../../assets/top-categories/organic.png";
import farm_fresh from "../../assets/top-categories/farm_fresh.png";
import handproduct from "../../assets/top-categories/handproduct.png";
import fashion from "../../assets/top-categories/fashion.png";
import fashion_mob from "../../assets/icons/fashion.png";
import Map from "../map/Map";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context";
import { toast } from "react-toastify";
function TopCategories() {
  const [mapOppend, setMapOppend] = useState(false);
  const navigate = useNavigate();
  const { pincode } = useContext(UserContext);

  const organicfeild = ["Healthy",  "Crops", "Chemical Free"];
  const farmfreshField = ["Crops", "Food"];
  const HandemadeFeilds = ["Craft", "Eco Friendly"];
  const FashionFeilds = ["Fashion", "Cultural"];

  const navigateOrganic = () => {
    const url = `/search?Prd_category=${organicfeild}`;
    window.open(url, "_blank");
  };
  const navigategoShala = () => {
    const url = `/search?Prd_category=Go Shala`;
    window.open(url, "_blank");
  };

  const navigateFarmFresh = () => {
    if (pincode === undefined) {
      toast.error("Use Current Location");
      console.log("Use Current Location");
      return;
    }
    const url = `/search?farm_fresh=${pincode}`;
    window.open(url, "_blank");
  };
  const navigatecraft = () => {
    const url = `/search?Prd_category=${HandemadeFeilds}`;
    window.open(url, "_blank");
  };
  const navigateFashion = () => {
    const url = `/search?Prd_category=${FashionFeilds}`;
    window.open(url, "_blank");
  };

  const data = [
    {
      title: "Explore India",
      content: "Discover Local Goods Across India.",
      icon: explore_india,
      click: () => setMapOppend(true),
    },
    {
      title: "Go Mai Products",
      content:
        "Plan Early, Get Fresh Naturally/Pre- Book Harvest, Support a Farmer.",
      icon: goshla2,
      click: () => navigategoShala(),
    },
    {
      title: "Natural ",
      content: "The main steps for agricultural practices.",
      icon: organic,
      click: () => navigateOrganic(),
    },
    // {
    //   title: "Farm Fresh",
    //   content: "Agriculture cultivation crops and fodder. ",
    //   icon: farm_fresh,
    //   click: () => navigateFarmFresh(),
    //   disbaled: true,
    // },
    {
      title: "HandCraft Products",
      content: "There are so many that make custom inexpensive.",
      icon: handproduct,
      click: () => navigatecraft(),

    },

    // {
    //   title: "Fashion",
    //   content: "Fashion is a term used interchangeably to describe",
    //   icon: fashion,
    //   click: () => navigateFashion(),
    //   disbaled: true,
    // },
  ];

  const mobile_data = [
    {
      title: "Explore India",
      icon: explore_indiamob,
      click: () => setMapOppend(true),
    },
    {
      title: "Go Mai Products",
      icon: go_shala,
      click: () => navigategoShala(),
    },
    {
      title: "Natural",
      icon: organic_mob,
      click: () => navigateOrganic(),
    },
    // {
    //   title: "Farm Fresh",
    //   icon: farm_fresh_mob,
    //   click: () => navigateFarmFresh(),
    // },
    {
      title: "HandCraft Products",
      icon: handmade_mob,
      click: () => navigatecraft(),
    },
    // {
    //   title: "Fashion",
    //   icon: fashion_mob,
    //   click: () => navigateFashion(),
    // },
  ];

  return (
    <>
      {mapOppend && <Map setMapOppend={setMapOppend} />}
      <div
        id="top_category"
        className="parent top-category-parent bg-img-cover"
      >
        <div className="top-category-overlay bg-img-cover"></div>
        <div className="label"></div>

        <div className="cont top-category-cont">
          <div className="wrapper-top-category">
            <div className="top-category-heading">
              <h2>Shop by Top Categories</h2>
            </div>
            <div className="wraper-category">
              {data.map((item, index) => (
                <div className="wrapper-main-card">
                  <div
                    className="wrapper-categories-card"
                    onClick={() => item.click && item.click()}
                    style={{pointerEvents: `${item.disbaled ? "none" : "all"}`}}
                  >
                    {item.disbaled && <div class="overlay">Coming Soon...</div>}
                    <div className="left-categories-content">
                      <h4>{item.title}</h4>
                      <p>{item.content}</p>
                      <div className="explore">
                        <p>Explore</p>
                        <span>
                          <FaArrowRightLong />
                        </span>
                      </div>
                    </div>
                    <div className="right-ctegories-img">
                      <img src={item.icon} alt="" />
                    </div>
                  </div>

                  {/* <div className="explore_ind_wrap bg-img-cover">
                    <div className="left_ex_ind">
                      <h2>{item.title}</h2>
                      <p>Discover Local Goods Across India.</p>
                      <div
                        className="explore"
                        onClick={() => item.click && item.click()}
                      >
                        <p>Explore</p>
                        <span>
                          <FaArrowRightLong />
                        </span>
                      </div>
                    </div>
                    <div className="right_ex_ind"></div>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile icon section */}
      <div className="mobile-category-swiper">
        <Swiper
          spaceBetween={20}
          slidesPerView={3.2}
          pagination={{
            clickable: true,
          }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {mobile_data.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="icon-card"
                onClick={() => item.click && item.click()}
              >
                <img src={item.icon} alt={item.title} />
                <h6>{item.title}</h6>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default TopCategories;
