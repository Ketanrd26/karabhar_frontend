import React from 'react'
import "./WhyChooseUs.scss"
import { IoMdCheckmark } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';


function WhyChooseUs() {
  return (
    <>
      <div className="parent why-choose-parent bg-img-cover">
        <div className="why-choose-overlay bg-img-cover"></div>
        <div className='label bg-img-cover'></div>
        <div className="cont why-choose-cont">
          <div className="why-choose-left">
            <div className="img1 bg-img-cover"></div>
            <div className="img2 bg-img-cover"></div>
          </div>
          <div className="why-choose-right">
            <h2>Authentic Products from India’s Creators</h2>
            <div className="choose-points">
              <span><IoMdCheckmark /></span>
              <div className='tick-points'>
                <h4>Quality products made by small independent creators.</h4>
                <p>Jungle Boosh is a curated online store bringing together products created by skilled individuals from different parts of India. From food to everyday essentials, we help creators reach people digitally while preserving the honesty of what they make.</p>
              </div>
            </div>

            <div className="choose-points">
              <span><IoMdCheckmark /></span>
              <div className='tick-points'>
                <h4>Curated with care, backed by trust.</h4>
                <p>We work closely with creators who focus on making their products, while we handle quality checks, presentation, and delivery — ensuring genuine products and a reliable experience for customers.</p>
              </div>
            </div>

            <Link to="/search" className="btn why-choose-btn">
              <span>Explore by Region</span>
              <span><FaArrowRightLong /></span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default WhyChooseUs
