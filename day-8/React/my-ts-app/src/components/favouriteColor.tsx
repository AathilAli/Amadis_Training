import { useState } from "react";
function FavouriteColor() {
    // let color = 'blue';
    const [color, setColor] = useState('Blue')
    return (
        <><h1>my favourite color is {color}</h1><button onClick={() => {
            setColor('red')
        }}>Change Color</button></>

    )
}
export function IncOrDec() {
    const [count,set] = useState(0);
    let color="black";
    return (
        <div>
            <button onClick={() => set(count + 1)}>Increase</button>
            <button onClick={() => set(count > 0 ? count - 1 : 0)}>Decrease</button>

        </div>
    );
}

function App() {
    const [color, setColor] = useState("red");

    return (
        <div>
            <h1 style={{ color: color }}>Hello React</h1>

            <button onClick={() => setColor("blue")}>
                Change Color
            </button>
        </div>
    );
}

export default FavouriteColor;