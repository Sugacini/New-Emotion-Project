import "./Login.css";
import { useEffect, useState } from "react";
import Config from "./Config";
import { useRef } from "react";
import database from "../database";
import { useNavigate } from "react-router-dom";

function SignUp({change, setChange}){
    // console.log(change);

    const navigate = useNavigate();

    const idValue = useRef();
    const passValue = useRef();
    const account = useRef();

    const [uName, setName] = useState("");
    const [uPass, setPassword] = useState("");
    const [uEmail, setEmail] = useState("");

    const nameOfUser = useRef();
    const emailOfUser = useRef();
    const passwordOfUser = useRef();
    
    const[signup, setSignUp] = useState(true);
    function signUp(){
        setSignUp(!signup);
        setChange(!change);
    }

    document.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            signUp1();
        }
    });
    

    async function signUp1(e){
        e.preventDefault();
        // alert("sign up");
        let name = nameOfUser.current.value;
        let email = emailOfUser.current.value;
        let pass = passwordOfUser.current.value;
        if((name && email && pass) || (name && email) || (email && pass) || (name && pass)){
            console.log(uName,uEmail,uPass);
            console.log('ok');
            let response=await fetch("http://localhost:3000/addUser");
            console.log(response);
            let res = response.json();
            let res2 = await res.then();
            let isEmail =true;
            console.log(res2.length, res2[0].userUniqueId);
            for(let i=0; i<res2.length; i++){
                if(res2[i].userUniqueId == email){
                    isEmail=false;
                    idValue.current.textContent = "This UserId is already exists";
                    idValue.current.style.opacity = '1';
                    emailOfUser.current.style.border = " 2px solid red";
                    // setTimeout(() => {
                    //     emailOfUser.current.style.border = "none";
                    // },2500)
                }
            }
            if(isEmail){
                if((uPass.length >= 8) && (uEmail.length >= 6)){
                    database(uName, uPass, uEmail);
                    navigate("/home");
                }
                if(uPass.length < 8){
                    passwordOfUser.current.style.border = "2px solid red";
                    passValue.current.textContent = "Password must be 8 characters";
                    passValue.current.style.opacity = '1';

                    // setTimeout(() => {
                    //     passwordOfUser.current.style.border = "none";
                    // }, 2500)
                }
                if(uEmail.length < 6){
                    emailOfUser.current.style.border = "2px solid red";
                    idValue.current.textContent = "UserId must be 6 characters";
                    idValue.current.style.opacity = '1';

                    // setTimeout(() => {
                    //     emailOfUser.current.style.border = "none";
                    // }, 2500)
                }
                
            }
            console.log(res);
            console.log(res2);
            console.log(uName);
            console.log(uPass);
            console.log(uEmail); 
        }
        else{
            setSignUp(!signup);
            setChange(!change);
        }
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
                <input type="text" placeholder="Enter your name" className="name" ref={nameOfUser} required onChange={(e) => {setName(e.target.value)}}></input>
                <p ref={idValue} className="opac">.</p>
                <input type="email" placeholder="Enter your userId" className="email" ref={emailOfUser} required onChange={(e) => {setEmail(e.target.value)}}></input>
                <p ref={passValue} className="opac">.</p>
                <input type="password" placeholder="Enter you password" className="password" ref={passwordOfUser} required onChange={(e) => {setPassword(e.target.value)}}></input>
                <p className="opac" ref={account}></p>
                <button onClick={signUp1} className="signInBtn" value="signin">SIGN UP</button>
            </div>
            </>
        )
    }

    
}

export default SignUp;









        // setName(nameOfUser.current.value);
        // setPassword(passwordOfUser.current.value);
        // setEmail(emailOfUser.current.value);

        // useEffect(() => {
        //     setName(name);
        //     setEmail(email);
        //     setPassword(pass); 
        // console.log(uName,uEmail,uPass);
        // }, [name])




// try{
    //     console.log("Enter the try");
    //     let response1 = await fetch("http://localhost:3000/user",{
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body:JSON.stringify({
    //         userName: uName,
    //         password : uPass,
    //         email: uEmail,
    //     }),
    //     })
    //     console.log(response1);
    // }
    // catch(err){
    //     console.log("Error", err);
    // }








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