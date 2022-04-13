import React, { useEffect, useState } from "react";
import "../Styles/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { globalTypes } from "../redux/actions/globalTypes";
import { langs } from "../langs/langs";
import axios from "axios";

export default function Navbar(props) {
  const navigate = useNavigate();
  const [category1, setCategory] = useState({});
  const [mySort, setMySort] = useState("-createAt");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState([]);
  const dispatch = useDispatch();
  const { lang, auth, category, products } = useSelector((state) => state);
  const { cart, page } = useSelector((state) => state.globalState);
  const logout = () => {
    // navigate("/login");
    dispatch({ type: globalTypes.AUTH, payload: {} });
    dispatch({
      type: globalTypes.ADD_TO_CART,
      payload: [],
    });
    localStorage.clear("isLogin");
  };

  const handleCategory = (e) => {
    axios
      .get("/api/category")
      .then((res) => {
        console.log(res.data);
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleSelect = (e) => {
    dispatch({ type: globalTypes.LANG, payload: e.target.value });
  };

  const handleCategory1 = (e) => {
    dispatch({ type: globalTypes.CATEGORY, payload: e.target.value });
  };

  useEffect(() => {
    handleCategory();
  }, []);

  const handleSelectSort = (e) => {
    getSortProducts(e.target.value);
  };

  const getSortProducts = (sort) => {
    dispatch({ type: globalTypes.LOADING, payload: true });
    setMySort(sort);
    axios
      .get(
        `/api/products?/limit=${
          page * 3
        }&sort=${sort}&[title${lang}][regex]=${search}&[category${lang}]=${category}`
      )
      .then((res) => {
        console.log(res);
        dispatch({ type: globalTypes.PRODUCTS, payload: res.data.products });
        dispatch({ type: globalTypes.LOADING, payload: false });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: globalTypes.LOADING, payload: false });
      });
  };
  useEffect(() => {
    if (page !== 1) {
      getSortProducts(mySort);
    }
  }, [page]);

  useEffect(() => {
    getSortProducts(mySort);
  }, [category]);

  const searchProducts = () => {
    getSortProducts(mySort);
  };

  return (
    <div className="navbar1">
      <div className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            eCommerce
          </Link>
          <button
            className="navbar-toggler mx-auto "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div
            className="collapse navbar-collapse mt-lg-0 mt-3 me-lg-3 me-0"
            id="navbarSupportedContent"
          >
            <ul className="d-flex align-items-center justify-content-center ms-lg-auto mb-2 mb-lg-0">
              {/* {auth.user.role === 1 && (
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Products
                  </Link>
                </li>
              )} */}

              {!auth.user && (
                <li className="nav-item">
                  <Link className="nav-link active" to="/login">
                    {langs[`${lang}`].login}
                  </Link>
                </li>
              )}
              {auth.user && (
                <li className="nav-item ">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/history"
                  >
                    {langs[`${lang}`].history}
                  </Link>
                </li>
              )}

              {auth.user && (
                <button
                  onClick={logout}
                  className="btn btn-transparent text-danger d-block"
                >
                  {langs[`${lang}`].logout}
                </button>
              )}
              {auth.user && (
                <li className="nav-item me-3">
                  <Link
                    className="korzinka nav-link active bg-success"
                    aria-current="page"
                    to="/cart"
                  >
                    <img src="/images/cart.png" alt="rasm" />
                    <span className="badge bg-danger position-absolute top-lg-0">
                      {cart.length}
                    </span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <select
            value={lang}
            onChange={handleSelect}
            className="dropdown-toogle lang d-inline"
          >
            <option value="Uz">Uz</option>
            <option value="Eng">Eng</option>
          </select>
        </div>
      </div>
      {window.location.pathname === "/" ? (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <b className="me-2 active">Filter:</b>
              <select
                value={category}
                onChange={handleCategory1}
                className=" filter dropdown-toogle mb-lg-0 mb-2 "
              >
                {category1.length &&
                  category1.map((item, index) => (
                    <option key={index} value={item[`name${lang}`]}>
                      {item[`name${lang}`]}
                    </option>
                  ))}
              </select>
              <form className="d-flex mx-lg-3 mb-lg-0 mb-2">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  onClick={searchProducts}
                  className="btn btn-outline-success"
                  type="button"
                >
                  Search
                </button>
              </form>
              <div className=" ms-auto">
                <b className="active me-2">Sort: </b>
                <select
                  onChange={handleSelectSort}
                  className=" filter dropdown-toogle "
                >
                  <option value="-createAt">{langs[`${lang}`].Newest}</option>
                  <option value="createAt">{langs[`${lang}`].Oldest}</option>
                  <option value="-sold">{langs[`${lang}`].BestSales}</option>
                  <option value="price">{langs[`${lang}`].LowPrice}</option>
                  <option value="-price">{langs[`${lang}`].HightPrice}</option>
                </select>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        ""
      )}
    </div>
  );
}
