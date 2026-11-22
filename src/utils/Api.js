import axios from "axios";

const sellerbaseUrl = process.env.REACT_APP_SELLER_API;
// const sellerbaseUrl = "http://localhost:8000/";
const productbaseurl = process.env.REACT_APP_PRODUCTS_API;
const buyerbaseurl = process.env.REACT_APP_BUYER_API;  
const ordersbaseurl = process.env.REACT_APP_ORDERS_API;
const paymentbaseurl = process.env.REACT_APP_PAYMENT_API;
// const ordersbaseurl = "http://localhost:3001/";
// const buyerbaseurl = "http://localhost:5000/";
// const productbaseurl = "http://localhost:4000/"

const adminUrl = process.env.REACT_APP_ADMIN_URL
const sellerApi = axios.create({
  baseURL: sellerbaseUrl,
  // withCredentials: true,
});

const productApi = axios.create({
  baseURL: productbaseurl,
  credentials: "include",
});
const adminApi = axios.create({
  baseURL: adminUrl,
  withCredentials: true,
});

const buyerApi = axios.create({
  baseURL: buyerbaseurl,
 withCredentials: true,
});

const paymentApi = axios.create({
  baseURL: paymentbaseurl,
  credentials: "include",
}); 

const orderApi = axios.create({
  baseURL: ordersbaseurl,
 withCredentials: true,
});




export { sellerApi, productApi, buyerApi, adminApi,orderApi, paymentApi };
