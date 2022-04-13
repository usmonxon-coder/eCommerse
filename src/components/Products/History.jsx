import axios from "axios";
import "../../Styles/History.css"
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function History(props) {
  const [tarix, setTarix] = useState([]);

  const getTarix = () => {
    axios
      .get("/api/payment")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  useEffect(() => {
    getTarix();
  }, []);

  return (
    <div className="history pt-4">
      <div className="container text-center">
        <table className="table table-dark bg-dark">
          <thead>
            <tr>
              <th scope="col">Payment ID</th>
              <th scope="col">Xarid qilingan sana</th>
              <th scope="col">Ko'rish</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">624fe4c674ddc0f3541a68ff</th>
              <td>08.04.2022</td>
              <td>
                <Link to="/order">Ko'rsatish</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
