import React, { useEffect, useState } from "react";
import "./Vendors.scss";
import Filterscomp from "../../components/filters_comp/Filterscomp";
import Input from "../../components/inputs/Input";
import { sellerApi } from "../../utils/Api";

import { Link, useSearchParams } from "react-router-dom";
import femaleIcon from "../../assets/women_empowirng.png";
import maleIcon from "../../assets/farmer_icon.png";
const Vendors = () => {
  const [cityData, setCityData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [city, setCity] = useState([]);
  const [sellerTag, setSellerTag] = useState([]);
  const [sellerData, setSellerData] = useState([]);
  const [search, setSearch] = useState("");

  const sellerTaglist = [
    { businessOwnerName: "Individual"},
    { businessOwnerName: "Small Group" },
    { businessOwnerName: "Manufacturing" },
  ];

  const getAllSellers = async (params) => {
    try {
      const response = await sellerApi.get(
        `api/seller/getAllSellers?${params.toString()}`
      );

      const mappedData = response.data.cityData.map((item) => ({
        Category: item.city,
        total_item: item.sellerCount,
      }));

      setSellerData(response.data.data || []);
      setCityData(mappedData || []);
    } catch (error) {
      console.error("Error fetching sellers:", error);
    }
  };

  // Parse query params from URL on load
  useEffect(() => {
    const cityParam = searchParams.get("city");
    const sellerTagParam = searchParams.get("sellerTag");
    const searchParam = searchParams.get("search");

    if (cityParam && cityParam !== "null") {
      setCity(cityParam.split(","));
    } else {
      setCity([]);
    }

    if (searchParam) {
      setSearch(searchParam);
    }

    if (sellerTagParam && sellerTagParam !== "null") {
      setSellerTag(sellerTagParam.split(","));
    } else {
      setSellerTag([]);
    }
  }, [searchParams]);

  // Fetch data when city or sellerTag changes
  useEffect(() => {
    const params = new URLSearchParams({
      city: city.length ? city.join(",") : "null",
      sellerTag: sellerTag.length ? sellerTag.join(",") : "null",
      search: search || "",
    });

    setSearchParams(params, {replace:true});
    getAllSellers(params);
  }, [city, sellerTag, search]);

  const handleCityChange = (selectedCity) => setCity(selectedCity);
  const handleTagChange = (selectedTag) => setSellerTag(selectedTag);

  return (
    <div className="vendors_list parent">
      <div className="vendor_list_cont cont">
        <div className="left">
          <Filterscomp
            category="Cities"
            categoryData={cityData}
            onCategoryChange={handleCityChange}
            selectedCategories={city}
            selectedVendors={sellerTag}
            onVendorChange={handleTagChange}
            vendorData={sellerTaglist}
            vendor_label="Seller Tag"
            input={true}
          />
        </div>
        <div className="right">
          <div className="top_section">
            <div className="left">
              {/* Optional search input */}
              <div className="search_vendor_section">
                <Input
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  label="Search Vendors"
                />
              </div>
            </div>
            <div className="right">
              <p>
                <span>{sellerData?.length || 0}+</span>
                Result Found
              </p>
            </div>
          </div>
          <div className="bottom_section">
            {sellerData &&
              sellerData.map((item, index) => (
                <Link to={`/Vendor_profile?sellerId=${item?.sellerId}`} key={index} className="vendor_card">
                  <div className="image bg-img-cover">
                    {item?.profileImage ? (
                      <img src={item.profileImage} alt="" />
                    ) : (
                      <img
                        src={item?.gender === "Female" ? femaleIcon : maleIcon}
                        alt=""
                      />
                    )}
                  </div>
                  <div className="content">
                    <h4>{item?.businessOwnerName}</h4>
                    <p>{item?.sellerTag}</p>
                    <p>{item?.state}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendors;
