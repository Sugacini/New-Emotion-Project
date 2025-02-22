import './musicPage.css'
import { useLocation } from "react-router-dom";

import HeaderAndSideBar from './headerWithSideBar';
import AlbumBox from './AlbumBox';
import SideBarredAlbum from './SideBarredAlbum';
import MusicMainViewTopSec from './MusicMainViewTopSec';
import SongBox from './SongBox';
import MainMusicRight from './MainMusicRight';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';

import { useState, useRef, useEffect } from 'react';

var prevSong = "0";
var finalEmo;
var emojiImg;



function decreseParentsWidth() {
  var element = document.querySelector('.mainOfMusic');
  element.style.width = '950px';
}

async function dataReceiver() {
  console.log(finalEmo);
  try {
    var response= await fetch('http://localhost:3000/emotions',{
      method:'POST',
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({emotion:finalEmo})})
      
    var responseData= await response.json();    
    return responseData;
  } catch (error) {
    console.log(error);
    
  }
  
}

function MusicPage() {
  const setImg = useRef();
  const location = useLocation();
  const result = location.state;
  const data1 = (JSON.stringify(result.emo));
  finalEmo = data1.slice(1,data1.length-1);
  emojiImg = finalEmo+".png";
  useEffect(()=>{
    dataReceiver().then(res=>setData(res));
  },[])
  const [data,setData]= useState(null);
  const [addElement, setState] = useState(false);
  const [selectedAlbumIdx, setAlbum] = useState(null);
  const [songSelectedIdx, setSelectSong] = useState("0");
  const [canPlay, setPlayStatus] = useState('false');
  const [playFirst,setFirstPlay]=useState(false);
  const [resume,setResume]=useState(false);


  const audTag = useRef();
  var artists;
  var songObjArr;

  function afterSelectionOfSong() {    
    if (canPlay) {
      audTag.current.src = data[selectedAlbumIdx].data.songs[songSelectedIdx].downloadUrl[0].url;
      audTag.current.play();
      prevSong = songSelectedIdx;
    }
  }

  if (!canPlay) {
    audTag.current.pause();
  }
  else if ((selectedAlbumIdx != null && songSelectedIdx != null) && playFirst) {    
    audTag.current.play();
  }

  return (
    <>
      <HeaderAndSideBar />
      <div className='wholeMusicPage'>
        {selectedAlbumIdx==null?<div id='musicsLeft'>
            <img src={emojiImg} alt="" className='emojiImage' />
          </div>
        : <div id='musicsLeft' className='leftOfMainMusic'>
            <img alt="" src={emojiImg} className='emojiImage' ref={setImg}/>
            <div>
              {data.map((album, idx) => (idx < 9) ? <SideBarredAlbum idx={idx} imgUrl={album.data.image[0].url}  name={album.data.name} setAlbum={setAlbum} selectedAlbumIdx={selectedAlbumIdx}/> : null)}
            </div>
          </div>}
        <div className='mainOfMusic'>

          {addElement ? <MusicMainViewTopSec selectedAlbum={data[selectedAlbumIdx]}/> : null}


          <div className={addElement ? 'musicBottomSec' : 'mainsBottomSec'}>


            {!addElement ? (data!=null)? data.map((album, idx) => 
              (idx < 9) ? <AlbumBox name={album.data.name} key={idx} idx={idx} imgUrl={album.data.image[0].url} setState={setState} setAlbum={setAlbum} description={album.data.description}></AlbumBox> :null):<p>Choosing the right ones for you!</p> : null }

            {addElement ? <div className='titleBox'>
              {!resume && (canPlay==true)?<PauseButton playFirst={playFirst} decreseParentsWidth={decreseParentsWidth} setFirstPlay={setFirstPlay} canPlay={canPlay} setPlayStatus={setPlayStatus} setResume={setResume} resume={resume}/>
              :<PlayButton playFirst={playFirst} decreseParentsWidth={decreseParentsWidth} setFirstPlay={setFirstPlay} canPlay={canPlay} setPlayStatus={setPlayStatus} setResume={setResume} resume={resume}/>}

              <p className='titleSpace nameTxt'>Name</p>
              <p className='productionTxtSpace'>Production</p>
              <p>Duration</p>
            </div>:null}
            {addElement ? data[selectedAlbumIdx].data.songs.map((song, idx) => {
              artists = song.artists.all.reduce((acc, val) => acc + val.name + ", ", "");
              artists = (artists.length > 40) ? artists.slice(0, 40) + "..." : artists;       
              songObjArr= data[selectedAlbumIdx].data.songs;
              console.log(songObjArr);
              
              
              

              return <SongBox idx={idx + 1} imgUrl={song.image[0].url} name={song.name} artists={artists} production={song.label} duration={song.duration} language={song.language} setSelectSong={setSelectSong} songSelectedIdx={songSelectedIdx} setPlayStatus={setPlayStatus} canPlay={canPlay} playFirst={playFirst} setFirstPlay={setFirstPlay} resume={resume} setResume={setResume} decreseParentsWidth={decreseParentsWidth}/>
            }) : null}
            {(prevSong != songSelectedIdx) ? console.log('fromCommand') : null}
            {(prevSong != songSelectedIdx) ? afterSelectionOfSong() : null}

            {addElement ?
            <audio ref={audTag} onEnded={()=>setSelectSong((songSelectedIdx!=(songObjArr.length-1))?songSelectedIdx+1:0)}>
              <source src={songObjArr[songSelectedIdx].downloadUrl[0].url} type="audio/mp4" />
            </audio>
            :null}


          </div>
        </div>
        {playFirst?<MainMusicRight canPlay={canPlay} setPlayStatus={setPlayStatus} resume={resume} setResume={setResume} songObjArr={songObjArr} totalSongsNum={songObjArr.length} songSelectedIdx={songSelectedIdx} setSelectSong={setSelectSong}></MainMusicRight>:null}
      </div>

    </>
  )
}

