import style from "./Journel.module.css";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

function JournelLogo() {

    const createTextDiv = useRef();
    const newDiv = useRef();
    const writeText = useRef();
    const saveText = useRef();
    const writingDataSave = useRef();

    const [newJournelDiv, setJournalBoxes] = useState([]);
    const [newDataDiv, setDataDiv] = useState([]);

    const [count, setCount] = useState(0);

    function createDiv() {
        console.log(count);
        if (count == 0) {
            setJournalBoxes((prev) => [...prev, {}]);
        }
        setCount(count + 1);
        console.log(count)
    }

    function saveData() {
        let value = writeText.current.textContent;
        let value1 = value.slice(0, 5);
        console.log(value, value1);
        let now = new Date();
        let dateAndTime = (now.toLocaleString()).split(",");
        let date = dateAndTime[0];
        let time = dateAndTime[1];
        console.log(now);
        console.log(dateAndTime);
        setDataDiv((prev) => [...prev, { value1, date, time }])
        newDiv.current.remove();
        setCount(0);
    }

    function deleteData() {
        newDiv.current.remove();
        setCount(0);
        console.log("Delete the data");
    }

    return (
        <>
            <div className={style.journelHeader}>
                <div className={style.logo}>
                    <div className={style.logo1}>
                        <div className={style.image}></div>
                    </div>
                    <div className={style.name}>Journel</div>
                </div>

                <div className={style.options}>
                    <div className={style.create + " " + style.option} onClick={createDiv}>
                        <i className="fa-solid fa-square-plus" style={{ fontSize: "35px", color: "black" }}></i>
                    </div>
                    <div className={style.search + " " + style.option}>
                        <i className="fa-solid fa-magnifying-glass" style={{ fontSize: "27px", color: "black" }}></i>
                    </div>
                    <div className={style.trash + " " + style.option}>
                        <i className="fa-regular fa-trash-can" style={{ fontSize: "27px", color: "black" }}></i>
                    </div>
                    <div className={style.setting + " " + style.option}>
                        <i className="fa-solid fa-gear" style={{ fontSize: "29px", color: "black" }}></i>
                    </div>
                    <div className={style.profile + " " + style.option}>
                        <div className={style.innerProfile}>
                            <i className="fa-solid fa-user" style={{ fontSize: "20px", color: "black" }}></i>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.writeJournel}>
                <div className={style.journelContainer} ref={createTextDiv}>
                    {newJournelDiv.map((_, index) => (
                        <div key={index} className={style.journelBox} ref={newDiv}>{console.log(index)}
                            <div className={style.textBox} ref={writeText} contentEditable={true}></div>
                            <div className="buttons">
                                <button className={style.saveButton} onClick={saveData}>Save</button>
                                <button className={style.trash} onClick={deleteData}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={style.saveJournel} ref={writingDataSave}>
                    {newDataDiv.map((ele, index) => {
                        { console.log(index) }
                        return <div className={style.dataSaveDiv} ref={saveText} key={index}>
                            <p className={style.headOfJournel}>{ele.value1}</p>
                            <div className={style.timeAndDate}>
                                <p>{ele.date}</p>
                                <p>{ele.time}</p>
                            </div>
                        </div>
                    })}
                </div>
            </div>


        </>
    )
}

export default JournelLogo;


