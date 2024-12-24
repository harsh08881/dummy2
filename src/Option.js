import React, { useState, useEffect } from "react";
import "./Option.css";
import axios from "axios";
import useOnlineStatus from "./Hooks/useOnline";

const OptionChain = () => {
  const [optionData, setOptionData] = useState(null);
  const [symbol, setSymbol] = useState("NIFTY");
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    strikePrice: "",
    openInterest: "",
  });

  const Status = useOnlineStatus();

  useEffect(() => {
    fetchOptionData(symbol);
  }, [symbol]);

  const fetchOptionData = async (symbol) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/option-chain?symbol=${symbol}`
      );
      console.log(response.data);
      setOptionData(response.data);
    } catch (error) {
      console.error("Error fetching option chain data:", error);
    }
    setLoading(false);
  };

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = (data) => {
    return data.filter((strike) => {
      const strikePriceMatch = filters.strikePrice
        ? strike?.PE?.strikePrice?.toString().includes(filters.strikePrice)
        : true;
      const openInterestMatch = filters.openInterest
        ? strike?.PE?.openInterest >= parseInt(filters.openInterest, 10)
        : true;
      return strikePriceMatch && openInterestMatch;
    });
  };

  if (!Status) {
    return <h1 className="offline">Offline</h1>;
  }

  if (!optionData) {
    return <div>Loading...</div>;
  }

  const filteredData = applyFilters(optionData?.records?.data || []);
  console.log(filteredData)

  return (
    <div>
      <h1 className="option">Option Chain</h1>
      {Status && <h1>Online</h1>}

      <div className="filters">
        <label>
          Strike Price:
          <input
            type="text"
            name="strikePrice"
            value={filters.strikePrice}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Min Open Interest:
          <input
            type="number"
            name="openInterest"
            value={filters.openInterest}
            onChange={handleFilterChange}
          />
        </label>
      </div>

      <div className="option-chain">
        {optionData?.records?.expiryDates?.map((date) => (
          <div className="option-chain-container" key={date}>
            {date}
          </div>
        ))}
      </div>

      <div className="option-cards-container">
        {filteredData.map((strike, index) => (
          <div key={index} className="option-card">
            <div className="card-header">
              <h2 className="strike-price">
                Strike Price: {strike?.PE?.strikePrice}
              </h2>
              <span className="expiry-date">Expiry: {strike.expiryDate}</span>
            </div>
            <div className="card-content">
              <p>
                <strong>OI:</strong> {strike?.PE?.openInterest}
              </p>
              <p>
                <strong>Change in OI:</strong>{" "}
                {strike?.PE?.changeinOpenInterest}
              </p>
              <p>
                <strong>Volume:</strong> {strike?.PE?.totalTradedVolume}
              </p>
              <p>
                <strong>IV:</strong> {strike?.PE?.impliedVolatility}%
              </p>
              <p>
                <strong>Last Price:</strong> ₹{strike?.PE?.lastPrice}
              </p>
              <p>
                <strong>Price Change:</strong> ₹{strike?.PE?.change} (
                {strike.pChange}%)
              </p>
              <div className="bid-ask">
                <p>
                  <strong>Bid:</strong> ₹{strike?.PE?.bidprice} (
                  {strike?.PE?.bidQty})
                </p>
                <p>
                  <strong>Ask:</strong> ₹{strike?.PE?.askPrice} (
                  {strike?.PE?.askQty})
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionChain;
