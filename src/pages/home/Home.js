import React from "react";
import "./Home.scss";
import HeroSection from "../../components/hero/HeroSection";
import TrendingProducts from "../../components/trending-product/TrendingProducts";
import TopCategories from "../../components/top-categories/TopCategories";
import Advertisement from "../../components/advertisement/Advertisement";
import WhyChooseUs from "../../components/whychoose/WhyChooseUs";
import Vendors from "../../components/vendors/Vendors";
import Reels from "../../components/reelsection/Reels";
import Footer from "../../components/footer/Footer";
import LocationHeader from "../../components/location-header/LocationHeader";
import { Helmet } from "react-helmet";
import { brandSeo } from "../../data/seo/brandSeo";
import FeaturedProducts from "../../components/feature-products/FeaturedProducts";

function Home() {

  return (
    <>
      <Helmet>
        <title>JungleBoosh | Organic & Traditional Products</title>

        <meta name="description" content={brandSeo.description} />

        <meta
          name="keywords"
          content={[...brandSeo.keywords, ...brandSeo.aliases].join(", ")}
        />

        <link rel="canonical" href="https://jungleboosh.com" />
      </Helmet>

      {/* <LocationHeader /> */}
      <HeroSection />

      {/* <Breadcrum /> */}
      <TopCategories />
      <TrendingProducts />
      <FeaturedProducts/>
      <Advertisement />
      <Vendors />
      {/* <Reels /> */}
      <Reels />
      {/* <PopularCategories /> */}
      {/* <Deals /> */}
      {/* <DiscountSection /> */}
      <WhyChooseUs />
      {/* <Gurantee /> */}
      {/* <BeforeFooter /> */}

      <Footer />
    </>
  );
}

export default Home;
