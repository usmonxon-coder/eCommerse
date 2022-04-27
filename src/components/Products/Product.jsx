import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { langs } from "../../langs/langs";
import { globalTypes } from "../../redux/actions/globalTypes";

export default function Product(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { lang, auth } = useSelector((state) => state);
  const { cart } = useSelector((state) => state.globalState);
  const [relatedProduct, SetRelatedProduct] = useState([]);
  const [product, SetProduct] = useState({});

  const addCart = () => {
    // if (!cart.product) {
    //   console.log("bor");
    // } else {
      let salom = cart.push(product);
      axios
        .put(
          "/user/addCart",
          { cart },
          { headers: { Authorization: auth.accessToken } }
        )
        .then((res) => {
          dispatch({ type: globalTypes.ADD_TO_CART, payload: salom });
          console.log(res);
          toast.success("Add To card");
        })
        .catch((err) => {
          console.log(err.response);
        });
    // }
    console.log(cart.push(product));
  };
  const viewProduct = () => {
    dispatch({ type: globalTypes.LOADING, payload: true });
    axios
      .get("/api/products")
      .then((res) => {
        const myProducts = res.data.products.find(
          (item, index) => item._id === id
        );
        SetRelatedProduct(
          res.data.products.filter(
            (item, index) => item.categoryUz == myProducts.categoryUz
          )
        );
        SetProduct(myProducts);
        dispatch({ type: globalTypes.PRODUCTS, payload: res.data.products });
        dispatch({ type: globalTypes.LOADING, payload: false });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: globalTypes.LOADING, payload: false });
      });
  };

  useEffect(() => {
    viewProduct();
  }, []);

  return (
    <div className="product pt-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-5">
            <img
              className="w-100 mb-md-0 mb-3"
              src={product.images && product.images.url}
              alt="rasm"
            />
          </div>
          <div className="col-md-7 offset-lg-0">
            <h3>
              <b>{product[`title${lang}`]} </b>
            </h3>
            <p className="mb-1">
              <b>{langs[`${lang}`].price}: </b>
              {product.price}
            </p>
            <p className="mb-1">
              <b>{langs[`${lang}`].description}: </b>
              {product[`description${lang}`]}
            </p>
            <p className="mb-1">
              <b>{langs[`${lang}`].content}: </b>
              {product[`content${lang}`]}
            </p>
            <p>
              <b>{langs[`${lang}`].sold}: </b> {product.sold}
            </p>
            <button onClick={addCart} className="btn btn-success">
              {langs[`${lang}`].buy}
            </button>
          </div>
        </div>
        <hr className="my-5" />
        <h2 className="mb-4">{langs[`${lang}`].related}</h2>
        <div className="row">
          {relatedProduct.length &&
            relatedProduct.map((item, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-3">
                <div className="card h-100">
                  <img
                    style={{ height: "270px" }}
                    src={item.images.url}
                    alt="rasm"
                  />
                  <hr className="my-1 mt-0" />
                  <div className="card-body">
                    <h6>
                      <b>{langs[`${lang}`].title} </b>
                      {item[`title${lang}`]}
                    </h6>
                    <p className="my-1">
                      <b>{langs[`${lang}`].price}</b> {item.price}
                    </p>
                    <p className="my-1">
                      <b>{langs[`${lang}`].category} </b>
                      {item[`category${lang}`]}
                    </p>
                    <p className="my-1">
                      <b>{langs[`${lang}`].description} </b>
                      {item[`description${lang}`]}
                    </p>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-danger d-block w-100 me-3">
                        {langs[`${lang}`].buy}
                      </button>
                      <Link
                        to={`/product/${item._id}`}
                        className="btn btn-warning d-block w-100"
                      >
                        {langs[`${lang}`].view}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
