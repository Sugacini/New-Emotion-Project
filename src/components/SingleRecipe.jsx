import { useLocation } from "react-router-dom";
import "../Home.css";
import { FaLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function SingleRecipe() {
    const location = useLocation();
    const data = (location.state);
    const nameofFood = data.name;
    const imgOfFood = data.image;
    const descOfImg = data.description;
    console.log(descOfImg);

    const navigate = useNavigate();

    return (
        <div className="singleFoodOuter">
            <div className="foodBack">
                <div className="iconBack" onClick={() => {navigate("/food")}}>
                    <FaLeftLong style={{fontSize:"50px"}}></FaLeftLong>
                </div>
            </div>
            <div className="singleFoodContainer">
                <div className="imageWithName">
                    <div className="imageOuter">
                        <div className="foodImg">
                            <img src={imgOfFood} className="foodImg1"></img>
                        </div>
                        <div className="foodName">{nameofFood}</div>
                    </div>
                    <div className="descript">
                        <p className="setDescHead">Description</p>
                        <p className="setDesc">{descOfImg}</p>
                    </div>
                </div>
            </div>
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