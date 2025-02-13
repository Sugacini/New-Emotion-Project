import Login from "./Login";
import SignUp from "./SignUp";
import "./Login.css";
import { useState } from "react";


function LoginPage(){

    const[change, setChange] = useState(true);

    return(
            <div className="loginPage">
                <Login change={change} setChange={setChange}/>
                <SignUp change={change} setChange={setChange}/>
            </div>
        
    )
}

export default LoginPage;