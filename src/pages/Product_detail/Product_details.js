import React, { useContext, useEffect, useState } from "react";
import "./Product_detail.scss";
import Breadcrum from "../../components/breadcrum/Breadcrum";
import { IoMdStar } from "react-icons/io";
import { BsBagCheck } from "react-icons/bs";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { HiMinusSmall } from "react-icons/hi2";
import { buyerApi, productApi } from "../../utils/Api";
import { RiStarHalfFill } from "react-icons/ri";
import { BiSolidStar } from "react-icons/bi";
import { UserContext } from "../../Context";
import { Rating } from "@mui/material";
import { toast } from "react-toastify";
import femaleIcon from "../../assets/women_empowirng.png";
import maleIcon from "../../assets/farmer_icon.png";
import Card_comp from "../../components/Card_comp/Card_comp";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { CiHeart } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import { Helmet } from "react-helmet";
import { RxCross2 } from "react-icons/rx";
import { productSeo } from "../../data/seo/productSeo";
import { brandSeo } from "../../data/seo/brandSeo";
import Loader from "../../components/loader/Loader";
import { MdDelete } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
const Product_details = () => {
  const [description, setDescription] = useState(false);
  const [search] = useSearchParams();
  const [productData, setProductData] = useState();
  const [hoverdImage, setHoverImage] = useState();
  const [cartCount, setCartCount] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const { addToCart, buyerData, getWishlist } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const [vairentId, setVareintId] = useState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    product_id: "",
    buyerName: "",
    rating: 0,
    comment: "",
  });

  const [editReview, setEditReview] = useState(null);

  const getProductData = async (productId) => {
    try {
      setLoader(true);
      const response = await productApi.get(
        `api/product/getProductByTitle?title=${encodeURIComponent(productId)}`,
      );
      setProductData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const productId = search.get("productName");

  useEffect(() => {
    if (productId) {
      getProductData(productId);
    }
  }, [productId]); // ✅ add dependency

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const totalStars = 5;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<BiSolidStar key={`full-${i}`} fill="#FFC107" />);
    }

    if (hasHalfStar) {
      stars.push(<RiStarHalfFill key="half" fill="#FFC107" />);
    }

    while (stars.length < totalStars) {
      stars.push(<BiSolidStar key={`empty-${stars.length}`} fill="#D9D9D9" />);
    }

    return stars;
  };

  useEffect(() => {
    if (productData && buyerData) {
      setFormData((prev) => ({
        ...prev,
        product_id: productData?.baseProduct?.id,
        buyerName: buyerData.Name,
      }));
    }
  }, [productData && buyerData]);

  const handleBuynow = (id, count, vid = null) => {
    navigate(`/checkout?prdId=${id}&count=${count}&vid=${vid}`);
  };

  const addReview = async () => {
    try {
      if (!buyerData) {
        toast.error("You Are Not Login For Add Review");
        return;
      }
      if (formData?.rating === 0) {
        toast.error("PLease give rating");
        return;
      } else if (formData?.comment === "") {
        toast.error("Please Add Something Comment");
        return;
      }
      let response;
      if (editReview) {
        response = await productApi.put(
          `api/review/editReview?id=${editReview}`,
          formData,
        );
      } else {
       response = await productApi.post("api/review/addReview", formData);
      }

   

      if (response.status === 201) {
        getProductData(productId);
        setFormData({
          rating: 0,
          comment: "",
        });
        toast.success("Review Added Successfully");
        setEditReview(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (productData?.variants || selectedVariantIndex) {
      const id = productData?.variants?.[selectedVariantIndex]?.variant_id;

      setVareintId(id);
    }
  }, [productData?.variants, selectedVariantIndex]);

  const handleWishList = async () => {
    try {
      let response;

      if (buyerData) {
        response = await buyerApi.post(`buyer/addToWishlist`, {
          variantId: vairentId,
          buyerId: buyerData?.id,
          productId: productData?.baseProduct?.id,
        });
      } else {
        response = await buyerApi.post(`buyer/addToWishlist`, {
          productId: productData?.baseProduct?.id,
          variantId: vairentId,
        });
      }

      getWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  const htmlToText = (html = "") => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  const currentProductName = productData?.baseProduct?.product_name
    ?.toLowerCase()
    ?.replace(/\s+/g, "");

  const seoData = Object.values(productSeo).find((item) => {
    const normalizedTitle = item.title.toLowerCase().replace(/\s+/g, "");

    const aliasMatch = item.aliases?.some((alias) =>
      currentProductName?.includes(alias.toLowerCase().replace(/\s+/g, "")),
    );

    return currentProductName?.includes(normalizedTitle) || aliasMatch;
  });

  const combinedKeywords = [
    ...(seoData?.keywords || []),
    ...(brandSeo?.keywords || []),
    ...(brandSeo?.aliases || []),
  ].join(", ");

  const brandSeoData = brandSeo;

  // get reviews data

  const getReviewsDataById = async (id) => {
    try {
      const response = await productApi.get(
        `api/review/getReviewById?id=${id}&buyerName=${buyerData?.Name}&product_id=${productData?.baseProduct?.id}`,
      );
      console.log("reviews data", response.data);
      const data = response?.data?.data;
      setFormData({
        product_id: data?.product_id,
        buyerName: data?.buyerName,
        rating: data?.rating,
        comment: data?.comment,
      });
      setEditReview(id);
    } catch (err) {
      console.log(err);
    }
  };

  const existEditReview = () => {
    setFormData({
      product_id: "",
      buyerName: "",
      rating: 0,
      comment: "",
    });

    setEditReview(null);
  };

  // delete review

  const deleteReview = async (id)=>{
    try{
      const confirmDelete = window.confirm("Are you sure you want to delete this review?");
      if (!confirmDelete) {
        return; // Exit the function if the user cancels the deletion
      }
     const response = await productApi.delete(`api/review/deleteReview?id=${id}&product_id=${productData?.baseProduct?.id}&buyerName=${buyerData?.Name}`);
     if(response?.status === 200){
      toast.success("Review Deleted Successfully");
      getProductData(productId);
      setFormData({
        product_id: "",
        buyerName: "",
        rating: 0,
        comment: "",
      });
      setEditReview(null);
     }
    }catch(err){
      console.log(err)
    }
  }

  const shareProduct = async (product_name,productId) => {
    try {
      const response = await productApi.get(
        `/api/product/shareProduct?productId=${productId}&source=share`
      );
  
      const shareUrl = response.data.shareUrl;
  
      if (navigator.share) {
        await navigator.share({
          title: product_name,
          text: product_name,
          url: shareUrl,
        });
  
        return;
      }
  
      await navigator.clipboard.writeText(shareUrl);
  
      toast.success("Link copied");
    } catch (error) {
      console.log(error);
      toast.error("Share failed");
    }
  };

  return (
    <>
      <>
        <Helmet>
          <title>
            {seoData?.metaTitle ||
              `JungleBoosh - ${productData?.baseProduct?.product_name || ""}`}
          </title>

          <meta
            name="description"
            content={
              seoData?.metaDescription ||
              productData?.baseProduct?.Description?.slice(0, 160)
            }
          />

          <meta name="keywords" content={combinedKeywords} />

          <meta
            property="og:title"
            content={
              seoData?.metaTitle || productData?.baseProduct?.product_name
            }
          />

          <meta
            property="og:description"
            content={
              seoData?.metaDescription ||
              productData?.baseProduct?.Description?.slice(0, 160)
            }
          />

          <meta
            property="og:image"
            content={encodeURI(productData?.baseProduct?.Heroimage)}
          />

          <meta property="og:type" content="product" />

          <link
            rel="canonical"
            href={`https://jungleboosh.com/product/${seoData?.slug || productId}`}
          />
        </Helmet>
      </>
      <div class="top_section parent">
        {loader && <Loader />}
        <div class="top_cont cont">
          <Breadcrum
            second_crum="Search Results"
            second_crum_path="/search"
            third_crum={productData?.baseProduct?.product_name?.slice(0, 100)}
          />

          <div class="wishlist"></div>
        </div>
      </div>
      <div class="product_parent parent">
        <div class="product_cont cont">
          <div class="left">
            <div class="hero_image bg-img-cover">
              <img
                src={hoverdImage || productData?.baseProduct?.Heroimage}
                alt=""
              />
            </div>

            <div class="sub_image_list">
              {productData?.baseProduct?.images?.map((item) => (
                <div
                  class="image bg-img-cover"
                  onMouseEnter={() => setHoverImage(item)}
                  onMouseLeave={() => setHoverImage()}
                >
                  <img src={item} alt="" />
                </div>
              ))}
            </div>

            <div class="buttons">
              <button
                class="btn prd_btn"
                onClick={() =>
                  addToCart(productData?.baseProduct?.id, cartCount, vairentId)
                }
              >
                Add to Cart
                <span>
                  <BsBagCheck />
                </span>
              </button>
              <button
                class="btn prd_btn"
                onClick={() =>
                  handleBuynow(
                    productData?.baseProduct?.id,
                    cartCount,
                    vairentId,
                  )
                }
              >
                Buy Now
                <span>
                  <BsBagCheck />
                </span>
              </button>
              {/* <div class="btn prd_btn" onClick={() => handleWishList()}>
                {" "}
                Add to Wishlist
                <span style={{ color: "white", fontSize: "20px" }}>
                  <CiHeart />
                </span>
              </div> */}
            </div>
          </div>
          <div class="right">
            <div class="title">
              <h3> {productData?.baseProduct?.product_name}   </h3>
              <div onClick={()=>shareProduct(productData?.baseProduct?.product_name,productData?.baseProduct?.id)} className="share_btn" > <IoMdShare /></div>

              {/* {productData?.data?.stock > 0 && (
                <span className="in_stock">In Stock</span>
              )}


              {productData?.data?.stock === 0 && (
                <span className="out_stock">Out Of Stock</span>
              )} */}
            </div>
            <div class="vendor_section">
              <div class="vendor_name">
                <p>Maker:</p>
                <Link
                  to={`/Vendor_profile?sellerId=${productData?.baseProduct?.sellersId}`}
                >
                  {" "}
                  {productData?.sellerData?.businessOwnerName} (
                  {productData?.sellerData?.state})
                </Link>
              </div>
              {productData?.baseProduct?.average_rating > 0 && (
                <div class="ratings">
                  <div class="stars">
                    {renderStars(productData?.baseProduct?.average_rating)}
                  </div>
                  <p>({productData?.baseProduct?.rating_count} Review)</p>
                </div>
              )}
            </div>
            <p style={{ fontSize: "14px", marginTop: "4px" }}>
              Delivered within 3–4 days
            </p>

            {productData?.variants.length > 0 ? (
              <div class="price">
                <h3>
                  ₹{productData?.variants[selectedVariantIndex]?.discount_price}
                  / {productData?.variants[selectedVariantIndex]?.unit}
                </h3>

                {productData?.variants[selectedVariantIndex]?.discount !==
                  "0.00" && (
                  <h3 className="regular_price">
                    ₹{productData?.variants[selectedVariantIndex]?.price}
                  </h3>
                )}
                {productData?.variants[selectedVariantIndex]?.discount !==
                  "0.00" && (
                  <p class="discount_rate">
                    ₹
                    {`${productData?.variants[selectedVariantIndex].discount.slice(0, -3)}/- off`}
                  </p>
                )}
              </div>
            ) : (
              <div class="price">
                <h3>
                  ₹{productData?.baseProduct?.discount_price}/
                  {productData?.baseProduct?.prd_unit}
                </h3>
                {productData?.baseProduct?.discount && (
                  <h3 className="regular_price">
                    Rs.{productData?.baseProduct?.Product_price}/
                    {productData?.baseProduct?.prd_unit}
                  </h3>
                )}
                {productData?.baseProduct?.discount && (
                  <p class="discount_rate">
                    {`${productData?.baseProduct?.discount.slice(0, -3)}% off`}
                  </p>
                )}
              </div>
            )}

            <div class="qantity">
              <button
                className="minus"
                disabled={cartCount <= 1}
                onClick={() => setCartCount(cartCount - 1)}
              >
                <HiMinusSmall />
              </button>
              <span>{cartCount}</span>

              <button class="plus" onClick={() => setCartCount(cartCount + 1)}>
                <GoPlus />
              </button>
            </div>
            <div class="category">
              <h4>Category :</h4>
              <p> {productData?.baseProduct?.Category} </p>
            </div>
            {productData?.variants.length > 0 && (
              <div className="prd_varieants">
                <h4>Product variants</h4>
                <div className="Product_vairenst">
                  {productData?.variants?.map((item, index) => (
                    <div
                      className={
                        selectedVariantIndex === index
                          ? "var_card active"
                          : "var_card"
                      }
                      key={index}
                      onClick={() => {
                        setSelectedVariantIndex(index);
                      }}
                    >
                      <p> {item?.sku} </p>
                      <h4
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {" "}
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <LiaRupeeSignSolid />
                        </span>{" "}
                        {item?.discount_price}{" "}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* <div class="tags">
              <h4>Tag :</h4>
              <div class="tag_list">
                <div class="tag">Farm Fresh</div>
                <div class="tag">Advance Farming</div>
              </div>
            </div> */}
            {productData?.baseProduct?.Description && (
              <div class="short_description">
                <h4>Description</h4>
                <p>
                  <span className="desc">
                    {productData?.baseProduct?.Description?.slice(0, 200)}
                  </span>

                  {description && (
                    <span className="desc">
                      {productData?.baseProduct?.Description}
                    </span>
                  )}

                  <span onClick={() => setDescription(!description)}>
                    {description ? "Show Less" : "Read More"}
                  </span>
                </p>
              </div>
            )}

            {productData?.variants[selectedVariantIndex]?.attributes && (
              <div className="pro_details_wrap">
                <h4>Product Details</h4>

                {productData?.variants[selectedVariantIndex]?.attributes?.map(
                  (item, index) => (
                    <div className="details_tab" key={index}>
                      <h5>{item.attribute_name} - </h5>
                      <span>{item.attribute_value}</span>
                    </div>
                  ),
                )}
              </div>
            )}

            <div class="product_specification">
              <h4>Product Specification</h4>
              <div class="list">
                {Object.entries(productData?.baseProduct?.Add_info || {}).map(
                  ([key, value], index) => (
                    <div className="item" key={index}>
                      <h4>{key} :</h4>
                      <p>{value}</p>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div class="vendors_visiting">
              <h4>Vendor Details</h4>

              <div class="details">
                <div class="vendor_image bg-img-cover">
                  {productData?.sellerData?.profileImage ? (
                    <img src={productData?.sellerData?.profileImage} alt="" />
                  ) : (
                    <img
                      src={
                        productData?.sellerData?.gender === "Female"
                          ? femaleIcon
                          : maleIcon
                      }
                      alt=""
                    />
                  )}
                </div>
                <div class="vendor_data">
                  <h4 style={{ textTransform: "capitalize" }}>
                    {productData?.sellerData?.businessOwnerName} (
                    {productData?.sellerData?.state})
                  </h4>
                  <p>
                    {htmlToText(productData?.sellerData?.biography).slice(
                      0,
                      200,
                    )}
                    ...
                  </p>
                </div>
                <div class="button_section">
                  <Link
                    to={`/Vendor_profile?sellerId=${productData?.baseProduct?.sellersId}`}
                    className="btn btn2"
                  >
                    Visit Profile
                  </Link>
                </div>
              </div>
            </div>
            <div class="reviews_section">
              <h4>Rating & Reviews</h4>
              {productData?.reviewsData?.map((item, index) => (
                <div class="review">
                  <div class="top_section">
                    <div class="name">
                      <p style={{ textTransform: "capitalize" }}>
                        {" "}
                        {item?.buyerName}{" "}
                      </p>
                      {Array.from({
                        length: Math.floor(parseInt(item.rating)),
                      }).map((_, index) => (
                        <IoMdStar key={index} />
                      ))}
                    </div>
                   {buyerData?.Name === item?.buyerName && (
                    <>
                      {editReview === item?.id ? (
                        <div class="edit" onClick={existEditReview}>
                          <RxCross2 />
                        </div>
                      ) : (
                        <div style={{ display: "flex", gap: "10px" }}>
                         <span
                          class="edit"
                          onClick={() => getReviewsDataById(item?.id)}
                        >
                          <MdEdit />
                        </span>
                         <span
                          class="edit"
                          onClick={() => deleteReview(item?.id)}
                        >
                         <MdDelete />
                        </span>

                        </div>
                       
                      )}
                    </>)}
                  </div>
                  <div class="comment">
                    <p>{item?.comment}</p>
                  </div>
                </div>
              ))}
            </div>

            <div class="add_reviews">
              <h4>Write a review</h4>
              <Rating
                name="simple-controlled"
                value={formData.rating}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, rating: newValue });
                }}
              />
              <textarea
                name=""
                id=""
                placeholder="Write a review"
                maxLength={500}
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
              ></textarea>
              <button class="btn" onClick={addReview}>
                {editReview ? "Edit Review" : "Add Review"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="related_prd parent">
        <div class="related_cont cont">
          <h3 className="heading_prd">Related Products</h3>
          <div class="prd_list">
            <Card_comp
              onclick={addToCart}
              data={productData?.relatedProducts}
              page="Product-details"
              query="productName"
              queryParamKey="product_name"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product_details;
