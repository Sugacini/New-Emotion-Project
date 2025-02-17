async function database(name, pass, email) {
    console.log(name, email, pass);
    let response = await fetch("http://localhost:3000/newUser",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            userName:name,
            userPass : pass,
            userEmail: email,
        })
    });
    console.log(response);
    console.log("Enter the database");
}

export default database;







// import axios from "axios";

// axios.post("/http://localhost:3000/newUser", {
//         username: name,
//         userEmail: email,
//         usePass: pass
//     }).then(function (response) {
//         console.log(response);
//     })