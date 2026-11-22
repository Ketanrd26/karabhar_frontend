import { createContext, useEffect, useState } from "react";
import { adminApi, buyerApi, productApi, sellerApi } from "./utils/Api";
import axios from "axios";
import { toast } from "react-toastify";

export const UserContext = createContext();

const ContextProvider = ({ children }) => {
  const [sellerList, setSellerList] = useState();
  const [buyerData, setBuyerData] = useState();
  const [addressdetails, setAddressDetails] = useState();
  const [buyerCartItems, setBuyerCartItems] = useState([]);
  const [productData, setProductData] = useState();
  const [pincode, setPincode] = useState();
  const [wishlist, setWishList] = useState([]);
  const [cartSummary, setCardSummary] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [loginResolved, setLoginResolved] = useState(false);
  const [saveVendors, setSaveVendors] = useState();
  const [cartCount,setCartCount] = useState()


  const getAllSeller = async () => {
    try {
      const response = await sellerApi.get("api/seller/getAllSellers");
      setSellerList(response.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  // save stats

  const getBuyerData = async () => {
    try {
      const response = await buyerApi.get("buyer/buyerDetails");
      getBuyerCartItems();
      setBuyerData(response?.data?.data);

      setOrderDetails(response?.data?.orders);
      setAddressDetails(response.data.addressResponse);
      getWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  const TrendingProducts = async () => {
    try {
      // const response = await productApi.get("api/product/getLatestProducts");
      const response = await productApi.get("api/product/SearchProducts");

      setProductData(response?.data?.productdata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    TrendingProducts();
    getAllSeller();
  }, []);

  // useEffect(() => {
  //   fetch(`https://api.admin.jungleboosh.com/api/stats/saveStats`, {
  //     method: "POST",
  //   });
  // }, []);

  // add to cart
  const addToCart = async (prdId, quantity, variantId) => {
    try {
      let response;

      if (variantId) {
        response = await buyerApi.post(`buyer/addCart`, {
          buyerId: buyerData?.id,
          productId: prdId,
          variantId: variantId,
          quantity: quantity,
        });
      } else {
        response = await buyerApi.post(`buyer/addCart`, {
          buyerId: buyerData?.id,
          productId: prdId,
          quantity: quantity,
        });
      }

      toast.success("Cart Added Successfully");
      getBuyerCartItems();
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        toast.error("You Are Not Login For Add Cart");
      }
    }
  };

  // get buyer cart items

  const getBuyerCartItems = async (toPincode) => {
    try {
      let response;
      if (toPincode) {
        response = await buyerApi.get(
          `buyer/getCartItemByUser?toPincode=${toPincode}`,
        );
      } else {
        response = await buyerApi.get(`buyer/getCartItemByUser`);
      }

      const cartItem = response.data.cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        variantId: item.variantId,
      }));

      setCartCount(cartItem)

      

      setBuyerCartItems(response.data.cart);
      setCardSummary(response.data.summary);
    } catch (error) {
      console.log(error);
      setBuyerCartItems([]);
    }
  };

  const getWishlist = async () => {
    try {
      const response = await buyerApi.get(`buyer/getwishlist`);

      setWishList(response.data.wishlist);
    } catch (error) {
      console.log(error);
      if (error.status === 404) {
        setWishList([]);
      }
    }
  };

  // get vendors by buyer Id

  const getVendorsByBuyerId = async () => {
    try {
      const response = await buyerApi.get(
        `buyer/getVendorsByBuyerId?buyerId=${buyerData?.id}`,
      );

      setSaveVendors(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const isLoggin = localStorage.getItem("isLoggin");

    if (isLoggin) {
      getBuyerData().finally(() => setLoginResolved(true));
      getVendorsByBuyerId();
    } else {
      setBuyerData(null); // guest
      setLoginResolved(true);
    }
  }, []);

  useEffect(() => {
    if (!loginResolved) return;

    getBuyerCartItems();
    getWishlist();
  }, [loginResolved || buyerData]);

  return (
    <UserContext.Provider
      value={{
        sellerList,
        getBuyerData,
        buyerData,
        addressdetails,
        addToCart,
        buyerCartItems,
        cartSummary,
        productData,
        setPincode,
        pincode,
        getWishlist,
        getBuyerCartItems,
        wishlist,
        orderDetails,
        setBuyerData,
        saveVendors,
        cartCount
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
