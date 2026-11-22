import React, { useContext, useState } from "react";
import "./Header.scss";


import { UserContext } from "../../Context";


function Header() {
  // const { buyerData } = useContext(UserContext);
  // const [categoryIndex, setCategoryIndex] = useState(null);
  // const [subChildren, setSubChildren] = useState(null);
  // const [openCategory, setOpenCategory] = useState(false);

  // const sendToProductPage = (name) => {
  //   const url = `/search?category=${encodeURIComponent(name)}`;
  //   window.open(url, "_blank");
  // };
  // const sendToProductPageWithsub = (name) => {
  //   const url = `/search?sub_category=${name}`;
  //   window.open(url, "_blank");
  // };

  return (
    <>
      {/* <div className="parent header-parent">
        {openCategory && (
          <div class="overlay" onClick={() => setOpenCategory(false)}></div>
        )}

        <div className="cont header-cont"> */}
          {/* <div
            className="categories"
            onClick={() => setOpenCategory(!openCategory)}
          >
            <span>
              <RxHamburgerMenu />
            </span>
            <Link>All Categories</Link>
          </div>

          {openCategory && (
            <div className="custom-dropdown">
              <div class="category_list">
                {categories.map((item, index) => (
                  <div
                    className={
                      categoryIndex !== null
                        ? "dropdown-item active"
                        : "dropdown-item"
                    }
                    onMouseEnter={() => setCategoryIndex(index)}
                    onClick={() => sendToProductPage(item?.name)}
                    key={index}
                  >
                    {item?.name}
                  </div>
                ))}
              </div>
              {categories[categoryIndex] && (
                <div class="subcategory_list">
                  {categories[categoryIndex]?.subcategories.map(
                    (item, index) => (
                      <div
                        className={
                          subChildren !== null
                            ? "dropdown-item active"
                            : "dropdown-item"
                        }
                        onMouseEnter={() => setSubChildren(index)}
                        key={index}
                      >
                        {item?.name}
                      </div>
                    )
                  )}
                </div>
              )}
              {categories[categoryIndex]?.subcategories[subChildren] && (
                <div class="subcategory_list">
                  {categories[categoryIndex]?.subcategories[
                    subChildren
                  ]?.children.map((item, index) => (
                    <div
                      onClick={() => sendToProductPageWithsub(item)}
                      className="dropdown-item"
                      key={index}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )} */}

          {/* <div className="nav">
            <Link to="/search?suggestions=Grocery">Grocery</Link>
            <Link to="/search?suggestions=Fashion">Fashion</Link>
            <Link to={`/search?suggestions=${encodeURIComponent("Hand Made")}`}>
              Hand Made
            </Link>
            <Link
              to={`/search?suggestions=${encodeURIComponent("Dry Fruits")}`}
            >
              Dry Fruits
            </Link>
            <Link to={`/search?suggestions=${encodeURIComponent("Organic")}`}>
              Organic
            </Link>
            
           
          </div> */}
        {/* </div>
      </div> */}
    </>
  );
}

export default Header;
