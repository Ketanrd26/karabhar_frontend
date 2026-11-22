import React, { useState } from "react";
import {
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";
// import { IoArrowForwardSharp, IoSearchOutline, IoIosArrowUp } from "react-icons/io5";
import { IoArrowForwardSharp } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import "./Filtercomp.scss";

const Filterscomp = ({
  categoryData = [],
  selectedCategories,
  onCategoryChange,
  rating_label,
  category,
  range = false,
  range_value = [0, 1000],
  onRangeChange,
  vendor_label,
  ratingData = [],
  selectedRatings = [],
  onRatingChange,
  input = false,
  tagData = [],
  selectedTags = [],
  onTagChange,

  vendorData = [],
  selectedVendors = [],
  onVendorChange,
}) => {
  const [toggle, setToggle] = useState("");
  const [vendorSearch, setVendorSearch] = useState("");

  const handleCheckboxChange = (value, selectedList, setFunction) => {
    if (selectedList?.includes(value)) {
      setFunction(selectedList?.filter((item) => item !== value));
    } else {
      setFunction([...selectedList, value]);
    }
  };

  return (
    <div className="filter">
      {/* Category Filter */}
      {categoryData.length > 0 && (
        <div
          className={toggle === "category" ? "categories active" : "categories"}
        >
          <div
            className="label"
            onClick={() => setToggle(toggle === "category" ? "" : "category")}
          >
            <h4> {category ? category : "All Categories"} </h4>
            <span className="arrow">
              <IoIosArrowUp />
            </span>
          </div>
          <div className="items">
            <FormGroup>
              {categoryData.map((item, index) => (
                <div className="item" key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedCategories?.includes(item?.Category)}
                        onChange={() =>
                          handleCheckboxChange(
                            item?.Category,
                            selectedCategories,
                            onCategoryChange
                          )
                        }
                      />
                    }
                    label={item.Category}
                  />
                  <span className="item_count">({item.total_item})</span>
                </div>
              ))}
            </FormGroup>
          </div>
        </div>
      )}

      {/* Price Range Filter */}
      {range && (
        <div className="range">
          <div className="label">
            <h4>Price Range</h4>
          </div>
          <div className="items">
            <Slider
              value={range_value}
              onChange={(e, newValue) => onRangeChange(newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
            />
            <p>
              Price :{" "}
              <span>
                ₹{range_value[0]} - ₹{range_value[1]}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Rating Filter */}
      {ratingData.length > 0 && (
        <div
          className={
            toggle === "rating" ? "categories stars active" : "categories stars"
          }
        >
          <div
            className="label"
            onClick={() => setToggle(toggle === "rating" ? "" : "rating")}
          >
            <h4>{rating_label ? rating_label : "Rating"}</h4>
            <span className="arrow">
              <IoIosArrowUp />
            </span>
          </div>
          <div className="items">
            <FormGroup>
              {ratingData.map((item, index) => (
                <div className="item" key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedRatings === item.value}
                        onChange={() => {
                          const newValue =
                            selectedRatings === item.value ? null : item.value;
                          onRatingChange(newValue); // Call the update function
                        }}
                      />
                    }
                    label={item.label}
                  />
                </div>
              ))}
            </FormGroup>
          </div>
        </div>
      )}

      {/* Tags Filter */}
      {tagData.length > 0 && (
        <div
          className={
            toggle === "tags"
              ? "categories chip_cat active"
              : "categories chip_cat"
          }
        >
          <div
            className="label"
            onClick={() => setToggle(toggle === "tags" ? "" : "tags")}
          >
            <h4>Popular Tags</h4>
            <span className="arrow">
              <IoIosArrowUp />
            </span>
          </div>
          <div className="items chips">
            {tagData.map((tag, index) => (
              <Chip
                key={index}
                label={tag.label}
                className={
                  JSON.stringify(selectedTags) === JSON.stringify(tag.value)
                    ? "active"
                    : ""
                }
                onClick={() => onTagChange(tag.label)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Vendors Filter */}
      {vendorData.length > 0 && (
        <div
          className={toggle === "vendors" ? "categories active" : "categories"}
        >
          <div
            className="label"
            onClick={() => setToggle(toggle === "vendors" ? "" : "vendors")}
          >
            <h4>{vendor_label ? vendor_label : "Vendors"}</h4>
            <span className="arrow">
              <IoIosArrowUp />
            </span>
          </div>
          <div className="items vendors">
            {!input && (
              <div className="top">
                <input
                  type="text"
                  placeholder="Search Vendors"
                  value={vendorSearch}
                  onChange={(e) => setVendorSearch(e.target.value)}
                />
                <span className="icon">
                  <IoSearchOutline />
                </span>
              </div>
            )}
            <div className="list">
              <FormControl>
                {vendorData
                  .filter((v) =>
                    v.businessOwnerName
                      .toLowerCase()
                      .includes(vendorSearch.toLowerCase())
                  )
                  .map((vendor, index) => (
                    <div className="item" key={index}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedVendors.includes(
                              vendor.businessOwnerName
                            )}
                            onChange={() =>
                              handleCheckboxChange(
                                vendor.businessOwnerName,
                                selectedVendors,
                                onVendorChange
                              )
                            }
                          />
                        }
                        label={vendor.businessOwnerName}
                      />
                    </div>
                  ))}
              </FormControl>
            </div>
            {/* <div className="button_see_more">
              <p>
                See More{" "}
                <span>
                  <IoArrowForwardSharp />
                </span>
              </p>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filterscomp;
