import HeaderAndSideBar from './headerWithSideBar.jsx'
import FirstPageBody from './bodyOfFirstPage.jsx';
import Header from './Header.jsx';
import { useState, useRef } from 'react';

function HomePage() {
    const [userId,setUserId] =useState(null);
    const loginBtn= useRef();
    
    return (
        <div className='home'>
            <Header setUserId={setUserId} userUniqueId={userId} loginBtn={loginBtn}/>
            <FirstPageBody userUniqueId={userId}></FirstPageBody>
        </div>
    )

    
}

export default HomePage;