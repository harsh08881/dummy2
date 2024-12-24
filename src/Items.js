import React, { use, useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "./Hooks/useOnline";
import UserContext from "./Hooks/useContext";

const Items = () => {
  const [items, setItems] = useState([]); // Initialize an empty array

  const user = useContext(UserContext);
  console.log(user);
  const Status = useOnlineStatus();

  const addItem = () => {
    const newItem = `Item ${items.length + 1}`; // Create a new item
    setItems([...items, newItem]); // Update the state by adding the new item
  };
  const deleteItem = (index) => {
    console.log("jndkfb");
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };
  
  if(!Status){
    return <div className="offline"><span>Offline</span></div>
  }
  return (
   <>
    {Status && <h1>Online</h1>}
    <div>
      {
        <h1> {user.name } </h1> 
      }
    </div>
    <div className="das">
      <div>
        <Link to="/fetchdata">Hello</Link>
      </div>
      <h1>Dynamic List</h1>
      <button onClick={addItem}>Add Item</button>
      <ul className="item-li">
        {items.map((item, index) => (
          <li key={index}>
            {item} <button onClick={() => deleteItem(index)}>Delete</button>
          </li> // Render each item in the list
        ))}
      </ul>
    </div>
    </>
  );
};

export default Items;
