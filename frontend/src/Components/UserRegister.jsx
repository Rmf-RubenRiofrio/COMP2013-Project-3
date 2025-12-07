import { useState } from "react";
import axios from "axios";

export default function UserRegister () {
    //data inside of registration form
    const [registerData, setRegisterData] = useState([]);

    //this will print out the "added user" text
    const [postResponse, setPostResponse] = useState("");

    //updates the data inside the register form
    const handleOnChange = (e) => {
        setRegisterData((prev) => {
            return {...prev, [e.target.name]: e.target.value};
        })
    }

    //register the user account
    const handleRegistration = async (e) => {
        e.preventDefault();
        try{
            //send the new user's data to the add user part of the server
            const registerResponse = await axios.post("http://localhost:3000/addUser", {...registerData});

            //have the "added user" text update
            setPostResponse(registerResponse.data.message);

            //reset all of the form data
            setRegisterData({
                username: "",
                password: "",
                email: "",
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    return <>
        <form onSubmit={handleRegistration}>
            <input type="text" name="username" id="username" placeholder="-- username --" onChange={handleOnChange} required/>
            <br />
            <input type="text" name="password" id="password" placeholder="-- password --" onChange={handleOnChange} required/>
            <br />
            <button>REGISTER</button>
            <p>{postResponse /* --status message, will change depending on user inputs-- */ }</p>
        </form>
        <form action="/">
            <button>RETURN TO LOGIN</button>
        </form>
    </>
}