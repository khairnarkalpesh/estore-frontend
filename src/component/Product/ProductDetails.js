import React, { useEffect } from "react";
// import Carousel from "react-material-ui-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Rating from "react-rating-stars-component";
import "./ProductDetails.css";
import ReviewCard from "./ReviewCard.js";
import Metadata from "../layout/Metadata";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { id } = useParams();
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  let options = {};

  product
    ? (options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
        edit: false,
      })
    : console.log("none");

  return (
    <>
      <div className="ProductDetails">
        {product ? <Metadata title={`${product.name} | eCommerce`} /> : <Metadata title={`Error | eCommerce`} />}
        <Carousel>
          {product ? (
            product.images.map((item, i) => (
              <img
                className="carouselImage"
                key={item.url}
                src="https://i.ibb.co/DRST11n/1.webp"
                alt={`${i} Slide`}
              />
            ))
          ) : (
            <p>?</p>
          )}
        </Carousel>

        {product ? (
          <div>
            <div className="detailsBlock-1">
              <h2>{product.name}</h2>
              <p>Product #{product._id}</p>
            </div>

            <div className="detailsBlock-2">
              <Rating {...options} />
              <span className="detailsBlock-2-span">
                {" "}
                ({product.numOfReviews} Reviews)
              </span>
            </div>
            <div className="detailsBlock-3">
              <h1>{`₹${product.price}`}</h1>
              <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                  <button onClick="">-</button>
                  <input readOnly type="number" value={0} />
                  <button onClick="">+</button>
                </div>
                <button disabled={product.Stock < 1 ? true : false} onClick="">
                  Add to Cart
                </button>
              </div>

              <p>
                Status:
                <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                  {product.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>

            <div className="detailsBlock-4">
              Description : <p>{product.description}</p>
            </div>

            <button onClick="" className="submitReview">
              Submit Review
            </button>
          </div>
        ) : (
          <p>Something went wrong!</p>
        )}
      </div>

      <h3 className="reviewsHeading">Reviews</h3>

      {product ? (
        <div className="reviews">
          {product.reviews.length > 0 ? (
            product.reviews.map((review) => (
              <ReviewCard review={review}></ReviewCard>
            ))
          ) : (
            <h1>No review found</h1>
          )}
        </div>
      ) : (
        <h1>Someting went wrong</h1>
      )}
    </>
  );
};

export default ProductDetails;
