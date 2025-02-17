import "./Login.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login({change, setChange}){

    const navigate = useNavigate();

    const userName = useRef();
    const userPassword = useRef();

    const[login, setLogin] = useState(true);

    function signIn1(){
        console.log("clicked");
        setLogin(!login);
        setChange(!change);
    }

    async function signIn(){
        let uniqueId = userName.current.value;
        let password = userPassword.current.value;
        if(uniqueId && password){
            let response=await fetch("http://localhost:3000/addUser");
            console.log(response);
            let res = response.json();
            let res2 = await res.then();
            let isEmail = false;
            for(let i=0; i<res2.length; i++){
                if(uniqueId == res2[0].userUniqueId){
                    isEmail=true;
                    console.log("The details is already exists");
                    navigate("/home");
                }
            }
            if(!isEmail){
                userName.current.style.border = "2px solid red";
                userPassword.current.style.border="2px solid red";

                setTimeout(() => {
                    userName.current.style.border = "none";
                    userPassword.current.style.border="none";
                },2000)
            }
            
        }
        else{
            setLogin(!login);
            setChange(!change);
        }
        console.log("clicked");
        
    }

    if(change){
        return(
            <div className="login">
                <p className="signInHead">Sign In</p>
                <input type="email" placeholder="Enter your UserId" className="email" required ref={userName}></input>
                <input type="password" placeholder="Enter you password" className="password" required ref={userPassword}></input>
                <button onClick={signIn} className="signInBtn" value="signin">SIGN IN</button>
            </div>
        )
    }
    else{
        return(
            <div className="signin">
                <p className="heading">Already Have An Account!</p>
                <p className="desc">Register with your personal details to use all of features</p>
                <button onClick={signIn1} className="signUpBtn">SIGN IN</button>
            </div>
        )
    }
    
}

export default Login;






















// import "./Login.css";
// import { useState } from "react";

// function Login({change, setChange}){

//     const[login, setLogin] = useState(true);

//     function signIn(){
//         console.log("clicked");
//         setLogin(!login);
//         setChange(!change);
//     }

//     if(change){
//         return(
//             <div className="login">
//                 <p className="signInHead">Sign In</p>
//                 <input type="email" placeholder="Enter your Email" className="email"></input>
//                 <input type="password" placeholder="Enter you password" className="password"></input>
//                 <button onClick={signIn} className="signInBtn" value="signin">SIGN IN</button>
//             </div>
//         )
//     }
//     else{
//         return(
//             <div className="signin">
//                 <p className="heading">Already Have An Account!</p>
//                 <p className="desc">Register with your personal details to use all of features</p>
//                 <button onClick={signIn} className="signUpBtn">SIGN IN</button>
//             </div>
//         )
//     }
    
// }

// export default Login;