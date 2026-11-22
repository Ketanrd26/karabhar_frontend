import React, { useContext } from "react";
import "./Wishlist.scss";
import { RiDeleteBinLine } from "react-icons/ri";

import { UserContext } from "../../Context";
import { Link } from "react-router-dom";
import { buyerApi } from "../../utils/Api";
import { toast } from "react-toastify";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { trucateAmt } from "../../components/truncateAmt/TruncateAmt";
function Wishlist() {
  const { wishlist } = useContext(UserContext);



  const removeWishlistItem = async (id) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to remove this item?",
      );

      if (!confirm) return;

      const response = await buyerApi.delete(
        `buyer/removeWishlistItem?productId=${id}`,
      );

    

      if (response.status === 200) {
        toast.success("Item Removed Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <>
      <div className="parent wish-list">
        <div className="cont wish-cont">
          {  wishlist.length !== 0 ?  wishlist.map((item, index) => (
            <div className="product-list-wrapper">
              <div className="seller-details">
                <img src={item?.product?.image} alt="" />
                <div className="details-wrap">
                  <h4>{item?.product?.name}</h4>

                  <div className="vendor-category">
                    <div className="vendor">
                      <h4>Maker :</h4>
                      <Link style={{color:"var(--accent)"}} to={`/Vendor_profile?sellerId=${item.sellerId}`}>{item.sellerName}</Link>
                    </div>
                    <div className="category">
                      <h4>Category :</h4>
                      <span>{item?.product?.category}</span>
                    </div>
                  </div>

                  <div className="rupees">
                    {/* <span style={{ textDecoration: "line-through" }}>
                      {item.cut_price}
                    </span> */}
                    <h4>  <span >
                      <LiaRupeeSignSolid/>
                      </span> {trucateAmt(item?.product?.discount_price) + "/-"}</h4>
                    {/* <span className="dis">{item?.product?.discount}</span> */}
                  </div>
                </div>
              </div>
              {/* <div
                className={
                  item.tag === "In Stock"
                    ? "stock green"
                    : item.tag === "Out of Stock"
                    ? "stock red"
                    : "stock"
                }
              >
                {item.tag}
              </div> */}
              <div className="add-delete-wrapper">
                <Link
                  class="add-to-cart"
                  to={"/Product-details?productName=" + item?.product?.name}
                >
                  View Detail
                </Link>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => removeWishlistItem(item?.productId)}
                >
                  <RiDeleteBinLine />
                </span>
              </div>
            </div>
          ))
        :
        <p>
          No Wishlist Items
        </p>
        }
        </div>
      </div>
    </>
  );
}

export default Wishlist;
