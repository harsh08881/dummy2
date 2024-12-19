import React from 'react'
import { useState } from 'react'

const Uses = () => {
    const [ Name , setName ] = useState('Polu')
    const handclick = () => {
      const a = ['Harsh', 'Mayank', "Golu", "Manshi","Krishna"];
      const randomIndex = Math.floor(Math.random() * a.length);
      // console.log(randomIndex);
      const randomValue = a[randomIndex];
      // console.log(randomValue);
       setName(randomValue);
    }

  return (
    <div className='aa'>
         <div>Hello {Name}</div>
         
         { Name === "Manshi" ? <p>You Win</p> : <p>You Lose</p> }
     <button onClick={handclick}>Click Me</button>
    </div>
  )
}

export default Uses;
