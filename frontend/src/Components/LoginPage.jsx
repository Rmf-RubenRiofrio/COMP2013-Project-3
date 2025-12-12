import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie"

export default function LoginPage() {
    //this will handle the responses gotten from the server, 
    // this dictates correct logins using different status codes
    const [postResponse, setPostResponse] = useState("");

    //this is the data inside the login form
    const [loginData, setloginData] = useState([]);

    //lets can redirect to different routes
    const navigation = useNavigate();

    //updates the data inside the login form
    const handleOnChange = (e) => {
        setloginData((prev) => {
            return {...prev, [e.target.name]: e.target.value};
        })
    }

    //calls the login function in the server, response code will dictate
    // correct or incorrect data
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            //pass the login data into the server login method
            const serverResponse = await axios.post("http://localhost:3000/login", {... loginData});

            //this sets the recived message to be data accessable later
            setPostResponse(serverResponse.data.message);

            /*
                -- status codes --
                404 -> incorrect username
                303 -> incorrect password
                201 -> correct username & password
            */

            //good login data
            if(serverResponse.status == 201){
                //set up cookies
                /*
                    when the server sends the data over, it contains the token, admin authorization and username
                    I can use this logic to set it up in a manageable way, so I know what data will occur where

                    in this case, there is 2 "seperation points", being the @ and #:
                        @ seperates the token from the user's data (admin status and name)
                        # seperates the admin status and username from eachother

                    this is used later to get data when needed
                    
                        - Sawyer
                */
                Cookie.set("JWT-TOKEN", serverResponse.data.token + "@" + serverResponse.data.status + "#" + serverResponse.data.user);
                navigation("/main")
            }

            
        } 
        catch (err) {
            console.log(err);
        }
    }

    return <>
        <form onSubmit={handleLogin}>
            <input type="text" name="username" id="username" placeholder="-- username --" onChange={handleOnChange} />
            <br />
            <input type="text" name="password" id="password" placeholder="-- password --" onChange={handleOnChange} />
            <br />
            <button>LOGIN</button>
            <p>{postResponse.message /* --status message, will change depending on user inputs-- */ }</p>
        </form>
        <form action="/create-user">
            <button>REGISTER</button>
        </form>
    </>
}