import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import "./FeaturedProducts.scss";
import { UserContext } from "../../Context";
import { productApi } from "../../utils/Api";
import Card_comp from "../Card_comp/Card_comp";

function FeaturedProducts() {
  const { addToCart } = useContext(UserContext);
  const sectionRef = useRef(null);
  const sentinelRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Refs so the observer callback always has fresh values
  // without needing to be re-created on every state change.
  const pageRef = useRef(1);
  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);

  const getProductData = useCallback(async (currentPage = 1, size = 15) => {
    if (isLoadingRef.current || (!hasMoreRef.current && currentPage > 1)) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const response = await productApi.get(
        `/api/product/getAllJbAssured?page=${currentPage}&size=${size}`
      );

      const nextProducts = response?.data?.productdata || response?.data?.data || [];

      setProducts((prevProducts) =>
        currentPage === 1 ? nextProducts : [...prevProducts, ...nextProducts]
      );

      pageRef.current = currentPage;
      const more = nextProducts.length === size;
      hasMoreRef.current = more;
      setHasMore(more);
    } catch (error) {
      console.log(error);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    getProductData(1);
  }, [getProductData]);

  // Infinite scroll via IntersectionObserver — set up once
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          !isLoadingRef.current &&
          hasMoreRef.current
        ) {
          getProductData(pageRef.current + 1);
        }
      },
      {
        root: null,
        rootMargin: "250px", // start loading before it's fully in view
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [getProductData]);

  console.log(products)

  return (
    <>
      <div className="parent feature-parent" ref={sectionRef}>
        <div className="top-category-overlay"></div>
        <div className="feature-bg-image"></div>
        <div className="cont feature-cont">
          <div className="top-head">
            <h2>Jb Assured Products</h2>
          </div>
          <div className="products_lisitng">
            <Card_comp
              onclick={addToCart}
              data={products}
              page="Product-details"
              query="productName"
              queryParamKey="product_name"
            />
          </div>

          {/* Reserve space so this doesn't cause layout shift/jerk */}
          <div className="loading-slot" style={{ minHeight: "24px" }}>
            {isLoading && <p className="loading-text">Loading more products...</p>}
          </div>

          {/* Sentinel element the observer watches */}
          <div ref={sentinelRef} style={{ height: "1px" }} />
        </div>
      </div>
    </>
  );
}

export default FeaturedProducts;