
function Student(props: any) {
    return (
        <h1>Hello ,{props.name}</h1>
    );
}
function Details(props: any) {
    return (
        <div style={{
            background: "red"
        }}>
            <h2 style={{color:"white"}}>{props.name}</h2>
            <p>Age:{props.age}</p>
            <p>City:{props.city}</p>
        </div>
    );      
}
function Props() {
    return (
        <div>
            <Student name="aathil" />
            <Student name="ali" />
            <Student name="farhan" />

            <Details name="aathil" age="21" city="newyork" />
            <Details name="ali" age="25" city="chennai" />
            <Details name="farhan" age="29" city="tirunelveli" />

        </div>
    );
}
export default Props;