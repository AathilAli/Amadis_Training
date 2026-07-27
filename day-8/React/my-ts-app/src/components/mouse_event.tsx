import "../App.css";

function MouseEvent() {
    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "95vh",
                gap: "20px"

            }}>
                <button className="btn" onClick={() => console.log("single click")}>Single Click</button>
                <button className="btn" onDoubleClick={() => console.log("double click")}>Double Click</button>
                <div
                    onMouseEnter={() => console.log("Mouse Entered")}
                    style={{ width: "200px", height: "100px", background: "lightblue" }}
                >
                    Hover Me
                </div>
                <div
                    onMouseLeave={() => console.log("Mouse Left")}
                    style={{ width: "200px", height: "100px", background: "pink" }}
                >
                    Move Away
                </div>
                <input onKeyDown={(e) => console.log(e)} />
            </div>
        </>
    );
}
export default MouseEvent; 