import './sideBar.css'

function SideBar({showStatus}) {
    if (showStatus) {
        return(
            <div className="sideBar">
                <p>Past Memories</p>
                <p>Today's Mood</p>
                <p>Change Name</p>
                <p>Change Picture</p>
                <p>Configurations</p>
                <p>Log out</p>
            </div>
            
        )
    }

}

export default SideBar;