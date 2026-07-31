import { useState } from "react";
function Form() {
    const [userName, setName] = useState('');
    const [userPassword, setPassword] = useState('');

    return (
        <>
        <label htmlFor="userName">Username: </label>
            <input type="text" value={userName} onChange={(e)=> setName(e.target.value)}/>
            <br />
            <label htmlFor="userPassword">Password: </label>
            <input type="text" value={userPassword} onChange={(e)=>setPassword(e.target.value)}/>
            <br />
            
        </>
    )
}
export default Form;