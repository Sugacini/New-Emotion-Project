// import './headerComponent.css'
function HeaderComponent({showStatus,setShow}){


    return (
        <>
            <div className='header'>
                <div className='company'>
                    <img src="advs" alt="../vite.svg" className='logo' />
                    <h2 className='corpName'>EXPRESTO</h2>
                </div>
                
                
                <div className='options'>

                    <div className='searchBox'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder='Search' className='searchInput'/>
                        
                    </div>
                    {/* <div className='nightMode'>
                        <i className="fa-regular fa-moon"></i>
                    </div> */}
                    {/* <div className='getStarted'>
                        Get Started
                    </div> */}

                    <img src='null' alt="" className='profile logo' onClick={()=>{
                        console.log(showStatus);
                        
                        setShow(!showStatus);
                        
                        }}/>
                </div>
                

            </div>
        </>
        
    )
}

export default HeaderComponent;