import React, { useContext } from "react";
import "./OrderHistoryMobile.scss";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { trucateAmt } from "../../components/truncateAmt/TruncateAmt";
import { UserContext } from "../../Context";

const OrderHistoryMobile = () => {
  const { orderDetails } = useContext(UserContext);

  return (
    <>
      <div className="orders_parent parent">
        <div className="orders_cont cont">
          <div className="informations">
            {/* <div className="top-info">
          <h3>Orders</h3>
          <div className="search-bar-info">
            <input type="text" placeholder="Search your order here" />
            <button className="search-btn ">
              <CiSearch />
              <span>Search order</span>
            </button>
          </div>
        </div> */}

            <div className="orders">
              {orderDetails.length > 0 ? (
                orderDetails?.map((item, index) => (
                  <div className="orderlist">
                    <div className="top">
                      <div className="left">
                        {item?.Delievery_date ? (
                          <div className="order_date">
                            <p>Delievery Date</p>
                            <p> {item?.Delievery_date} </p>
                          </div>
                        ) : (
                          <div className="order_date">
                            <p>Order Date</p>
                            <p> {item?.createdAt?.split("T")[0]} </p>
                          </div>
                        )}

                        <div className="total">
                          <p>Total</p>
                          <p>₹{trucateAmt(Number(item?.totalAmount))}</p>
                        </div>
                        <div className="ship_to">
                          <p>Ship To</p>
                          <p> {item?.buyerName} </p>
                        </div>
                      </div>
                      <div className="right">
                        <p className="order_id">OrderId # {item?.orderId}</p>
                        <div className="list">
                          <Link to={`/order-details?orderId=${item?.orderId}`}>
                            View Order Details
                          </Link>
                          <Link>Invoice</Link>
                        </div>
                      </div>
                    </div>
                    <div className="order_items">
                      {item?.orderItems &&
                        item?.orderItems?.map((item, index) => (
                          <div className="item_list">
                            <img
                              src={item?.productSnapshot?.image}
                              alt=""
                              className="image"
                            />
                            <div className="right">
                              <p className="name">
                                {item?.productSnapshot?.name}
                              </p>
                              <Link className="view_item">View Your Item</Link>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))
              ) : (
                <p>No Order Found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistoryMobile;
