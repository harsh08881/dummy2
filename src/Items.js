import React from 'react'
import { useState } from 'react';

const Items = () => {
    const [items, setItems] = useState([]); // Initialize an empty array

    const addItem = () => {
      const newItem = `Item ${items.length + 1}`; // Create a new item
      setItems([...items, newItem]); // Update the state by adding the new item
    };
    const deleteItem = (index) =>{
        console.log("jndkfb")
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
    }

  return (
    <div className='das'>
    <h1>Dynamic List</h1>
    <button onClick={addItem}>Add Item</button>
    <ul className='item-li'>
      {items.map((item, index) => (
        <li key={index}>{item} <button onClick={() => deleteItem(index)}>Delete</button>
        </li> // Render each item in the list
      ))}
    </ul>
  </div>
  )
}

export default Items
