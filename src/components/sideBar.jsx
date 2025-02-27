import { useNavigate } from "react-router-dom";

function SideBar() {
    const navigate = useNavigate();
    return (
        <div className="sideBar" onClick={() => {navigate("/")}}>
            {/* <p>Today's mood</p>

            <p>This week</p>

            <p>Change userId</p> */}

            <p className="logoutBtn">Log out</p>
        </div>
    )
    
}

export default SideBar;
