import React from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./App";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

// Get token from URL
const params = new URLSearchParams(window.location.search);
const urlToken = params.get("token");

// Save token only if it exists in URL
if (urlToken) {
  localStorage.setItem("accessToken", urlToken);

  // Remove token from URL after saving
  window.history.replaceState({}, "", window.location.pathname);
}

// Get token from localStorage
const token = localStorage.getItem("accessToken");

// Redirect if token not found
if (!token) {
  window.location.href = "http://localhost:3001/login";
}

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>

      <div className="content">
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
