import { useState } from "react";
import { useEffect } from "react";
const Useeffect = () => {
  const [count, setCount] = useState(0);
  // const [name, setName] = useState("hhi");

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 100);
  }, []);

  return (
    <div>
      <h2>i have rendered {count} times</h2>
    </div>
  );
};

export default Useeffect;
