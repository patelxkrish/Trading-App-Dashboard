import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const token = localStorage.getItem("accessToken");

  const [allOrders, SetAllOrders] = useState([]);
  useEffect(() => {
    axios
      .get("https://trading-app-backend-pf6b.onrender.com/allOrders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        SetAllOrders(res.data);
      });
  });
  return (
    <>
      <h3 className="title">Orders ({allOrders.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>name</th>
            <th>price</th>
            <th>qty</th>
            <th>mode</th>
          </tr>
          {allOrders.map((stock, index) => {
            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.price}</td>
                <td>{stock.qty}</td>
                <td>{stock.mode}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default Orders;
