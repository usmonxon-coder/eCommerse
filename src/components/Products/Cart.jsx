import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { langs } from "../../langs/langs";
import { globalTypes } from "../../redux/actions/globalTypes";

export default function Cart(props) {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.globalState);
  const { lang, auth } = useSelector((state) => state);
  const [totalPrice, setTotalPrice] = useState(0);

  const minus = (id) => {
    cart.forEach((item) => {
      if (item._id == id && item.quantity > 1) {
        item.quantity -= 1;
        // let sum = item.price;
        // sum += item.price * item.quantity;
      }
    });
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].price * cart[i].quantity;
    }
    console.log(cart[0]);
    setTotalPrice(sum);
    dispatch({ type: globalTypes.ADD_TO_CART, payload: cart });
    sendCart();
  };

  const plus = (id) => {
    cart.forEach((item) => {
      if (item._id == id) {
        // let sum = item.price;
        item.quantity += 1;
        // sum += item.price * item.quantity;
      }
    });
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].price * cart[i].quantity;
    }
    setTotalPrice(sum);
    dispatch({ type: globalTypes.ADD_TO_CART, payload: cart });
    sendCart();
  };

  const sendCart = () => {
    axios
      .put(
        "/user/addCart",
        { cart },
        { headers: { Authorization: auth.accessToken } }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = (id) => {
    console.log(`ochirildi ${id}`);
    let myCart = cart.filter((item, index) => item !== item[index]);
    console.log(myCart);
  };

  return (
    <div className="cart">
      <div className="container">
        {!auth.user && (
          <div>
            <h2 className="text-center my-5">{langs[`${lang}`].noProducts}</h2>
          </div>
        )}
        {auth.user && (
          <div className="xarid d-flex align-items-center justify-content-between">
            <h3 className="my-4">
              <b>{langs[`${lang}`].total_price}: </b> {totalPrice}$
            </h3>
            <button className="btn btn-success">Paypal</button>
          </div>
        )}
        <div className="row ">
          {cart.map((item, index) => (
            <div key={index} className="col-lg-6 col-12 mb-3">
              <div className="card1 me-3 h-100">
                <div className="row  h-100 border align-items-center justify-content-between">
                  <div className=" col-md-6 box box1">
                    <img className="w-100" src={item.images.url} alt="rasm" />
                  </div>
                  <div className="col-md-6 box box2">
                    <b>{item[`title${lang}`]}</b>
                    <p className="mb-2">
                      <b>{langs[`${lang}`].price}: </b>
                      {item.price} $
                    </p>
                    <p className="mb-2">
                      <b>{langs[`${lang}`].description}: </b>
                      {item[`description${lang}`]}
                    </p>
                    <p>
                      <b>{langs[`${lang}`].content} :</b>
                      {item[`content${lang}`]}
                    </p>
                    <div className="xxx d-flex justify-content-between">
                      <div className="btn-group mb-3">
                        <button
                          onClick={() => minus(item._id)}
                          className="btn px-3 btn-info"
                        >
                          -
                        </button>
                        <button className="btn px-3 btn-light">
                          {item.quantity}
                        </button>
                        <button
                          onClick={() => plus(item._id)}
                          className="btn px-3 btn-info"
                        >
                          +
                        </button>
                      </div>
                      <div className="xx ">
                        <button
                          onClick={() => deleteProduct(item._id)}
                          className="btn d-block btn-danger"
                        >
                          X
                        </button>
                      </div>
                    </div>
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
