import React, { useContext, useEffect, useState } from "react";
import "./TrendingProducts.scss";


import Card_comp from "../Card_comp/Card_comp";
import { UserContext } from "../../Context";

import {  productApi } from "../../utils/Api";


function TrendingProducts() {
  const { addToCart, productData } = useContext(UserContext);

  const [data,setData] = useState();

  const getTrendingProducts = async ()=>{
    try {
      const response = await productApi.get("api/product/getTrendingProducts");
      if(response?.status === 200){
        const prdData = response?.data?.data;
        setData(prdData)
      }
   
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getTrendingProducts()
  },[])

  return (
    <>
      <div className="parent trending-product-parent bg-img-cover">
        <div className="cont trending-product-cont">
          <div className="top-head">
            <h2>Trending Products</h2>
            {/* <Link to="/search" target="_blank" className="top-head-view">
              <span>View All</span>
              <span>
                <FaArrowRightLong />
              </span>
            </Link> */}
          </div>
          <div class="products_lisitng">
            <Card_comp
              onclick={addToCart}
              data={data}
              page="Product-details"
              query="productName"
              queryParamKey="product_name"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default TrendingProducts;
