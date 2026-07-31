import { useState } from "react";
import Button from "./Button";
import Display from "./Display";
// import {Card} from "@/components/ui/card";
function Calculator() {
  const [display, setDisplay] = useState("");
  const [expression, setExpression] = useState("");

  function handleClick(value: string) {
    if (value === "C") {
      setDisplay("");
      setExpression("");
      return;
    }

    if (value === "⌫") {
      setDisplay(display.slice(0, -1));
      return;
    }

    if (value === "=") {
      try {
        const result = eval(display);

        const history = JSON.parse(localStorage.getItem("history") || "[]");
        history.push(`${display} = ${result}`);
        localStorage.setItem("history", JSON.stringify(history));

        setExpression(`${display} =`);
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
    <div className="flex min-h-screen items-center justify-center p-4">
     
      <div className="relative w-full max-w-xs">
        {/* glow accent behind the card */}
        <div className="absolute -inset-4 rounded-[3rem] bg-emerald-500/20 blur-2xl" />

        <div className="relative rounded-[2.5rem] border border-white/10 bg-white/5 p-5 pb-7 shadow-2xl shadow-black/60 backdrop-blur-xl">
          {/* top notch bar, like a phone speaker */}
          <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-white/15" />

          <Display value={display || "0"} expression={expression} />

          <div className="grid grid-cols-4 gap-3">
            <Button value="C" onClick={() => handleClick("C")} variant="action" />
            <Button value="⌫" onClick={() => handleClick("⌫")} variant="action" />
            <Button value="%" onClick={() => handleClick("%")} variant="action" />
            <Button value="÷" onClick={() => handleClick("÷")} variant="operator" />

            <Button value="7" onClick={() => handleClick("7")} />
            <Button value="8" onClick={() => handleClick("8")} />
            <Button value="9" onClick={() => handleClick("9")} />
            <Button value="×" onClick={() => handleClick("×")} variant="operator" />

            <Button value="4" onClick={() => handleClick("4")} />
            <Button value="5" onClick={() => handleClick("5")} />
            <Button value="6" onClick={() => handleClick("6")} />
            <Button value="-" onClick={() => handleClick("-")} variant="operator" />

            <Button value="1" onClick={() => handleClick("1")} />
            <Button value="2" onClick={() => handleClick("2")} />
            <Button value="3" onClick={() => handleClick("3")} />
            <Button value="+" onClick={() => handleClick("+")} variant="operator" />

            <Button value="0" onClick={() => handleClick("0")} wide />
            <Button value="." onClick={() => handleClick(".")} />
            <Button value="=" onClick={() => handleClick("=")} variant="equals" />
          </div>

          {display === "Error" && (
            <p className="mt-4 text-center font-semibold text-red-400">
              Invalid Expression
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calculator;