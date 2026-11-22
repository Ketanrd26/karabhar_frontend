import React from "react";
import "./RefundPolicy.scss";
import Footer from "../../components/footer/Footer";
import Pagetop from "../../components/pageTop/Pagetop";

const RefundPolicy = () => {
  return (
    <>
      <Pagetop heading="Refund Policy" />
      <div class="refund_policy parent">
        <div class="refundcontainer cont">
          <h1>Refund & Cancellation Policy</h1>
          <p class="updated">
            <strong>Last updated:</strong> January 2026
          </p>

          <p>
            This Refund & Cancellation Policy outlines the terms under which
            refunds, cancellations, and returns are processed on the{" "}
            <strong>JungleBoosh</strong>
            platform. By placing an order on JungleBoosh, you agree to this
            policy.
          </p>

          <h2>1. Order Cancellation</h2>
          <ul>
            <li>
              Orders can be cancelled before they are shipped or processed by
              the seller.
            </li>
            <li>Once an order is shipped, cancellation may not be possible.</li>
            <li>
              Cancellation availability depends on the seller and product
              category.
            </li>
          </ul>

          <h2>2. Return Policy</h2>
          <p>
            Returns are accepted only for eligible products and within the
            specified return window.
          </p>
          <ul>
            <li>
              Products must be unused, undamaged, and in original packaging.
            </li>
            <li>
              Some products (such as perishable goods, digital items, or
              customized products) may not be eligible for return.
            </li>
            <li>
              Return eligibility and timelines are mentioned on the product
              page.
            </li>
          </ul>

          <h2>3. Refund Policy</h2>
          <p>
            Refunds are initiated after the returned product is received and
            verified by the seller.
          </p>
          <ul>
            <li>
              Approved refunds will be processed to the original payment method.
            </li>
            <li>
              For online payments, refunds are processed through{" "}
              <strong>Razorpay</strong>.
            </li>
            <li>
              Refund processing time may vary depending on your bank or payment
              provider.
            </li>
          </ul>

          <h2>4. Refund Timeline</h2>
          <ul>
            <li>
              Refunds are usually initiated within 5–7 business days after
              approval.
            </li>
            <li>
              It may take an additional 3–10 business days for the amount to
              reflect in your account.
            </li>
          </ul>

          <h2>5. Cash on Delivery (COD) Orders</h2>
          <p>
            For COD orders, refunds (if applicable) will be processed via bank
            transfer or wallet as per the details provided by the customer.
          </p>

          <h2>6. Failed or Duplicate Payments</h2>
          <ul>
            <li>
              If an amount is deducted but the order is not confirmed, the
              payment will be automatically refunded.
            </li>
            <li>
              Duplicate payments for the same order will be refunded to the
              original payment method.
            </li>
          </ul>

          <h2>7. Non-Refundable Items</h2>
          <p>The following items are generally non-refundable:</p>
          <ul>
            <li>Digital products or downloadable content</li>
            <li>Gift cards or vouchers</li>
            <li>Customized or made-to-order items</li>
            <li>Perishable goods</li>
          </ul>

          <h2>8. Seller Responsibility</h2>
          <p>
            Sellers are responsible for accepting returns and issuing refunds in
            accordance with this policy and applicable laws. JungleBoosh may
            assist in resolving disputes but does not guarantee refunds in all
            cases.
          </p>

          <h2>9. Dispute Resolution</h2>
          <p>
            In case of disputes regarding refunds or returns, customers are
            encouraged to contact JungleBoosh support. We will make reasonable
            efforts to facilitate a resolution.
          </p>

          <h2>10. Policy Updates</h2>
          <p>
            JungleBoosh reserves the right to update this Refund & Cancellation
            Policy at any time. Changes will be effective once posted on the
            platform.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            For refund, cancellation, or return-related queries, please contact
            us at: <a target="blank" style={{color:"blue"}} href="mailto:junglebooshpvtltd@gmail.com" >junglebooshpvtltd@gmail.com</a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default RefundPolicy;
