import React, { useState, useEffect } from "react";
import "./Option.css";
import axios from "axios";
import useOnlineStatus from "./Hooks/useOnline";

const OptionChain = () => {
  const [optionData, setOptionData] = useState(null);
  const [symbol, setSymbol] = useState("NIFTY");
  const [loading, setLoading] = useState(false);

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
      // const response = await axios.get('http://localhost:5000/');
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

  if(!Status){
    return <h1 className="offline">offline</h1>
  }

  if (!optionData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="option">Option chain</h1>
      {Status && <h1>Online</h1>}
      <div className="option-chain">
        {optionData?.records?.expiryDates?.map((data) => (
          <div className="option-chain-container" key={data}>
            {data}
          </div>
        ))}
      </div>
      <div className="option-cards-container">
        {optionData?.records?.data?.map((strike, index) => (
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
