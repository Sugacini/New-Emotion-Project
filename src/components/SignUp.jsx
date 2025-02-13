import "./Login.css";
import { useState } from "react";
import Config from "./Config";
import { useRef } from "react";

function SignUp({change, setChange}){
    console.log(change);

    const nameOfUser = useRef();
    const emailOfUser = useRef();
    const passwordOfUser = useRef();
    
    const[signup, setSignUp] = useState(true);

    function signUp(){
        setSignUp(!signup);
        setChange(!change);
    }

    async function signUp1(e){
        e.preventDefault();
        alert("sign up");
        let name = nameOfUser.current.value;
        let email = emailOfUser.current.value;
        let pass = passwordOfUser.current.value;
        console.log(name,email,pass);
        console.log('ok');
        let postBody ={name,email,pass}
        let response=await fetch("http://localhost:3000/addUser", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:postBody
        })
        console.log(response);
        setSignUp(!signup);
        setChange(!change);
    }

    function checkInfo(name){
        console.log(name);
    }

    if(change){
        return(
            <div className="signUp">
                <p className="heading">Create Account!</p>
                <p className="desc">Register with your personal details to use all of features</p>
                <button onClick={signUp} className="signUpBtn">SIGN UP</button>
            </div>
        )
    }
    else{
        return(
            <>
            <div className="login">
                <p className="signUpHead">Sign Up</p>
                <input type="text" placeholder="Enter your name" className="name" ref={nameOfUser} required></input>
                <input type="email" placeholder="Enter your Email" className="email" ref={emailOfUser} required></input>
                <input type="password" placeholder="Enter you password" className="password" ref={passwordOfUser} required></input>
                <button onClick={signUp1} className="signInBtn" value="signin">SIGN UP</button>
            </div>
            {checkInfo("Sugacini")}
            </>
        )
    }

    
}

export default SignUp;





















// import "./Login.css";
// import { useState } from "react";
// import Config from "./Config";

// function SignUp({change, setChange}){
//     console.log(change);
    
//     const[signup, setSignUp] = useState(true);

//     function signUp(){
//         setSignUp(!signup);
//         setChange(!change);
//     }

//     function checkInfo(name){
//         console.log(name);
//     }

//     if(change){
//         return(
//             <div className="signUp">
//                 <p className="heading">Hello, Friend!</p>
//                 <p className="desc">Register with your personal details to use all of features</p>
//                 <button onClick={signUp} className="signUpBtn">SIGN UP</button>
//             </div>
//         )
//     }
//     else{
//         return(
//             <>
//             <div className="login">
//                 <p className="signUpHead">Sign Up</p>
//                 <input type="text" placeholder="Enter your name" className="name" required></input>
//                 <input type="email" placeholder="Enter your Email" className="email" required></input>
//                 <input type="password" placeholder="Enter you password" className="password" required></input>
//                 <button onClick={signUp} className="signInBtn" value="signin">SIGN UP</button>
//             </div>
//             {checkInfo("Sugacini")}
//             </>
//         )
//     }

    
// }

// export default SignUp;