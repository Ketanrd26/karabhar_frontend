import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import Breadcrum from "../../components/breadcrum/Breadcrum";
import "./Search.scss";
import SelectInput from "../../components/selectInput/SelectInput";
import Card_comp from "../../components/Card_comp/Card_comp";
import Loader from ".././../components/loader/Loader";
import Filterscomp from "../../components/filters_comp/Filterscomp";
import {
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Slider,
} from "@mui/material";
import { productApi } from "../../utils/Api";
import { UserContext } from "../../Context";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { LiaFilterSolid } from "react-icons/lia";
import { MdSort } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useContext(UserContext);
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [range, setRange] = useState([0, 100000]);
  const [selectedRatings, setSelectedRatings] = useState(null);
  const [selectedTags, setSelectedTags] = useState(null);
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [active, setActive] = useState();
  const [loader, setLoader] = useState(false);
  const [sort, setSort] = useState();
  const [sub_category, setsub_category] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [filtersLoaded, setFiltersLoaded] = useState(false);
  const [filterActive, setFilterActive] = useState("Category");
  const [vendorSearch, setVendorSearch] = useState("");
  const [relevantProducts, setRelevantProducts] = useState();
  const [relevantTotalCount, setRelevantTotalCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const sectionRef = useRef(null);
  const sentinelRef = useRef(null); // sentinel for main product list
  const relevantSentinelRef = useRef(null); // sentinel for relevant product list
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [relevantIsLoading, setRelevantIsLoading] = useState(false);
  const [relevantHasMore, setRelevantHasMore] = useState(true);

  const PAGE_SIZE = 15;
  const RELEVANT_PAGE_SIZE = 15;
  const pageRef = useRef(1);
  const relevantPageRef = useRef(1);
  const isLoadingRef = useRef(false);
  const relevantIsLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const relevantHasMoreRef = useRef(true);
  const currentParamsRef = useRef(null); // holds latest filter params (without page/size)

  const tagData = [
    {
      label: "Organic",
      value: ["Healthy", "Food", "Crops", "Chemical Free"],
    },
    {
      label: "Farm Fresh",
      value: ["Crops", "Food"],
    },
    {
      label: "Handmade",
      value: ["Craft", "Eco Friendly"],
    },
    {
      label: "Fashion",
      value: ["Fashion", "Cultural"],
    },
  ];

  const [productData, setProductData] = useState();
  const [catergory, setCategory] = useState();
  const { sellerList } = useContext(UserContext);

  const sortData = [
    { id: 1, name: "Latest", value: "latest" },
    { id: 2, name: "Price (High to Low)", value: "hightolow" },
    { id: 3, name: "Price (Low to High)", value: "lowtohigh" },
    { id: 4, name: "Discount", value: "discount" },
  ];
  const ratingData = [
    { label: "1 & above", value: 1 },
    { label: "2 & above", value: 2 },
    { label: "3 & above", value: 3 },
    { label: "4 & above", value: 4 },
    { label: "5 Rating", value: 5 },
  ];

  const categorisdata = async () => {
    try {
      const response = await productApi.get("api/product/categorieswiseData");
      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ The API paginates two independent lists:
  //   - productdata/searchproducts, controlled by page & size
  //   - relevantproducts, controlled by relevantPage & relevantSize
  // fetchData lets the caller advance either cursor independently (e.g.
  // scrolling the main grid shouldn't refetch/reset the relevant grid, and
  // vice versa), while a `reset` call (new search/filter change) reloads both.
  const fetchData = useCallback(
    async (baseParams, { page, relevantPage, reset = false } = {}) => {
      const nextPage = page ?? pageRef.current;
      const nextRelevantPage = relevantPage ?? relevantPageRef.current;

      let loadingMain = reset || nextPage > pageRef.current;
      let loadingRelevant = reset || nextRelevantPage > relevantPageRef.current;

      // Guard each section independently so loading more relevant products
      // doesn't get blocked by the main list already loading (in-flight or
      // exhausted), and vice versa.
      if (loadingMain && (isLoadingRef.current || (!hasMoreRef.current && !reset))) {
        loadingMain = false;
      }
      if (
        loadingRelevant &&
        (relevantIsLoadingRef.current || (!relevantHasMoreRef.current && !reset))
      ) {
        loadingRelevant = false;
      }
      if (!loadingMain && !loadingRelevant) return;

      if (loadingMain) {
        isLoadingRef.current = true;
        setIsLoading(true);
      }
      if (loadingRelevant) {
        relevantIsLoadingRef.current = true;
        setRelevantIsLoading(true);
      }
      if (reset) setLoader(true);

      try {
        // ✅ both pagination cursors are sent every time, matching the API's
        // page/size (main list) and relevantPage/relevantSize (relevant list)
        const fetchParams = new URLSearchParams(baseParams);
        fetchParams.set("page", nextPage);
        fetchParams.set("size", PAGE_SIZE);
        fetchParams.set("relevantPage", nextRelevantPage);
        fetchParams.set("relevantSize", RELEVANT_PAGE_SIZE);

        const response = await productApi.get(
          `api/product/SearchProducts?${fetchParams.toString()}`,
        );
        console.log(response, "response")
        console.log(response.data.productdata?.length, "length")

        if (loadingMain) {
          const searchproducts = response.data.searchproducts;
          const prdData = response.data.productdata;
          const nextProducts = prdData || searchproducts || [];

          setProductData((prev) =>
            reset || nextPage === 1
              ? nextProducts
              : [...(prev || []), ...nextProducts],
          );

          const total =
            response.data.count ??
            response.data.searchcount ??
            nextProducts.length;
          setTotalCount(total);

          pageRef.current = nextPage;

          const more =
            typeof response.data.hasNextPage === "boolean"
              ? response.data.hasNextPage
              : nextProducts.length === PAGE_SIZE;
          hasMoreRef.current = more;
          setHasMore(more);
        }

        if (loadingRelevant) {
          const nextRelevant = response.data.relevantproducts || [];

          setRelevantProducts((prev) =>
            reset || nextRelevantPage === 1
              ? nextRelevant
              : [...(prev || []), ...nextRelevant],
          );

          setRelevantTotalCount(response.data.relevantcount ?? nextRelevant.length);

          relevantPageRef.current = nextRelevantPage;

          const moreRelevant = nextRelevant.length === RELEVANT_PAGE_SIZE;
          relevantHasMoreRef.current = moreRelevant;
          setRelevantHasMore(moreRelevant);
        }
      } catch (error) {
        console.log(error);
      } finally {
        // ✅ isLoading was never reset before — this permanently blocked all
        // pagination after the very first request
        if (loadingMain) {
          isLoadingRef.current = false;
          setIsLoading(false);
        }
        if (loadingRelevant) {
          relevantIsLoadingRef.current = false;
          setRelevantIsLoading(false);
        }
        setLoader(false);
      }
    },
    [],
  );


  // Read URL params and set state on initial load
  useEffect(() => {
    const categories = searchParams.get("category");
    const ratings = searchParams.get("rating");
    const tags = searchParams.get("Prd_category");
    const vendors = searchParams.get("vendors");
    const sorting = searchParams.get("sort");
    const subCat = searchParams.get("sub_category");
    const suggestion = searchParams.get("suggestions");
    const price = searchParams.get("price");

    if (categories && categories !== "null") {
      setSelectedCategories(categories.split(","));
    }

    if (ratings && ratings !== "null") {
      setSelectedRatings(parseInt(ratings));
    }

    if (tags && tags !== "null") {
      setSelectedTags(tags.split(","));
    }

    if (vendors && vendors !== "null") {
      setSelectedVendors(vendors.split(","));
    }

    if (sorting && sorting !== "null") {
      setSort(sorting);
    }

    if (subCat && subCat !== "null") {
      setsub_category(subCat);
    }

    if (suggestion && suggestion !== "null") {
      setSuggestions(suggestion);
    }

    if (price && price.includes("-")) {
      const [min, max] = price.split("-").map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        setRange([min, max]);
      }
    }

    setFiltersLoaded(true); // ✅ notify second useEffect
  }, [searchParams]);

  // Update URL and fetch data when filters change
  useEffect(() => {
    if (!filtersLoaded) return; // ✅ skip if first effect not finished

    const farm_fresh = searchParams.get("farm_fresh");

    const params = new URLSearchParams({
      category: selectedCategories.length
        ? selectedCategories.join(",")
        : "null",
      price: `${range[0]}-${range[1]}`,
      rating: selectedRatings !== null ? selectedRatings : "null",
      vendors: selectedVendors.length ? selectedVendors.join(",") : "null",
      Prd_category: selectedTags ? selectedTags.join(",") : "null",
      farm_fresh: farm_fresh || "null",
      sort: sort || "null",
      sub_category: sub_category || "null",
      suggestions: suggestions?.trim() || "null", // ✅ properly includes suggestions
    });

    setSearchParams(params, { replace: true });

    // ✅ Any filter change is a brand new search — reset BOTH pagination
    // cursors so we don't append stale pages or stay blocked by a previous
    // hasMore=false on either list.
    currentParamsRef.current = params;
    pageRef.current = 1;
    relevantPageRef.current = 1;
    hasMoreRef.current = true;
    relevantHasMoreRef.current = true;
    setHasMore(true);
    setRelevantHasMore(true);
    setProductData([]);
    setRelevantProducts([]);

    fetchData(params, { page: 1, relevantPage: 1, reset: true });
  }, [
    filtersLoaded, // ✅ ensure dependencies wait for initial state
    selectedCategories,
    range,
    selectedRatings,
    selectedTags,
    selectedVendors,
    sort,
    sub_category,
    suggestions,
  ]);

  useEffect(() => {
    categorisdata();
  }, []);

  // ✅ Infinite scroll for the MAIN product list, via IntersectionObserver.
  // Advances only the main `page` cursor — the relevant list's cursor is
  // untouched, so scrolling this grid never re-fetches/resets relevant items.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          !isLoadingRef.current &&
          hasMoreRef.current &&
          currentParamsRef.current
        ) {
          fetchData(currentParamsRef.current, {
            page: pageRef.current + 1,
            relevantPage: relevantPageRef.current,
          });
        }
      },
      {
        root: null,
        rootMargin: "300px", // start loading a bit before it's in view
        threshold: 0,
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchData]);

  // ✅ Infinite scroll for the RELEVANT product list, via its own
  // IntersectionObserver. Advances only the `relevantPage` cursor.
  useEffect(() => {
    const sentinel = relevantSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          !relevantIsLoadingRef.current &&
          relevantHasMoreRef.current &&
          currentParamsRef.current
        ) {
          fetchData(currentParamsRef.current, {
            page: pageRef.current,
            relevantPage: relevantPageRef.current + 1,
          });
        }
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0,
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchData]);

  const handleCategoryChange = (category) => setSelectedCategories(category);
  const handleRangeChange = (newRange) => setRange(newRange);
  const handleRatingChange = (value) => {
    setSelectedRatings(value);
  };
  const handleTagChange = (tagLabel) => {
    const selected = tagData.find((tag) => tag.label === tagLabel);
    if (selected) {
      setSelectedTags((prev) =>
        JSON.stringify(prev) === JSON.stringify(selected.value)
          ? null // toggle off if same
          : selected.value,
      );
    }
  };

  const handleVendorChange = (newVendors) => setSelectedVendors(newVendors);
  const handleCheckboxChange = (value, selectedList, setFunction) => {
    if (selectedList?.includes(value)) {
      setFunction(selectedList?.filter((item) => item !== value));
    } else {
      setFunction([...selectedList, value]);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <div class="bottom_side_panel">
        {active === 1 ? (
          <div class="left" onClick={() => setActive(0)}>
            {/* <span>
              <IoClose />
            </span> */}
            Apply
          </div>
        ) : (
          <div class="left" onClick={() => setActive(1)}>
            <span>
              <LiaFilterSolid />
            </span>
            Filters
          </div>
        )}

        {active === 2 ? (
          <div class="right" onClick={() => setActive(0)}>
            {/* <span>
              <IoClose />
            </span> */}
            Apply
          </div>
        ) : (
          <div class="right" onClick={() => setActive(2)}>
            <span>
              <MdSort />
            </span>
            Sort By
          </div>
        )}
      </div>
      <div className="search_parent parent">
        <div className="search_cont cont">
          <Breadcrum />
          <div className="search_wrapper">
            <div className="top_section">
              <div className="left">
                <p>Filters</p>
              </div>
              <div className="right">
                <div className="sort_content">
                  <p>Sort by :</p>
                  <SelectInput
                    label="Sort by"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    width="200px"
                    name="sort"
                  >
                    {sortData.map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </SelectInput>
                </div>
                <div className="item_result">
                  <Link to="/search" target="_blank" >Reset Search Filter </Link>
                  <p>
                    {/* ✅ use the API's true total count, not just what's loaded so far */}
                    <span>{totalCount || 0}</span> Result Found
                  </p>
                </div>
              </div>
            </div>
            <div className="bottom_section">
              <div className="left left_tab">
                <Filterscomp
                  categoryData={catergory}
                  selectedCategories={selectedCategories}
                  onCategoryChange={handleCategoryChange}
                  range={true}
                  range_value={range}
                  onRangeChange={handleRangeChange}
                  ratingData={ratingData}
                  selectedRatings={selectedRatings}
                  onRatingChange={handleRatingChange}
                  tagData={tagData}
                  selectedTags={selectedTags}
                  onTagChange={handleTagChange}
                  vendorData={sellerList}
                  selectedVendors={selectedVendors}
                  onVendorChange={handleVendorChange}
                />
              </div>

              <div className="right" ref={sectionRef}>
                <div class="products">
                  <Card_comp
                    width="280px"
                    onclick={addToCart}
                    data={productData}
                    page="Product-details"
                    query="productName"
                    queryParamKey="product_name"
                  />
                </div>

                {/* Reserve space so the loading text doesn't shift layout mid-scroll */}
                <div className="load-more-slot" style={{ minHeight: "24px" }}>
                  {isLoading && (
                    <p className="loading-text">Loading more products...</p>
                  )}
                </div>

                {/* Sentinel element the IntersectionObserver watches to trigger the next page */}
                <div ref={sentinelRef} style={{ height: "1px" }} />

                {relevantProducts?.length > 0 && (
                  <div class="relevant_products">
                    <h1 class="top_bar">Relevant Products</h1>
                    <div class="bottom_list">
                      <Card_comp
                        width="280px"
                        onclick={addToCart}
                        data={relevantProducts}
                        page="Product-details"
                        query="productName"
                        queryParamKey="product_name"
                      />
                    </div>

                    {/* Reserve space so the loading text doesn't shift layout mid-scroll */}
                    <div className="load-more-slot" style={{ minHeight: "24px" }}>
                      {relevantIsLoading && (
                        <p className="loading-text">
                          Loading more relevant products...
                        </p>
                      )}
                    </div>

                    {/* Sentinel for the relevant list's own infinite scroll cursor */}
                    <div ref={relevantSentinelRef} style={{ height: "1px" }} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {active === 1 && (
        <div className="left left_mobile">
          <p className="top">Filters</p>

          <div class="bottom">
            <div class="left">
              <div
                class={filterActive === "Category" ? "item active" : "item"}
                onClick={() => {
                  setFilterActive("Category");
                }}
              >
                Category
              </div>
              <div
                class={filterActive === "Price" ? "item active" : "item"}
                onClick={() => {
                  setFilterActive("Price");
                }}
              >
                Price
              </div>
              <div
                class={filterActive === "Rating" ? "item active" : "item"}
                onClick={() => {
                  setFilterActive("Rating");
                }}
              >
                Rating
              </div>
              <div
                class={filterActive === "Popular Tags" ? "item active" : "item"}
                onClick={() => {
                  setFilterActive("Popular Tags");
                }}
              >
                Popular Tags
              </div>
              <div
                class={filterActive === "Vendors" ? "item active" : "item"}
                onClick={() => {
                  setFilterActive("Vendors");
                }}
              >
                Makers
              </div>
            </div>
            <div class="right">
              {filterActive === "Category" && (
                <div class="category">
                  <FormGroup>
                    {catergory?.map((item, index) => (
                      <div className="item" key={index}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedCategories?.includes(
                                item?.Category,
                              )}
                              onChange={() =>
                                handleCheckboxChange(
                                  item?.Category,
                                  selectedCategories,
                                  handleCategoryChange,
                                )
                              }
                            />
                          }
                          label={item.Category}
                        />
                        <span className="item_count">({item.total_item})</span>
                      </div>
                    ))}
                  </FormGroup>
                </div>
              )}

              {filterActive === "Price" && (
                <div class="price">
                  <div className="range">
                    <div className="label">
                      <h4>Price Range</h4>
                    </div>
                    <div className="items">
                      <Slider
                        value={range}
                        onChange={(e, newValue) => handleRangeChange(newValue)}
                        valueLabelDisplay="auto"
                        min={0}
                        max={10000}
                      />
                      <p>
                        Price :{" "}
                        <span>
                          ₹{range[0]} - ₹{range[1]}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {filterActive === "Rating" && (
                <div class="rating">
                  <FormGroup>
                    {ratingData.map((item, index) => (
                      <div className="item" key={index}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedRatings === item.value}
                              onChange={() => {
                                const newValue =
                                  selectedRatings === item.value
                                    ? null
                                    : item.value;
                                handleRatingChange(newValue); // Call the update function
                              }}
                            />
                          }
                          label={item.label}
                        />
                      </div>
                    ))}
                  </FormGroup>
                </div>
              )}

              {filterActive === "Popular Tags" && (
                <div class="popular_tags">
                  {tagData.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag.label}
                      className={
                        JSON.stringify(selectedTags) ===
                        JSON.stringify(tag.value)
                          ? "active"
                          : ""
                      }
                      onClick={() => handleTagChange(tag.label)}
                    />
                  ))}
                </div>
              )}

              {filterActive === "Vendors" && (
                <div className=" vendors">
                  <div className="top_vendors">
                    <input
                      type="text"
                      placeholder="Search Vendors"
                      value={vendorSearch}
                      onChange={(e) => setVendorSearch(e.target.value)}
                    />
                    <span className="icon">
                      <IoSearchOutline />
                    </span>
                  </div>

                  <div className="list">
                    <FormControl>
                      {sellerList
                        .filter((v) =>
                          v.businessOwnerName
                            .toLowerCase()
                            .includes(vendorSearch.toLowerCase()),
                        )
                        .map((vendor, index) => (
                          <div className="item" key={index}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={selectedVendors.includes(
                                    vendor.businessOwnerName,
                                  )}
                                  onChange={() =>
                                    handleCheckboxChange(
                                      vendor.businessOwnerName,
                                      selectedVendors,
                                      handleVendorChange,
                                    )
                                  }
                                />
                              }
                              label={vendor.businessOwnerName}
                            />
                          </div>
                        ))}
                    </FormControl>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {active === 2 && (
        <div class="sortby_section">
          <p>Sort by </p>
          <div class="list">
            {sortData.map((item, index) => (
              <div class="item" key={index} onClick={() => setSort(item.value)}>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Search;