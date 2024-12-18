import React, { useState, useEffect } from "react";

function FetchData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      {data ? data.map((item) => <p key={item.id}>{item.title}</p>) : "Loading..."}
    </div>
  );
}

export default FetchData;
