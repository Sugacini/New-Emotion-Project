import { useState } from "react";
import Login from './Login.jsx'
import SideBar from "./sideBar.jsx";

function Header() {
    const [loggedIn, setLog] = useState(false);
    const [isLogCLicked, setLogClicked] = useState(false);
    const [wayToLogin, setWay] = useState(null);
    const [userIconCliked,setUIconClick] = useState(false);
    return (
        <div className="header">
            <div className="headersLeft">
                <img src="logo4.png" alt="" className="logo" />
                <h3>UnarvAI</h3>
            </div>

            {/* <i class="fa-solid fa-circle-user icon" onClick={()=>setUIconClick(!userIconCliked)}></i> */}
            {isLogCLicked ? loggedIn ?
                <i class="fa-solid fa-circle-user icon" onClick={()=>setUIconClick(!userIconCliked)}></i> :
                <div className="forLogin">
                    <Login setLog={setLog} setWay={setWay} wayToLogin={wayToLogin} />
                </div>
                : <div className="gettingIn">
                    <div className="loginTxt" onClick={() => {
                        setLogClicked(true);
                        setWay('login');
                    }} >
                        <p>Login</p>
                    </div>
                    <div className="signUpTxt" onClick={() => {
                        setLogClicked(true);
                        setWay('signUp');
                    }} >
                        <p>Sign up</p>
                    </div>
                </div>}

            {userIconCliked? <SideBar />:null }


        </div>

    )
}

export default Header;