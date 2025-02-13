import "./Login.css";
import { useState } from "react";

function Login({change, setChange}){

    const[login, setLogin] = useState(true);

    function signIn(){
        console.log("clicked");
        setLogin(!login);
        setChange(!change);
    }

    if(change){
        return(
            <div className="login">
                <p className="signInHead">Sign In</p>
                <input type="email" placeholder="Enter your Email" className="email"></input>
                <input type="password" placeholder="Enter you password" className="password"></input>
                <button onClick={signIn} className="signInBtn" value="signin">SIGN IN</button>
            </div>
        )
    }
    else{
        return(
            <div className="signin">
                <p className="heading">Already Have An Account!</p>
                <p className="desc">Register with your personal details to use all of features</p>
                <button onClick={signIn} className="signUpBtn">SIGN IN</button>
            </div>
        )
    }
    
}

export default Login;