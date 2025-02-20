function expandParentsWidth() {

    var element = document.querySelector('.mainOfMusic');
    element.style.width = '1310px';
    // document.querySelector('.albumName').style.fontSize='40px';
}

function AlbumBox({name, idx, imgUrl, setState, setAlbum, description}) {
    
    return (
        <div className="albumBox" onClick={()=>{
            expandParentsWidth();
            console.log(idx);
            
            setAlbum(idx);
            setState(true);    
            }}>
            <img src={imgUrl} alt="" className="albumPic"/>
            <p className="nameAndYear">{name}</p>
            <p>{(description.length > 30) ? description.slice(0, 30) + "..." : description}</p>
            
        </div>
    )
}

export default AlbumBox;

