import { useState } from 'react'

const Uses = () => {
    const [ name , setName ] = useState('Polu')
    const handclick = () =>{
      const a = ['Harsh', 'Mayank', "Golu", "Manshi","Krishna"];
      const randomIndex = Math.floor(Math.random() * a.length);
      console.log(randomIndex);
      const randomValue = a[randomIndex];
      console.log(randomValue);
       setName(randomValue);
    }

  return (
    <div className='aa'>
         <div>Hello {name}</div>
     <button onClick={handclick}>Click Me</button>
    </div>
  )
}

export default Uses;