export default MusicPage;


















































let songsData = {
    "success": true,
    "data": {
      "id": "793219647",
      "name": "Sai Baba - Tamil",
      "description": "Listen To Sai Baba Devotional Bhajans.",
      "artists": [
        {
          "name": "Ilaiyaraaja",
        },
        {
          "name": "Ilaiyaraaja",
        },
        {
          "name": "Sriram Parthasarathy",
        },
        {
          "name": "Vaali",
        },
        {
          "name": "Janaki Iyer",
        },
        {
          "name": "Priya Hemesh",
        },
        {
          "name": "A.R. Rahman",
        },
        {
          "name": "A.R. Rahman",
        },
        {
          "name": "Bela Shende",
        },
        {
          "name": "A.R. Rahman",
        },
        {
          "name": "Mashook Rahman",
        },
        {
          "name": "Ehan Bhat",
        },
        {
          "name": "Edilsy Vargas",
        },
        {
          "name": "Tenzin Dalha",
        }
      ],
      "image": [
        {
          "url": "https://c.saavncdn.com/editorial/SaiBabaTamil_20241223101222.jpg?bch=1739556224"
        },
        {
          "url": "https://c.saavncdn.com/editorial/SaiBabaTamil_20241223101222.jpg?bch=1739556224"
        },
        {
          "url": "https://c.saavncdn.com/editorial/SaiBabaTamil_20241223101222.jpg?bch=1739556224"
        }
      ],
      "songs": [
        {
          "name": "Baba Sai Baba",
          "duration": 283,
          "label": "Sony Music Entertainment India Pvt. Ltd.",
          "language": "tamil",
          "album": {
            "name": "Baba Pugazh Maalai",
          },
          "artists": {
            "all": [
              {
                "name": "Ilaiyaraaja",
                "role": "music",
              },
              {
                "name": "Ilaiyaraaja",
                "role": "singer",
               },
              {
                "name": "Sriram Parthasarathy",
                "role": "singer",
               },
              {
                "name": "Vaali",
                "role": "lyricist",
                }
            ]
          },
          "image": [
            {
              "url": "https://c.saavncdn.com/699/Baba-Pugazh-Maalai-Tamil-2010-20190731133107-50x50.jpg"
            },
            {
              "url": "https://c.saavncdn.com/699/Baba-Pugazh-Maalai-Tamil-2010-20190731133107-150x150.jpg"
            },
            {
              "url": "https://c.saavncdn.com/699/Baba-Pugazh-Maalai-Tamil-2010-20190731133107-500x500.jpg"
            }
          ],
          "downloadUrl": [
            {
              "url": "https://aac.saavncdn.com/699/76751aa608a814eb3f5bc5eb22f7f23f_12.mp4"
            },
            {
              "url": "https://aac.saavncdn.com/699/76751aa608a814eb3f5bc5eb22f7f23f_48.mp4"
            },
            {
              "url": "https://aac.saavncdn.com/699/76751aa608a814eb3f5bc5eb22f7f23f_96.mp4"
            },
          ]
        },







        {
          "id": "N_uInz2Q",
          "name": "Vinnaar Amudhey",
          "type": "song",
          "year": "2010",
          "releaseDate": "2010-10-14",
          "duration": 306,
          "label": "Sony Music Entertainment India Pvt. Ltd.",
          "explicitContent": false,
          "playCount": 101816,
          "language": "tamil",
          "hasLyrics": false,
          "lyricsId": null,
          "url": "https://www.jiosaavn.com/song/vinnaar-amudhey/PjceeBpKBWI",
          "copyright": "(P) 2010 Sony Music Entertainment India Pvt. Ltd.",
          "album": {
            "id": "12160470",
            "name": "Baba Pugazh Maalai",
            "url": "https://www.jiosaavn.com/album/baba-pugazh-maalai/QZm-MADag2M_"
          },
          "artists": {
            "primary": [
              {
                "id": "457536",
                "name": "Ilaiyaraaja",
                "role": "primary_artists",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/ilaiyaraaja-songs/ciCHe-IFG1w_"
              },
              {
                "id": "463458",
                "name": "Janaki Iyer",
                "role": "primary_artists",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/884/Pichaikkaran-Tamil-2015-50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/884/Pichaikkaran-Tamil-2015-150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/884/Pichaikkaran-Tamil-2015-500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/janaki-iyer-songs/6QXismGd-3I_"
              },
              {
                "id": "476777",
                "name": "Priya Hemesh",
                "role": "primary_artists",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/artists/Priya_Himesh_20190828094953_50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/artists/Priya_Himesh_20190828094953_150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/artists/Priya_Himesh_20190828094953_500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/priya-hemesh-songs/ubImgrrW6M8_"
              }
            ],
            "featured": [],
            "all": [
              {
                "id": "457536",
                "name": "Ilaiyaraaja",
                "role": "music",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/ilaiyaraaja-songs/ciCHe-IFG1w_"
              },
              {
                "id": "457536",
                "name": "Ilaiyaraaja",
                "role": "singer",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/ilaiyaraaja-songs/ciCHe-IFG1w_"
              },
              {
                "id": "463458",
                "name": "Janaki Iyer",
                "role": "singer",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/884/Pichaikkaran-Tamil-2015-50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/884/Pichaikkaran-Tamil-2015-150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/884/Pichaikkaran-Tamil-2015-500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/janaki-iyer-songs/6QXismGd-3I_"
              },
              {
                "id": "476777",
                "name": "Priya Hemesh",
                "role": "singer",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/artists/Priya_Himesh_20190828094953_50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/artists/Priya_Himesh_20190828094953_150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/artists/Priya_Himesh_20190828094953_500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/priya-hemesh-songs/ubImgrrW6M8_"
              },
              {
                "id": "1470219",
                "name": "Vaali",
                "role": "lyricist",
                "image": [],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/vaali-songs/3uY0DjiK9Mo_"
              }
            ]
          },
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/699/Baba-Pugazh-Maalai-Tamil-2010-20190731133107-50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/699/Baba-Pugazh-Maalai-Tamil-2010-20190731133107-150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/699/Baba-Pugazh-Maalai-Tamil-2010-20190731133107-500x500.jpg"
            }
          ],
          "downloadUrl": [
            {
              "quality": "12kbps",
              "url": "https://aac.saavncdn.com/699/c87f7fcfc291b99dfadec7b8facdaf0d_12.mp4"
            },
            {
              "quality": "48kbps",
              "url": "https://aac.saavncdn.com/699/c87f7fcfc291b99dfadec7b8facdaf0d_48.mp4"
            },
            {
              "quality": "96kbps",
              "url": "https://aac.saavncdn.com/699/c87f7fcfc291b99dfadec7b8facdaf0d_96.mp4"
            },
            {
              "quality": "160kbps",
              "url": "https://aac.saavncdn.com/699/c87f7fcfc291b99dfadec7b8facdaf0d_160.mp4"
            },
            {
              "quality": "320kbps",
              "url": "https://aac.saavncdn.com/699/c87f7fcfc291b99dfadec7b8facdaf0d_320.mp4"
            }
          ]
        },







        {
          "id": "EBHe2tic",
          "name": "Sai Shirdi Sai",
          "type": "song",
          "year": "2021",
          "releaseDate": "2021-03-25",
          "duration": 364,
          "label": "Sony Music Entertainment India Pvt. Ltd.",
          "explicitContent": false,
          "playCount": 70501,
          "language": "tamil",
          "hasLyrics": false,
          "lyricsId": null,
          "url": "https://www.jiosaavn.com/song/sai-shirdi-sai/NSojVEZEXlA",
          "copyright": "(P) 2021 Sony Music Entertainment India Pvt. Ltd.",
          "album": {
            "id": "26166487",
            "name": "99 Songs (Tamil) (Original Motion Picture Soundtrack)",
            "url": "https://www.jiosaavn.com/album/99-songs-tamil-original-motion-picture-soundtrack/TEoQLbnRY,M_"
          },
          "artists": {
            "primary": [
              {
                "id": "456269",
                "name": "A.R. Rahman",
                "role": "primary_artists",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/artists/AR_Rahman_002_20210120084455_50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/artists/AR_Rahman_002_20210120084455_150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/artists/AR_Rahman_002_20210120084455_500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/a.r.-rahman-songs/HhFyPLvlKN0_"
              },
              {
                "id": "455939",
                "name": "Bela Shende",
                "role": "primary_artists",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/artists/Bela_Shende_003_20240129070549_50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/artists/Bela_Shende_003_20240129070549_150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/artists/Bela_Shende_003_20240129070549_500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/bela-shende-songs/rNunuHQMtLw_"
              }
            ],
            "featured": [],
            "all": [
              {
                "id": "456269",
                "name": "A.R. Rahman",
                "role": "music",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/artists/AR_Rahman_002_20210120084455_50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/artists/AR_Rahman_002_20210120084455_150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/artists/AR_Rahman_002_20210120084455_500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/a.r.-rahman-songs/HhFyPLvlKN0_"
              },
              {
                "id": "456269",
                "name": "A.R. Rahman",
                "role": "singer",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/artists/AR_Rahman_002_20210120084455_50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/artists/AR_Rahman_002_20210120084455_150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/artists/AR_Rahman_002_20210120084455_500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/a.r.-rahman-songs/HhFyPLvlKN0_"
              },
              {
                "id": "455939",
                "name": "Bela Shende",
                "role": "singer",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/artists/Bela_Shende_003_20240129070549_50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/artists/Bela_Shende_003_20240129070549_150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/artists/Bela_Shende_003_20240129070549_500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/bela-shende-songs/rNunuHQMtLw_"
              },
              {
                "id": "456269",
                "name": "A.R. Rahman",
                "role": "lyricist",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/artists/AR_Rahman_002_20210120084455_50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/artists/AR_Rahman_002_20210120084455_150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/artists/AR_Rahman_002_20210120084455_500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/a.r.-rahman-songs/HhFyPLvlKN0_"
              },
              {
                "id": "6276194",
                "name": "Mashook Rahman",
                "role": "lyricist",
                "image": [],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/mashook-rahman-songs/1KpVqysMM2g_"
              },
              {
                "id": "7628141",
                "name": "Ehan Bhat",
                "role": "starring",
                "image": [],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/ehan-bhat-songs/0lMlQ-1d5j4_"
              },
              {
                "id": "7628142",
                "name": "Edilsy Vargas",
                "role": "starring",
                "image": [],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/edilsy-vargas-songs/YY4Pw2KoTOA_"
              },
              {
                "id": "10152906",
                "name": "Tenzin Dalha",
                "role": "starring",
                "image": [],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/tenzin-dalha-songs/G7ECdCqOqFw_"
              },
              {
                "id": "456120",
                "name": "Lisa Ray",
                "role": "starring",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/artists/Lisa_Ray_50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/artists/Lisa_Ray_150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/artists/Lisa_Ray_500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/lisa-ray-songs/J7bdzuS3vW4_"
              },
              {
                "id": "455443",
                "name": "Manisha Koirala",
                "role": "starring",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/artists/Manisha_Koirala_001_20230605093709_50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/artists/Manisha_Koirala_001_20230605093709_150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/artists/Manisha_Koirala_001_20230605093709_500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/manisha-koirala-songs/3GneRsn5Z1k_"
              },
              {
                "id": "455708",
                "name": "Ranjit Barot",
                "role": "starring",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/787/Fiza-Hindi-2000-20190816135120-50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/787/Fiza-Hindi-2000-20190816135120-150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/787/Fiza-Hindi-2000-20190816135120-500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/ranjit-barot-songs/bT,BthHyoo4_"
              }
            ]
          },
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/611/99-Songs-Tamil-Original-Motion-Picture-Soundtrack--Tamil-2021-20210325184848-50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/611/99-Songs-Tamil-Original-Motion-Picture-Soundtrack--Tamil-2021-20210325184848-150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/611/99-Songs-Tamil-Original-Motion-Picture-Soundtrack--Tamil-2021-20210325184848-500x500.jpg"
            }
          ],
          "downloadUrl": [
            {
              "quality": "12kbps",
              "url": "https://aac.saavncdn.com/611/1fac3d72852ca60d2ba5b26c91c514fd_12.mp4"
            },
            {
              "quality": "48kbps",
              "url": "https://aac.saavncdn.com/611/1fac3d72852ca60d2ba5b26c91c514fd_48.mp4"
            },
            {
              "quality": "96kbps",
              "url": "https://aac.saavncdn.com/611/1fac3d72852ca60d2ba5b26c91c514fd_96.mp4"
            },
            {
              "quality": "160kbps",
              "url": "https://aac.saavncdn.com/611/1fac3d72852ca60d2ba5b26c91c514fd_160.mp4"
            },
            {
              "quality": "320kbps",
              "url": "https://aac.saavncdn.com/611/1fac3d72852ca60d2ba5b26c91c514fd_320.mp4"
            }
          ]
        },








        {
          "id": "3PkcRmPi",
          "name": "Sai Shree Sai Dwarakamayi (Version - 2)",
          "type": "song",
          "year": "2010",
          "releaseDate": "2010-10-14",
          "duration": 3123,
          "label": "Sony Music Entertainment India Pvt. Ltd.",
          "explicitContent": false,
          "playCount": 60934,
          "language": "tamil",
          "hasLyrics": false,
          "lyricsId": null,
          "url": "https://www.jiosaavn.com/song/sai-shree-sai-dwarakamayi-version-2/QzgAUiZdZ1o",
          "copyright": "(P) 2010 Sony Music Entertainment India Pvt. Ltd.",
          "album": {
            "id": "12160470",
            "name": "Baba Pugazh Maalai",
            "url": "https://www.jiosaavn.com/album/baba-pugazh-maalai/QZm-MADag2M_"
          },
          "artists": {
            "primary": [
              {
                "id": "457536",
                "name": "Ilaiyaraaja",
                "role": "primary_artists",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/ilaiyaraaja-songs/ciCHe-IFG1w_"
              },
              {
                "id": "458970",
                "name": "Bombay Jayashri",
                "role": "primary_artists",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/artists/Bombay_Jayashri_50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/artists/Bombay_Jayashri_150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/artists/Bombay_Jayashri_500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/bombay-jayashri-songs/71gFGB2dgHg_"
              }
            ],
            "featured": [],
            "all": [
              {
                "id": "457536",
                "name": "Ilaiyaraaja",
                "role": "music",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/ilaiyaraaja-songs/ciCHe-IFG1w_"
              },
              {
                "id": "457536",
                "name": "Ilaiyaraaja",
                "role": "singer",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/artists/Ilaiyaraaja_20191130083752_500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/ilaiyaraaja-songs/ciCHe-IFG1w_"
              },
              {
                "id": "458970",
                "name": "Bombay Jayashri",
                "role": "singer",
                "image": [
                  {
                    "quality": "50x50",
                    "url": "https://c.saavncdn.com/artists/Bombay_Jayashri_50x50.jpg"
                  },
                  {
                    "quality": "150x150",
                    "url": "https://c.saavncdn.com/artists/Bombay_Jayashri_150x150.jpg"
                  },
                  {
                    "quality": "500x500",
                    "url": "https://c.saavncdn.com/artists/Bombay_Jayashri_500x500.jpg"
                  }
                ],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/bombay-jayashri-songs/71gFGB2dgHg_"
              },
              {
                "id": "1470219",
                "name": "Vaali",
                "role": "lyricist",
                "image": [],
                "type": "artist",
                "url": "https://www.jiosaavn.com/artist/vaali-songs/3uY0DjiK9Mo_"
              }
            ]
          },
          "image": [
            {
              "quality": "50x50",
              "url": "https://c.saavncdn.com/699/Baba-Pugazh-Maalai-Tamil-2010-20190731133107-50x50.jpg"
            },
            {
              "quality": "150x150",
              "url": "https://c.saavncdn.com/699/Baba-Pugazh-Maalai-Tamil-2010-20190731133107-150x150.jpg"
            },
            {
              "quality": "500x500",
              "url": "https://c.saavncdn.com/699/Baba-Pugazh-Maalai-Tamil-2010-20190731133107-500x500.jpg"
            }
          ],
          "downloadUrl": [
            {
              "quality": "12kbps",
              "url": "https://aac.saavncdn.com/699/2dfc16199e98952b1ea870d15d637890_12.mp4"
            },
            {
              "quality": "48kbps",
              "url": "https://aac.saavncdn.com/699/2dfc16199e98952b1ea870d15d637890_48.mp4"
            },
            {
              "quality": "96kbps",
              "url": "https://aac.saavncdn.com/699/2dfc16199e98952b1ea870d15d637890_96.mp4"
            },
            {
              "quality": "160kbps",
              "url": "https://aac.saavncdn.com/699/2dfc16199e98952b1ea870d15d637890_160.mp4"
            },
            {
              "quality": "320kbps",
              "url": "https://aac.saavncdn.com/699/2dfc16199e98952b1ea870d15d637890_320.mp4"
            }
          ]
        }
      ]
    }
  }