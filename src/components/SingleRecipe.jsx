import { useLocation } from "react-router-dom";
import "../Home.css";
import { FaLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

async function takeFood(idOfFood) {
    try {
        let response = await fetch("http://localhost:3000/singleFoodDetail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: idOfFood,
            })
        });
        var resData = response.json();
        var resData1 = await resData.then();
        console.log(resData1);
        return resData1;
    } catch (err) {
        console.log(err);
    }
}

function SingleRecipe() {
    const location = useLocation();
    const data = (location.state);
    console.log(data.idOfFood);
    console.log(data.emo1)
    const userId = data.idOfUser;
    const ingreData = Array.from({ length: 12 })

    const navigate = useNavigate();
    const [isSingleFood, setSingleFood] = useState(null);
    const [isIngre, setIngre] = useState("");

    useEffect(() => {
        takeFood(data.idOfFood).then(res => setSingleFood(res));
    }, [])

    return (
        <div className="singleFoodOuter">
            <div className="foodBack">
                <div className="iconBack" onClick={() => { navigate("/food", {state: {emo:data.emo1, idOfUser: userId}}) }}>
                    <FaLeftLong style={{ fontSize: "50px" }}></FaLeftLong>
                </div>
            </div>
            {(isSingleFood != null) ?
                <div className="singleFoodContainer">
                    <div className="foodName">
                        {isSingleFood.meals[0].strMeal}</div>
                    <div className="foodImg">
                        <img src={isSingleFood.meals[0].strMealThumb} className="setImg"/>
                    </div>
                    <div className="ingrediants">
                        <p className="ingreHead">Ingredients</p>
                        {ingreData.map((_, index) => {
                            let value1= 'strIngredient'+(index+1)
                            console.log(value1);
                            // setIngre(value1);
                            let value = isSingleFood.meals[0][value1];
                            console.log(value);
                            return(
                                <li className="ingreValues">{value}</li>
                            )
                        })}
                    </div>
                    <div className="instruction">
                        <p className="instruHead">Instructions</p>
                        <p>{isSingleFood.meals[0].strInstructions}</p>
                    </div>
                </div>
                : <p>Loading</p>}
        </div>

    )
}

export default SingleRecipe;




{/* <div className="descript">
    <div className="descriptOuter">
        <div className="nameFood">
            <p className="setFoodName">Food Name:</p>
            <p className="setName1">{nameofFood}</p>
        </div>
        <div className="foodDesc">
            <p className="setDesc">Lamb Rogan Josh is a classic Kashmiri dish made with tender lamb slow-cooked in a rich, aromatic gravy. It features a blend of yogurt, tomatoes, and warm spices like cardamom, cinnamon, and Kashmiri red chili. This dish is known for its deep red color and flavorful, mildly spicy taste.</p>
        </div>
    </div>
</div> */}