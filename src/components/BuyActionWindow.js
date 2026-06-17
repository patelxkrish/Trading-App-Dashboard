import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const generalContext = useContext(GeneralContext); // use context properly

  const handleBuyClick = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("Token:", token);

      const res = await axios.post(
        "https://trading-app-backend-pf6b.onrender.com/newOrder",
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "BUY",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Order response:", res.data);
      generalContext.closeBuyWindow(); // close only after success
    } catch (e) {
      console.error("Buy request failed:", e);
    }
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <button className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
