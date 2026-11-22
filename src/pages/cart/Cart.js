import React, { useContext } from "react";
import "./Cart.scss";
import Breadcrum from "../../components/breadcrum/Breadcrum";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { UserContext } from "../../Context";
import illustration from "../../assets/Illustration.png";
import { buyerApi } from "../../utils/Api";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { trucateAmt } from "../../components/truncateAmt/TruncateAmt";
const Cart = () => {
  const { buyerCartItems, buyerData, cartSummary, getBuyerCartItems } =
    useContext(UserContext);

  // remove cart items
  const removeCartItem = async (buyerId, productId, vareintId) => {
    try {
      let response;
      if (buyerId) {
        response = await buyerApi.delete(
          `buyer/removeCartItem?buyerId=${buyerId}&productId=${productId}&variantId=${vareintId}`,
        );
      } else {
        response = await buyerApi.delete(
          `buyer/removeCartItem?productId=${productId}&variantId=${vareintId}`,
        );
      }
      if (response.status === 200) {
        toast.success("Item Removed Successfully");
        getBuyerCartItems();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <>
      <Helmet>
        <title>Shopping Cart | JungleBoosh</title>

        <meta
          name="description"
          content="Review the products in your JungleBoosh shopping cart before checkout. Manage quantities and proceed to secure payment."
        />

        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div class="cart_parent parent">
        <div class="overlay bg-img-cover"></div>
        <div class="cart_cont cont">
          <Breadcrum second_crum="Products" second_crum_path="/search" />

          <div class="cart_item">
            <div class="cart_items">
              {buyerCartItems.length > 0 ? (
                <div class="items">
                  {buyerCartItems &&
                    buyerCartItems.map((item, index) => (
                      <div class="cart_item_list">
                        <div class="left">
                          <div class="image">
                            <img src={item?.product?.image} alt="" />
                          </div>
                          <div class="details">
                            <h3>{item?.product?.name.slice(0, 50)}</h3>
                            <div class="prd_sec">
                              <p className="vendor">
                                Vendor :{" "}
                                <Link
                                  target="_blank"
                                  to={`/Vendor_profile?sellerId=${item?.sellerId}`}
                                >
                                  {" "}
                                  {item?.sellerName}{" "}
                                </Link>
                              </p>
                              <p>
                                Category :{" "}
                                <span> {item?.product?.category} </span>
                              </p>
                            </div>

                            {item?.variantId ? (
                              <h4 className="price">₹ {`${item?.price}.00`}</h4>
                            ) : (
                              <h4 className="price">
                                ₹ {`${item?.price}.00`}/{item?.product?.unit}
                              </h4>
                            )}
                            <p class="quantity">
                              Quantity :{" "}
                              <div className="q_count">
                                <button
                                  className="qc_btn"
                                  disabled={item.quantity <= 1}
                                  onClick={() =>
                                    updateCartCount(
                                      item.productId,
                                      item.variantId || null,
                                      item.quantity - 1,
                                    )
                                  }
                                >
                                  -
                                </button>
                                <input
                                  readOnly
                                  min="1"
                                  value={item?.quantity}
                                />
                                <butoon
                                  className="qc_btn"
                                  onClick={() =>
                                    updateCartCount(
                                      item.productId,
                                      item.variantId || null,
                                      item.quantity + 1,
                                    )
                                  }
                                >
                                  +
                                </butoon>
                              </div>
                            </p>
                          </div>
                        </div>
                        <div class="right">
                          <p>
                            Subtotal :{" "}
                            <span>
                              ₹ {`${item?.price * item?.quantity}.00`}
                            </span>
                          </p>

                          <div
                            class="delete"
                            onClick={() =>
                              removeCartItem(
                                item?.buyerId,
                                item?.productId,
                                item?.variantId,
                              )
                            }
                          >
                            <RiDeleteBin6Line />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div class="login_section">
                  <p>No Cart Items</p>
                </div>
              )}
              {buyerCartItems.length > 0 && (
                <div class="items responsive_item">
                  {buyerCartItems &&
                    buyerCartItems.map((item, index) => (
                      <div class="cart_item_list">
                        <div class="left">
                          <div class="image">
                            <img src={item?.product?.image} alt="" />
                          </div>
                          <div class="details">
                            <h3>{item?.product?.name.slice(0, 50)}</h3>
                            <div class="prd_sec">
                              <p className="vendor">
                                Vendor :{" "}
                                <Link
                                  target="_blank"
                                  to={`/Vendor_profile?sellerId=${item?.sellerId}`}
                                >
                                  {" "}
                                  {item?.sellerName}{" "}
                                </Link>
                              </p>
                              <p>
                                Category :{" "}
                                <span> {item?.product?.category} </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="right">
                          <div class="price_section">
                            {item?.variantId ? (
                              <h4 className="price">
                                ₹ {`${trucateAmt(item?.price)}.00`}
                              </h4>
                            ) : (
                              item?.price && (
                                <h4 className="price">
                                  ₹ {`${trucateAmt(item?.price)}.00`}/
                                  {item?.product?.unit}
                                </h4>
                              )
                            )}
                            <p class="quantity">
                              Quantity :{" "}
                              <div className="q_count">
                                <button
                                  className="qc_btn"
                                  disabled={item.quantity <= 1}
                                  onClick={() =>
                                    updateCartCount(
                                      item.productId,
                                      item.variantId || null,
                                      item.quantity - 1,
                                    )
                                  }
                                >
                                  -
                                </button>
                                <input
                                  readOnly
                                  min="1"
                                  value={item?.quantity}
                                />
                                <button
                                  className="qc_btn"
                                  onClick={() =>
                                    updateCartCount(
                                      item.productId,
                                      item.variantId || null,
                                      item.quantity + 1,
                                    )
                                  }
                                >
                                  +
                                </button>
                              </div>
                            </p>
                          </div>
                          <p>
                            Subtotal :{" "}
                            <span>
                              ₹{" "}
                              {`${trucateAmt(item?.price * item?.quantity)}.00`}
                            </span>
                          </p>

                          <div
                            class="delete"
                            onClick={() =>
                              removeCartItem(
                                item?.buyerId,
                                item?.productId,
                                item?.variantId,
                              )
                            }
                          >
                            <RiDeleteBin6Line />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {buyerCartItems.length > 0 && (
                <Link class="border-btn" to="/search">
                  Back to shop
                </Link>
              )}
            </div>

            {buyerCartItems.length > 0 && (
              <div class="total_invocie">
                <div class="content">
                  <h4>Price Details</h4>

                  <div class="details">
                    <div class="total">
                      <p>Price ({cartSummary?.totalItems} items)</p>
                      {cartSummary?.totalPrice && (
                        <h6>₹ {trucateAmt(cartSummary?.totalPrice)} </h6>
                      )}
                    </div>

                    {/* <div class=" total price_distrubution">
                      <p>Platform Fee</p>
                      <h6>₹{cartSummary?.platformFee}</h6>
                    </div> */}
                    {/* <div class=" total price_distrubution">
                      <p>Delivery Charges</p>
                      <h6>{cartSummary?.deliveryCharges || "Free Delivery"}</h6>
                    </div> */}
                    {/* <div class=" total price_distrubution discount">
                      <p>launching discount</p>
                      <h6>-₹{cartSummary?.launchingDiscount}</h6>
                    </div> */}
                    <div class="total">
                      <p>Total</p>
                      {cartSummary?.totalPrice && (
                        <h6>₹ {trucateAmt(cartSummary?.totalPrice)}</h6>
                      )}
                    </div>
                  </div>

                  {/* <p className="save_message">
                    You will save ₹{cartSummary?.launchingDiscount} on this
                    order
                  </p> */}
                </div>

                {buyerData ? (
                  <Link
                    to="/checkout"
                    style={{ width: "100%" }}
                    className="btn"
                  >
                    Confirm Order
                  </Link>
                ) : (
                  <Link
                    to="/checkout"
                    style={{ width: "100%" }}
                    className="btn"
                  >
                    Proceed to checkout
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
