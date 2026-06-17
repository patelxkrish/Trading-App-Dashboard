import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const Summary = () => {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("https://trading-app-backend-pf6b.onrender.com/allHoldings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setHoldings(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Chart labels and data
  const labels = holdings.map((stock) => stock.name);
  const data = {
    labels,
    datasets: [
      {
        label: "Current Value (₹)",
        data: holdings.map((stock) => stock.price * stock.qty),
        backgroundColor: holdings.map(
          (stock) =>
            stock.price * stock.qty - stock.avg * stock.qty >= 0
              ? "rgba(40, 167, 69, 0.6)" // green for profit
              : "rgba(220, 53, 69, 0.6)", // red for loss
        ),
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="portfolio-snapshot">
      <h2>Portfolio Snapshot</h2>
      <Bar data={data} />

      <div className="summary">
        {holdings.map((stock, index) => {
          const currValue = stock.price * stock.qty;
          const pnl = currValue - stock.avg * stock.qty;
          return (
            <p key={index}>
              {stock.name}:{" "}
              <span className={pnl >= 0 ? "badge profit" : "badge loss"}>
                {pnl >= 0
                  ? `+₹${pnl.toFixed(2)}`
                  : `-₹${Math.abs(pnl).toFixed(2)}`}
              </span>
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Summary;
