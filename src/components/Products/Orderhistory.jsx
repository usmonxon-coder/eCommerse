import React from "react";

export default function Orderhistory(props) {
  return (
    <div className="orderhistory history pt-4">
      <div className="container">
        <table className="table border">
          <thead>
            <tr>
              <th scope="col">Img</th>
              <th scope="col">Name</th>
              <th scope="col">	Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody className="border">
            <tr>
              <th scope="row"><img src="" alt="rasm" /></th>
              <td>	iPhone 10</td>
              <td>	1</td>
              <td>1100</td>
            </tr>
            <tr>
              <th scope="row"><img src="" alt="rasm" /></th>
              <td>	iPhone 10</td>
              <td>	1</td>
              <td>1100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
