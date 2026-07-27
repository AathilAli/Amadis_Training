function Football() {
    const shoot = (a: string) => {
        alert(a);
    }
    return (
        <button onClick={() =>
            shoot("Goal")}>
            Take a shoot</button>
    );
}

export function Greet() {
    //     const greet=(name:string)=>{
    //    alert(name);
    //     }

    //     return ( <button onClick={() => greet("Aathil")}>
    //             Click
    //         </button>);
    const LogData = (a: any, b: any) => {
        console.log("data");
        console.log(a);
        console.log(b);


    }
    return (
        <button onClick={ ()=>LogData("A", "b")} >click me</button>
    )

}
export default Football;



