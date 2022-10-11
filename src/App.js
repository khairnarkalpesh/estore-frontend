import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect } from "react";
import Home from "./component/Home/Home.js";
import "./App.css";
import Loader from "./component/layout/Loader/Loader";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import { loadUser } from "./actions/userAction.js";
import { useDispatch, useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions.js";

function App() {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(loadUser());

    WebFont.load({
      google: {
        families: ["Roboto", "Droid sans", "Chlanka"],
      },
    });
  }, [dispatch]);

  return (
    <>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<LoginSignUp />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
