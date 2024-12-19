import React, { useState, useEffect } from "react";
import "./Option.css";
import axios from "axios";

const OptionChain = () => {
  const [optionData, setOptionData] = useState(null);
  const [symbol, setSymbol] = useState("NIFTY");
  const [loading, setLoading] = useState(false);

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

  if (!optionData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="option">Option chain</h1>
      <div className="option-chain">
        {optionData?.records?.expiryDates?.map((data) => (
          <div className="option-chain-container" key={data}>
            {data}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionChain;