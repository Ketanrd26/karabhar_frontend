import React from "react";
import "./NotFound.scss";
import fruitImage from "../../assets/not-found/fruit_img.png";

const NotFound = () => {
  return (
    <>
      <div class="parent notfound-parent">
        <div className="notfound-container cont">
        <h1 className="notfound-404">
        <span style={{ backgroundImage: `url(${fruitImage})` }}>4</span>
        <span style={{ backgroundImage: `url(${fruitImage})` }}>0</span>
        <span style={{ backgroundImage: `url(${fruitImage})` }}>4</span>
      </h1>
          <h2 className="notfound-title">
            Oops! <span>Page not Found</span>
          </h2>
          <p className="notfound-description">
            The page you are looking for cannot be found. Take a break before
            trying again
          </p>
          <button className="btn" onClick={() => (window.location.href = "/")}>
            Go To Home Page
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
