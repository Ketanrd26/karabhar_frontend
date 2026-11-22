import React, { useState } from "react";
import "./HeroSection.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import { FaArrowRightLong } from "react-icons/fa6";
// import fullimage from "../../assets/hero-section/basket-full-vegetables.jpg";
// import harvested from "../../assets/hero-section/harwested_farm.webp";
import { LiaLongArrowAltDownSolid } from "react-icons/lia";
// import farm_fresh from "../../assets/top-categories/farm_fresh.png";
// import organic from "../../assets/top-categories/organic.png";
import farm_good from "../../assets/hero-section/nan_bg.webp";
import expolre from "../../assets/hero-section/explore_india.png";
// import padwa_offer from "../../assets/hero-section/hero_banner2.webp";
// import farm_fresh_bg from "../../assets/hero-section/farm_fresh.webp";
import Slide1 from "../../assets/hero-section/slide1.jpeg";
import Slide3 from "../../assets/hero-section/slide3.png";
import { useNavigate } from "react-router-dom";
import Map from "../map/Map";



function HeroSection() {
  const navigate = useNavigate();
    const [mapOppend, setMapOppend] = useState(false);

  const data = [
    {
      background_img: Slide1,
      bg_img: Slide1,
      heading: " Delivered Directly from the Creator",
      inside_heading: "India's Authentic Heritage,",
      hightlight_textcolor: "#b14b34",
      width: "40%",
      flex_direction: "row-reverse",
      content:
        "JungleBoosh brings you closer to nature with thoughtfully crafted, sustainable lifestyle products that elevate everyday living — going green in style.",
    
    },

    {
      background_img: farm_good,
      bg_img: expolre,
      heading: "through your shopping desire.",
      inside_heading: "Explore India",
      hightlight_textcolor: "#b14b34",
      flex_direction: "row-reverse",
      width: "65%",
      click:()=>setMapOppend(true),
      content:
        "Every corner of India tells a unique story Discover unique products from selected Indian cities , Rooted in culture, crafted by real people.",
    },

    {
      bg_img: Slide3,
      heading: "Delivered Directly from the Gaushala",
      hightlight_textcolor: "#b14b34",
      inside_heading: "India's Pure Cow Heritage,",
      width: "40%",
      flex_direction: "row-reverse",
      click: () => navigate("/search?Prd_category=Go Shala"),
      content:
        "Reserve authentic cow-based products in advance — support gaushalas, ensure purity, and receive fresh, traditionally crafted essentials.",
    },
    // {
    //   bg_img: farm_fresh_bg,
    //   heading: "the Farm to Your Plate",
    //   inside_heading: "Fresh from",
    //   content:
    //     "Order vegetables and fruits grown nearby — harvested fresh, packed with nutrition, and delivered with care.",
    // },
  ];

  return (
    <>
    {mapOppend && <Map setMapOppend={setMapOppend} />}
      <div className="parent hero-parent">
        <Swiper
          spaceBetween={0}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {data.map((item, index) => (
            <SwiperSlide
              className="parent bg-img-cover"
              key={index}
              style={{ backgroundImage: `url(${item.bg_img})` }}
            >
              <div
                class=" hero-cont cont"
                style={{
                  flexDirection: `${item.flex_direction ? item.flex_direction : ""}`,
                }}
              >
                <div class="left"></div>
                <a
                  href="#top_category"
                  style={{ cursor: "pointer" }}
                  className="down-arrow"
                >
                  <span>
                    <LiaLongArrowAltDownSolid />
                  </span>
                </a>
                <div className="right-hero" style={{ width: `${item.width}` }}>
                  {/* <div className="bg-img bg-img-cover" style={{ background: `url(${item.background_img})` }}></div> */}
                  <h1>
                    <span
                      style={{
                        color: `${item.hightlight_textcolor ? item.hightlight_textcolor : ""}`,
                      }}
                    >
                      {item.inside_heading}
                    </span>
                    &nbsp;
                    {item.heading}
                  </h1>
                  <p>{item.content}</p>
                  {item.click && (
                    <div class="btn herobtn" onClick={item.click}>
                      Know More
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* mobile view */}

      {/* <div className="parent hero-parent-mobile">
        <div className="cont hero-cont-mobile">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={false}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {data.map((item) => (
              <SwiperSlide className="slide">
                <div className="overlay bg-img-cover"></div>
                <div className="text">
                  <h1>
                    {item.inside_heading} <span>{item.inside_heading}</span>{" "}
                    {item.heading}
                  </h1>
                  <h4>{item.content}</h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div> */}
    </>
  );
}

export default HeroSection;
