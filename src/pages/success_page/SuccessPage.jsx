import React, { useEffect } from "react";
import "./Sucess_page.scss";
import {
  Link,
  Navigate,
  replace,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import delivery_boy from "../../assets/delivery-scooter.gif";
import { purchaseDataLayer } from "../../components/Ga4/PurchaseDataLayer";

const SuccessPage = () => {
  const [searchParmas] = useSearchParams();
  const orderId = searchParmas.get("order_id");
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderId) {
      navigate("/404");
    }
    purchaseDataLayer(orderId);
  }, []);

  // // // ❌ Manual URL access
  // if (!location.state?.fromApp) {
  //   return <Navigate to="/404" replace />;
  // }

  return (
    <>
      <div className="success_page_parent parent">
        <div className="success_page_container cont">
          <img src={delivery_boy} alt="" />
          <h1>Order Created Successfully ! ✅</h1>

          <p>
            <Link to={`/order-details?orderId=${orderId}`}>Click Here</Link> to
            see your order
          </p>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
