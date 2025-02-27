import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

async function BookCollection(emoData) {
    let response = await fetch("http://localhost:3000/getBooks", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify({
            emo: emoData,
        })
    });
    let data = response.json();
    let data1 = await data.then();
    console.log(data1);
    return data1;
}


function Book() {

    const [isBook, setBook] = useState(null);
    const navigate = useNavigate();

    const location = useLocation();
    const data = location.state;
    const data1 = data.emo;
    const userId = data.idOfUser
    console.log(data);
    const moodQuote ={
        happy: ['"Be happy for this moment. This moment is your life"', '"Happiness is secret to all beauty,There is no beauty without happiness"', '"Good food is all the sweeter when shared with good friends"', '"Good food, good mood, that is the perfect recipe for life"'],
        angry: ['"Hunger and anger are both powerful, but food is the one that silences them"', '"Sometimes, food is the only thing that understands your anger"', '"In moments of anger, food is the one thing that can silence the storm."', '"Even in anger, peace comes with the first bite of your favorite dish."'],
        sad: ['"When you are feeling down, food has a way of reminding you that not all is lost"', '"In times of sadness, a warm meal is a gentle reminder that comfort still exists"', '"When you are feeling low, food is a small piece of joy you can hold on to."'],
        surprised: ['"The best meals are often the ones that surprise you"', '""']
    }
    const quote = ['"A book is proof that humans can work magic with emotions"', '"A day without laughter is a day wasted"', '"For every minute you are angry, you lose sixty seconds of happiness."']
    console.log(data1);

    useEffect(() => {
        BookCollection(data1).then(res => setBook(res));
      }, [])

    return (
        <>
        <Header userUniqueId={userId} setUserId={null} loginBtn={null} backTo={'features'} obj={{state: {findEmo: data1, idOfUser: userId}}} className="BookHeader"/>

        <div className="bookOuter">
            {/* <div className="bookHeader"> */}
            {/* </div> */}
            
            <div className="bookSideBar">
            {quote[(Math.floor(Math.random() * 3))]}
            </div>
            <div className="bookContainer">
                {(isBook != null) ? isBook.map((singleBook, index) => {
                    {console.log(singleBook.volumeInfo.imageLinks.thumbnail)}
                    return <div key={index} className="book" onClick={() => {navigate("/singleBook", {state: { bookId: singleBook.id, emo:data1, idOfUser: userId }})}}>
                        <img src={singleBook.volumeInfo.imageLinks.thumbnail} className="setBookImg"></img>
                        <p className="bookName">{singleBook.volumeInfo.title}</p>
                    </div>
                }) : <div class="loader">
                <span></span>
                <span></span>
                <span></span>
                {/* <p>Loading</p> */}
              </div>}
            </div>
        </div>
        </>
        
    )
}

export default Book;