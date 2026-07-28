import { useState } from "react";
import Button from "./Button";
import Display from "./Display";
import '../App.css'
function Calculator() {
  const [display, setDisplay] = useState("");

  function handleClick(value: string) {
    if (value === "C") {
      setDisplay("");
      return;
    }

    if (value === "=") {
      try {
        const result = eval(display);
        setDisplay(result.toString());
      } catch {
        setDisplay("Error");
      }
      return;
    }

    let symbol = value;

    if (value === "×") symbol = "*";
    if (value === "÷") symbol = "/";

    setDisplay(display + symbol);
  }

  return (
    <div className="calculator">
      <h1>Calculator</h1>

      <Display value={display || "0"} />

      <div className="button-grid">
        <Button value="7" onClick={() => handleClick("7")} />
        <Button value="8" onClick={() => handleClick("8")} />
        <Button value="9" onClick={() => handleClick("9")} />
        <Button value="÷" onClick={() => handleClick("÷")} />

        <Button value="4" onClick={() => handleClick("4")} />
        <Button value="5" onClick={() => handleClick("5")} />
        <Button value="6" onClick={() => handleClick("6")} />
        <Button value="×" onClick={() => handleClick("×")} />

        <Button value="1" onClick={() => handleClick("1")} />
        <Button value="2" onClick={() => handleClick("2")} />
        <Button value="3" onClick={() => handleClick("3")} />
        <Button value="-" onClick={() => handleClick("-")} />

        <Button value="0" onClick={() => handleClick("0")} />
        <Button value="." onClick={() => handleClick(".")} />
        <Button value="=" onClick={() => handleClick("=")} />
        <Button value="+" onClick={() => handleClick("+")} />

        <Button value="C" onClick={() => handleClick("C")} />
      </div>

      {display === "Error" && (
        <p style={{ color: "red" }}>
          Invalid Expression
        </p>
      )}
    </div>
  );
}

export default Calculator;