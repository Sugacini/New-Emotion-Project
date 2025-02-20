function MusicMainViewTopSec({selectedAlbum}) {
    
    var description=selectedAlbum.data.description;
    
    // var artists=selectedAlbum.artists.all.reduce((acc,val)=>acc+val.name+", ","");
    // artists=(artists.length>40)?artists.slice(0,40)+"...":artists;
    return (
        <div className="musicTopSec">
            <img src={selectedAlbum.data.image[2].url} alt="" className='emojiImage' style={{borderRadius: "10px"}}/>
            <div className='musicHeadersTxt'>
                <p>Playlist</p>
                <h1 className='albumName'>{selectedAlbum.data.name}</h1>
                {/* {addElement?<h1 className='albumName'>{selectedAlbum.name}</h1>:<h1 className='smlerAlbumName'>{selectedAlbum.name}</h1>}  */}
                <p>{(description.length > 60) ? description.slice(0, 60) + "..." : description}</p>
            </div>
        </div>
    )
}

export default MusicMainViewTopSec;