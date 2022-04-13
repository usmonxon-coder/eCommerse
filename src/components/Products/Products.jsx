import axios from "axios";
import "../../Styles/Products.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { langs } from "../../langs/langs";
import { globalTypes } from "../../redux/actions/globalTypes";

export default function Products(props) {
  const { lang, products, auth } = useSelector((state) => state);
  const { cart } = useSelector((state) => state.globalState);
  const [Allproducts, setAllProducts] = useState(products);
  const dispatch = useDispatch();

  const getProducts = () => {
    dispatch({ type: globalTypes.LOADING, payload: true });
    axios
      .get("/api/products")
      .then((res) => {
        setAllProducts(res.data.products);
        dispatch({ type: globalTypes.PRODUCTS, payload: res.data.products });
        dispatch({ type: globalTypes.LOADING, payload: false });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({ type: globalTypes.LOADING, payload: false });
      });
  };
  useEffect(() => {
    if (Allproducts.length === 0) {
      getProducts();
    }
  }, []);

  useEffect(() => {
    setAllProducts(products);
  }, [products]);

  const addToCard = (item) => {
    if (!auth.user) {
      toast.error("Please login or register to buy", {
        autoClose: 3000,
        position: "top-center",
      });
    } else {
      const myCart = cart;
      const isHave = myCart.findIndex((it, index) => it._id === item._id);
      if (isHave === -1) {
        item.quantity = 1;
        myCart.push(item);
        axios
          .put(
            "/user/addCart",
            { cart },
            { headers: { Authorization: auth.accessToken } }
          )
          .then((res) => {
            dispatch({ type: globalTypes.ADD_TO_CART, payload: myCart });
            console.log(res);
            toast.success("Add To card");
          })
          .catch((err) => {
            console.log(err.response);
          });
      } else {
        toast.error("This product already exist");
      }
    }
  };

  return (
    <div className="products pt-4">
      <div className="container">
        {Allproducts.length === 0 && (
          <div>
            <h1 className="text-center my-3">{langs[`${lang}`].noProducts}</h1>
          </div>
        )}
        <div className="row">
          {Allproducts.map((item, index) => (
            <div
              key={index}
              className="boxes col-lg-3 col-md-4 col-sm-6 mb-3 position-relative"
            >
              <div className="card h-100 shadow">
                <div className="black w-100 h-100 position-absolute">
                  <div className="buttons d-flex  align-items-center justify-content-evenly ">
                    <button
                      onClick={() => addToCard(item)}
                      className="btn btn-light d-block shadow-none"
                    >
                      {langs[`${lang}`].buy}
                    </button>
                    <Link
                      to={`/product/${item._id}`}
                      className="btn btn-light d-block shadow-none"
                    >
                      {langs[`${lang}`].view}
                    </Link>
                  </div>
                </div>
                <img
                  style={{ height: "270px", objectFit: "cover" }}
                  src={item.images.url}
                  alt="rasm"
                />
                <hr className="my-1 mt-0" />
                <div className="card-body">
                  <h6>
                    <b>{langs[`${lang}`].title}: </b>
                    {item[`title${lang}`]}
                  </h6>
                  <p className="my-1">
                    <b>{langs[`${lang}`].price}:</b> {item.price}
                  </p>
                  {/* <p className="my-1">
                    <b>{langs[`${lang}`].category}: </b>
                    {item[`category${lang}`]}
                  </p>
                  <p className="my-1">
                    <b>{langs[`${lang}`].description}: </b>
                    {item[`description${lang}`]}
                  </p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
        {Allproducts.length && (
          <button
            onClick={() => dispatch({ type: globalTypes.PAGE })}
            className="btn btn-danger d-block mx-auto"
          >
            {langs[`${lang}`].loadMore}
          </button>
        )}
      </div>
    </div>
  );
}