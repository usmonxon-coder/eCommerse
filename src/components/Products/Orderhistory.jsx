import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { globalTypes } from "../../redux/actions/globalTypes";

export default function Orderhistory(props) {
  const { id } = useParams();
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [history, setHistory] = useState([]);

  const historyAll = () => {
    dispatch({ type: globalTypes.LOADING, payload: true });
    axios
      .get("/user/getHistory", {
        headers: { Authorization: auth.accessToken },
      })
      .then((res) => {
        const myHistory = res.data.find((item, index) => item._id === id);
        const myCart = myHistory.cart;
        setHistory(myCart);
        // dispatch({ type: globalTypes.PRODUCTS, payload: res.data.products });
        dispatch({ type: globalTypes.LOADING, payload: false });
        console.log(myCart);
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({ type: globalTypes.LOADING, payload: false });
      });
  };

  useEffect(() => {
    historyAll();
  }, []);
  return (
    <div className="orderhistory history pt-4">
      <div className="container">
        <h2 className="text-center mb-3">History order</h2>
        <table className="table border">
          <thead>
            <tr className="border">
              <th scope="col">Img</th>
              <th scope="col">Name</th>
              <th scope="col"> Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody className="border">
            {history.length &&
              history.map((item, index) => (
                <tr key={index}>
                  <td className="images" scope="row">
                    <img src={item.images.url} alt="rasm" />
                  </td>
                  <td> {item.titleUz}</td>
                  <td>{item.quantity} </td>
                  <td>{item.price}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
