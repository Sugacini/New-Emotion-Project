import HeaderComponent from './headerComponent.jsx'
import SideBar from './sideBar.jsx'
import { useState } from 'react';


function HeaderAndSideBar() {
const [showStatus,setShow]=useState(false);

    return(
        <>
            <HeaderComponent showStatus={showStatus} setShow={setShow}></HeaderComponent>
            <SideBar showStatus={showStatus}></SideBar>
        </>
    )
    
}

export default HeaderAndSideBar;