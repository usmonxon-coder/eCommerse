import axios from "axios";
import "../../Styles/History.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { globalTypes } from "../../redux/actions/globalTypes";

export default function History(props) {
  const dispatch = useDispatch();
  const [tarix, setTarix] = useState([]);
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    dispatch({ type: globalTypes.LOADING, payload: true });
    axios
      .get("/user/getHistory", {
        headers: { Authorization: auth.accessToken },
      })
      .then((res) => {
        console.log(res.data);
        setTarix(res.data);
        dispatch({ type: globalTypes.LOADING, payload: false });
      })
      .catch((err) => {
        console.log(err.response);
        dispatch({ type: globalTypes.LOADING, payload: false });
      });
  }, []);

  return (
    <div className="history pt-4">
      <div className="container text-center">
        <h1>History</h1>
        <p>You have {tarix.length} history</p>
        <table className="table table-light bg-light">
          <thead>
            <tr>
              <th scope="col">Payment ID</th>
              <th scope="col">Xarid qilingan sana</th>
              <th scope="col">Ko'rish</th>
            </tr>
          </thead>
          <tbody>
            {tarix.map((item, index) => (
              <tr key={index}>
                <td scope="row">{item._id}</td>
                <td>{item.createdAt} </td>
                <td>
                  <Link to={`/order/${item._id}`}>Ko'rsatish</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
