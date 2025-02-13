import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Config from "./Config";
import LoginPage from "./LoginPage";

function PathRouter(){
    return(
        <Router>
            <Routes>
                <Route path = "/" element = {<LoginPage />} />
                <Route path = "/config" element = {<Config />} />
            </Routes>
        </Router>
    )
}

export default PathRouter;