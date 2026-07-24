
function Car(props) {
    const {carInfo}=props;
    const {brand,color}=carInfo;
    return (
        <h2>{brand}{color}</h2>
    );
}
export default Car; 