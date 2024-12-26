import React, { useEffect, useState } from "react";
import axios from "axios";

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const url = "http://localhost:3000/restaurants" ;

        const headers = {
          "__fetch_req__": "true",
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9,hi;q=0.8",
          "content-type": "application/json",
          "cookie": "__SW=XZBurDF-XTCG7fYMh4JMp6C-LsNm3KTX; _guest_tid=08cff768-8073-4e3c-b7f8-46d98db04689; _device_id=1bafa6fb-37cc-420a-6ca1-d5fb663e91f3; ...", // Replace with updated cookies if necessary
          "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36"
        };

        const response = await axios.get(url);
        console.log(response.data?.data)
        setRestaurants(response.data?.data?.cards || []); // Adjust the path as per API response
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err.message);
        setError("Failed to fetch restaurants data.");
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Restaurants</h1>
      <ul>
  {restaurants.map((card, index) => (
    <li key={index}>
      {card.card?.card?.header?.title || card.card?.card?.title || "No Title"}
    </li>
  ))}
</ul>

    </div>
  );
};

export default RestaurantsList;
