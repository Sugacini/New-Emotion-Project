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




{
  "meals"= [
    {
      "idMeal": "52767",
      "strMeal": "Bakewell tart",
      "strDrinkAlternate": null,
      "strCategory": "Dessert",
      "strArea": "British",
      "strInstructions": "To make the pastry, measure the flour into a bowl and rub in the butter with your fingertips until the mixture resembles fine breadcrumbs. Add the water, mixing to form a soft dough.\r\nRoll out the dough on a lightly floured work surface and use to line a 20cm/8in flan tin. Leave in the fridge to chill for 30 minutes.\r\nPreheat the oven to 200C/400F/Gas 6 (180C fan).\r\nLine the pastry case with foil and fill with baking beans. Bake blind for about 15 minutes, then remove the beans and foil and cook for a further five minutes to dry out the base.\r\nFor the filing, spread the base of the flan generously with raspberry jam.\r\nMelt the butter in a pan, take off the heat and then stir in the sugar. Add ground almonds, egg and almond extract. Pour into the flan tin and sprinkle over the flaked almonds.\r\nBake for about 35 minutes. If the almonds seem to be browning too quickly, cover the tart loosely with foil to prevent them burning.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/wyrqqq1468233628.jpg",
      "strTags": "Tart,Baking,Alcoholic",
      "strYoutube": "https://www.youtube.com/watch?v=1ahpSTf_Pvk",
      "strIngredient1": "plain flour",
      "strIngredient2": "chilled butter",
      "strIngredient3": "cold water",
      "strIngredient4": "raspberry jam",
      "strIngredient5": "butter",
      "strIngredient6": "caster sugar",
      "strIngredient7": "ground almonds",
      "strIngredient8": "free-range egg, beaten",
      "strIngredient9": "almond extract",
      "strIngredient10": "flaked almonds",
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": null,
      "strIngredient17": null,
      "strIngredient18": null,
      "strIngredient19": null,
      "strIngredient20": null,
      "strMeasure1": "175g/6oz",
      "strMeasure2": "75g/2½oz",
      "strMeasure3": "2-3 tbsp",
      "strMeasure4": "1 tbsp",
      "strMeasure5": "125g/4½oz",
      "strMeasure6": "125g/4½oz",
      "strMeasure7": "125g/4½oz",
      "strMeasure8": "1",
      "strMeasure9": "½ tsp",
      "strMeasure10": "50g/1¾oz",
      "strMeasure11": "",
      "strMeasure12": "",
      "strMeasure13": "",
      "strMeasure14": "",
      "strMeasure15": "",
      "strMeasure16": null,
      "strMeasure17": null,
      "strMeasure18": null,
      "strMeasure19": null,
      "strMeasure20": null,
      "strSource": null,
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52792",
      "strMeal": "Bread and Butter Pudding",
      "strDrinkAlternate": null,
      "strCategory": "Dessert",
      "strArea": "British",
      "strInstructions": "Grease a 1 litre/2 pint pie dish with butter.\r\nCut the crusts off the bread. Spread each slice with on one side with butter, then cut into triangles.\r\nArrange a layer of bread, buttered-side up, in the bottom of the dish, then add a layer of sultanas. Sprinkle with a little cinnamon, then repeat the layers of bread and sultanas, sprinkling with cinnamon, until you have used up all of the bread. Finish with a layer of bread, then set aside.\r\nGently warm the milk and cream in a pan over a low heat to scalding point. Don't let it boil.\r\nCrack the eggs into a bowl, add three quarters of the sugar and lightly whisk until pale.\r\nAdd the warm milk and cream mixture and stir well, then strain the custard into a bowl.\r\nPour the custard over the prepared bread layers and sprinkle with nutmeg and the remaining sugar and leave to stand for 30 minutes.\r\nPreheat the oven to 180C/355F/Gas 4.\r\nPlace the dish into the oven and bake for 30-40 minutes, or until the custard has set and the top is golden-brown.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/xqwwpy1483908697.jpg",
      "strTags": "Pudding,Brunch",
      "strYoutube": "https://www.youtube.com/watch?v=Vz5W1-BmOE4",
      "strIngredient1": "butter",
      "strIngredient2": "bread",
      "strIngredient3": "sultanas",
      "strIngredient4": "cinnamon",
      "strIngredient5": "milk",
      "strIngredient6": "double cream",
      "strIngredient7": "eggs",
      "strIngredient8": "sugar",
      "strIngredient9": "nutmeg",
      "strIngredient10": "",
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "25g/1oz",
      "strMeasure2": "8 thin slices",
      "strMeasure3": "50g/2oz",
      "strMeasure4": "2 tsp",
      "strMeasure5": "350ml/12fl",
      "strMeasure6": "50ml/2fl oz",
      "strMeasure7": "2 free-range",
      "strMeasure8": "25g/1oz",
      "strMeasure9": "grated, to taste",
      "strMeasure10": "",
      "strMeasure11": "",
      "strMeasure12": "",
      "strMeasure13": "",
      "strMeasure14": "",
      "strMeasure15": "",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://cooking.nytimes.com/recipes/1018529-coq-au-vin",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52803",
      "strMeal": "Beef Wellington",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "British",
      "strInstructions": "Put the mushrooms into a food processor with some seasoning and pulse to a rough paste. Scrape the paste into a pan and cook over a high heat for about 10 mins, tossing frequently, to cook out the moisture from the mushrooms. Spread out on a plate to cool.\r\nHeat in a frying pan and add a little olive oil. Season the beef and sear in the hot pan for 30 secs only on each side. (You don't want to cook it at this stage, just colour it). Remove the beef from the pan and leave to cool, then brush all over with the mustard.\r\nLay a sheet of cling film on a work surface and arrange the Parma ham slices on it, in slightly overlapping rows. With a palette knife, spread the mushroom paste over the ham, then place the seared beef fillet in the middle. Keeping a tight hold of the cling film from the edge, neatly roll the Parma ham and mushrooms around the beef to form a tight barrel shape. Twist the ends of the cling film to secure. Chill for 15-20 mins to allow the beef to set and keep its shape.\r\nRoll out the puff pastry on a floured surface to a large rectangle, the thickness of a £1 coin. Remove the cling film from the beef, then lay in the centre. Brush the surrounding pastry with egg yolk. Fold the ends over, the wrap the pastry around the beef, cutting off any excess. Turn over, so the seam is underneath, and place on a baking sheet. Brush over all the pastry with egg and chill for about 15 mins to let the pastry rest.\r\nHeat the oven to 200C, 400F, gas 6.\r\nLightly score the pastry at 1cm intervals and glaze again with beaten egg yolk. Bake for 20 minutes, then lower the oven setting to 180C, 350F, gas 4 and cook for another 15 mins. Allow to rest for 10-15 mins before slicing and serving with the side dishes of your choice. The beef should still be pink in the centre when you serve it.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg",
      "strTags": "Meat,Stew",
      "strYoutube": "https://www.youtube.com/watch?v=FS8u1RBdf6I",
      "strIngredient1": "mushrooms",
      "strIngredient2": "English Mustard",
      "strIngredient3": "Olive Oil",
      "strIngredient4": "Beef Fillet",
      "strIngredient5": "Parma ham",
      "strIngredient6": "Puff Pastry",
      "strIngredient7": "Flour",
      "strIngredient8": "Egg Yolks",
      "strIngredient9": null,
      "strIngredient10": null,
      "strIngredient11": null,
      "strIngredient12": null,
      "strIngredient13": null,
      "strIngredient14": null,
      "strIngredient15": null,
      "strIngredient16": null,
      "strIngredient17": null,
      "strIngredient18": null,
      "strIngredient19": null,
      "strIngredient20": null,
      "strMeasure1": "400g",
      "strMeasure2": "1-2tbsp",
      "strMeasure3": "Dash",
      "strMeasure4": "750g piece",
      "strMeasure5": "6-8 slices",
      "strMeasure6": "500g",
      "strMeasure7": "Dusting",
      "strMeasure8": "2 Beaten ",
      "strMeasure9": "",
      "strMeasure10": "",
      "strMeasure11": "",
      "strMeasure12": "",
      "strMeasure13": "",
      "strMeasure14": "",
      "strMeasure15": "",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "http://www.goodtoknow.co.uk/recipes/164868/Gordon-Ramsay-s-beef-Wellington",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52807",
      "strMeal": "Baingan Bharta",
      "strDrinkAlternate": null,
      "strCategory": "Vegetarian",
      "strArea": "Indian",
      "strInstructions": "Rinse the baingan (eggplant or aubergine) in water. Pat dry with a kitchen napkin. Apply some oil all over and\r\nkeep it for roasting on an open flame. You can also grill the baingan or roast in the oven. But then you won't get\r\nthe smoky flavor of the baingan. Keep the eggplant turning after a 2 to 3 minutes on the flame, so that its evenly\r\ncooked. You could also embed some garlic cloves in the baingan and then roast it.\r\n2. Roast the aubergine till its completely cooked and tender. With a knife check the doneness. The knife should slid\r\neasily in aubergines without any resistance. Remove the baingan and immerse in a bowl of water till it cools\r\ndown.\r\n3. You can also do the dhungar technique of infusing charcoal smoky flavor in the baingan. This is an optional step.\r\nUse natural charcoal for this method. Heat a small piece of charcoal on flame till it becomes smoking hot and red.\r\n4. Make small cuts on the baingan with a knife. Place the red hot charcoal in the same plate where the roasted\r\naubergine is kept. Add a few drops of oil on the charcoal. The charcoal would begin to smoke.\r\n5. As soon as smoke begins to release from the charcoal, cover the entire plate tightly with a large bowl. Allow the\r\ncharcoal smoke to get infused for 1 to 2 minutes. The more you do, the more smoky the baingan bharta will\r\nbecome. I just keep for a minute. Alternatively, you can also do this dhungar method once the baingan bharta is\r\ncooked, just like the way we do for Dal Tadka.\r\n6. Peel the skin from the roasted and smoked eggplant.\r\n7. Chop the cooked eggplant finely or you can even mash it.\r\n8. In a kadai or pan, heat oil. Then add finely chopped onions and garlic.\r\n9. Saute the onions till translucent. Don't brown them.\r\n10. Add chopped green chilies and saute for a minute.\r\n11. Add the chopped tomatoes and mix it well.\r\n12. Bhuno (saute) the tomatoes till the oil starts separating from the mixture.\r\n13. Now add the red chili powder. Stir and mix well.\r\n14. Add the chopped cooked baingan.\r\n15. Stir and mix the chopped baingan very well with the onion­tomato masala mixture.\r\n16. Season with salt. Stir and saute for some more 4 to 5 minutes more.\r\n17. Finally stir in the coriander leaves with the baingan bharta or garnish it with them. Serve Baingan Bharta with\r\nphulkas, rotis or chapatis. It goes well even with bread, toasted or grilled bread and plain rice or jeera rice.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/urtpqw1487341253.jpg",
      "strTags": "Spicy,Bun,Calorific",
      "strYoutube": "https://www.youtube.com/watch?v=-84Zz2EP4h4",
      "strIngredient1": "Aubergine",
      "strIngredient2": "Onion",
      "strIngredient3": "Tomatoes",
      "strIngredient4": "Garlic",
      "strIngredient5": "Green Chilli",
      "strIngredient6": "Red Chilli Powder",
      "strIngredient7": "Oil",
      "strIngredient8": "Coriander Leaves",
      "strIngredient9": "salt",
      "strIngredient10": "",
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "1 large",
      "strMeasure2": "½ cup ",
      "strMeasure3": "1 cup",
      "strMeasure4": "6 cloves",
      "strMeasure5": "1",
      "strMeasure6": "¼ teaspoon",
      "strMeasure7": "1.5 tablespoon",
      "strMeasure8": "1 tablespoon chopped",
      "strMeasure9": "as required",
      "strMeasure10": "",
      "strMeasure11": "",
      "strMeasure12": "",
      "strMeasure13": "",
      "strMeasure14": "",
      "strMeasure15": "",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "http://www.vegrecipesofindia.com/baingan-bharta-recipe-punjabi-baingan-bharta-recipe/",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52812",
      "strMeal": "Beef Brisket Pot Roast",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "American",
      "strInstructions": "1 Prepare the brisket for cooking: On one side of the brisket there should be a layer of fat, which you want. If there are any large chunks of fat, cut them off and discard them. Large pieces of fat will not be able to render out completely.\r\nUsing a sharp knife, score the fat in parallel lines, about 3/4-inch apart. Slice through the fat, not the beef. Repeat in the opposite direction to make a cross-hatch pattern.\r\nSalt the brisket well and let it sit at room temperature for 30 minutes.\r\n \r\n2 Sear the brisket: You'll need an oven-proof, thick-bottomed pot with a cover, or Dutch oven, that is just wide enough to hold the brisket roast with a little room for the onions.\r\nPat the brisket dry and place it, fatty side down, into the pot and place it on medium high heat. Cook for 5-8 minutes, lightly sizzling, until the fat side is nicely browned. (If the roast seems to be cooking too fast, turn the heat down to medium. You want a steady sizzle, not a raging sear.)\r\nTurn the brisket over and cook for a few minutes more to brown the other side.\r\n\r\n3 Sauté the onions and garlic: When the brisket has browned, remove it from the pot and set aside. There should be a couple tablespoons of fat rendered in the pot, if not, add some olive oil.\r\nAdd the chopped onions and increase the heat to high. Sprinkle a little salt on the onions. Sauté, stirring often, until the onions are lightly browned, 5-8 minutes. Stir in the garlic and cook 1-2 more minutes.\r\n \r\n4 Return brisket to pot, add herbs, stock, bring to simmer, cover, cook in oven: Preheat the oven to 300°F. Use kitchen twine to tie together the bay leaves, rosemary and thyme.\r\nMove the onions and garlic to the sides of the pot and nestle the brisket inside. Add the beef stock and the tied-up herbs. Bring the stock to a boil on the stovetop.\r\nCover the pot, place the pot in the 300°F oven and cook for 3 hours. Carefully flip the brisket every hour so it cooks evenly.\r\n \r\n5 Add carrots, continue to cook: After 3 hours, add the carrots. Cover the pot and cook for 1 hour more, or until the carrots are cooked through and the brisket is falling-apart tender.\r\n6 Remove brisket to cutting board, tent with foil: When the brisket is falling-apart tender, take the pot out of the oven and remove the brisket to a cutting board. Cover it with foil. Pull out and discard the herbs.\r\n7 Make sauce (optional): At this point you have two options. You can serve as is, or you can make a sauce with the drippings and some of the onions. If you serve as is, skip this step.\r\nTo make a sauce, remove the carrots and half of the onions, set aside and cover them with foil. Pour the ingredients that are remaining into the pot into a blender, and purée until smooth. If you want, add 1 tablespoon of mustard to the mix. Put into a small pot and keep warm.\r\n8 Slice the meat across the grain: Notice the lines of the muscle fibers of the roast. This is the \"grain\" of the meat. Slice the meat perpendicular to these lines, or across the grain (cutting this way further tenderizes the meat), in 1/4-inch to 1/2-inch slices.\r\nServe with the onions, carrots and gravy. Serve with mashed, roasted or boiled potatoes, egg noodles or polenta.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/ursuup1487348423.jpg",
      "strTags": "Meat",
      "strYoutube": "https://www.youtube.com/watch?v=gh48wM6bPWQ",
      "strIngredient1": "Beef Brisket",
      "strIngredient2": "Salt",
      "strIngredient3": "Onion",
      "strIngredient4": "Garlic",
      "strIngredient5": "Thyme",
      "strIngredient6": "Rosemary",
      "strIngredient7": "Bay Leaves",
      "strIngredient8": "beef stock",
      "strIngredient9": "Carrots",
      "strIngredient10": "Mustard",
      "strIngredient11": "Potatoes",
      "strIngredient12": null,
      "strIngredient13": null,
      "strIngredient14": null,
      "strIngredient15": null,
      "strIngredient16": null,
      "strIngredient17": null,
      "strIngredient18": null,
      "strIngredient19": null,
      "strIngredient20": null,
      "strMeasure1": "4-5 pound",
      "strMeasure2": "Dash",
      "strMeasure3": "3",
      "strMeasure4": "5 cloves",
      "strMeasure5": "1 Sprig",
      "strMeasure6": "1 sprig ",
      "strMeasure7": "4",
      "strMeasure8": "2 cups",
      "strMeasure9": "3 Large",
      "strMeasure10": "1 Tbsp",
      "strMeasure11": "4 Mashed",
      "strMeasure12": "",
      "strMeasure13": "",
      "strMeasure14": "",
      "strMeasure15": "",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "http://www.simplyrecipes.com/recipes/beef_brisket_pot_roast/",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52824",
      "strMeal": "Beef Sunday Roast",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "British",
      "strInstructions": "Cook the Broccoli and Carrots in a pan of boiling water until tender.\r\n\r\nRoast the Beef and Potatoes in the oven for 45mins, the potatoes may need to be checked regularly to not overcook.\r\n\r\nTo make the Yorkshire puddings:\r\nHeat oven to 230C/fan 210C/gas 8. Drizzle a little sunflower oil evenly into 2 x 4-hole Yorkshire pudding tins or a 12-hole non-stick muffin tin and place in the oven to heat through\r\nTo make the batter, tip 140g plain flour into a bowl and beat in four eggs until smooth. Gradually add 200ml milk and carry on beating until the mix is completely lump-free. Season with salt and pepper. Pour the batter into a jug, then remove the hot tins from the oven. Carefully and evenly pour the batter into the holes. Place the tins back in the oven and leave undisturbed for 20-25 mins until the puddings have puffed up and browned. Serve immediately.\r\n\r\nPlate up and add the Gravy as desired.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/ssrrrs1503664277.jpg",
      "strTags": "MainMeal",
      "strYoutube": "https://www.youtube.com/watch?v=2l3-dBdNehY",
      "strIngredient1": "Beef",
      "strIngredient2": "Broccoli",
      "strIngredient3": "Potatoes",
      "strIngredient4": "Carrots",
      "strIngredient5": "plain flour",
      "strIngredient6": "Eggs",
      "strIngredient7": "milk",
      "strIngredient8": "sunflower oil",
      "strIngredient9": null,
      "strIngredient10": null,
      "strIngredient11": null,
      "strIngredient12": null,
      "strIngredient13": null,
      "strIngredient14": null,
      "strIngredient15": null,
      "strIngredient16": null,
      "strIngredient17": null,
      "strIngredient18": null,
      "strIngredient19": null,
      "strIngredient20": null,
      "strMeasure1": "8 slices",
      "strMeasure2": "12 florets",
      "strMeasure3": "1 Packet",
      "strMeasure4": "1 Packet",
      "strMeasure5": "140g",
      "strMeasure6": "4",
      "strMeasure7": "200ml",
      "strMeasure8": "drizzle (for cooking)",
      "strMeasure9": "",
      "strMeasure10": "",
      "strMeasure11": "",
      "strMeasure12": "",
      "strMeasure13": "",
      "strMeasure14": "",
      "strMeasure15": "",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://www.bbcgoodfood.com/recipes/9020/best-yorkshire-puddings",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52826",
      "strMeal": "Braised Beef Chilli",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "Mexican",
      "strInstructions": "Preheat the oven to 120C/225F/gas mark 1.\r\n\r\nTake the meat out of the fridge to de-chill. Pulse the onions and garlic in a food processor until finely chopped. Heat 2 tbsp olive oil in a large casserole and sear the meat on all sides until golden.\r\n\r\nSet to one side and add another small slug of oil to brown the chorizo. Remove and add the onion and garlic, spices, herbs and chillies then cook until soft in the chorizo oil. Season with salt and pepper and add the vinegar, tomatoes, ketchup and sugar.\r\n\r\nPut all the meat back into the pot with 400ml water (or red wine if you prefer), bring up to a simmer and cook, covered, in the low oven.\r\n\r\nAfter 2 hours, check the meat and add the beans. Cook for a further hour and just before serving, pull the meat apart with a pair of forks.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/uuqvwu1504629254.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=z4kSoJgsu6Y",
      "strIngredient1": "Beef",
      "strIngredient2": "Onions",
      "strIngredient3": "Garlic",
      "strIngredient4": "Olive oil",
      "strIngredient5": "Chorizo",
      "strIngredient6": "Cumin",
      "strIngredient7": "Allspice",
      "strIngredient8": "Cloves",
      "strIngredient9": "Cinnamon stick",
      "strIngredient10": "Bay Leaves",
      "strIngredient11": "Oregano",
      "strIngredient12": "Ancho Chillies",
      "strIngredient13": "Balsamic Vinegar",
      "strIngredient14": "Plum Tomatoes",
      "strIngredient15": "Tomato Ketchup",
      "strIngredient16": "Dark Brown Sugar",
      "strIngredient17": "Borlotti Beans",
      "strIngredient18": null,
      "strIngredient19": null,
      "strIngredient20": null,
      "strMeasure1": "1kg",
      "strMeasure2": "3",
      "strMeasure3": "4 cloves",
      "strMeasure4": "Dash",
      "strMeasure5": "300g",
      "strMeasure6": "2 tsp",
      "strMeasure7": "2 tsp",
      "strMeasure8": "1 tsp",
      "strMeasure9": "1 large",
      "strMeasure10": "3",
      "strMeasure11": "2 tsp dried",
      "strMeasure12": "2 ancho",
      "strMeasure13": "3 tbsp",
      "strMeasure14": "2 x 400g",
      "strMeasure15": "2 tbsp",
      "strMeasure16": "2 tbsp",
      "strMeasure17": "2 x 400g tins",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "http://www.telegraph.co.uk/food-and-drink/recipes/braised-beef-chilli-con-carne/",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52834",
      "strMeal": "Beef stroganoff",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "Russian",
      "strInstructions": "Heat the olive oil in a non-stick frying pan then add the sliced onion and cook on a medium heat until completely softened, so around 15 mins, adding a little splash of water if they start to stick at all. Crush in the garlic and cook for a 2-3 mins further, then add the butter. Once the butter is foaming a little, add the mushrooms and cook for around 5 mins until completely softened. Season everything well, then tip onto a plate.\r\nTip the flour into a bowl with a big pinch of salt and pepper, then toss the steak in the seasoned flour. Add the steak pieces to the pan, splashing in a little oil if the pan looks particularly dry, and fry for 3-4 mins, until well coloured. Tip the onions and mushrooms back into the pan. Whisk the crème fraîche, mustard and beef stock together, then pour into the pan. Cook over a medium heat for around 5 mins. Scatter with parsley, then serve with pappardelle or rice.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/svprys1511176755.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=PQHgQX1Ss74",
      "strIngredient1": "Olive Oil",
      "strIngredient2": "Onions",
      "strIngredient3": "Garlic",
      "strIngredient4": "Butter",
      "strIngredient5": "Mushrooms",
      "strIngredient6": "Beef Fillet",
      "strIngredient7": "Plain Flour",
      "strIngredient8": "Creme Fraiche",
      "strIngredient9": "English Mustard",
      "strIngredient10": "Beef Stock",
      "strIngredient11": "Parsley",
      "strIngredient12": null,
      "strIngredient13": null,
      "strIngredient14": null,
      "strIngredient15": null,
      "strIngredient16": null,
      "strIngredient17": null,
      "strIngredient18": null,
      "strIngredient19": null,
      "strIngredient20": null,
      "strMeasure1": "1 tbls",
      "strMeasure2": "1",
      "strMeasure3": "1 clove",
      "strMeasure4": "1 tbsp",
      "strMeasure5": "250g",
      "strMeasure6": "500g",
      "strMeasure7": "1tbsp",
      "strMeasure8": "150g",
      "strMeasure9": "1 tbsp",
      "strMeasure10": "100ml",
      "strMeasure11": "Topping",
      "strMeasure12": "",
      "strMeasure13": "",
      "strMeasure14": "",
      "strMeasure15": "",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://www.bbcgoodfood.com/recipes/beef-stroganoff",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52842",
      "strMeal": "Broccoli & Stilton soup",
      "strDrinkAlternate": null,
      "strCategory": "Starter",
      "strArea": "British",
      "strInstructions": "Heat the rapeseed oil in a large saucepan and then add the onions. Cook on a medium heat until soft. Add a splash of water if the onions start to catch.\r\n\r\nAdd the celery, leek, potato and a knob of butter. Stir until melted, then cover with a lid. Allow to sweat for 5 minutes. Remove the lid.\r\n\r\nPour in the stock and add any chunky bits of broccoli stalk. Cook for 10 – 15 minutes until all the vegetables are soft.\r\n\r\nAdd the rest of the broccoli and cook for a further 5 minutes. Carefully transfer to a blender and blitz until smooth. Stir in the stilton, allowing a few lumps to remain. Season with black pepper and serve.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/tvvxpv1511191952.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=_HgVLpmNxTY",
      "strIngredient1": "Rapeseed Oil",
      "strIngredient2": "Onion",
      "strIngredient3": "Celery",
      "strIngredient4": "Leek",
      "strIngredient5": "Potatoes",
      "strIngredient6": "Butter",
      "strIngredient7": "Vegetable Stock",
      "strIngredient8": "Broccoli",
      "strIngredient9": "Stilton Cheese",
      "strIngredient10": "",
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "2 tblsp ",
      "strMeasure2": "1 finely chopped ",
      "strMeasure3": "1",
      "strMeasure4": "1 sliced",
      "strMeasure5": "1 medium",
      "strMeasure6": "1 knob",
      "strMeasure7": "1 litre hot",
      "strMeasure8": "1 Head chopped",
      "strMeasure9": "140g",
      "strMeasure10": "",
      "strMeasure11": "",
      "strMeasure12": "",
      "strMeasure13": "",
      "strMeasure14": "",
      "strMeasure15": "",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://www.bbcgoodfood.com/recipes/1940679/broccoli-and-stilton-soup",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52848",
      "strMeal": "Bean & Sausage Hotpot",
      "strDrinkAlternate": null,
      "strCategory": "Miscellaneous",
      "strArea": "British",
      "strInstructions": "In a large casserole, fry the sausages until brown all over – about 10 mins.\r\n\r\nAdd the tomato sauce, stirring well, then stir in the beans, treacle or sugar and mustard. Bring to the simmer, cover and cook for 30 mins. Great served with crusty bread or rice.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/vxuyrx1511302687.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=B0YX0yPX4Wo",
      "strIngredient1": "Sausages",
      "strIngredient2": "Tomato Sauce",
      "strIngredient3": "Butter Beans",
      "strIngredient4": "Black Treacle",
      "strIngredient5": "English Mustard",
      "strIngredient6": "",
      "strIngredient7": "",
      "strIngredient8": "",
      "strIngredient9": "",
      "strIngredient10": "",
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "8 large",
      "strMeasure2": "1 Jar",
      "strMeasure3": "1200g",
      "strMeasure4": "1 tbls",
      "strMeasure5": "1 tsp ",
      "strMeasure6": "",
      "strMeasure7": "",
      "strMeasure8": "",
      "strMeasure9": "",
      "strMeasure10": "",
      "strMeasure11": "",
      "strMeasure12": "",
      "strMeasure13": "",
      "strMeasure14": "",
      "strMeasure15": "",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://www.bbcgoodfood.com/recipes/339607/bean-and-sausage-hotpot",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52855",
      "strMeal": "Banana Pancakes",
      "strDrinkAlternate": null,
      "strCategory": "Dessert",
      "strArea": "American",
      "strInstructions": "In a bowl, mash the banana with a fork until it resembles a thick purée. Stir in the eggs, baking powder and vanilla.\r\nHeat a large non-stick frying pan or pancake pan over a medium heat and brush with half the oil. Using half the batter, spoon two pancakes into the pan, cook for 1-2 mins each side, then tip onto a plate. Repeat the process with the remaining oil and batter. Top the pancakes with the pecans and raspberries.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/sywswr1511383814.jpg",
      "strTags": "Breakfast,Desert,Sweet",
      "strYoutube": "https://www.youtube.com/watch?v=kSKtb2Sv-_U",
      "strIngredient1": "Banana",
      "strIngredient2": "Eggs",
      "strIngredient3": "Baking Powder",
      "strIngredient4": "Vanilla Extract",
      "strIngredient5": "Oil",
      "strIngredient6": "Pecan Nuts",
      "strIngredient7": "Raspberries",
      "strIngredient8": "",
      "strIngredient9": "",
      "strIngredient10": "",
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "1 large",
      "strMeasure2": "2 medium",
      "strMeasure3": "pinch",
      "strMeasure4": "spinkling",
      "strMeasure5": "1 tsp ",
      "strMeasure6": "25g",
      "strMeasure7": "125g",
      "strMeasure8": "",
      "strMeasure9": "",
      "strMeasure10": "",
      "strMeasure11": "",
      "strMeasure12": "",
      "strMeasure13": "",
      "strMeasure14": "",
      "strMeasure15": "",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://www.bbcgoodfood.com/recipes/banana-pancakes",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52873",
      "strMeal": "Beef Dumpling Stew",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "British",
      "strInstructions": "Preheat the oven to 180C/350F/Gas 4.\r\n\r\nFor the beef stew, heat the oil and butter in an ovenproof casserole and fry the beef until browned on all sides.\r\n\r\nSprinkle over the flour and cook for a further 2-3 minutes.\r\n\r\nAdd the garlic and all the vegetables and fry for 1-2 minutes.\r\n\r\nStir in the wine, stock and herbs, then add the Worcestershire sauce and balsamic vinegar, to taste. Season with salt and freshly ground black pepper.\r\n\r\nCover with a lid, transfer to the oven and cook for about two hours, or until the meat is tender.\r\n\r\nFor the dumplings, sift the flour, baking powder and salt into a bowl.\r\nAdd the suet and enough water to form a thick dough.\r\n\r\nWith floured hands, roll spoonfuls of the dough into small balls.\r\n\r\nAfter two hours, remove the lid from the stew and place the balls on top of the stew. Cover, return to the oven and cook for a further 20 minutes, or until the dumplings have swollen and are tender. (If you prefer your dumplings with a golden top, leave the lid off when returning to the oven.)\r\n\r\nTo serve, place a spoonful of mashed potato onto each of four serving plates and top with the stew and dumplings. Sprinkle with chopped parsley.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/uyqrrv1511553350.jpg",
      "strTags": "Stew,Baking",
      "strYoutube": "https://www.youtube.com/watch?v=6NgheY-r5t0",
      "strIngredient1": "Olive Oil",
      "strIngredient2": "Butter",
      "strIngredient3": "Beef",
      "strIngredient4": "Plain Flour",
      "strIngredient5": "Garlic",
      "strIngredient6": "Onions",
      "strIngredient7": "Celery",
      "strIngredient8": "Carrots",
      "strIngredient9": "Leek",
      "strIngredient10": "Swede",
      "strIngredient11": "Red Wine",
      "strIngredient12": "Beef Stock",
      "strIngredient13": "Bay Leaf",
      "strIngredient14": "Thyme",
      "strIngredient15": "Parsley",
      "strIngredient16": "Plain Flour",
      "strIngredient17": "Baking Powder",
      "strIngredient18": "Suet",
      "strIngredient19": "Water",
      "strIngredient20": null,
      "strMeasure1": "2 tbs",
      "strMeasure2": "25g",
      "strMeasure3": "750g",
      "strMeasure4": "2 tblsp ",
      "strMeasure5": "2 cloves minced",
      "strMeasure6": "175g",
      "strMeasure7": "150g",
      "strMeasure8": "150g",
      "strMeasure9": "2 chopped",
      "strMeasure10": "200g",
      "strMeasure11": "150ml",
      "strMeasure12": "500g",
      "strMeasure13": "2",
      "strMeasure14": "3 tbs",
      "strMeasure15": "3 tblsp chopped",
      "strMeasure16": "125g",
      "strMeasure17": "1 tsp ",
      "strMeasure18": "60g",
      "strMeasure19": "Splash",
      "strMeasure20": "",
      "strSource": "https://www.bbc.co.uk/food/recipes/beefstewwithdumpling_87333",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52874",
      "strMeal": "Beef and Mustard Pie",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "British",
      "strInstructions": "Preheat the oven to 150C/300F/Gas 2.\r\nToss the beef and flour together in a bowl with some salt and black pepper.\r\nHeat a large casserole until hot, add half of the rapeseed oil and enough of the beef to just cover the bottom of the casserole.\r\nFry until browned on each side, then remove and set aside. Repeat with the remaining oil and beef.\r\nReturn the beef to the pan, add the wine and cook until the volume of liquid has reduced by half, then add the stock, onion, carrots, thyme and mustard, and season well with salt and pepper.\r\nCover with a lid and place in the oven for two hours.\r\nRemove from the oven, check the seasoning and set aside to cool. Remove the thyme.\r\nWhen the beef is cool and you're ready to assemble the pie, preheat the oven to 200C/400F/Gas 6.\r\nTransfer the beef to a pie dish, brush the rim with the beaten egg yolks and lay the pastry over the top. Brush the top of the pastry with more beaten egg.\r\nTrim the pastry so there is just enough excess to crimp the edges, then place in the oven and bake for 30 minutes, or until the pastry is golden-brown and cooked through.\r\nFor the green beans, bring a saucepan of salted water to the boil, add the beans and cook for 4-5 minutes, or until just tender.\r\nDrain and toss with the butter, then season with black pepper.\r\nTo serve, place a large spoonful of pie onto each plate with some green beans alongside.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
      "strTags": "Meat,Pie",
      "strYoutube": "https://www.youtube.com/watch?v=nMyBC9staMU",
      "strIngredient1": "Beef",
      "strIngredient2": "Plain Flour",
      "strIngredient3": "Rapeseed Oil",
      "strIngredient4": "Red Wine",
      "strIngredient5": "Beef Stock",
      "strIngredient6": "Onion",
      "strIngredient7": "Carrots",
      "strIngredient8": "Thyme",
      "strIngredient9": "Mustard",
      "strIngredient10": "Egg Yolks",
      "strIngredient11": "Puff Pastry",
      "strIngredient12": "Green Beans",
      "strIngredient13": "Butter",
      "strIngredient14": "Salt",
      "strIngredient15": "Pepper",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "1kg",
      "strMeasure2": "2 tbs",
      "strMeasure3": "2 tbs",
      "strMeasure4": "200ml",
      "strMeasure5": "400ml",
      "strMeasure6": "1 finely sliced",
      "strMeasure7": "2 chopped",
      "strMeasure8": "3 sprigs",
      "strMeasure9": "2 tbs",
      "strMeasure10": "2 free-range",
      "strMeasure11": "400g",
      "strMeasure12": "300g",
      "strMeasure13": "25g",
      "strMeasure14": "pinch",
      "strMeasure15": "pinch",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://www.bbc.co.uk/food/recipes/beef_and_mustard_pie_58002",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52878",
      "strMeal": "Beef and Oyster pie",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "British",
      "strInstructions": "Season the beef cubes with salt and black pepper. Heat a tablespoon of oil in the frying pan and fry the meat over a high heat. Do this in three batches so that you don’t overcrowd the pan, transferring the meat to a large flameproof casserole dish once it is browned all over. Add extra oil if the pan seems dry.\r\nIn the same pan, add another tablespoon of oil and cook the shallots for 4-5 minutes, then add the garlic and fry for 30 seconds. Add the bacon and fry until slightly browned. Transfer the onion and bacon mixture to the casserole dish and add the herbs.\r\nPreheat the oven to 180C/350F/Gas 4.\r\nPour the stout into the frying pan and bring to the boil, stirring to lift any stuck-on browned bits from the bottom of the pan. Pour the stout over the beef in the casserole dish and add the stock. Cover the casserole and place it in the oven for 1½-2 hours, or until the beef is tender and the sauce is reduced.\r\nSkim off any surface fat, taste and add salt and pepper if necessary, then stir in the cornflour paste. Put the casserole dish on the hob – don’t forget that it will be hot – and simmer for 1-2 minutes, stirring, until thickened. Leave to cool.\r\nIncrease the oven to 200C/400F/Gas 6. To make the pastry, put the flour and salt in a very large bowl. Grate the butter and stir it into the flour in three batches. Gradually add 325ml/11fl oz cold water – you may not need it all – and stir with a round-bladed knife until the mixture just comes together. Knead the pastry lightly into a ball on a lightly floured surface and set aside 250g/9oz for the pie lid.\r\nRoll the rest of the pastry out until about 2cm/¾in larger than the dish you’re using. Line the dish with the pastry then pile in the filling, tucking the oysters in as well. Brush the edge of the pastry with beaten egg.\r\nRoll the remaining pastry until slightly larger than your dish and gently lift over the filling, pressing the edges firmly to seal, then trim with a sharp knife. Brush with beaten egg to glaze. Put the dish on a baking tray and bake for 25-30 minutes, or until the pastry is golden-brown and the filling is bubbling.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/wrssvt1511556563.jpg",
      "strTags": "Pie",
      "strYoutube": "https://www.youtube.com/watch?v=ONX74yP6JnI",
      "strIngredient1": "Beef",
      "strIngredient2": "Olive Oil",
      "strIngredient3": "Shallots",
      "strIngredient4": "Garlic",
      "strIngredient5": "Bacon",
      "strIngredient6": "Thyme",
      "strIngredient7": "Bay Leaf",
      "strIngredient8": "Stout",
      "strIngredient9": "Beef Stock",
      "strIngredient10": "Corn Flour",
      "strIngredient11": "Oysters",
      "strIngredient12": "Plain Flour",
      "strIngredient13": "Salt",
      "strIngredient14": "Butter",
      "strIngredient15": "Eggs",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "900g",
      "strMeasure2": "3 tbs",
      "strMeasure3": "3",
      "strMeasure4": "2 cloves minced",
      "strMeasure5": "125g",
      "strMeasure6": "1 tbs chopped",
      "strMeasure7": "2",
      "strMeasure8": "330ml",
      "strMeasure9": "400ml",
      "strMeasure10": "2 tbs",
      "strMeasure11": "8",
      "strMeasure12": "400g",
      "strMeasure13": "pinch",
      "strMeasure14": "250g",
      "strMeasure15": "To Glaze",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://www.bbc.co.uk/food/recipes/beef_and_oyster_pie_65230",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52891",
      "strMeal": "Blackberry Fool",
      "strDrinkAlternate": null,
      "strCategory": "Dessert",
      "strArea": "British",
      "strInstructions": "For the biscuits, preheat the oven to 200C/180C (fan)/Gas 6 and line two large baking trays with baking parchment. Scatter the nuts over a baking tray and roast in the oven for 6-8 minutes, or until golden-brown. Watch them carefully so that they don’t have a chance to burn. Remove from the oven, tip onto a board and leave to cool.\r\nPut the butter and sugar in a large bowl and beat with a wooden spoon until light and creamy. Roughly chop the cooled nuts and add to the creamed butter and sugar, along with the lemon zest, flour and baking powder. Stir well until the mixture comes together and forms a ball – you may need to use your hands.\r\nDivide the biscuit dough into 24 even pieces and roll into small balls. Place the balls the prepared baking trays, spaced well apart to allow for spreading.\r\nPress the biscuits to flatten to around 1cm/½in thick. Bake the biscuits, one tray at a time, for 12 minutes or until very pale golden-brown. Leave to cool on the trays. They will be very soft when you take them out of the oven, but will crisp as they cool.\r\nStore in an airtight tin and eat within five days.\r\nFor the fool, rinse the blackberries in a colander to wash away any dust or dirt. Put the blackberries in a non-stick saucepan and sprinkle over the caster sugar.\r\nStir in the lemon juice and heat gently for two minutes, or until the blackberries begin to soften and release their juices. Remove and reserve 12 blackberries for decoration and continue cooking the rest.\r\nSimmer the blackberries very gently for 15 minutes, stirring regularly until very soft and squidgy. Remove from the heat and press the berries and juice through a sieve over a bowl, using the bottom of a ladle to help you extract as much of the purée as possible. Leave the purée to cool and discard the seeds. You should end up with around 325ml/11fl oz of purée.\r\nPut the cream and yoghurt in a large bowl and whip with an electric whisk until soft peaks form when the whisk is removed from the bowl – the acidity of the fruit will thicken the cream further, so don’t take it too far.\r\nWhen the purée is completely cold, adjust the sweetness to taste by adding more sugar if needed. Pour it into the bowl with the whipped cream and yoghurt and stir just once or twice until very lightly combined.\r\nSpoon the blackberry fool into individual wide, glass dishes – or one large, single bowl. It should look quite marbled, so don’t over-stir it. Scatter a few tiny mint leaves on top and decorate with the reserved blackberries. Sprinkle with a little sugar if you like and serve with the hazelnut biscuits.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/rpvptu1511641092.jpg",
      "strTags": "Desert,Summer,Fruity,Dairy",
      "strYoutube": "https://www.youtube.com/watch?v=kniRGjDLFrQ",
      "strIngredient1": "Hazlenuts",
      "strIngredient2": "Butter",
      "strIngredient3": "Caster Sugar",
      "strIngredient4": "Lemon",
      "strIngredient5": "Plain Flour",
      "strIngredient6": "Baking Powder",
      "strIngredient7": "Blackberries",
      "strIngredient8": "Sugar",
      "strIngredient9": "Caster Sugar",
      "strIngredient10": "Lemon Juice",
      "strIngredient11": "Double Cream",
      "strIngredient12": "Yogurt",
      "strIngredient13": "Mint",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "50g",
      "strMeasure2": "125g",
      "strMeasure3": "150g",
      "strMeasure4": "Grated",
      "strMeasure5": "150g",
      "strMeasure6": "½ tsp",
      "strMeasure7": "600g",
      "strMeasure8": "75g",
      "strMeasure9": "2 tbs",
      "strMeasure10": "1 tbs",
      "strMeasure11": "300ml ",
      "strMeasure12": "100ml",
      "strMeasure13": "Garnish with",
      "strMeasure14": "",
      "strMeasure15": "",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://www.bbc.co.uk/food/recipes/blackberry_fool_with_11859",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52894",
      "strMeal": "Battenberg Cake",
      "strDrinkAlternate": null,
      "strCategory": "Dessert",
      "strArea": "British",
      "strInstructions": "Heat oven to 180C/160C fan/gas 4 and line the base and sides of a 20cm square tin with baking parchment (the easiest way is to cross 2 x 20cm-long strips over the base). To make the almond sponge, put the butter, sugar, flour, ground almonds, baking powder, eggs, vanilla and almond extract in a large bowl. Beat with an electric whisk until the mix comes together smoothly. Scrape into the tin, spreading to the corners, and bake for 25-30 mins – when you poke in a skewer, it should come out clean. Cool in the tin for 10 mins, then transfer to a wire rack to finish cooling while you make the second sponge.\r\nFor the pink sponge, line the tin as above. Mix all the ingredients together as above, but don’t add the almond extract. Fold in some pink food colouring. Then scrape it all into the tin and bake as before. Cool.\r\nTo assemble, heat the jam in a small pan until runny, then sieve. Barely trim two opposite edges from the almond sponge, then well trim a third edge. Roughly measure the height of the sponge, then cutting from the well-trimmed edge, use a ruler to help you cut 4 slices each the same width as the sponge height. Discard or nibble leftover sponge. Repeat with pink cake.\r\nTake 2 x almond slices and 2 x pink slices and trim so they are all the same length. Roll out one marzipan block on a surface lightly dusted with icing sugar to just over 20cm wide, then keep rolling lengthways until the marzipan is roughly 0.5cm thick. Brush with apricot jam, then lay a pink and an almond slice side by side at one end of the marzipan, brushing jam in between to stick sponges, and leaving 4cm clear marzipan at the end. Brush more jam on top of the sponges, then sandwich remaining 2 slices on top, alternating colours to give a checkerboard effect. Trim the marzipan to the length of the cakes.\r\nCarefully lift up the marzipan and smooth over the cake with your hands, but leave a small marzipan fold along the bottom edge before you stick it to the first side. Trim opposite side to match size of fold, then crimp edges using fingers and thumb (or, more simply, press with prongs of fork). If you like, mark the 10 slices using the prongs of a fork.\r\nAssemble second Battenberg and keep in an airtight box or well wrapped in cling film for up to 3 days. Can be frozen for up to a month.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/ywwrsp1511720277.jpg",
      "strTags": "Cake,Sweet",
      "strYoutube": "https://www.youtube.com/watch?v=aB41Q7kDZQ0",
      "strIngredient1": "Butter",
      "strIngredient2": "Caster Sugar",
      "strIngredient3": "Self-raising Flour",
      "strIngredient4": "Almonds",
      "strIngredient5": "Baking Powder",
      "strIngredient6": "Eggs",
      "strIngredient7": "Vanilla Extract",
      "strIngredient8": "Almond Extract",
      "strIngredient9": "Butter",
      "strIngredient10": "Caster Sugar",
      "strIngredient11": "Self-raising Flour",
      "strIngredient12": "Almonds",
      "strIngredient13": "Baking Powder",
      "strIngredient14": "Eggs",
      "strIngredient15": "Vanilla Extract",
      "strIngredient16": "Almond Extract",
      "strIngredient17": "Pink Food Colouring",
      "strIngredient18": "Apricot",
      "strIngredient19": "Marzipan",
      "strIngredient20": "Icing Sugar",
      "strMeasure1": "175g",
      "strMeasure2": "175g",
      "strMeasure3": "140g",
      "strMeasure4": "50g",
      "strMeasure5": "½ tsp",
      "strMeasure6": "3 Medium",
      "strMeasure7": "½ tsp",
      "strMeasure8": "¼ teaspoon",
      "strMeasure9": "175g",
      "strMeasure10": "175g",
      "strMeasure11": "140g",
      "strMeasure12": "50g",
      "strMeasure13": "½ tsp",
      "strMeasure14": "3 Medium",
      "strMeasure15": "½ tsp",
      "strMeasure16": "¼ teaspoon",
      "strMeasure17": "½ tsp",
      "strMeasure18": "200g",
      "strMeasure19": "1kg",
      "strMeasure20": "Dusting",
      "strSource": "https://www.bbcgoodfood.com/recipes/1120657/battenberg-cake",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52904",
      "strMeal": "Beef Bourguignon",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "French",
      "strInstructions": "Heat a large casserole pan and add 1 tbsp goose fat. Season the beef and fry until golden brown, about 3-5 mins, then turn over and fry the other side until the meat is browned all over, adding more fat if necessary. Do this in 2-3 batches, transferring the meat to a colander set over a bowl when browned.\r\nIn the same pan, fry the bacon, shallots or pearl onions, mushrooms, garlic and bouquet garni until lightly browned. Mix in the tomato purée and cook for a few mins, stirring into the mixture. This enriches the bourguignon and makes a great base for the stew. Then return the beef and any drained juices to the pan and stir through.\r\nPour over the wine and about 100ml water so the meat bobs up from the liquid, but isn’t completely covered. Bring to the boil and use a spoon to scrape the caramelised cooking juices from the bottom of the pan – this will give the stew more flavour.\r\nHeat oven to 150C/fan 130C/gas 2. Make a cartouche: tear off a square of foil slightly larger than the casserole, arrange it in the pan so it covers the top of the stew and trim away any excess foil. Then cook for 3 hrs. If the sauce looks watery, remove the beef and veg with a slotted spoon, and set aside. Cook the sauce over a high heat for a few mins until the sauce has thickened a little, then return the beef and vegetables to the pan.\r\nTo make the celeriac mash, peel the celeriac and cut into cubes. Heat the olive oil in a large frying pan. Tip in the celeriac and fry for 5 mins until it turns golden. Season well with salt and pepper. Stir in the rosemary, thyme, bay and cardamom pods, then pour over 200ml water, enough to nearly cover the celeriac. Turn the heat to low, partially cover the pan and leave to simmer for 25-30 mins.\r\nAfter 25-30 mins, the celeriac should be soft and most of the water will have evaporated. Drain away any remaining water, then remove the herb sprigs, bay and cardamom pods. Lightly crush with a potato masher, then finish with a glug of olive oil and season to taste. Spoon the beef bourguignon into serving bowls and place a large spoonful of the celeriac mash on top. Garnish with one of the bay leaves, if you like.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/vtqxtu1511784197.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=SQnr4Z-7rok",
      "strIngredient1": "Goose Fat",
      "strIngredient2": "Beef Shin",
      "strIngredient3": "Bacon",
      "strIngredient4": "Challots",
      "strIngredient5": "Chestnut Mushroom",
      "strIngredient6": "Garlic Clove",
      "strIngredient7": "Bouquet Garni",
      "strIngredient8": "Tomato Puree",
      "strIngredient9": "Red Wine",
      "strIngredient10": "Celeriac",
      "strIngredient11": "Olive Oil",
      "strIngredient12": "Thyme",
      "strIngredient13": "Rosemary",
      "strIngredient14": "Bay Leaf",
      "strIngredient15": "Cardamom",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "3 tsp",
      "strMeasure2": "600g",
      "strMeasure3": "100g ",
      "strMeasure4": "350g",
      "strMeasure5": "250g",
      "strMeasure6": "2 sliced",
      "strMeasure7": "1",
      "strMeasure8": "1 tbs",
      "strMeasure9": "750 ml ",
      "strMeasure10": "600g",
      "strMeasure11": "2 tbs",
      "strMeasure12": "sprigs of fresh",
      "strMeasure13": "sprigs of fresh",
      "strMeasure14": "2",
      "strMeasure15": "4",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://www.bbcgoodfood.com/recipes/5032/beef-bourguignon",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52913",
      "strMeal": "Brie wrapped in prosciutto & brioche",
      "strDrinkAlternate": null,
      "strCategory": "Side",
      "strArea": "French",
      "strInstructions": "Mix the flour, 1 tsp salt, caster sugar, yeast, milk and eggs together in a mixer using the dough attachment for 5 mins until the dough is smooth. Add the butter and mix for a further 4 mins on medium speed. Scrape the dough bowl and mix again for 1 min. Place the dough in a container, cover with cling film and leave in the fridge for at least 6 hrs before using.\r\nWrap the Brie in the prosciutto and set aside. Turn out the dough onto a lightly floured surface. Roll into a 25cm circle. Place the wrapped Brie in the middle of the circle and fold the edges in neatly. Put the parcel onto a baking tray lined with baking parchment and brush with beaten egg. Chill in the fridge for 30 mins, then brush again with beaten egg and chill for a further 30 mins. Leave to rise for 1 hr at room temperature. Heat oven to 200C/180C fan/gas 6, then bake for 22 mins. Serve warm.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/qqpwsy1511796276.jpg",
      "strTags": "SideDish,Treat,Baking",
      "strYoutube": "https://www.youtube.com/watch?v=FzNPPD8lbWg",
      "strIngredient1": "Plain Flour",
      "strIngredient2": "Caster Sugar",
      "strIngredient3": "Yeast",
      "strIngredient4": "Milk",
      "strIngredient5": "Eggs",
      "strIngredient6": "Eggs",
      "strIngredient7": "Butter",
      "strIngredient8": "Brie",
      "strIngredient9": "Prosciutto",
      "strIngredient10": "",
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "375g",
      "strMeasure2": "50g",
      "strMeasure3": "7g",
      "strMeasure4": "75g",
      "strMeasure5": "3 Large",
      "strMeasure6": "To Glaze",
      "strMeasure7": "180g",
      "strMeasure8": "250g",
      "strMeasure9": "8 slices",
      "strMeasure10": "",
      "strMeasure11": "",
      "strMeasure12": "",
      "strMeasure13": "",
      "strMeasure14": "",
      "strMeasure15": "",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://www.bbcgoodfood.com/recipes/1803634/brie-wrapped-in-prosciutto-and-brioche",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52914",
      "strMeal": "Boulangère Potatoes",
      "strDrinkAlternate": null,
      "strCategory": "Side",
      "strArea": "French",
      "strInstructions": "Heat oven to 200C/fan 180C/gas 6. Fry the onions and thyme sprigs in the oil until softened and lightly coloured (about 5 mins).\r\nSpread a layer of potatoes over the base of a 1.5-litre oiled gratin dish. Sprinkle over a few onions (see picture, above) and continue layering, finishing with a layer of potatoes. Pour over the stock and bake for 50-60 mins until the potatoes are cooked and the top is golden and crisp.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/qywups1511796761.jpg",
      "strTags": "SideDish",
      "strYoutube": "https://www.youtube.com/watch?v=gcXPruv1Mjg",
      "strIngredient1": "Onions",
      "strIngredient2": "Thyme",
      "strIngredient3": "Olive Oil",
      "strIngredient4": "Potatoes",
      "strIngredient5": "Vegetable Stock",
      "strIngredient6": "",
      "strIngredient7": "",
      "strIngredient8": "",
      "strIngredient9": "",
      "strIngredient10": "",
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "2 finely chopped",
      "strMeasure2": "sprigs of fresh",
      "strMeasure3": "2 tbs",
      "strMeasure4": "1.5kg",
      "strMeasure5": "425g",
      "strMeasure6": "",
      "strMeasure7": "",
      "strMeasure8": "",
      "strMeasure9": "",
      "strMeasure10": "",
      "strMeasure11": "",
      "strMeasure12": "",
      "strMeasure13": "",
      "strMeasure14": "",
      "strMeasure15": "",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://www.bbcgoodfood.com/recipes/5056/boulangre-potatoes",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52928",
      "strMeal": "BeaverTails",
      "strDrinkAlternate": null,
      "strCategory": "Dessert",
      "strArea": "Canadian",
      "strInstructions": "In the bowl of a stand mixer, add warm water, a big pinch of sugar and yeast. Allow to sit until frothy.\r\nInto the same bowl, add 1/2 cup sugar, warm milk, melted butter, eggs and salt, and whisk until combined.\r\nPlace a dough hook on the mixer, add the flour with the machine on, until a smooth but slightly sticky dough forms.\r\nPlace dough in a bowl, cover with plastic wrap, and allow to proof for 1 1/2 hours.\r\nCut dough into 12 pieces, and roll out into long oval-like shapes about 1/4 inch thick that resemble a beaver’s tail.\r\nIn a large, deep pot, heat oil to 350 degrees. Gently place beavertail dough into hot oil and cook for 30 to 45 seconds on each side until golden brown.\r\nDrain on paper towels, and garnish as desired. Toss in cinnamon sugar, in white sugar with a squeeze of lemon, or with a generous slathering of Nutella and a handful of toasted almonds. Enjoy!",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/ryppsv1511815505.jpg",
      "strTags": "Treat,Pudding,Speciality",
      "strYoutube": "https://www.youtube.com/watch?v=2G07UOqU2e8",
      "strIngredient1": "Water",
      "strIngredient2": "Yeast",
      "strIngredient3": "Sugar",
      "strIngredient4": "Milk",
      "strIngredient5": "Butter",
      "strIngredient6": "Eggs",
      "strIngredient7": "Salt",
      "strIngredient8": "Flour",
      "strIngredient9": "Oil",
      "strIngredient10": "Lemon",
      "strIngredient11": "Sugar",
      "strIngredient12": "Cinnamon",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "1/2 cup ",
      "strMeasure2": "2 parts ",
      "strMeasure3": "1/2 cup ",
      "strMeasure4": "1/2 cup ",
      "strMeasure5": "6 tblsp",
      "strMeasure6": "2",
      "strMeasure7": "1 ½ tsp",
      "strMeasure8": "2-1/2 cups",
      "strMeasure9": "for frying",
      "strMeasure10": "garnish",
      "strMeasure11": "garnish",
      "strMeasure12": "garnish",
      "strMeasure13": "",
      "strMeasure14": "",
      "strMeasure15": "",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://www.tastemade.com/videos/beavertails",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52940",
      "strMeal": "Brown Stew Chicken",
      "strDrinkAlternate": null,
      "strCategory": "Chicken",
      "strArea": "Jamaican",
      "strInstructions": "Squeeze lime over chicken and rub well. Drain off excess lime juice.\r\nCombine tomato, scallion, onion, garlic, pepper, thyme, pimento and soy sauce in a large bowl with the chicken pieces. Cover and marinate at least one hour.\r\nHeat oil in a dutch pot or large saucepan. Shake off the seasonings as you remove each piece of chicken from the marinade. Reserve the marinade for sauce.\r\nLightly brown the chicken a few pieces at a time in very hot oil. Place browned chicken pieces on a plate to rest while you brown the remaining pieces.\r\nDrain off excess oil and return the chicken to the pan. Pour the marinade over the chicken and add the carrots. Stir and cook over medium heat for 10 minutes.\r\nMix flour and coconut milk and add to stew, stirring constantly. Turn heat down to minimum and cook another 20 minutes or until tender.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg",
      "strTags": "Stew",
      "strYoutube": "https://www.youtube.com/watch?v=_gFB1fkNhXs",
      "strIngredient1": "Chicken",
      "strIngredient2": "Tomato",
      "strIngredient3": "Onions",
      "strIngredient4": "Garlic Clove",
      "strIngredient5": "Red Pepper",
      "strIngredient6": "Carrots",
      "strIngredient7": "Lime",
      "strIngredient8": "Thyme",
      "strIngredient9": "Allspice",
      "strIngredient10": "Soy Sauce",
      "strIngredient11": "Cornstarch",
      "strIngredient12": "Coconut Milk",
      "strIngredient13": "Vegetable Oil",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "1 whole",
      "strMeasure2": "1 chopped",
      "strMeasure3": "2 chopped",
      "strMeasure4": "2 chopped",
      "strMeasure5": "1 chopped",
      "strMeasure6": "1 chopped",
      "strMeasure7": "1",
      "strMeasure8": "2 tsp",
      "strMeasure9": "1 tsp ",
      "strMeasure10": "2 tbs",
      "strMeasure11": "2 tsp",
      "strMeasure12": "2 cups ",
      "strMeasure13": "1 tbs",
      "strMeasure14": "",
      "strMeasure15": "",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "http://www.geniuskitchen.com/recipe/authentic-jamaican-brown-stew-chicken-347996",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52952",
      "strMeal": "Beef Lo Mein",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "Chinese",
      "strInstructions": "STEP 1 - MARINATING THE BEEF\r\nIn a bowl, add the beef, salt, 1 pinch white pepper, 1 Teaspoon sesame seed oil, 1/2 egg, corn starch,1 Tablespoon of oil and mix together.\r\nSTEP 2 - BOILING THE THE NOODLES\r\nIn a 6 qt pot add your noodles to boiling water until the noodles are submerged and boil on high heat for 10 seconds. After your noodles is done boiling strain and cool with cold water.\r\nSTEP 3 - STIR FRY\r\nAdd 2 Tablespoons of oil, beef and cook on high heat untill beef is medium cooked.\r\nSet the cooked beef aside\r\nIn a wok add 2 Tablespoon of oil, onions, minced garlic, minced ginger, bean sprouts, mushrooms, peapods and 1.5 cups of water or until the vegetables are submerged in water.\r\nAdd the noodles to wok\r\nTo make the sauce, add oyster sauce, 1 pinch white pepper, 1 teaspoon sesame seed oil, sugar, and 1 Teaspoon of soy sauce.\r\nNext add the beef to wok and stir-fry",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1529444830.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=ZT9LSsNXXe0",
      "strIngredient1": "Beef",
      "strIngredient2": "Salt",
      "strIngredient3": "Pepper",
      "strIngredient4": "Sesame Seed Oil",
      "strIngredient5": "Egg",
      "strIngredient6": "Starch",
      "strIngredient7": "Oil",
      "strIngredient8": "Noodles",
      "strIngredient9": "Onion",
      "strIngredient10": "Minced Garlic",
      "strIngredient11": "Ginger",
      "strIngredient12": "Bean Sprouts",
      "strIngredient13": "Mushrooms",
      "strIngredient14": "Water",
      "strIngredient15": "Oyster Sauce",
      "strIngredient16": "Sugar",
      "strIngredient17": "Soy Sauce",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "1/2 lb",
      "strMeasure2": "pinch",
      "strMeasure3": "pinch",
      "strMeasure4": "2 tsp",
      "strMeasure5": "1/2 ",
      "strMeasure6": "3 tbs",
      "strMeasure7": "5 tbs",
      "strMeasure8": "1/4 lb",
      "strMeasure9": "1/2 cup ",
      "strMeasure10": "1 tsp ",
      "strMeasure11": "1 tsp ",
      "strMeasure12": "1 cup ",
      "strMeasure13": "1 cup ",
      "strMeasure14": "1 cup ",
      "strMeasure15": "1 tbs",
      "strMeasure16": "1 tsp ",
      "strMeasure17": "1 tsp ",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://sueandgambo.com/pages/beef-lo-mein",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52959",
      "strMeal": "Baked salmon with fennel & tomatoes",
      "strDrinkAlternate": null,
      "strCategory": "Seafood",
      "strArea": "British",
      "strInstructions": "Heat oven to 180C/fan 160C/gas 4. Trim the fronds from the fennel and set aside. Cut the fennel bulbs in half, then cut each half into 3 wedges. Cook in boiling salted water for 10 mins, then drain well. Chop the fennel fronds roughly, then mix with the parsley and lemon zest.\r\n\r\nSpread the drained fennel over a shallow ovenproof dish, then add the tomatoes. Drizzle with olive oil, then bake for 10 mins. Nestle the salmon among the veg, sprinkle with lemon juice, then bake 15 mins more until the fish is just cooked. Scatter over the parsley and serve.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1548772327.jpg",
      "strTags": "Paleo,Keto,HighFat,Baking,LowCarbs",
      "strYoutube": "https://www.youtube.com/watch?v=xvPR2Tfw5k0",
      "strIngredient1": "Fennel",
      "strIngredient2": "Parsley",
      "strIngredient3": "Lemon",
      "strIngredient4": "Cherry Tomatoes",
      "strIngredient5": "Olive Oil",
      "strIngredient6": "Salmon",
      "strIngredient7": "Black Olives",
      "strIngredient8": "",
      "strIngredient9": "",
      "strIngredient10": "",
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "2 medium",
      "strMeasure2": "2 tbs chopped",
      "strMeasure3": "Juice of 1",
      "strMeasure4": "175g",
      "strMeasure5": "1 tbs",
      "strMeasure6": "350g",
      "strMeasure7": "to serve",
      "strMeasure8": "",
      "strMeasure9": "",
      "strMeasure10": "",
      "strMeasure11": "",
      "strMeasure12": "",
      "strMeasure13": "",
      "strMeasure14": "",
      "strMeasure15": "",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://www.bbcgoodfood.com/recipes/7745/baked-salmon-with-fennel-and-tomatoes",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52961",
      "strMeal": "Budino Di Ricotta",
      "strDrinkAlternate": null,
      "strCategory": "Dessert",
      "strArea": "Italian",
      "strInstructions": "Mash the ricotta and beat well with the egg yolks, stir in the flour, sugar, cinnamon, grated lemon rind and the rum and mix well. You can do this in a food processor. Beat the egg whites until stiff, fold in and pour into a buttered and floured 25cm cake tin. Bake in the oven at 180ºC/160ºC fan/gas 4 for about 40 minutes, or until it is firm.\r\n\r\nServe hot or cold dusted with icing sugar.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1549542877.jpg",
      "strTags": "Cake,Baking,Desert,Sweet,Alcoholic,Calorific",
      "strYoutube": "https://www.youtube.com/watch?v=6dzd6Ra6sb4",
      "strIngredient1": "Ricotta",
      "strIngredient2": "Eggs",
      "strIngredient3": "Flour",
      "strIngredient4": "Sugar",
      "strIngredient5": "Cinnamon",
      "strIngredient6": "Lemons",
      "strIngredient7": "Dark Rum",
      "strIngredient8": "Icing Sugar",
      "strIngredient9": "",
      "strIngredient10": "",
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "500g",
      "strMeasure2": "4 large",
      "strMeasure3": "3 tbs",
      "strMeasure4": "250g",
      "strMeasure5": "1 tsp ",
      "strMeasure6": "Grated Zest of 2",
      "strMeasure7": "5 tbs",
      "strMeasure8": "sprinking",
      "strMeasure9": "",
      "strMeasure10": "",
      "strMeasure11": "",
      "strMeasure12": "",
      "strMeasure13": "",
      "strMeasure14": "",
      "strMeasure15": "",
      "strMeasure16": "",
      "strMeasure17": "",
      "strMeasure18": "",
      "strMeasure19": "",
      "strMeasure20": "",
      "strSource": "https://thehappyfoodie.co.uk/recipes/ricotta-cake-budino-di-ricotta",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52965",
      "strMeal": "Breakfast Potatoes",
      "strDrinkAlternate": null,
      "strCategory": "Breakfast",
      "strArea": "Canadian",
      "strInstructions": "Before you do anything, freeze your bacon slices that way when you're ready to prep, it'll be so much easier to chop!\r\nWash the potatoes and cut medium dice into square pieces. To prevent any browning, place the already cut potatoes in a bowl filled with water.\r\nIn the meantime, heat 1-2 tablespoons of oil in a large skillet over medium-high heat. Tilt the skillet so the oil spreads evenly.\r\nOnce the oil is hot, drain the potatoes and add to the skillet. Season with salt, pepper, and Old Bay as needed.\r\nCook for 10 minutes, stirring the potatoes often, until brown. If needed, add a tablespoon more of oil.\r\nChop up the bacon and add to the potatoes. The bacon will start to render and the fat will begin to further cook the potatoes. Toss it up a bit! The bacon will take 5-6 minutes to crisp.\r\nOnce the bacon is cooked, reduce the heat to medium-low, add the minced garlic and toss. Season once more. Add dried or fresh parsley. Control heat as needed.\r\nLet the garlic cook until fragrant, about one minute.\r\nJust before serving, drizzle over the maple syrup and toss. Let that cook another minute, giving the potatoes a caramelized effect.\r\nServe in a warm bowl with a sunny side up egg!",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1550441882.jpg",
      "strTags": "Breakfast,Brunch,",
      "strYoutube": "https://www.youtube.com/watch?v=BoD0TIO9nE4",
      "strIngredient1": "Potatoes",
      "strIngredient2": "Olive Oil",
      "strIngredient3": "Bacon",
      "strIngredient4": "Garlic Clove",
      "strIngredient5": "Maple Syrup",
      "strIngredient6": "Parsley",
      "strIngredient7": "Salt",
      "strIngredient8": "Pepper",
      "strIngredient9": "Allspice",
      "strIngredient10": "",
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "3 Medium",
      "strMeasure2": "1 tbs",
      "strMeasure3": "2 strips",
      "strMeasure4": "Minced",
      "strMeasure5": "1 tbs",
      "strMeasure6": "Garnish",
      "strMeasure7": "Pinch",
      "strMeasure8": "Pinch",
      "strMeasure9": "To taste",
      "strMeasure10": " ",
      "strMeasure11": " ",
      "strMeasure12": " ",
      "strMeasure13": " ",
      "strMeasure14": " ",
      "strMeasure15": " ",
      "strMeasure16": " ",
      "strMeasure17": " ",
      "strMeasure18": " ",
      "strMeasure19": " ",
      "strMeasure20": " ",
      "strSource": "http://www.vodkaandbiscuits.com/2014/03/06/bangin-breakfast-potatoes/",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52979",
      "strMeal": "Bitterballen (Dutch meatballs)",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "Dutch",
      "strInstructions": "Melt the butter in a skillet or pan. When melted, add the flour little by little and stir into a thick paste. Slowly stir in the stock, making sure the roux absorbs the liquid. Simmer for a couple of minutes on a low heat while you stir in the onion, parsley and the shredded meat. The mixture should thicken and turn into a heavy, thick sauce.\r\n\r\nPour the mixture into a shallow container, cover and refrigerate for several hours, or until the sauce has solidified.\r\n\r\nTake a heaping tablespoon of the cold, thick sauce and quickly roll it into a small ball. Roll lightly through the flour, then the egg and finally the breadcrumbs. Make sure that the egg covers the whole surface of the bitterbal. When done, refrigerate the snacks while the oil in your fryer heats up to 190C (375F). Fry four bitterballen at a time, until golden.\r\n\r\nServe on a plate with a nice grainy or spicy mustard. \r\n",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/lhqev81565090111.jpg",
      "strTags": "DinnerParty,HangoverFood,Alcoholic",
      "strYoutube": "https://www.youtube.com/watch?v=q8AKfYUtDuM",
      "strIngredient1": "Butter",
      "strIngredient2": "Flour",
      "strIngredient3": "Beef Stock",
      "strIngredient4": "Onion",
      "strIngredient5": "Parsley",
      "strIngredient6": "Beef",
      "strIngredient7": "Salt",
      "strIngredient8": "Pepper",
      "strIngredient9": "Nutmeg",
      "strIngredient10": "Flour",
      "strIngredient11": "Eggs",
      "strIngredient12": "Breadcrumbs",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "100g ",
      "strMeasure2": "150g",
      "strMeasure3": "700ml",
      "strMeasure4": "30g",
      "strMeasure5": "1 tbs",
      "strMeasure6": "400g",
      "strMeasure7": "Pinch",
      "strMeasure8": "Pinch",
      "strMeasure9": "Pinch",
      "strMeasure10": "50g",
      "strMeasure11": "2 Beaten ",
      "strMeasure12": "50g",
      "strMeasure13": " ",
      "strMeasure14": " ",
      "strMeasure15": " ",
      "strMeasure16": " ",
      "strMeasure17": " ",
      "strMeasure18": " ",
      "strMeasure19": " ",
      "strMeasure20": " ",
      "strSource": "https://www.holland.com/global/tourism/information/traditional-dutch-food/bitterballen.htm",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52995",
      "strMeal": "BBQ Pork Sloppy Joes",
      "strDrinkAlternate": null,
      "strCategory": "Pork",
      "strArea": "American",
      "strInstructions": "1\r\n\r\nPreheat oven to 450 degrees. Wash and dry all produce. Cut sweet potatoes into ½-inch-thick wedges. Toss on a baking sheet with a drizzle of oil, salt, and pepper. Roast until browned and tender, 20-25 minutes.\r\n\r\n2\r\n\r\nMeanwhile, halve and peel onion. Slice as thinly as possible until you have ¼ cup (½ cup for 4 servings); finely chop remaining onion. Peel and finely chop garlic. Halve lime; squeeze juice into a small bowl. Halve buns. Add 1 TBSP butter (2 TBSP for 4) to a separate small microwave-safe bowl; microwave until melted, 30 seconds. Brush onto cut sides of buns.\r\n\r\n3\r\n\r\nTo bowl with lime juice, add sliced onion, ¼ tsp sugar (½ tsp for 4 servings), and a pinch of salt. Stir to combine; set aside to quick-pickle.\r\n\r\n4\r\n\r\nHeat a drizzle of oil in a large pan over medium-high heat. Add chopped onion and season with salt and pepper. Cook, stirring, until softened, 4-5 minutes. Add garlic and cook until fragrant, 30 seconds more. Add pork and season with salt and pepper. Cook, breaking up meat into pieces, until browned and cooked through, 4-6 minutes.\r\n\r\n5\r\n\r\nWhile pork cooks, in a third small bowl, combine BBQ sauce, pickling liquid from onion, 3 TBSP ketchup (6 TBSP for 4 servings), ½ tsp sugar (1 tsp for 4), and ¼ cup water (⅓ cup for 4). Once pork is cooked through, add BBQ sauce mixture to pan. Cook, stirring, until sauce is thickened, 2-3 minutes. Taste and season with salt and pepper.\r\n\r\n6\r\n\r\nMeanwhile, toast buns in oven or toaster oven until golden, 3-5 minutes. Divide toasted buns between plates and fill with as much BBQ pork as you’d like. Top with pickled onion and hot sauce. Serve with sweet potato wedges on the side.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/atd5sh1583188467.jpg",
      "strTags": null,
      "strYoutube": "",
      "strIngredient1": "Potatoes",
      "strIngredient2": "Red Onions",
      "strIngredient3": "Garlic",
      "strIngredient4": "Lime",
      "strIngredient5": "Bread",
      "strIngredient6": "Pork",
      "strIngredient7": "Barbeque Sauce",
      "strIngredient8": "Hotsauce",
      "strIngredient9": "Tomato Ketchup",
      "strIngredient10": "Sugar",
      "strIngredient11": "Vegetable Oil",
      "strIngredient12": "Salt",
      "strIngredient13": "Pepper",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "2",
      "strMeasure2": "1",
      "strMeasure3": "2 cloves",
      "strMeasure4": "1",
      "strMeasure5": "2",
      "strMeasure6": "1 lb",
      "strMeasure7": " ",
      "strMeasure8": " ",
      "strMeasure9": " ",
      "strMeasure10": " ",
      "strMeasure11": " ",
      "strMeasure12": " ",
      "strMeasure13": " ",
      "strMeasure14": " ",
      "strMeasure15": " ",
      "strMeasure16": " ",
      "strMeasure17": " ",
      "strMeasure18": " ",
      "strMeasure19": " ",
      "strMeasure20": " ",
      "strSource": "",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "52997",
      "strMeal": "Beef Banh Mi Bowls with Sriracha Mayo, Carrot & Pickled Cucumber",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "Vietnamese",
      "strInstructions": "Add'l ingredients: mayonnaise, siracha\r\n\r\n1\r\n\r\nPlace rice in a fine-mesh sieve and rinse until water runs clear. Add to a small pot with 1 cup water (2 cups for 4 servings) and a pinch of salt. Bring to a boil, then cover and reduce heat to low. Cook until rice is tender, 15 minutes. Keep covered off heat for at least 10 minutes or until ready to serve.\r\n\r\n2\r\n\r\nMeanwhile, wash and dry all produce. Peel and finely chop garlic. Zest and quarter lime (for 4 servings, zest 1 lime and quarter both). Trim and halve cucumber lengthwise; thinly slice crosswise into half-moons. Halve, peel, and medium dice onion. Trim, peel, and grate carrot.\r\n\r\n3\r\n\r\nIn a medium bowl, combine cucumber, juice from half the lime, ¼ tsp sugar (½ tsp for 4 servings), and a pinch of salt. In a small bowl, combine mayonnaise, a pinch of garlic, a squeeze of lime juice, and as much sriracha as you’d like. Season with salt and pepper.\r\n\r\n4\r\n\r\nHeat a drizzle of oil in a large pan over medium-high heat. Add onion and cook, stirring, until softened, 4-5 minutes. Add beef, remaining garlic, and 2 tsp sugar (4 tsp for 4 servings). Cook, breaking up meat into pieces, until beef is browned and cooked through, 4-5 minutes. Stir in soy sauce. Turn off heat; taste and season with salt and pepper.\r\n\r\n5\r\n\r\nFluff rice with a fork; stir in lime zest and 1 TBSP butter. Divide rice between bowls. Arrange beef, grated carrot, and pickled cucumber on top. Top with a squeeze of lime juice. Drizzle with sriracha mayo.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/z0ageb1583189517.jpg",
      "strTags": null,
      "strYoutube": "",
      "strIngredient1": "Rice",
      "strIngredient2": "Onion",
      "strIngredient3": "Lime",
      "strIngredient4": "Garlic Clove",
      "strIngredient5": "Cucumber",
      "strIngredient6": "Carrots",
      "strIngredient7": "Ground Beef",
      "strIngredient8": "Soy Sauce",
      "strIngredient9": "",
      "strIngredient10": "",
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "White",
      "strMeasure2": "1",
      "strMeasure3": "1",
      "strMeasure4": "3",
      "strMeasure5": "1",
      "strMeasure6": "3 oz ",
      "strMeasure7": "1 lb",
      "strMeasure8": "2 oz ",
      "strMeasure9": " ",
      "strMeasure10": " ",
      "strMeasure11": " ",
      "strMeasure12": " ",
      "strMeasure13": " ",
      "strMeasure14": " ",
      "strMeasure15": " ",
      "strMeasure16": " ",
      "strMeasure17": " ",
      "strMeasure18": " ",
      "strMeasure19": " ",
      "strMeasure20": " ",
      "strSource": "",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "53013",
      "strMeal": "Big Mac",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "American",
      "strInstructions": "For the Big Mac sauce, combine all the ingredients in a bowl, season with salt and chill until ready to use.\r\n2. To make the patties, season the mince with salt and pepper and form into 4 balls using about 1/3 cup mince each. Place each onto a square of baking paper and flatten to form into four x 15cm circles. Heat oil in a large frypan over high heat. In 2 batches, cook beef patties for 1-2 minutes each side until lightly charred and cooked through. Remove from heat and keep warm. Repeat with remaining two patties.\r\n3. Carefully slice each burger bun into three acrossways, then lightly toast.\r\n4. To assemble the burgers, spread a little Big Mac sauce over the bottom base. Top with some chopped onion, shredded lettuce, slice of cheese, beef patty and some pickle slices. Top with the middle bun layer, and spread with more Big Mac sauce, onion, lettuce, pickles, beef patty and then finish with more sauce. Top with burger lid to serve.\r\n5. After waiting half an hour for your food to settle, go for a jog.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=C5J39YnnPsg",
      "strIngredient1": "Minced Beef",
      "strIngredient2": "Olive Oil",
      "strIngredient3": "Sesame Seed Burger Buns",
      "strIngredient4": "Onion",
      "strIngredient5": "Iceberg Lettuce",
      "strIngredient6": "Cheese",
      "strIngredient7": "Dill Pickles",
      "strIngredient8": "Mayonnaise",
      "strIngredient9": "White Wine Vinegar",
      "strIngredient10": "Pepper",
      "strIngredient11": "Mustard",
      "strIngredient12": "Onion Salt",
      "strIngredient13": "Garlic Powder",
      "strIngredient14": "Paprika",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "400g",
      "strMeasure2": "2 tbs",
      "strMeasure3": "2",
      "strMeasure4": "Chopped",
      "strMeasure5": "1/4 ",
      "strMeasure6": "2 sliced",
      "strMeasure7": "2 large",
      "strMeasure8": "1 cup ",
      "strMeasure9": "2 tsp",
      "strMeasure10": "Pinch",
      "strMeasure11": "2 tsp",
      "strMeasure12": "1 1/2 tsp ",
      "strMeasure13": "1 1/2 tsp ",
      "strMeasure14": "1/2 tsp",
      "strMeasure15": " ",
      "strMeasure16": " ",
      "strMeasure17": " ",
      "strMeasure18": " ",
      "strMeasure19": " ",
      "strMeasure20": " ",
      "strSource": "https://www.delicious.com.au/recipes/finally-recipe-worlds-top-selling-burger-big-mac/5221ee4a-279e-4a0b-8629-f442dc46822e",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "53018",
      "strMeal": "Bigos (Hunters Stew)",
      "strDrinkAlternate": null,
      "strCategory": "Pork",
      "strArea": "Polish",
      "strInstructions": "Preheat the oven to 350 degrees F (175 degrees C).\r\n\r\nHeat a large pot over medium heat. Add the bacon and kielbasa; cook and stir until the bacon has rendered its fat and sausage is lightly browned. Use a slotted spoon to remove the meat and transfer to a large casserole or Dutch oven.\r\n\r\nCoat the cubes of pork lightly with flour and fry them in the bacon drippings over medium-high heat until golden brown. Use a slotted spoon to transfer the pork to the casserole. Add the garlic, onion, carrots, fresh mushrooms, cabbage and sauerkraut. Reduce heat to medium; cook and stir until the carrots are soft, about 10 minutes. Do not let the vegetables brown.\r\n\r\nDeglaze the pan by pouring in the red wine and stirring to loosen all of the bits of food and flour that are stuck to the bottom. Season with the bay leaf, basil, marjoram, paprika, salt, pepper, caraway seeds and cayenne pepper; cook for 1 minute.\r\n\r\nMix in the dried mushrooms, hot pepper sauce, Worcestershire sauce, beef stock, tomato paste and tomatoes. Heat through just until boiling. Pour the vegetables and all of the liquid into the casserole dish with the meat. Cover with a lid.\r\n\r\nBake in the preheated oven for 2 1/2 to 3 hours, until meat is very tender.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/md8w601593348504.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=Oqg_cO4s8ik",
      "strIngredient1": "Bacon",
      "strIngredient2": "Kielbasa",
      "strIngredient3": "Pork",
      "strIngredient4": "Flour",
      "strIngredient5": "Garlic",
      "strIngredient6": "Onion",
      "strIngredient7": "Mushrooms",
      "strIngredient8": "Cabbage",
      "strIngredient9": "Sauerkraut",
      "strIngredient10": "Red Wine",
      "strIngredient11": "Bay Leaf",
      "strIngredient12": "Basil",
      "strIngredient13": "Marjoram",
      "strIngredient14": "Paprika",
      "strIngredient15": "Caraway Seed",
      "strIngredient16": "Hotsauce",
      "strIngredient17": "Beef Stock",
      "strIngredient18": "Tomato Puree",
      "strIngredient19": "Diced Tomatoes",
      "strIngredient20": "Worcestershire Sauce",
      "strMeasure1": "2 sliced",
      "strMeasure2": "1 lb",
      "strMeasure3": "1 lb",
      "strMeasure4": "1/4 cup",
      "strMeasure5": "3 chopped",
      "strMeasure6": "1 Diced",
      "strMeasure7": "1 1/2 cup ",
      "strMeasure8": "4 cups ",
      "strMeasure9": "1 Jar",
      "strMeasure10": "1/4 cup",
      "strMeasure11": "1",
      "strMeasure12": "1 tsp ",
      "strMeasure13": "1 tsp ",
      "strMeasure14": "1 tbs",
      "strMeasure15": "1/8 teaspoon",
      "strMeasure16": "1 dash",
      "strMeasure17": "5 Cups",
      "strMeasure18": "2 tbs",
      "strMeasure19": "1 cup ",
      "strMeasure20": "1 dash",
      "strSource": "https://www.allrecipes.com/recipe/138131/bigos-hunters-stew/",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "53036",
      "strMeal": "Boxty Breakfast",
      "strDrinkAlternate": null,
      "strCategory": "Pork",
      "strArea": "Irish",
      "strInstructions": "STEP 1\r\nBefore you start, put your oven on its lowest setting, ready to keep things warm. Peel the potatoes, grate 2 of them, then set aside. Cut the other 2 into large chunks, then boil for 10-15 mins or until tender. Meanwhile, squeeze as much of the liquid from the grated potatoes as you can using a clean tea towel. Mash the boiled potatoes, then mix with the grated potato, spring onions and flour.\r\n\r\nSTEP 2\r\nWhisk the egg white in a large bowl until it holds soft peaks. Fold in the buttermilk, then add the bicarbonate of soda. Fold into the potato mix.\r\n\r\nSTEP 3\r\nHeat a large non-stick frying pan over a medium heat, then add 1 tbsp butter and some of the oil. Drop 3-4 spoonfuls of the potato mixture into the pan, then gently cook for 3-5 mins on each side until golden and crusty. Keep warm on a plate in the oven while you cook the next batch, adding more butter and oil to the pan before you do so. You will get 16 crumpet-size boxty from the mix. Can be made the day ahead, drained on kitchen paper, then reheated in a low oven for 20 mins.\r\n\r\nSTEP 4\r\nHeat the grill to medium and put the tomatoes in a heavy-based pan. Add a good knob of butter and a little oil, then fry for about 5 mins until softened. Grill the bacon, then pile onto a plate and keep warm. Stack up the boxty, bacon and egg, and serve the tomatoes on the side.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/naqyel1608588563.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=80W0mCFDIP0",
      "strIngredient1": "Potatoes",
      "strIngredient2": "Spring Onions",
      "strIngredient3": "Plain Flour",
      "strIngredient4": "Egg White",
      "strIngredient5": "Milk",
      "strIngredient6": "Bicarbonate Of Soda",
      "strIngredient7": "Butter",
      "strIngredient8": "Vegetable Oil",
      "strIngredient9": "Cherry Tomatoes",
      "strIngredient10": "Bacon",
      "strIngredient11": "Egg",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "4 large",
      "strMeasure2": "1  bunch",
      "strMeasure3": "100g ",
      "strMeasure4": "1",
      "strMeasure5": "150ml",
      "strMeasure6": "1 tsp ",
      "strMeasure7": "3 tbs",
      "strMeasure8": "2 tbs",
      "strMeasure9": "6",
      "strMeasure10": "12",
      "strMeasure11": "6",
      "strMeasure12": " ",
      "strMeasure13": " ",
      "strMeasure14": " ",
      "strMeasure15": " ",
      "strMeasure16": " ",
      "strMeasure17": " ",
      "strMeasure18": " ",
      "strMeasure19": " ",
      "strMeasure20": " ",
      "strSource": "https://www.bbcgoodfood.com/recipes/boxty-bacon-eggs-tomatoes",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "53053",
      "strMeal": "Beef Rendang",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "Malaysian",
      "strInstructions": "Chop the spice paste ingredients and then blend it in a food processor until fine.\r\nHeat the oil in a stew pot, add the spice paste, cinnamon, cloves, star anise, and cardamom and stir-fry until aromatic. Add the beef and the pounded lemongrass and stir for 1 minute. Add the coconut milk, tamarind juice, water, and simmer on medium heat, stirring frequently until the meat is almost cooked. Add the kaffir lime leaves, kerisik (toasted coconut), sugar or palm sugar, stirring to blend well with the meat.\r\nLower the heat to low, cover the lid, and simmer for 1 to 1 1/2 hours or until the meat is really tender and the gravy has dried up. Add more salt and sugar to taste. Serve immediately with steamed rice and save some for overnight.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/bc8v651619789840.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=Ot-dmfBaZrA",
      "strIngredient1": "Beef",
      "strIngredient2": "Vegetable Oil",
      "strIngredient3": "Cinnamon Stick",
      "strIngredient4": "Cloves",
      "strIngredient5": "Star Anise",
      "strIngredient6": "Cardamom",
      "strIngredient7": "Coconut Cream",
      "strIngredient8": "Water",
      "strIngredient9": "Tamarind Paste",
      "strIngredient10": "Lime",
      "strIngredient11": "Sugar",
      "strIngredient12": "Challots",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "1lb",
      "strMeasure2": "5 tbs",
      "strMeasure3": "1",
      "strMeasure4": "3",
      "strMeasure5": "3",
      "strMeasure6": "3",
      "strMeasure7": "1 cup ",
      "strMeasure8": "1 cup ",
      "strMeasure9": "2 tbs",
      "strMeasure10": "6",
      "strMeasure11": "1 tbs",
      "strMeasure12": "5",
      "strMeasure13": " ",
      "strMeasure14": " ",
      "strMeasure15": " ",
      "strMeasure16": " ",
      "strMeasure17": " ",
      "strMeasure18": " ",
      "strMeasure19": " ",
      "strMeasure20": " ",
      "strSource": "https://rasamalaysia.com/beef-rendang-recipe-rendang-daging/",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "53060",
      "strMeal": "Burek",
      "strDrinkAlternate": null,
      "strCategory": "Side",
      "strArea": "Croatian",
      "strInstructions": "Fry the finely chopped onions and minced meat in oil. Add the salt and pepper. Grease a round baking tray and put a layer of pastry in it. Cover with a thin layer of filling and cover this with another layer of filo pastry which must be well coated in oil. Put another layer of filling and cover with pastry. When you have five or six layers, cover with filo pastry, bake at 200ºC/392ºF for half an hour and cut in quarters and serve.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg",
      "strTags": "Streetfood, Onthego",
      "strYoutube": "https://www.youtube.com/watch?v=YsJXZwE5pdY",
      "strIngredient1": "Filo Pastry",
      "strIngredient2": "Minced Beef",
      "strIngredient3": "Onion",
      "strIngredient4": "Oil",
      "strIngredient5": "Salt",
      "strIngredient6": "Pepper",
      "strIngredient7": "",
      "strIngredient8": "",
      "strIngredient9": "",
      "strIngredient10": "",
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "1 Packet",
      "strMeasure2": "150g",
      "strMeasure3": "150g",
      "strMeasure4": "40g",
      "strMeasure5": "Dash",
      "strMeasure6": "Dash",
      "strMeasure7": " ",
      "strMeasure8": " ",
      "strMeasure9": " ",
      "strMeasure10": " ",
      "strMeasure11": " ",
      "strMeasure12": " ",
      "strMeasure13": " ",
      "strMeasure14": " ",
      "strMeasure15": " ",
      "strMeasure16": " ",
      "strMeasure17": " ",
      "strMeasure18": " ",
      "strMeasure19": " ",
      "strMeasure20": " ",
      "strSource": "https://www.visit-croatia.co.uk/croatian-cuisine/croatian-recipes/",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "53068",
      "strMeal": "Beef Mechado",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "Filipino",
      "strInstructions": "0.\tMake the beef tenderloin marinade by combining soy sauce, vinegar, ginger, garlic, sesame oil, olive oil, sugar, salt, and ground black pepper in a large bowl. Mix well.\r\n1.\tAdd the cubed beef tenderloin to the bowl with the beef tenderloin marinade. Gently toss to coat the beef. Let it stay for 1 hour.\r\n2.\tUsing a metal or bamboo skewer, assemble the beef kebob by skewering the vegetables and marinated beef tenderloin.\r\n3.\tHeat-up the grill and start grilling the beef kebobs for 3 minutes per side. This will give you a medium beef that is juicy and tender on the inside. Add more time if you want your beef well done, but it will be less tender.\r\n4.\tTransfer to a serving plate. Serve with Saffron rice.\r\n5.\tShare and enjoy!\r\n",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/cgl60b1683206581.jpg",
      "strTags": "Stew, Warming",
      "strYoutube": "https://www.youtube.com/watch?v=jxW3Lj8VjyE",
      "strIngredient1": "Garlic",
      "strIngredient2": "Onion",
      "strIngredient3": "Beef",
      "strIngredient4": "Tomato Puree",
      "strIngredient5": "Water",
      "strIngredient6": "Olive Oil",
      "strIngredient7": "Lemon",
      "strIngredient8": "Potatoes",
      "strIngredient9": "Soy Sauce",
      "strIngredient10": "Black Pepper",
      "strIngredient11": "Bay Leaves",
      "strIngredient12": "Salt",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "3 cloves",
      "strMeasure2": "1 sliced",
      "strMeasure3": "2 Lbs",
      "strMeasure4": "8 ounces",
      "strMeasure5": "1 cup ",
      "strMeasure6": "3 tbs",
      "strMeasure7": "1 Slice",
      "strMeasure8": "1 large",
      "strMeasure9": "1/4 cup",
      "strMeasure10": "1/2 tsp",
      "strMeasure11": "2",
      "strMeasure12": "To taste",
      "strMeasure13": " ",
      "strMeasure14": " ",
      "strMeasure15": " ",
      "strMeasure16": " ",
      "strMeasure17": " ",
      "strMeasure18": " ",
      "strMeasure19": " ",
      "strMeasure20": " ",
      "strSource": "https://panlasangpinoy.com/filipino-pinoy-food-tomato-sauce-beef-mechado-recipe/",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "53069",
      "strMeal": "Bistek",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "Filipino",
      "strInstructions": "0.\tMarinate beef in soy sauce, lemon (or calamansi), and ground black pepper for at least 1 hour. Note: marinate overnight for best result\r\n1.\tHeat the cooking oil in a pan then pan-fry half of the onions until the texture becomes soft. Set aside\r\n2.\tDrain the marinade from the beef. Set it aside. Pan-fry the beef on the same pan where the onions were fried for 1 minute per side. Remove from the pan. Set aside\r\n3.\tAdd more oil if needed. Saute garlic and remaining raw onions until onion softens.\r\n4.\tPour the remaining marinade and water. Bring to a boil.\r\n5.\tAdd beef. Cover the pan and simmer until the meat is tender. Note: Add water as needed.\r\n6.\tSeason with ground black pepper and salt as needed. Top with pan-fried onions.\r\n7.\tTransfer to a serving plate. Serve hot. Share and Enjoy!\r\n",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/4pqimk1683207418.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=xOQON5_S7as",
      "strIngredient1": "Beef",
      "strIngredient2": "Soy Sauce",
      "strIngredient3": "Lemon",
      "strIngredient4": "Garlic",
      "strIngredient5": "Onion",
      "strIngredient6": "Olive Oil",
      "strIngredient7": "Water",
      "strIngredient8": "Salt",
      "strIngredient9": "",
      "strIngredient10": "",
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "1 lb",
      "strMeasure2": "5 tablespoons",
      "strMeasure3": "1",
      "strMeasure4": "3 cloves",
      "strMeasure5": "3 parts ",
      "strMeasure6": "4 tbs",
      "strMeasure7": "1 cup ",
      "strMeasure8": "1 pinch",
      "strMeasure9": " ",
      "strMeasure10": " ",
      "strMeasure11": " ",
      "strMeasure12": " ",
      "strMeasure13": " ",
      "strMeasure14": " ",
      "strMeasure15": " ",
      "strMeasure16": " ",
      "strMeasure17": " ",
      "strMeasure18": " ",
      "strMeasure19": " ",
      "strMeasure20": " ",
      "strSource": "https://panlasangpinoy.com/bistek-tagalog-beefsteak-recipe/",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "53070",
      "strMeal": "Beef Caldereta",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "Filipino",
      "strInstructions": "0.\tHeat oil in a cooking pot. Saute onion and garlic until onion softens\r\n1.\tAdd beef. Saute until the outer part turns light brown.\r\n2.\tAdd soy sauce. Pour tomato sauce and water. Let boil.\r\n3.\tAdd Knorr Beef Cube. Cover the pressure cooker. Cook for 30 minutes.\r\n4.\tPan-fry carrot and potato until it browns. Set aside.\r\n5.\tAdd chili pepper, liver spread and peanut butter. Stir.\r\n6.\tAdd bell peppers, fried potato and carrot. Cover the pot. Continue cooking for 5 to 7 minutes.\r\n7.\tSeason with salt and ground black pepper. Serve.\r\n",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/41cxjh1683207682.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=yI7hTz0ft5k",
      "strIngredient1": "Beef",
      "strIngredient2": "Beef Stock",
      "strIngredient3": "Soy Sauce",
      "strIngredient4": "Water",
      "strIngredient5": "Green Pepper",
      "strIngredient6": "Red Pepper",
      "strIngredient7": "Potatoes",
      "strIngredient8": "Carrots",
      "strIngredient9": "Tomato Puree",
      "strIngredient10": "Peanut Butter",
      "strIngredient11": "Chilli Powder",
      "strIngredient12": "Onion",
      "strIngredient13": "Garlic",
      "strIngredient14": "Olive Oil",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "2kg cut cubes",
      "strMeasure2": "1",
      "strMeasure3": "1 tbs",
      "strMeasure4": "2 cups ",
      "strMeasure5": "1 sliced",
      "strMeasure6": "1 sliced",
      "strMeasure7": "1 sliced",
      "strMeasure8": "1 sliced",
      "strMeasure9": "8 ounces",
      "strMeasure10": "3  tablespoons",
      "strMeasure11": "5",
      "strMeasure12": "1 chopped",
      "strMeasure13": "5 cloves",
      "strMeasure14": "3 tbs",
      "strMeasure15": " ",
      "strMeasure16": " ",
      "strMeasure17": " ",
      "strMeasure18": " ",
      "strMeasure19": " ",
      "strMeasure20": " ",
      "strSource": "https://www.kawalingpinoy.com/beef-caldereta/",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "53071",
      "strMeal": "Beef Asado",
      "strDrinkAlternate": null,
      "strCategory": "Beef",
      "strArea": "Filipino",
      "strInstructions": "0.\tCombine beef, crushed peppercorn, soy sauce, vinegar, dried bay leaves, lemon, and tomato sauce. Mix well. Marinate beef for at least 30 minutes.\r\n1.\tPut the marinated beef in a cooking pot along with remaining marinade. Add water. Let boil.\r\n2.\tAdd Knorr Beef Cube. Stir. Cover the pot and cook for 40 minutes in low heat.\r\n3.\tTurn the beef over. Add tomato paste. Continue cooking until beef tenderizes. Set aside.\r\n4.\tHeat oil in a pan. Fry the potato until it browns. Turn over and continue frying the opposite side. Remove from the pan and place on a clean plate. Do the same with the carrots.\r\n5.\tSave 3 tablespoons of cooking oil from the pan where the potato was fried. Saute onion and garlic until onion softens.\r\n6.\tPour-in the sauce from the beef stew. Let boil. Add the beef. Cook for 2 minutes.\r\n7.\tAdd butter and let it melt. Continue cooking until the sauce reduces to half.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/pkopc31683207947.jpg",
      "strTags": null,
      "strYoutube": "https://www.youtube.com/watch?v=lNlK8DVhXXA",
      "strIngredient1": "Beef",
      "strIngredient2": "Beef Stock Concentrate",
      "strIngredient3": "Tomato Puree",
      "strIngredient4": "Water",
      "strIngredient5": "Soy Sauce",
      "strIngredient6": "White Wine Vinegar",
      "strIngredient7": "Pepper",
      "strIngredient8": "Bay Leaf",
      "strIngredient9": "Lemon",
      "strIngredient10": "Tomato Sauce",
      "strIngredient11": "Butter",
      "strIngredient12": "Olive Oil",
      "strIngredient13": "Onion",
      "strIngredient14": "Garlic",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "1.5kg",
      "strMeasure2": "1",
      "strMeasure3": "8 ounces",
      "strMeasure4": "3 cups ",
      "strMeasure5": "6 tablespoons",
      "strMeasure6": "1 tbs",
      "strMeasure7": "2 tbs",
      "strMeasure8": "4",
      "strMeasure9": "1/2 ",
      "strMeasure10": "2 tbs",
      "strMeasure11": "3 tbs",
      "strMeasure12": "1/2 cup ",
      "strMeasure13": "1 chopped",
      "strMeasure14": "4 cloves",
      "strMeasure15": " ",
      "strMeasure16": " ",
      "strMeasure17": " ",
      "strMeasure18": " ",
      "strMeasure19": " ",
      "strMeasure20": " ",
      "strSource": "https://panlasangpinoy.com/beef-asado/",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "53076",
      "strMeal": "Bread omelette",
      "strDrinkAlternate": null,
      "strCategory": "Breakfast",
      "strArea": "Indian",
      "strInstructions": "Make and enjoy",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/hqaejl1695738653.jpg",
      "strTags": null,
      "strYoutube": "",
      "strIngredient1": "Bread",
      "strIngredient2": "Egg",
      "strIngredient3": "Salt",
      "strIngredient4": "",
      "strIngredient5": "",
      "strIngredient6": "",
      "strIngredient7": "",
      "strIngredient8": "",
      "strIngredient9": "",
      "strIngredient10": "",
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "2",
      "strMeasure2": "2",
      "strMeasure3": "0.5",
      "strMeasure4": " ",
      "strMeasure5": " ",
      "strMeasure6": " ",
      "strMeasure7": " ",
      "strMeasure8": " ",
      "strMeasure9": " ",
      "strMeasure10": " ",
      "strMeasure11": " ",
      "strMeasure12": " ",
      "strMeasure13": " ",
      "strMeasure14": " ",
      "strMeasure15": " ",
      "strMeasure16": " ",
      "strMeasure17": " ",
      "strMeasure18": " ",
      "strMeasure19": " ",
      "strMeasure20": " ",
      "strSource": "",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "53078",
      "strMeal": "Beetroot Soup (Borscht)",
      "strDrinkAlternate": null,
      "strCategory": "Vegetarian",
      "strArea": "Ukrainian",
      "strInstructions": "Chop the beetroot, add water and stock cube and cook for 15mins. Add the other ingredients and boil until soft. Finally add the beans and cook for 5mins. Serve in the soup pot.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/zadvgb1699012544.jpg",
      "strTags": "soup",
      "strYoutube": "https://www.youtube.com/watch?v=6CXgPVw_-0g",
      "strIngredient1": "Beetroot",
      "strIngredient2": "Olive Oil",
      "strIngredient3": "Chicken Stock Cube",
      "strIngredient4": "Water",
      "strIngredient5": "Potatoes",
      "strIngredient6": "Cannellini Beans",
      "strIngredient7": "Dill",
      "strIngredient8": "",
      "strIngredient9": "",
      "strIngredient10": "",
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "3",
      "strMeasure2": "4 tbs",
      "strMeasure3": "1",
      "strMeasure4": "6 cups ",
      "strMeasure5": "3",
      "strMeasure6": "1 can ",
      "strMeasure7": "Garnish",
      "strMeasure8": " ",
      "strMeasure9": " ",
      "strMeasure10": " ",
      "strMeasure11": " ",
      "strMeasure12": " ",
      "strMeasure13": " ",
      "strMeasure14": " ",
      "strMeasure15": " ",
      "strMeasure16": " ",
      "strMeasure17": " ",
      "strMeasure18": " ",
      "strMeasure19": " ",
      "strMeasure20": " ",
      "strSource": "https://natashaskitchen.com/classic-russian-borscht-recipe/",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    },
    {
      "idMeal": "53080",
      "strMeal": "Blini Pancakes",
      "strDrinkAlternate": null,
      "strCategory": "Side",
      "strArea": "Russian",
      "strInstructions": "In a large bowl, whisk together 1/2 cup buckwheat flour, 2/3 cup all-purpose flour, 1/2 teaspoon salt, and 1 teaspoon yeast.\r\n\r\nMake a well in the center and pour in 1 cup warm milk, whisking until the batter is smooth.\r\n\r\nCover the bowl and let the batter rise until doubled, about 1 hour.\r\n\r\nEnrich and Rest the Batter\r\nStir 2 tablespoons melted butter and 1 egg yolk into the batter.\r\n\r\nIn a separate bowl, whisk 1 egg white until stiff, but not dry.\r\n\r\nFold the whisked egg white into the batter.\r\n\r\nCover the bowl and let the batter stand 20 minutes.\r\n\r\nPan-Fry the Blini\r\nHeat butter in a large nonstick skillet over medium heat.\r\n\r\nDrop quarter-sized dollops of batter into the pan, being careful not to overcrowd the pan. Cook for about 1 minute or until bubbles form.\r\n\r\nTurn and cook for about 30 additional seconds.\r\n\r\nRemove the finished blini onto a plate and cover them with a clean kitchen towel to keep warm. Add more butter to the pan and repeat the frying process with the remaining batter.",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/0206h11699013358.jpg",
      "strTags": "pancake",
      "strYoutube": "https://www.youtube.com/watch?v=GsB8ZI5vREA",
      "strIngredient1": "Buckwheat",
      "strIngredient2": "Flour",
      "strIngredient3": "Salt",
      "strIngredient4": "Yeast",
      "strIngredient5": "Milk",
      "strIngredient6": "Butter",
      "strIngredient7": "Egg",
      "strIngredient8": "",
      "strIngredient9": "",
      "strIngredient10": "",
      "strIngredient11": "",
      "strIngredient12": "",
      "strIngredient13": "",
      "strIngredient14": "",
      "strIngredient15": "",
      "strIngredient16": "",
      "strIngredient17": "",
      "strIngredient18": "",
      "strIngredient19": "",
      "strIngredient20": "",
      "strMeasure1": "1/2 cup ",
      "strMeasure2": "2/3 Cup",
      "strMeasure3": "1/2 tsp",
      "strMeasure4": "1 tsp ",
      "strMeasure5": "1 cup ",
      "strMeasure6": "2 tbs",
      "strMeasure7": "1 Seperated",
      "strMeasure8": " ",
      "strMeasure9": " ",
      "strMeasure10": " ",
      "strMeasure11": " ",
      "strMeasure12": " ",
      "strMeasure13": " ",
      "strMeasure14": " ",
      "strMeasure15": " ",
      "strMeasure16": " ",
      "strMeasure17": " ",
      "strMeasure18": " ",
      "strMeasure19": " ",
      "strMeasure20": " ",
      "strSource": "https://www.thespruceeats.com/russian-blini-recipe-buckwheat-pancakes-1136797",
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    }
  ]
}













































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