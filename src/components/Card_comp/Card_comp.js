import React, { useContext, useState } from "react";
import "./Card_comp.scss";
import { BiSolidStar } from "react-icons/bi";
import addtocart from "../../assets/trending-product/add_to_cart.png";
import { RiStarHalfFill } from "react-icons/ri";
import { FiStar } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { buyerApi, productApi } from "../../utils/Api";
import { UserContext } from "../../Context";

import { LiaRupeeSignSolid } from "react-icons/lia";
import { trucateAmt } from "../truncateAmt/TruncateAmt";
import wpicon from "../../assets/icons/whatsapp.png";
import fbicon from "../../assets/icons/communication.png";
import clipicon from "../../assets/icons/clipboard.png";
import { IoMdShare } from "react-icons/io";
import { toast } from "react-toastify";
const Card_comp = ({
  card_value,
  card_height,
  width,
  data,
  page,
  query,
  queryParamKey,
  onclick,
  shareClick,
}) => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [productId, setProductId] = useState();

  const [liked, setLiked] = useState(false);
  const { buyerData, getWishlist, getBuyerCartItems, wishlist, cartCount } =
    useContext(UserContext);

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

  const navigatetopage = (page, id) => {
    const params = new URLSearchParams({ [query]: id });
    navigate(`/${page}?${params.toString()}`);
  };

  const handleWishList = async (id, vairentId) => {
    try {
      let response;

      if (buyerData) {
        response = await buyerApi.post(`buyer/addToWishlist`, {
          variantId: vairentId,
          buyerId: buyerData?.id,
          productId: id,
        });
      } else {
        response = await buyerApi.post(`buyer/addToWishlist`, {
          productId: id,
          variantId: vairentId,
        });
      }

      getWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  // share products

  const shareProduct = async (product_name, productId) => {
    try {
      const response = await productApi.get(
        `/api/product/shareProduct?productId=${productId}&source=share`,
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

  // update cart count on cart pages
  const updateCartCount = async (productId, variantId, count) => {
    try {
      const response = await buyerApi.post(`buyer/updateCartQuantity`, {
        buyerId: buyerData?.id || null,
        productId: productId,
        variantId: variantId || null,
        quantity: count,
      });

      if (response.status === 200) {
        getBuyerCartItems();
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };

function isOutOfStock(product) {
  const variants = product?.variants;



  if (Array.isArray(variants) && variants.length > 0) {
    const getPrice = (v) => {
      const val = parseFloat(v?.discount_price ?? v?.price);
      return Number.isFinite(val) ? val : Infinity; // broken price -> deprioritize, don't crash logic
    };

    const cheapest = variants.reduce((min, v) =>
      getPrice(v) < getPrice(min) ? v : min
    , variants[0]);

    const remaining = Number(cheapest?.remaining_stock);
    // treat missing/invalid stock as OUT of stock, not in stock
    return !Number.isFinite(remaining) || remaining <= 0;
  }

  // no variants — check parent stock
  const stock = Number(product?.stock);

 
  return !Number.isFinite(stock) || stock <= 0;
}

  return (
    <>
      {/* {url !== "" && (
        <div class="share_popup">
          <div class="overlay" onClick={() => setUrl("")}></div>
          <div class="popup">
            <h4>Share this product</h4>
            <div class="midddle_section">
              <input disabled type="text" value={url} />
              <button
                className="copy_btn"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(url);
                    toast.success("Link copied!");
                  } catch (err) {
                    toast.error("Failed to copy");
                  }
                }}
              >
                Copy
              </button>
            </div>
            <div class="social_links">
              <button
                className="scbtn"
                onClick={() => shareProduct("whatsapp")}
              >
                <img src={wpicon} alt="" />
              </button>
              <button
                className="scbtn"
                onClick={() => shareProduct("facebook")}
              >
                <img src={fbicon} alt="" />
              </button>
              <button className="scbtn" onClick={() => shareProduct("copy")}>
                <img src={clipicon} alt="" />
              </button>
            </div>
          </div>
        </div>
      )} */}

      {data &&
        data?.map((item, index) => (
          <div
            style={width ? { maxWidth: width } : undefined}
            key={index}
            className="new_card"

            // style={{ width: `calc(100% / ${card_value} - var(--unit))`, height: card_height }}
          >
            <div
              className="overlay-new_card"
              onClick={() => navigatetopage(page, item[queryParamKey])}
            ></div>

            {isOutOfStock(item) && (
              <span className="out_of_stock">Out Of Stock</span>
            )}
            <div
              className="like"
              onClick={() => {
                const variantId = item?.variants?.reduce(
                  (min, v) =>
                    Number(v.discount_price || v.price) <
                    Number(min.discount_price || min.price)
                      ? v
                      : min,
                  item.variants[0], // ✅ initial value
                )?.id;
                handleWishList(item.id, variantId);
              }}
            >
              {wishlist?.some(
                (w) => w.productId === (item.product_id || item.id),
              ) ? (
                <span className="active_like">
                  <FaHeart />
                </span>
              ) : (
                <span
                  className="like-color"
                  onMouseEnter={() => setLiked(index)}
                  onMouseLeave={() => setLiked(false)}
                >
                  {liked === index ? <FaHeart /> : <IoHeartOutline />}
                </span>
              )}
            </div>
            <div
              class="share"
              // onClick={() => {
              //   setUrl(
              //     `https://jungleboosh.com/Product-details?productName=${encodeURIComponent(
              //       item?.product_name,
              //     )}`,
              //   );
              //   setProductId(item?.id);
              // }}
              onClick={() => shareProduct(item.product_name, item?.id)}
            >
              <IoMdShare />
            </div>
            <div className="top_image bg-img-cover">
              <img src={item?.Heroimage} alt="" />
            </div>
            <div className="card-bottom-content">
              <div className="card-left-section">
                <div className="card-name-price">
                  {/* <div className="tag-name">
                    <span className="tag-logo">
                      <GiFarmer />
                    </span>
                    <span>Farmer</span>
                  </div> */}
                  {/* <p>{item?.product_name.slice(0, 20)}</p> */}
                  <p>
                    {item?.product_name?.length > 50
                      ? `${item?.product_name.slice(0, 50)}...`
                      : item?.product_name}
                  </p>

                  {item?.variants?.length > 0 ? (
                    (() => {
                      // get lowest variant based on discount_price
                      const lowestVariant = item.variants.reduce(
                        (prev, curr) =>
                          Number(curr.discount_price) <
                          Number(prev.discount_price)
                            ? curr
                            : prev,
                      );

                      const hasDiscount = Number(lowestVariant.discount) > 0;

                      return (
                        <h4 className="price">
                          <span>
                            <LiaRupeeSignSolid />
                            {trucateAmt(Number(lowestVariant.discount_price))}/-
                          </span>

                          {lowestVariant?.unit && (
                            <span> {lowestVariant.unit}</span>
                          )}

                          {hasDiscount && (
                            <span className="original_price">
                              <LiaRupeeSignSolid />
                              {trucateAmt(lowestVariant.price)}
                            </span>
                          )}
                        </h4>
                      );
                    })()
                  ) : (
                    <h4 className="price">
                      <LiaRupeeSignSolid />
                      {trucateAmt(
                        Number(
                          item?.final_price
                            ? item?.final_price
                            : item?.discount_price || item?.base_discount_price,
                        ),
                      )}

                      {item?.prd_unit && <span> /- {item?.prd_unit}</span>}
                    </h4>
                  )}
                </div>

                <div className="card-rating">
                  {item?.rating_count !== 0 && (
                    <span>{renderStars(item?.rating_count)}</span>
                  )}
                  <span>{item?.seller_name}</span>
                </div>
                <div className="middle_sec">
                  {item?.sellerTag && (
                    <div className="tag-name">
                      {/* <span className="tag-logo">
                    <GiFarmer />
                  </span> */}
                      <span>{item?.sellerTag} </span>
                    </div>
                  )}
                  {/* <div className="free_del_tag">Free Delivery</div> */}
                </div>
              </div>
              <div class="right-section">
                {item?.variants?.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {!cartCount?.some((c) => c.productId === item.id) && (
                      <div
                        className="add-to-cart-btn"
                        style={
                          cartCount?.some((c) => c.productId === item.id)
                            ? { width: "auto" }
                            : {}
                        }
                        onClick={() => {
                          const variantId = item?.variants?.reduce(
                            (min, v) =>
                              Number(v.discount_price || v.price) <
                              Number(min.discount_price || min.price)
                                ? v
                                : min,
                            item.variants[0], // ✅ initial value
                          )?.id;

                          onclick(item.id, 1, variantId);
                        }}
                      >
                        <img src={addtocart} alt="" />

                        <span>Add to cart</span>
                      </div>
                    )}

                    {cartCount?.some((c) => c.productId === item.id) && (
                      <Link to="/cart" style={{ color: "var(--accent)" }}>
                        Go to Cart
                      </Link>
                    )}
                    {cartCount?.some((c) => c.productId === item.id) &&
                      (() => {
                        const count = cartCount.find(
                          (c) => c.productId === item.id,
                        )?.quantity;

                        return (
                          <div className="cart_count">
                            <button
                              disabled={count <= 1}
                              className="qc_btn"
                              onClick={() => {
                                const variantId = item?.variants?.reduce(
                                  (min, v) =>
                                    Number(v.discount_price || v.price) <
                                    Number(min.discount_price || min.price)
                                      ? v
                                      : min,
                                  item.variants[0], // ✅ initial value
                                )?.id;
                                updateCartCount(
                                  item.id,
                                  variantId || null,
                                  count - 1,
                                );
                              }}
                            >
                              -
                            </button>
                            <input value={count} readOnly />
                            <button
                              className="qc_btn"
                              onClick={() => {
                                const variantId = item?.variants?.reduce(
                                  (min, v) =>
                                    Number(v.discount_price || v.price) <
                                    Number(min.discount_price || min.price)
                                      ? v
                                      : min,
                                  item.variants[0], // ✅ initial value
                                )?.id;
                                updateCartCount(
                                  item.id,
                                  variantId || null,
                                  count + 1,
                                );
                              }}
                            >
                              +
                            </button>
                          </div>
                        );
                      })()}
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {!cartCount?.some((c) => c.productId === item.id) && (
                      <div
                        className="add-to-cart-btn"
                        style={
                          cartCount?.some((c) => c.productId === item.id)
                            ? { width: "auto" }
                            : {}
                        }
                        onClick={() => onclick(item.id, 1)}
                      >
                        <img src={addtocart} alt="" />

                        <span>Add to cart</span>
                      </div>
                    )}

                    {cartCount?.some((c) => c.productId === item.id) && (
                      <Link to="/cart" style={{ color: "var(--accent)" }}>
                        Go to Cart
                      </Link>
                    )}
                    {cartCount?.some((c) => c.productId === item.id) &&
                      (() => {
                        const count = cartCount.find(
                          (c) => c.productId === item.id,
                        )?.quantity;

                        return (
                          <div className="cart_count">
                            <button
                              disabled={count <= 1}
                              className="qc_btn"
                              onClick={() =>
                                updateCartCount(item.id, null, count - 1)
                              }
                            >
                              -
                            </button>
                            <input value={count} readOnly />
                            <button
                              className="qc_btn"
                              onClick={() =>
                                updateCartCount(item.id, null, count + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        );
                      })()}
                  </div>
                )}
              </div>
            </div>
            <div className="card-bottom-responsive-content">
              <div className="top_sec">
                {item?.sellerTag && (
                  <div className="tag-name">
                    {/* <span className="tag-logo">
                    <GiFarmer />
                  </span> */}
                    <span>{item?.sellerTag} </span>
                  </div>
                )}

                {/* <div className="free_del_tag">Free Delivery</div> */}
              </div>
              {window.innerWidth <= 400 ? (
                <p>{item?.product_name?.slice(0, 50)}</p>
              ) : (
                <p>{item?.product_name?.slice(0, 110)}</p>
              )}

              <div className="bottom_content">
                <div className="card-left-section">
                  {item?.variants?.length > 0 ? (
                    (() => {
                      const lowestVariant = item.variants.reduce(
                        (prev, curr) =>
                          Number(curr.discount_price) <
                          Number(prev.discount_price)
                            ? curr
                            : prev,
                      );

                      const hasDiscount = Number(lowestVariant.discount) > 0;
                      return (
                        <h4 className="price">
                          <span>
                            <LiaRupeeSignSolid />
                            {trucateAmt(Number(lowestVariant.discount_price))}/-
                          </span>
                          {lowestVariant?.unit && (
                            <span> {lowestVariant.unit}</span>
                          )}
                          {hasDiscount && (
                            <span className="original_price">
                              <LiaRupeeSignSolid />
                              {trucateAmt(lowestVariant.price)}
                            </span>
                          )}
                        </h4>
                      );
                    })()
                  ) : (
                    <h4 className="price">
                      <LiaRupeeSignSolid />
                      {trucateAmt(
                        Number(
                          item?.final_price
                            ? item?.final_price
                            : item?.discount_price || item?.base_discount_price,
                        ),
                      )}

                      {item?.prd_unit && <span> /- {item?.prd_unit}</span>}
                    </h4>
                  )}

                  {item?.rating_count !== 0 && (
                    <div className="card-rating">
                      {renderStars(item?.rating_count)}
                    </div>
                  )}
                </div>
                {item?.variants?.length > 0 ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {!cartCount?.some((c) => c.productId === item.id) && (
                      <div
                        style={
                          cartCount?.some((c) => c.productId === item.id)
                            ? { width: "auto" }
                            : {}
                        }
                        className="right-section"
                        onClick={() => {
                          const variantId = item?.variants?.reduce(
                            (min, v) =>
                              Number(v.discount_price || v.price) <
                              Number(min.discount_price || min.price)
                                ? v
                                : min,
                            item.variants[0], // ✅ initial value
                          )?.id;

                          onclick(item.id, 1, variantId);
                        }}
                      >
                        <img src={addtocart} alt="" />

                        <span>Add to cart</span>
                      </div>
                    )}
                    {cartCount?.some((c) => c.productId === item.id) && (
                      <Link
                        to="/cart"
                        style={{ color: "var(--accent)", fontSize: "10px" }}
                      >
                        Go to Cart
                      </Link>
                    )}
                    {cartCount?.some((c) => c.productId === item.id) &&
                      (() => {
                        const count = cartCount.find(
                          (c) => c.productId === item.id,
                        )?.quantity;

                        return (
                          <div className="cart_count">
                            <button
                              disabled={count <= 1}
                              className="qc_btn"
                              onClick={() => {
                                const variantId = item?.variants?.reduce(
                                  (min, v) =>
                                    Number(v.discount_price || v.price) <
                                    Number(min.discount_price || min.price)
                                      ? v
                                      : min,
                                  item.variants[0], // ✅ initial value
                                )?.id;
                                updateCartCount(
                                  item.id,
                                  variantId || null,
                                  count - 1,
                                );
                              }}
                            >
                              -
                            </button>
                            <input value={count} readOnly />
                            <button
                              className="qc_btn"
                              onClick={() => {
                                const variantId = item?.variants?.reduce(
                                  (min, v) =>
                                    Number(v.discount_price || v.price) <
                                    Number(min.discount_price || min.price)
                                      ? v
                                      : min,
                                  item.variants[0], // ✅ initial value
                                )?.id;
                                updateCartCount(
                                  item.id,
                                  variantId || null,
                                  count + 1,
                                );
                              }}
                            >
                              +
                            </button>
                          </div>
                        );
                      })()}
                  </div>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {!cartCount?.some((c) => c.productId === item.id) && (
                      <div
                        style={
                          cartCount?.some((c) => c.productId === item.id)
                            ? { width: "auto" }
                            : {}
                        }
                        class="right-section"
                        onClick={() => onclick(item.id, 1)}
                      >
                        <img src={addtocart} alt="" />

                        <span>Add to cart</span>
                      </div>
                    )}
                    {cartCount?.some((c) => c.productId === item.id) && (
                      <Link
                        to="/cart"
                        style={{ color: "var(--accent)", fontSize: "10px" }}
                      >
                        Go to Cart
                      </Link>
                    )}
                    {cartCount?.some((c) => c.productId === item.id) &&
                      (() => {
                        const count = cartCount.find(
                          (c) => c.productId === item.id,
                        )?.quantity;

                        return (
                          <div className="cart_count">
                            <button
                              disabled={count <= 1}
                              className="qc_btn"
                              onClick={() =>
                                updateCartCount(item.id, null, count - 1)
                              }
                            >
                              -
                            </button>
                            <input value={count} readOnly />
                            <button
                              className="qc_btn"
                              onClick={() =>
                                updateCartCount(item.id, null, count + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        );
                      })()}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Card_comp;
