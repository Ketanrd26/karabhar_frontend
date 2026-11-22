import React from "react";
import "./Breadcrum.scss";
import { GoHome } from "react-icons/go";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

function Breadcrum({
  second_crum_path,
  second_crum,
  third_crum,
  third_crum_path,
}) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <div className="main-breadcrum">
      <Link to="/" className="home-icon">
        <GoHome />
      </Link>
      {second_crum && (
        <span className="arrow">
          <MdKeyboardArrowRight />
        </span>
      )}

      {second_crum && <Link to={second_crum_path}>{second_crum}</Link>}

      {pathnames.length > 0 && <MdKeyboardArrowRight className="arrow" />}

      {pathnames.map((segment, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={index}>
            {!isLast ? (
              <>
                <Link to={routeTo} className="crum-name">
                  {decodeURIComponent(segment)}
                </Link>
                <span className="arrow">
                  <MdKeyboardArrowRight />
                </span>
              </>
            ) : (
              <p className="crum-name">{decodeURIComponent(segment)}</p>
            )}
          </React.Fragment>
        );
      })}
      {third_crum && (
        <span className="arrow">
          <MdKeyboardArrowRight />
        </span>
      )}

      <Link to={third_crum_path}>{third_crum}</Link>
    </div>
  );
}

export default Breadcrum;
