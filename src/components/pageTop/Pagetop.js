import React from "react";
import "./Pagetop.scss";

const Pagetop = ({heading , para}) => {
  return (
    <>
      <div className="parent page_top_parent bg-img-cover">
        <div className="cont page_top_cont">
          <div className="left_page_top">
            <h2> {heading}</h2>
            <p>
             {para}
            </p>
          </div>
          <div className="right_page_top"></div>
        </div>
      </div>
    </>
  );
};

export default Pagetop;
