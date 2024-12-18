import React, { useState, useEffect } from "react";

function FetchData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWithRetry = async (url, retries = 1, delay = 1000) => {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        return result; // Return the result if successful
      } catch (err) {
        if (attempt < retries) {
          console.warn(`Retrying fetch... Attempt ${attempt + 1}`);
          await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
        } else {
          throw err; // Throw the error if all retries fail
        }
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchWithRetry("https://jsonplaceholder.typicode.com/posts");
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading symbol
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div>
      {data && data.map((item) => <p key={item.id}>{item.title}</p>)}
    </div>
  );
}

export default FetchData;
