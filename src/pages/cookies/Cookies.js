import React from "react";
import "./Cookies.scss";
import Pagetop from "../../components/pageTop/Pagetop";
import Footer from "../../components/footer/Footer";

const Cookies = () => {
  return (
    <>
      <Pagetop heading="Cookies Policy" />
      <div class="cookies_policy parent">
        <div class="cookiescontainer cont">
          <p class="updated">
            <strong>Last updated:</strong> January 2026
          </p>

          <p>
            This Cookies Policy explains how <strong>JungleBoosh</strong> (“we”,
            “our”, “us”) uses cookies and similar technologies when you visit or
            use our website and mobile application (collectively, the
            “Platform”).
          </p>

          <p>
            By continuing to browse or use JungleBoosh, you agree to the use of
            cookies as described in this policy.
          </p>

          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device (computer,
            mobile, or tablet) when you visit a website. They help websites
            recognize your device and store information to improve
            functionality, performance, and security.
          </p>

          <h2>2. How We Use Cookies</h2>
          <p>JungleBoosh uses cookies to:</p>
          <ul>
            <li>Ensure proper functioning of the platform</li>
            <li>Authenticate users and manage sessions</li>
            <li>Maintain shopping cart and checkout processes</li>
            <li>Process secure online payments</li>
            <li>Improve performance and user experience</li>
            <li>Analyze platform usage and traffic</li>
          </ul>

          <h2>3. Types of Cookies We Use</h2>

          <h3>a. Essential Cookies</h3>
          <p>
            These cookies are necessary for the platform to function correctly.
            They enable core features such as:
          </p>
          <ul>
            <li>User login and authentication</li>
            <li>Session management</li>
            <li>Shopping cart functionality</li>
            <li>Order placement and checkout</li>
          </ul>

          <h3>b. Performance & Analytics Cookies</h3>
          <p>
            These cookies collect anonymous information about how users interact
            with JungleBoosh, such as pages visited and time spent on the
            platform. This helps us improve performance and usability.
          </p>

          <h3>c. Functionality Cookies</h3>
          <p>These cookies remember your preferences and settings, such as:</p>
          <ul>
            <li>Language or region selection</li>
            <li>Saved preferences</li>
            <li>Optional login remembrance</li>
          </ul>

          <h3>d. Security Cookies</h3>
          <p>
            Security cookies help us protect user accounts, prevent fraud, and
            ensure secure access to the platform.
          </p>

          <h2>4. Razorpay & Payment Cookies</h2>
          <p>
            JungleBoosh uses <strong>Razorpay</strong> as a third-party payment
            gateway to process online transactions securely.
          </p>
          <p>Razorpay may use cookies or similar technologies to:</p>
          <ul>
            <li>Authenticate and authorize payment transactions</li>
            <li>Prevent fraud and ensure payment security</li>
            <li>Comply with legal and regulatory requirements</li>
          </ul>
          <p>
            JungleBoosh does not store your card, UPI, or banking details. All
            payment-related data is securely handled by Razorpay in accordance
            with their privacy and security policies.
          </p>

          <h2>5. Third-Party Cookies</h2>
          <p>
            In addition to Razorpay, we may use other trusted third-party
            services such as analytics or security providers that may place
            cookies on your device. These third parties have their own cookies
            and privacy policies.
          </p>

          <h2>6. Managing Cookies</h2>
          <p>
            You can manage or disable cookies through your browser settings.
            Please note that disabling certain cookies may affect the
            functionality of the platform, including login, cart, checkout, and
            payment features.
          </p>

          <h2>7. Updates to This Cookies Policy</h2>
          <p>
            We may update this Cookies Policy from time to time to reflect
            changes in technology, legal requirements, or our services. Any
            updates will be posted on this page with a revised “Last updated”
            date.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this Cookies Policy, you can contact
            us at:
          </p>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Cookies;
