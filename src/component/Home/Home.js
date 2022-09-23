import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
import Metadata from "../layout/Metadata";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";

// const product = {
//   name: "Blue Shirt",
//   images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
//   price: "$300",
//   _id: "product",
// };

function Home() {
  const dispatch = useDispatch();

  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return toast.error(error);
    }

    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="eCommerce" />
          <div className="banner">
            <p>Welcome to eCommerce</p>
            <h1>Find Amazing Products Below</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products ? (
              products &&
              products.map((product) => <Product product={product} />)
            ) : (
              <p>Something went wrong.. Refresh Again!</p>
            )}
          </div>

          <Toaster position="bottom-center" reverseOrder={false} />
        </Fragment>
      )}
    </>
  );
}

export default Home;
