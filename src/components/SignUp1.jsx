import {createContext} from "react";

const Context = createContext();

export default Context;


// import "./Login.css";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useClick } from "./Login1";

// function Login(){

//     const [trigger, setTrigger] = useClick();
//     const[login, setLogin] = useState(true);

//     function signIn(){
//         setLogin(!login);
//     }
//     useEffect(() => {
//         if(login){
//             return(
//                 <div className="login">
//                     <p className="signInHead">Sign In</p>
//                     <input type="email" placeholder="Enter your Email" className="email"></input>
//                     <input type="password" placeholder="Enter you password" className="password"></input>
//                     <button onClick={signIn} className="signInBtn" value="signin">SIGN IN</button>
//                     {setTrigger(false)};
//                 </div>
                
//             )
//         }
//         else{
//             return(
//                 <div className="signin">
//                     <p className="heading">Hello, Friend!</p>
//                     <p className="desc">Register with your personal details to use all of features</p>
//                     <button onClick={signIn} className="signUpBtn">SIGN IN</button>
//                 </div>
//             )
//         }
//     }, [trigger])
    
//     return(
//         <div className="login">
//                     <p className="signInHead">Sign In</p>
//                     <input type="email" placeholder="Enter your Email" className="email"></input>
//                     <input type="password" placeholder="Enter you password" className="password"></input>
//                     <button onClick={signIn} className="signInBtn" value="signin">SIGN IN</button>
//                     {setTrigger(false)};
//                 </div>
//     )
    
// }

// export default Login;














// import { useEffect } from "react";
// import { useClick } from "./Login1";

// function ButtonTwo() {
//   const { trigger, setTrigger } = useClick();

//   useEffect(() => {
//     if (trigger) {
//       console.log("⚡ Button Two Triggered Automatically!");
//       setTrigger(false); // Reset trigger
//     }
//   }, [trigger]);

//   return <button>Button Two</button>;
// }

// export default ButtonTwo;










// import { useClick } from "./Login1";

// function ButtonOne() {
//   const { setTrigger } = useClick();

//   const handleClick = () => {
//     console.log("✅ Button One Clicked");
//     setTrigger(true); // Trigger ButtonTwo
//   };

//   return <button onClick={handleClick}>Click Button One</button>;
// }

// export default ButtonOne;















// import "./Login.css";

// function SignUp1(){
//     return(
//         <div className="login">
//             <p className="signInHead">Sign In</p>
//             <input type="email" placeholder="Enter your Email" className="email"></input>
//             <input type="password" placeholder="Enter you password" className="password"></input>
//             <button onClick={singUp} className="signInBtn" value="signin">SIGN IN</button>
//         </div>
//     )
// }

// export default SignUp1;