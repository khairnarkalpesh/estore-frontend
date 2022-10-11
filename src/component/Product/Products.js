import React, { Fragment, useEffect, useState } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProducts } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import toast, { Toaster } from "react-hot-toast";
import Metadata from "../layout/Metadata"

const categories = [
  "laptop",
  "footwear",
  "bottom",
  "tops",
  "attire",
  "camera",
  "smarthphones",
  "mobile",
];

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = React.useState([0, 2500]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {

    dispatch(getProducts(keyword, currentPage, price, category, ratings));

    // if (error) {
    //   toast.error(error);
    //   dispatch(clearErrors());
    // }
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <Metadata title = {`Products | eCommerce`}/>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p>Product Not Found!</p>
            )}
          </div>

          <div className="filterBox">
            <p>Price</p>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              min={0}
              max={25000}
            /> 

            <p>Category</p>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <p>Rating above</p>
              <Slider
                value={ratings}
                onChange={(e, newRatings) => setRatings(newRatings)}
                aria-labelledby="continuos-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              />
            </fieldset>
          </div>

          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-navlink"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </Fragment>
  );
};

export default Products;
