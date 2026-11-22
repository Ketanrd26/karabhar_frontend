import { lazy } from "react";

const Search = lazy(() => import("./pages/search/Search.js"));
const Header = lazy(() => import("./components/header/Header.js"));
const HeaderTop = lazy(() => import("./components/header-top/HeaderTop.js"));
// const Login = lazy(() => import("./pages/login/Login.jsx"));
// const SignUp = lazy(() => import("./pages/signup/SignUp.jsx"));
const Home = lazy(() => import("./pages/home/Home.js"));
const Otp = lazy(() => import("./pages/otp/Otp.jsx"));
// const Register = lazy(() => import("./pages/register/Register.jsx"));
const ProductCard = lazy(() => import("./pages/product-card/ProductCard.jsx"));
const Checkout = lazy(() => import("./pages/categories/Checkout.js"));
const BuyerProfile = lazy(() =>
  import("./pages/buyer-profile/BuyerProfile.jsx")
);
const Wishlist = lazy(() => import("./pages/wishlist/Wishlist.js"));
const Product_details = lazy(() =>
  import("./pages/Product_detail/Product_details.js")
);
const vendors = lazy(() => import("./pages/vendors/Vendors.js"));
const Vendor_profile = lazy(() =>
  import("./pages/vendor_profile/VendorProfile.js")
);
const ForgotPassEmail = lazy(() =>
  import("./pages/forgotPassEmail/ForgotPassEmail.jsx")
);
const passwordChanged = lazy(() =>
  import("./pages/passwordChanged/PasswordChanged.js")
);
const sendOtp = lazy(() => import("./pages/sendOtp/SendOtp.js"));
const Cart = lazy(() => import("./pages/cart/Cart.js"));
const OrderHistoryMobile = lazy(() =>
  import("./pages/order-history-mobile/OrderHistoryMobile.jsx")
);
// const OrderDetailMobile = lazy(() =>
//   import("./pages/order-detail-mobile/OrderDetailMobile.jsx")
// );
const FilterMobile = lazy(() =>
  import("./pages/filters-mobile/FiltersMobile.jsx")
);
const WishlistMobile = lazy(() =>
  import("./pages/wishlist-mobile/WishlistMobile.jsx")
);
const PersonalInfoMobile = lazy(() =>
  import("./pages/personal-info-mobile/PersonalnfoMobile.jsx")
);
const ManageAddMobile = lazy(() =>
  import("./pages/manage-address-mobile/ManageAddressMobile.jsx")
);
const CardMobile = lazy(() => import("./pages/card-mobile/CardMobile.jsx"));
const UpiMobile = lazy(() => import("./pages/upi-mobile/UpiMobile.jsx"));
const Order_detail = lazy(() =>
  import("./pages/order_details/Order_detail.jsx")
);
const successPage = lazy(() => import("./pages/success_page/SuccessPage.jsx"));
const about = lazy(() => import("./pages/about/About.js"));
const contact = lazy(() => import("./pages/contact/Contact.js"));
const cookies = lazy(() => import("./pages/cookies/Cookies.js"));
const termsCondition = lazy(() =>
  import("./pages/termscondition/TermsCondition.js")
);
const stories = lazy(()=> import("./pages/stories/Stories.jsx"))
const refundPolicy = lazy(() => import("./pages/refundPolicy/RefundPolicy.js"));
export const routes = [
  {
    path: "/",
    exact: true,
    name: "home",
    component: Home,
  },
  {
    path: "/cart",
    exact: true,
    name: "Cart",
    component: Cart,
  },

  {
    path: "/header",
    exact: true,
    name: "header",
    component: Header,
  },

  {
    path: "/header-top",
    exact: true,
    name: "header-top",
    component: HeaderTop,
  },

  {
    path: "/search",
    exact: true,
    name: "search",
    component: Search,
  },

  // {
  //   path: "/login",
  //   exact: true,
  //   name: "login",
  //   component: Login,
  // },

  // {
  //   path: "/signup",
  //   exact: true,
  //   name: "signup",
  //   component: SignUp,
  // },

  {
    path: "/otp",
    exact: true,
    name: "otp",
    component: Otp,
  },

  // {
  //   path: "/register",
  //   exact: true,
  //   name: "register",
  //   component: Register,
  // },

  {
    path: "/product-card",
    exact: true,
    name: "product-card",
    component: ProductCard,
  },
  {
    path: "/Product-details",
    exact: true,
    name: "Product-details",
    component: Product_details,
  },
  {
    path: "/vendors",
    exact: true,
    name: "Vendors",
    component: vendors,
  },
  {
    path: "/Vendor_profile",
    exact: true,
    name: "Vendor_profile",
    component: Vendor_profile,
  },

  {
    path: "/checkout",
    exact: true,
    name: "checkout",
    component: Checkout,
  },

  {
    path: "/buyer-profile",
    exact: true,
    name: "buyer-profile",
    component: BuyerProfile,
  },

  {
    path: "/wishlist",
    exact: true,
    name: "wishlist",
    component: Wishlist,
  },
  {
    path: "/forgotPassEmail",
    exact: true,
    name: "forgotPassEmail",
    component: ForgotPassEmail,
  },
  {
    path: "/ChangePassword",
    exact: true,
    name: "changePassword",
    component: passwordChanged,
  },
  {
    path: "/SendOtp",
    exact: true,
    name: "SendOtp",
    component: sendOtp,
  },

  // {
  //   path: "/order-detail-mobile",
  //   exact: true,
  //   name: "OrderDetailMobile",
  //   component: OrderDetailMobile,
  // },

  {
    path: "/order-history",
    exact: true,
    name: "OrderHistoryMobile",
    component: OrderHistoryMobile,
  },
  {
    path: "/filter-mobile",
    exact: true,
    name: "FilterMobile",
    component: FilterMobile,
  },

  {
    path: "/wishlist-mobile",
    exact: true,
    name: "WishlistMobile",
    component: WishlistMobile,
  },

  {
    path: "/personal-info-mobile",
    exact: true,
    name: "PersonalInfoMobile",
    component: PersonalInfoMobile,
  },

  {
    path: "/manage-add-mobile",
    exact: true,
    name: "ManageAddMobile",
    component: ManageAddMobile,
  },

  {
    path: "/card-mobile",
    exact: true,
    name: "CardMobile",
    component: CardMobile,
  },

  {
    path: "/upi-mobile",
    exact: true,
    name: "UpiMobile",
    component: UpiMobile,
  },
  {
    path: "/order-details",
    exact: true,
    name: "OrderDetails",
    component: Order_detail,
  },
  {
    path: "/successPage",
    exact: true,
    name: "Success Page",
    component: successPage,
  },
  {
    path: "/about",
    exact: true,
    name: "About",
    component: about,
  },
  {
    path: "/contact",
    exact: true,
    name: "Contact",
    component: contact,
  },
  {
    path: "/cookies",
    exact: true,
    name: "Cookies",
    component: cookies,
  },
  {
    path: "/termsCondition",
    exact: true,
    name: "Terms And Condition",
    component: termsCondition,
  },
  {
    path: "/refundPolicy",
    exact: true,
    name: "Refund Policy",
    component: refundPolicy,
  },
  {
    path:"/stories",
    exact:true,
    name:"Stories",
    component:stories
  }
];
