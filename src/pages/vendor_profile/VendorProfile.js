import React, { useEffect, useState } from "react";
import "./VendorProfile.scss";
import Filterscomp from "../../components/filters_comp/Filterscomp";
import SelectInput from "../../components/selectInput/SelectInput";
import Input from "../../components/inputs/Input";
import Card_comp from "../../components/Card_comp/Card_comp";
import { useSearchParams } from "react-router-dom";
import { buyerApi, sellerApi } from "../../utils/Api";
import { MenuItem } from "@mui/material";
import femaleIcon from "../../assets/women_empowirng.png";
import maleIcon from "../../assets/farmer_icon.png";
import { useContext } from "react";
import { UserContext } from "../../Context";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
const VendorProfile = () => {
  const [toggle, settoggle] = useState(1);
  const [sellerData, setSellerData] = useState();
  const [searchPara, setSearchParams] = useSearchParams();
  const [range, setRange] = useState([0, 100000]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const { buyerData,saveVendors,addToCart } = useContext(UserContext);
  const [selectedRatings, setSelectedRatings] = useState();
  const ratingData = [
    { label: "1 & above", value: 1 },
    { label: "2 & above", value: 2 },
    { label: "3 & above", value: 3 },
    { label: "4 & above", value: 4 },
    { label: "5 Rating", value: 5 },
  ];

  const getSellerData = async (sellerId) => {
    try {
      const response = await sellerApi.get(
        `api/seller/vendorsById?${sellerId}`,
      );

      setSellerData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const sellerId = searchPara.get("sellerId");
  useEffect(() => {
    const price = searchPara.get("price");
    const search = searchPara.get("search");
    const sort = searchPara.get("sort");
    const rating = searchPara.get("rating");

    if (price && price !== "null") {
      try {
        setRange(price.split("-"));
      } catch (error) {
        setRange([0, 100000]);
      }
    }

    if (rating && rating !== "null") {
      // Ensure rating is always an array
      setSelectedRatings(rating);
    } else {
      setSelectedRatings([]);
    }

    if (search) {
      setSearch(search);
    }

    if (sort) {
      setSort(sort);
    }
  }, []);

  useEffect(() => {
    const sellerId = searchPara.get("sellerId");

    const params = new URLSearchParams({
      sellerId,
      price: `${range[0]}-${range[1]}`,
      search: search || "",
      sort: sort || "",
      rating: selectedRatings || "",
    });

    setSearchParams(params, { replace: true });
    getSellerData(params);
  }, [range, search, sort, selectedRatings]);

  const handleRangeChange = (newRange) => setRange(newRange);
  const handleRatingChange = (newRatings) => setSelectedRatings(newRatings);

  const saveVendor = async () => {
    try {
      if (!buyerData?.id) {
        toast.error("You Are Not Login For Save Vendor");
        return;
      }
      const response = await buyerApi.post("buyer/saveVendor", {
        buyerId: buyerData?.id,
        vendorId: sellerId,
      });

      if (response?.status === 200) {
        toast.success("Vendor Saved Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Vendor Dashboard | JungleBoosh</title>

        <meta
          name="description"
          content="Access your Jungle Boosh vendor dashboard to manage products, orders, earnings and account details securely."
        />

        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div class="profile_section parent">
        <div class="profile_section_cont bg-img-cover cont">
          <div class="left">
            <div class="image bg-img-cover">
              {sellerData?.sellerData[0]?.profileImage ? (
                <img src={sellerData?.sellerData[0]?.profileImage} alt="" />
              ) : (
                <img
                  src={
                    sellerData?.sellerData[0]?.gender === "Female"
                      ? femaleIcon
                      : maleIcon
                  }
                  alt=""
                />
              )}
            </div>
            <div class="content">
              <h4 class="name">
                {sellerData?.sellerData[0]?.businessOwnerName}
              </h4>
              <div class="tags">
                <p>Tags :</p>
                {sellerData?.sellerData[0]?.sellerType.map((item, index) => (
                  <div class="tag" key={index}>
                    {" "}
                    {item}{" "}
                  </div>
                ))}

                {sellerData?.sellerData[0]?.sellerTag !== null && (
                  <div class="tag">{sellerData?.sellerData[0]?.sellerTag}</div>
                )}
              </div>
              {saveVendors?.find((item) => item.id === Number(sellerId)) ? (
                <div className="save_vendor">Vendor Already Saved</div>
              ) : (
                <div className="save_vendor" onClick={saveVendor}>
                  Save Maker
                </div>
              )}
            </div>
          </div>
          {/* <div className="bottom">
            {sellerData?.sellerData[0]?.biography && (
              <p>{sellerData?.sellerData[0]?.biography?.slice(0, 200)}</p>
            )}
          </div> */}
          <div class="border_image bg-img-contain"></div>
        </div>
      </div>

      <div class="vendor_products parent">
        <div class="vendors_cont cont">
          <div class="labels_section">
            <div
              class={toggle === 1 ? "label active" : "label"}
              onClick={() => settoggle(1)}
            >
              Maker's Products
            </div>
            <div
              class={toggle === 2 ? "label active" : "label"}
              onClick={() => settoggle(2)}
            >
              Biography
            </div>
            <div
              class={toggle === 3 ? "label active" : "label"}
              onClick={() => settoggle(3)}
            >
              Gallery
            </div>
          </div>
          {toggle === 1 && (
            <div class="data_section">
              <div class="left">
                <Filterscomp
                  range={true}
                  range_value={range}
                  onRangeChange={handleRangeChange}
                  ratingData={ratingData}
                  selectedRatings={selectedRatings}
                  onRatingChange={handleRatingChange}
                />
              </div>
              <div class="right">
                <div class="top_section">
                  <div class="left_side">
                    <div class="sort">
                      <p>Sort by:</p>
                      <SelectInput
                        label="Sort by"
                        onChange={(e) => setSort(e.target.value)}
                      >
                        <MenuItem value="">Select sort option</MenuItem>
                        <MenuItem value="price-asc">price-asc</MenuItem>
                        <MenuItem value="price-desc">price-desc</MenuItem>
                        <MenuItem value="rating">rating</MenuItem>
                        <MenuItem value="latest">latest</MenuItem>
                        <MenuItem value="last30months">last30months</MenuItem>
                      </SelectInput>
                    </div>
                    <div class="search">
                      <Input
                        label="Search Vendor Products"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="right_side">
                    <h4> {sellerData?.products.length} </h4>
                    <p>Results Found</p>
                  </div>
                </div>

                <div class="bottom_section">
                  <Card_comp
                  onclick={addToCart}
                    data={sellerData?.products}
                    page="Product-details"
                    query="productName"
                    queryParamKey="product_name"
                  />
                </div>
              </div>
            </div>
          )}

          {toggle === 2 && (
            <div className="bio_graphysection">
              {sellerData?.sellerData[0]?.biography ? (
                <div
                  className="biography-content"
                  dangerouslySetInnerHTML={{
                    __html: sellerData.sellerData[0].biography,
                  }}
                />
              ) : (
                <p>Maker has not added biography</p>
              )}
            </div>
          )}

          {toggle === 3 && (
            <div class="gallery_images">
              {sellerData?.gallery ? (
                sellerData?.gallery?.map((item, index) => (
                  <div
                    class="image bg-img-cover"
                    key={index}
                    style={{ backgroundImage: `url(${item?.image})` }}
                  ></div>
                ))
              ) : (
                <p> No Images Found </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VendorProfile;


