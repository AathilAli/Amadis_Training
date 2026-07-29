import { useEffect, useState } from "react";
import { useRef } from "react";

const UseRef = () => {
    const inputElem = useRef(null);
    const btnClicked =()=>{
        console.log(inputElem.current);
    }
    
  const [value, setValue] = useState(0);
  const count =useRef(0);
  console.log(count);
  useEffect(()=>{
count.current+=1
});
  
  return (
    <>
      <button
        onClick={() => {
          setValue((prev) => prev - 1);
        }}
      >
        -1
      </button>
      <h1>{value}</h1>
          <button
        onClick={() => {
          setValue((prev) => prev + 1);
        }}
      >
        +1
      </button>
      <h1>render count :{count.current}</h1>
      <input type="text" ref={inputElem} />
      <button onClick={btnClicked}>click here</button>
    </>
  );
};
export default UseRef;
