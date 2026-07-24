import Car from "./car";

function Sample() {
    return (
        <div>
            <h1>hello aathil THIS IS FIRST LINE</h1>
        </div>
    );
}
export function Garage() {
    const isDoorOpen = true;
    // const brand ="ford";
    // const color="black";
    const data = {
        brand: "toyota",
        color: "black",
    };
    const data2 = {
        brand: "tata",
        color: "red",
    };
    return (
        <>
            <h1>Who lives inside my Garage</h1>
            {data.brand !== undefined && data.color !== undefined ?

                < Car carInfo={data} /> : null

            }
            {isDoorOpen ?<h2 > Garage door is open </h2 >:<h2 > Garage door is closed </h2>}

        </>
    )
}
export default Sample;
