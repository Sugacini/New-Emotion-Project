function SideBarredAlbum({idx, imgUrl, name, setAlbum, selectedAlbumIdx}) {
    return(
    <div className="lengthyAlbumBox" style={(selectedAlbumIdx==idx)?{background:'#bcb9c9'}:null} onClick={()=>{
        setAlbum(idx);
    }}>
        <img src={imgUrl} alt="img" className='smlAlbumImg'/>
        <div>
            <p>{name}</p>
            {/* <p className='opacity'>{artist +" • "+year}</p> */}
            <p className='opacity'>Playlist</p>
        </div>
    </div>
    )
}

export default SideBarredAlbum;