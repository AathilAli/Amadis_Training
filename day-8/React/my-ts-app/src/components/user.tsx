import { useState } from "react";
const User = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
        const PasswordHandler =(event:any) => {
        setPassword(event.target.value);
    }

    return (
        <div>
            <form>
                <label htmlFor="Username">Username :</label>
                <input type="text" value={username} onChange={event => setUsername(event.target.value)} /><br />
                <label htmlFor="password">Password :</label>
                <input type="text" value={password} onChange={event => PasswordHandler(event)} />
                <br />
                <input type="submit" name="" id="" onClick={(event)=> {event.preventDefault()
                    const collectedData={
                        name:username,
                        pass:password
                    }
                    console.log(collectedData);
                } }/>
            </form>
        </div>
    )
}
export default User;