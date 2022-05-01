import "./Styles/App.css";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar";
import NotFount from "./components/NotFount";
import Products from "./components/Products/Products";
import Spinner from "./components/Spinner";
import { globalTypes } from "./redux/actions/globalTypes";
import Cart from "./components/Products/Cart";
import Product from "./components/Products/Product";
import History from "./components/Products/History";
import Orderhistory from "./components/Products/Orderhistory";
import CreateProducts from "./components/Products/CreateProducts";
import Category from "./components/Products/Category";

export default function App() {
  const { auth, loading } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch((state) => state);

  useEffect(() => {
    // if (!auth.accessToken) {
    //   navigate("/login");
    // }
    if (localStorage.getItem("isLogin")) {
      dispatch({ type: globalTypes.LOADING, payload: true });
      axios
        .get("/user/refresh_token")
        .then((res) => {
          // navigate("/");
          dispatch({ type: globalTypes.AUTH, payload: res.data });
          dispatch({ type: globalTypes.LOADING, payload: false });
          dispatch({
            type: globalTypes.ADD_TO_CART,
            payload: res.data.user.cart,
          });
        })
        .catch((err) => {
          console.log(err.response);
          dispatch({ type: globalTypes.LOADING, payload: false });
        });
    }
  }, []);

  return (
    <div className="App">
      <Navbar />
      {loading && <Spinner />}
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/create_product/:id" element={<CreateProducts />} />
        <Route path="/category" element={<Category />} />
        <Route path="/order" element={<Orderhistory />} />
        <Route path="/history" element={<History />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/*" element={<NotFount />} />
      </Routes>
    </div>
  );
}
