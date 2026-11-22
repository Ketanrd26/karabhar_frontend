import React from "react";
import "./TermsCondition.scss";
import Footer from "../../components/footer/Footer";
import Pagetop from "../../components/pageTop/Pagetop";
const TermsCondition = () => {
  return (
    <>
      <Pagetop heading="Terms & Condition" />
      <div class="terms_condition parent">
        <div class="termscontainer cont">
          <h1>Terms & Conditions</h1>
          <p class="updated">
            <strong>Last updated:</strong> January 2026
          </p>

          <p>
            These Terms and Conditions (“Terms”) govern your access to and use
            of the
            <strong>JungleBoosh</strong> website and mobile application
            (collectively, the “Platform”). By accessing or using JungleBoosh,
            you agree to be bound by these Terms. If you do not agree, please do
            not use the Platform.
          </p>

          <h2>1. Eligibility</h2>
          <p>
            You must be at least 18 years old or have legal parental or guardian
            consent to use JungleBoosh. By using the Platform, you represent
            that you are legally capable of entering into a binding agreement.
          </p>

          <h2>2. User Accounts</h2>
          <ul>
            <li>
              You are responsible for maintaining the confidentiality of your
              account credentials.
            </li>
            <li>
              You agree to provide accurate and complete information during
              registration.
            </li>
            <li>
              JungleBoosh reserves the right to suspend or terminate accounts
              that violate these Terms.
            </li>
          </ul>

          <h2>3. Platform Usage</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Platform for unlawful or fraudulent purposes</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Upload harmful code, malware, or viruses</li>
            <li>Interfere with the operation or security of the Platform</li>
          </ul>

          <h2>4. Products & Services</h2>
          <p>
            JungleBoosh acts as an e-commerce platform connecting buyers and
            sellers. Product descriptions, pricing, availability, and images are
            provided by sellers and may change without notice.
          </p>
          <p>
            We do not guarantee the accuracy, quality, or reliability of any
            product listed on the Platform.
          </p>

          <h2>5. Orders & Payments</h2>
          <ul>
            <li>
              All orders placed through JungleBoosh are subject to acceptance
              and availability.
            </li>
            <li>
              Prices are displayed in Indian Rupees (INR) unless stated
              otherwise.
            </li>
            <li>
              Online payments are securely processed through third-party payment
              gateways such as <strong>Razorpay</strong>.
            </li>
            <li>
              JungleBoosh does not store your card, UPI, or banking details.
            </li>
          </ul>

          <h2>6. Cancellations, Returns & Refunds</h2>
          <p>
            Cancellation, return, and refund policies may vary depending on the
            seller and product category. Users are advised to review the
            specific product or seller policy before placing an order.
          </p>
          <p>
            JungleBoosh may facilitate refunds but does not guarantee refunds in
            all cases.
          </p>

          <h2>7. Seller Responsibilities</h2>
          <ul>
            <li>
              Sellers are responsible for product quality, legality, and
              fulfillment.
            </li>
            <li>
              Sellers must comply with applicable laws and platform policies.
            </li>
            <li>
              JungleBoosh reserves the right to remove seller listings that
              violate these Terms.
            </li>
          </ul>

          <h2>8. Intellectual Property</h2>
          <p>
            All content on JungleBoosh, including logos, text, images, graphics,
            and software, is the property of JungleBoosh or its licensors and is
            protected by intellectual property laws.
          </p>
          <p>
            You may not copy, reproduce, or distribute any content without prior
            written permission.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            JungleBoosh shall not be liable for any indirect, incidental, or
            consequential damages arising from your use of the Platform,
            including but not limited to loss of data, revenue, or profits.
          </p>

          <h2>10. Indemnification</h2>
          <p>
            You agree to indemnify and hold JungleBoosh harmless from any
            claims, damages, losses, or expenses arising out of your use of the
            Platform or violation of these Terms.
          </p>

          <h2>11. Termination</h2>
          <p>
            JungleBoosh reserves the right to suspend or terminate your access
            to the Platform at any time without prior notice if you violate
            these Terms.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            the laws of India. Any disputes shall be subject to the exclusive
            jurisdiction of Indian courts.
          </p>

          <h2>13. Changes to Terms</h2>
          <p>
            JungleBoosh may update these Terms from time to time. Continued use
            of the Platform after changes constitutes acceptance of the revised
            Terms.
          </p>

          <h2>14. Contact Information</h2>
          <p>
            If you have any questions about these Terms and Conditions, please
            contact us at:
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsCondition;
