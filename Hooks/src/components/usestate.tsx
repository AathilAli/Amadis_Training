import { useState } from "react";
const usestate = () => {
  const [inputValue, setInitialValue] = useState("");
  const [count, setCount] = useState(0);
  const [car, setCar] = useState({
    brand: "benze",
    model: "mercedes",
    year: 2023,
    color: "red",
  });

  const changeColor = () => {
    setCar((prev) => {
      return { ...prev, color: "blue" };
    });
  };
  const increaseCount = () => {
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);

    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };
  return (
    <div>
      <p>you clicked {count} time</p>
      <button onClick={increaseCount}>increment</button>
      <br />
      <br />
      <input
        type="text"
        placeholder="typesomething"
        value={inputValue}
        onChange={(e) => setInitialValue(e.target.value)}
      />
      <p>
        you typed : <strong>{inputValue}</strong>
      </p>

      <h1>
        My {car.brand} is the {car.year} {car.model} model and color is{" "}
        {car.color}
      </h1>
      <button onClick={changeColor}>Click to change color</button>
    </div>
  );
};

export default usestate;
