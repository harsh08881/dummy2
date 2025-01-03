import React from 'react'
import { useState } from 'react';

const Toogle = () => {
   const [isPopupOpen, setIsPopupOpen] = useState(false);
   
     // Function to toggle popup visibility
     const togglePopup = () => {
       setIsPopupOpen(!isPopupOpen);    
     }
  return (
    <div className="App">
    <button onClick={togglePopup} className="login-button">
      Login
    </button>

    {isPopupOpen && (
      <div className="popup-overlay">
        <div className="popup-box">
          <button onClick={togglePopup} className="close-button">
            &times;
          </button>
          <h2>Login</h2>
          <form>
            <label>
              Email:
              <input type="email" placeholder="Enter your email" />
            </label>
            <br />
            <label>
              Password:
              <input type="password" placeholder="Enter your password" />
            </label>
            <br />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    )}
  </div>
  )
}

export default Toogle;
